FROM python:3.12.9

# Install C++ and Java compilers
RUN apt-get update && apt-get install -y \
    g++ \
    default-jdk \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . .

# Hugging Face default port is 7860
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]