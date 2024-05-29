apt-get update && apt-get upgrade -y \
    && apt-get install -y git build-essential \
    python3 python3-pip gcc wget \
    ocl-icd-opencl-dev opencl-headers clinfo \
    libclblast-dev libopenblas-dev \
    && mkdir -p /etc/OpenCL/vendors && echo "libnvidia-opencl.so.1" > /etc/OpenCL/vendors/nvidia.icd

add-apt-repository ppa:jon-severinsson/ffmpeg
apt-get update
apt-get install -y ffmpeg
apt-get install -y wget 
rm -rf /var/lib/apt/lists/*
pip3 install --upgrade pip
pip3 install torch -f https://download.pytorch.org/whl/cu121/torch_stable.html
# setting build related env vars
export CUDA_DOCKER_ARCH=all
export LLAMA_CUBLAS=1
CMAKE_ARGS="-DLLAMA_CUBLAS=on" pip3 install llama-cpp-python

pip3 install -r requirements.txt
wget https://huggingface.co/TheBloke/Llama-2-13B-GGUF/resolve/main/llama-2-13b.Q5_K_M.gguf
