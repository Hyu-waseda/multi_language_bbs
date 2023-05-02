IMAGE_NAME=backend
APP_PORT=8080

# カレントディレクトリのDockerfileでイメージを作成する
build:
	pip freeze > requirements.txt
	docker build -t $(IMAGE_NAME) .

# 作成したイメージを起動する
run:
	docker run -p $(APP_PORT):$(APP_PORT) $(IMAGE_NAME)

# イメージ作成と起動
build-run: build run

.PHONY: build run build-run
