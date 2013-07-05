Faro Web Client
===============

Faro web client can be found in a production like enviornment at http://166.78.165.173:8080.

Local Setup
-----------
Run the following to deploy Faro web client for local development:

Updating Server
---------------
When local code is ready for production enviornment testing, it will need to be pushed to the server.
Do the following to make this happen:

1.) Make sure local code has been committed to git repo::
  
  git push
    
2.) Open up a terminal and log into wm-dev01::
  
  ssh -X <username>@166.78.165.173
    
3.) Navigate to site location and update::
  
  cd /srv/public_html/apps/faroapp
  sudo git pull
  sudo service apache2 reload
  
After following those steps, open up a browser and visit the following url http://166.78.165.173:8080 to 
view the changes.




