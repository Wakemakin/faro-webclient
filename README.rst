Faro Web Client
===============

Faro web client can be found in a production like environment at http://166.78.165.173:8080.

Local Setup
-----------
Follow steps below to deploy Faro web client for local development:

1.) Create a project directory that will contain the Faro web client.
  
  mkdir <directory name>
  cd <directory name>
  git clone https://github.com/Wakemakin/faro-webclient.git
  
2.) Setup virtualenv in project directory::

  pip install virtualenv
  virtualenv venv
  . venv/bin/activate
  pip install -r faro-webclient/requirements/local.txt
  
3.) Install and configure MySQL::

  sudo apt-get install mysql-server mysql-client
  mysql -u root -p
  CREATE DATABASE development;
  USE development;
  CREATE TABLE users (
    uid INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    pwdhash VARCHAR(100) NOT NULL
  );
  CREATE USER 'faro'@'localhost' IDENTIFIED BY 'passwd';
  GRANT ALL PRIVILEGES ON development.* TO 'faro'@'localhost';
  exit
  
4.) Run client::

  . venv/bin/acitvate #(do step if not activated)
  cd faro-webclient
  python initiate.py
  
With the python server running, open up http://localhost:5000 in a browser.  The Faro homepage should be
loaded at this point.  There is one last thing to check to make sure the local project is configured
correctly.  Type http://localhost:5000/testdb in your browser.  If a page comes up displaying  "Database 
is up and running", your local project is all set.  If not, check your settings or ask me for help (Dennis).

Updating Server
---------------
When local code is ready for production environment, it will need to be pushed to the server.
To make this happen, do the following:

1.) Make sure local code has been committed to git repo first::
  
  git push
    
2.) Open up a terminal and log into wm-dev01::
  
  ssh -X <username>@166.78.165.173
    
3.) Navigate to site location and update::
  
  cd /srv/public_html/apps/faroapp
  sudo git pull
  sudo service apache2 reload
  
After following those steps, open up a browser and visit the following url http://166.78.165.173:8080 to 
view changes.




