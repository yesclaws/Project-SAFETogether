# Documentation of LLMHandler.py (Llama2 model)

For our LLM model, we used Llama2 model from https://huggingface.co/TheBloke/Llama-2-13B-GGUF/tree/main. By default, use https://huggingface.co/TheBloke/Llama-2-13B-GGUF/blob/main/llama-2-13b.Q5_K_M.gguf for the model path.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install llama-cpp and httpx.

```bash
pip3 install llama-cpp-python httpx 
```
Also remember to download "llama-2-13b.Q5_K_M.gguf from https://huggingface.co/TheBloke/Llama-2-13B-GGUF/blob/main/llama-2-13b.Q5_K_M.gguf.

For GPU usage set the flags to install [llama-cpp-python](https://github.com/abetlen/llama-cpp-python) according to your device.

## Usage
Inside LLMHandler.py, for CPU usage:
```python
# To be ran on CPU
self.llm = Llama(
        model_path= model_path,
        verbose=False
        )
```
For GPU usage:
```python
# To be ran on GPU
self.llm = Llama(model_path=model_path, n_gpu_layers=100, n_threads=1)
```
```python
if __name__ == "__main__":
    model_path = "llama-2-13b.Q5_K_M.gguf"
    handler = LLMHandler(model_path)
    paragraph = "Hi, I am Huangda, I just got molested at Raffles Hall in the afternoon"
    
    print(handler.__call__(paragraph))
```
Change the paragraph according to your preference to do different testing.
To run the LLMHandler.py, just call 
```python
python3 LLMHandler.py
```

## Contributing

Done by DSA3101-05-security backend team

## License

[MIT](https://choosealicense.com/licenses/mit/)
