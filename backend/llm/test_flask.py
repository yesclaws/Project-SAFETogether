import requests

URL = "http://127.0.0.1:9001/summarize"
TEST_AUDIO_PATH_FILE = "test_3.mp3"

if __name__ == "__main__":
    audio_file = open(TEST_AUDIO_PATH_FILE,"rb")
    values = {"file": (TEST_AUDIO_PATH_FILE,audio_file,"audio/mp3")}
    response = requests.post(URL,files=values)
    data = response.json()

    print(f"Summarized text for incident logging: {data}")
