# Chrome拡張機能の環境

## 導入
簡単にChrome拡張機能の環境構築をするための雛型です。

## 事前準備
インストールリスト
- Docker
- Docker Compose

## 手順
1. リポジトリのクローン
2. コンテナのビルド
   ```sh
   docker-compose up -d
   ```
3. コンテナにアタッチ  
   (VSCodeの拡張機能などで)
1. distディレクトリが作成されるまで待機