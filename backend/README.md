# バックエンド

- Python 3.10.9
- pip 23.1

## 環境構築

- 仮想環境の用意

```bash
python3 -m venv .venv
```

- 仮想環境の起動

```shell
source .venv/bin/activate
```

- 必要なモジュールのインストール

```shell
pip install -r requirements.txt
```

- メモ
  - requirements.txtの作り方

	```shell
	pip freeze > requirements.txt
	```

  - 指定できる言語：iso639-1 language codes
    - https://ja.wikipedia.org/wiki/ISO_639-1%E3%82%B3%E3%83%BC%E3%83%89%E4%B8%80%E8%A6%A7
    - https://py-googletrans.readthedocs.io/en/latest/
    - https://gist.github.com/jrnk/8eb57b065ea0b098d571

  - 開発中はvenv環境で行う必要あり
    - venv環境でないとrequirements.txtがローカル環境のものになってしまう

## 参考サイト

- Googletrans本家：https://pypi.org/project/googletrans/
