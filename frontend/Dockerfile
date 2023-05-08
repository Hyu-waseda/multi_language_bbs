# Node.js 16をベースイメージに使用
FROM node:18-alpine

# コンテナ内の作業ディレクトリを設定
WORKDIR /app

# package.jsonとyarn.lockをコンテナにコピー
COPY package.json yarn.lock ./

# 依存関係をインストール
RUN yarn install

# アプリケーションのコードをコンテナにコピー
COPY . .

# Next.jsアプリケーションをビルド
RUN yarn build

# アプリケーションがリッスンするポートを公開
EXPOSE 3000

# アプリケーションを起動
# RUN next build
CMD ["yarn", "start"]