IMAGE_NAME=frontend
APP_PORT=3000

# カレントディレクトリのDockerfileでイメージを作成する
build:
	docker build -t $(IMAGE_NAME) .

# 作成したイメージを起動する
run:
	docker run -it --rm -p $(APP_PORT):$(APP_PORT) -v $(PWD):/app -v /app/.next --name bbs_frontend $(IMAGE_NAME)

# イメージ作成と起動
build-run: build run

# srcフォルダ配下の全ファイルを修正
prettier:
	yarn prettier --write components const.tsx interfaces pages styles translate utils

.PHONY: build run build-run prettier