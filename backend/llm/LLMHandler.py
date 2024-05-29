from llama_cpp import Llama,LlamaGrammar
import httpx
import json

class LLMHandler:
    def __init__(self, model_path):
        # To train Llama to output with valid JSON grammar 
        grammar_text = httpx.get("https://raw.githubusercontent.com/ggerganov/llama.cpp/master/grammars/json.gbnf").text
        self.grammar = LlamaGrammar.from_string(grammar_text,verbose=False)

        # To be ran on GPU
        self.llm = Llama(model_path=model_path, n_gpu_layers=100, n_threads=1)
        
        # To be ran locally with CPU
        # self.llm = Llama(
        # model_path= model_path,
        # verbose=False
        # )

        # Prompts to make LLama output key information needed for security
        self.prompt = '''Given a paragraph, extract the location of incident, type of crime, and time of crime, and return in JSON format with keys "Location", "Type", and "Time". Only return the JSON object in your answer.
        Paragraph: "I am Marcus Goh, my phone got stolen at Raffles Hall at 10pm".
        Answer : {{"student_name": "Marcus Goh", "area": "Raffles Hall", "category" : "Theft", "additional_info": "phone got stolen at Raffles Hall at 10pm"}}

        Paragraph: "Hello I am Shaun Ang, there was an armed man at Science Frontier Canteen at 3pm.
        Answer: {{"student_name": "Shaun Ang", "area": "Science Frontier Canteen", "category": "armed man", "additional_info": "armed man at Science Frontier Canteen at 3pm"}}

        Paragraph: {paragraph}
        Answer:
        '''

    def __call__(self, paragraph):
        output = self.llm(self.prompt.format(paragraph=paragraph), stop="Paragraph:",grammar=self.grammar,max_tokens=-1)
        return json.dumps(json.loads(output['choices'][0]['text']), indent=4)
    
if __name__ == "__main__":
    model_path = "llama-2-13b.Q5_K_M.gguf"
    handler = LLMHandler(model_path)
    paragraph = "Hi, I am Huangda, I just got molested at Raffles Hall in the afternoon"
    
    print(handler.__call__(paragraph))
