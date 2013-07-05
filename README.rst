Faro Web Client
===============

Faro web client can be found in a production like environment at http://166.78.165.173:8080.

Local Setup
-----------
Follow steps below to deploy Faro web client for local development:

1.) Create a project directory that will contain the Faro web client.
  
2.) CD into project and clone github repo::

  git clone https://github.com/Wakemakin/faro-webclient.git
  
3.) Setup virtualenv::

  pip install virtualenv #(do step if not installed)
  virtualenv venv
  . venv/bin/activate
  pip install -r faro-webclient/requirements/local.txt
  
4.) Run client::

  . venv/bin/acitvate #(do step if not activated)
  cd faro-webclient
  python initiate.py
  
5.) Test client by opening url http://localhost:5000 in a browser.

Updating Server
---------------
When local code is ready for production environment testing, it will need to be pushed to the server.
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
view changes.




