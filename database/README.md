# DB

## mysqlにログインするまで

- databaseコンテナに入る

```bash
docker-compose exec database bash
```

- mysqlに入る

```bash
mysql -u USERNAME -p
```

- パスワード入力（.envファイルを参照）

## テーブル作成

- mysqlに入る（上を参考）

- (必要があれば)既存テーブルの削除

```mysql
DROP TABLE `TABLENAME`;
```

- テーブル作成

```mysql
source /var/lib/bin/init.sql
```

## mockデータ挿入方法

- mysqlに入る（上を参考）

- モックデータを挿入

 ```bash
source /var/lib/mysql/mock.sql
 ```
