FROM python:3.9-slim-buster

# MySQL開発ヘッダーファイルをインストール
RUN apt-get update && apt-get install -y default-libmysqlclient-dev gcc

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade -r requirements.txt

EXPOSE 8080

CMD ["uvicorn", "src.main:app", "--reload", "--host", "0.0.0.0", "--port", "8080", "--ws", "websockets"]