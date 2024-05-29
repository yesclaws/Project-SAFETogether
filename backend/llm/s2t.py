from llm.LLMHandler import LLMHandler
import torch
from transformers import (
    AutomaticSpeechRecognitionPipeline,
    WhisperForConditionalGeneration,
    WhisperTokenizer,
    WhisperProcessor,
)
from peft import PeftModel, PeftConfig
from datetime import datetime
import pytz
from incident_creation.incidents import add_incident
import time 
# import whisper

class s2tsummarizer():
    def __init__(self, llm_model_path="llama-2-13b.Q5_K_M.gguf", model_repo = "jcrj/whisper-small"):
        self.model_path = llm_model_path
        self.model_repo = model_repo
        self.language = "English"
        self.task = "transcribe"
        
        self.handler = LLMHandler(self.model_path)
        self.peft_config = PeftConfig.from_pretrained(self.model_repo)
        self.model = WhisperForConditionalGeneration.from_pretrained(
            self.peft_config.base_model_name_or_path, load_in_8bit=True, device_map="auto"
        )
        self.tokenizer = WhisperTokenizer.from_pretrained(self.peft_config.base_model_name_or_path, language=self.language, task=self.task)
        self.processor = WhisperProcessor.from_pretrained(self.peft_config.base_model_name_or_path, language=self.language, task=self.task)
        self.feature_extractor = self.processor.feature_extractor
        self.forced_decoder_ids = self.processor.get_decoder_prompt_ids(language=self.language, task=self.task)
        self.pipe = AutomaticSpeechRecognitionPipeline(model=self.model, tokenizer=self.tokenizer, feature_extractor=self.feature_extractor)
        
    def transcribe(self, audio_path):
        with torch.cuda.amp.autocast():
            text = self.pipe(audio_path, generate_kwargs={"forced_decoder_ids": self.forced_decoder_ids}, max_new_tokens=255)["text"]
        return text
    
    def s2t(self,audio_path):
        print("Transcribing with Whisper")
        paragraph = self.transcribe(audio_path)
        print("Summarizing text with Llama")
        return self.handler.__call__(paragraph)
    
    @staticmethod
    def remove_apostrophe(report):
        """To remove apostrophe in summarizer output to ensure seamless logging into db."""
        for key in report:
            if "'" in report[key]:
                report[key] = report[key].replace("'", "")
        
        return report
            

    def create_valid_report(self,report):
        """To fill in all the necessary keys needed in summarizer output for seamless logging into db."""
        report["datetime"] = datetime.now(pytz.timezone('Asia/Singapore')).strftime('%Y-%m-%d %H:%M:%S')
        keys_needed = ["student_name", "student_contact_no","category","datetime","student_email","area"]

        # Fill missing keys with "unspecfied" 
        for key in keys_needed:
            if key not in report:
                report[key] = "unspecified"

        report = self.remove_apostrophe(report=report)

        # Call API to add incident into db
        add_incident(report)
        return report
        
if __name__ == "__main__":
    print("Loading s2tsummarizer")
    model = s2tsummarizer(llm_model_path="llama-2-13b.Q5_K_M.gguf", model_repo = "jcrj/whisper-small")
    res = model.s2t(audio_path="audio_test.mp3")

    print(res)
