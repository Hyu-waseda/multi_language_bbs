# multi_language_bbs

3ヶ月後は9/9前後

## SSL証明書の自動更新設定
1. **Deploy Hookスクリプトの作成**

   Certbotの証明書更新後にNginxを再起動するスクリプトを作成します。例えば、次のようなスクリプトを`/etc/letsencrypt/renewal-hooks/deploy/restart_nginx.sh`として保存します。

   ```bash
   sudo mkdir -p /etc/letsencrypt/renewal-hooks/deploy
   sudo nano /etc/letsencrypt/renewal-hooks/deploy/restart_nginx.sh
   ```

   ファイル内容:

   ```bash
   #!/bin/bash
   docker-compose -f /path/to/docker-compose.yml restart nginx
   ```

   `docker-compose.yml`ファイルのパスを正確に指定してください。

2. **スクリプトに実行権限を付与**

   ```bash
   sudo chmod +x /etc/letsencrypt/renewal-hooks/deploy/restart_nginx.sh
   ```

3. **手動テスト**

   スクリプトが正しく動作するか手動でテストします。

   ```bash
   sudo /etc/letsencrypt/renewal-hooks/deploy/restart_nginx.sh
   ```

   スクリプト実行後にNginxが正常に再起動されることを確認します。

4. **Certbotの自動更新設定の確認**

   Certbotの自動更新が設定されていることを確認します。`certbot.timer`が既に有効であるため、手動で更新が成功した場合にスクリプトが実行されることを確認できます。

5. **手動テスト**

   証明書の更新を手動でテストして、スクリプトが正しく動作するか確認します。

   ```bash
   sudo certbot renew --deploy-hook "/etc/letsencrypt/renewal-hooks/deploy/restart_nginx.sh"
   ```


## SSL証明書の更新手順（手動）

以下の手順で、Let's EncryptのSSL証明書を更新し、Nginxコンテナを再起動します。

1. **プロジェクトディレクトリに移動**

   ```bash
   cd multi_language_bbs/
   ```

2. **Nginxコンテナを停止**

   ```bash
   docker-compose stop nginx
   ```

3. **Certbotを使用して証明書を更新**

   ```bash
   sudo certbot renew
   ```

   実行例:

   ```bash
   okumurahyu@os3-386-26421:~/multi_language_bbs$ sudo certbot renew
   Saving debug log to /var/log/letsencrypt/letsencrypt.log

   - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   Processing /etc/letsencrypt/renewal/www.waseda-nishimura.org.conf
   - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   Renewing an existing certificate for www.waseda-nishimura.org

   - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   Congratulations, all renewals succeeded: 
     /etc/letsencrypt/live/www.waseda-nishimura.org/fullchain.pem (success)
   - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   ```

4. **Nginxコンテナを再起動**

   ```bash
   docker-compose start nginx
   ```

   実行例:

   ```bash
   okumurahyu@os3-386-26421:~/multi_language_bbs$ docker-compose start nginx
   [+] Running 1/1
   ✔ Container multi_language_bbs-nginx-1  Started
   ```
