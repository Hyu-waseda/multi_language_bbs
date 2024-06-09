# multi_language_bbs


## SSL証明書の更新手順

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
