Wakemakin (new site)
====================

This repository represents the new wakemakin.com site.

Login Account
=============

Development site is password protected (proof.wakemakin.com ). To add your own account, you will need to
modify the .htpasswd-private file in the virtual host directory (i.e. /var/www/vhost/proof.wakemakin.com/). 
Once found, do the following::
  
  sudo htpasswd .htpasswd-private <your new username>

To delete a user from this (in case they go crazy or you need to change the password)::
  
  sudo htpasswd -D .htpasswd-private <the username>
