# Feature Request Wep App
>Web application that allows the user to view, create, update and delete feature requests, client and product area.  
A "feature request" is a request for a new feature that will be added onto an existing piece of software. 

### Check the Web App:
[Live Demo](http://ec2-18-191-67-216.us-east-2.compute.amazonaws.com/).
## How The Web App Work
>After running the web app by press this [Live Demo](http://ec2-18-191-67-216.us-east-2.compute.amazonaws.com/) or running it locally [Running Locally](#running-locally)
#### Rebuild Database
- By pressing button "Rebuild Database" on the top right, the seed data will add (3 Clients, 4 Product Areas) and you can press this button any time you need to reset database
#### Adding New Feature Requsted
- By adding new feature if priority exist in a feature to same client, all series features priority will change and reorderd
#### Updating Feature
- When change priority for a feature, if new priority exist in a feature to same client, all series features priority will change and reorderd
- When change client for a feature, if priority for new client exist in a feature to same new client, all series features priority will change and reorderd
#### Deleting Feature, Client and Product Area
- You can delete any feature, client and product area, but can't delete client and product area if there is a feature assigned to them
## Tech Stack:
- **OS**: Ubuntu 18.04.
- **Server Side Scripting**: Python  3.6.
- **Server Framework**: Flask.
- **ORM**: Sql-Alchemy.
- **JavaScript**: KnockoutJS &  Jquery.

## Deployment
>The Web App deployed on AWS EC2 instance using Gunicorn & Nginx.
### Follow steps below for Deployment.

#### 1- Create EC2 Instance (Linux)
>Follow the steps in this link [Create EC2](https://medium.com/@GalarnykMichael/aws-ec2-part-1-creating-ec2-instance-9d7f8368f78a) to create Ubuntu EC2 Instance.
#### 2- Connect to Linux Instance
>Follow the steps in this link [Connect to Linux](https://medium.com/@GalarnykMichael/aws-ec2-part-2-ssh-into-ec2-instance-c7879d47b6b2) to Connect to Linux Instance using SSH.
#### 3- Install PIP
```
sudo apt update
sudo apt install python3-pip
```
#### 4- Install Nginx and Gunicorn3
```
sudo apt install nginx
sudo apt install gunicorn3
```
#### 5- Setup Nginx
- Create file for Nginx configration:
```
cd /etc/nginix/site-enabled/
sudo vim nginx-config
```
- Press "I" in Keyboard.
- Type this:
```
server {
    listen 80;
    server_name <your instance's puplic ip> #example: server_name 18.191.67.216;
    
    location {
        proxy_pass http://127.0.0.1:8000;
    }
}
```
- Press "Esc" and type this:
```
:wq
```
#### 6- Start Nginx Service
```
sudo service nginx restart
```
#### 7- Clone The Project
```
cd
sudo git clone https://github.com/Atheer83/Implementation
```
#### 8- Install Dependecies
```
cd Implementation
pip3 install -r requirements.txt
```
#### 9- Prevent "psycopg2" issue
```
sudo apt install libpq-dev
pip3 install psycopg2
```
#### 10- Setup Database
- Install PostgreSQL:
```
sudo apt-get install postgresql postgresql-contrib 
```
- Switching Over to the postgres Account:
```
sudo -i -u postgres
```
- Create Database:
```
createdb requests
```
- Access DataBase:
```
psql -d requests
```
- Create the user and grant access to database:
```
CREATE ROLE britecore WITH LOGIN PASSWORD 'britecore';
GRANT ALL PRIVILEGES ON DATABASE requests TO britecore;
ALTER USER britecore CREATEDB;
\q
logout
```
#### 11- Run The Web App
```
gunicorn3 run:app
```
## Running Locally
#### 1- Install Python 
```
sudo apt update
sudo apt install python3
```
#### 2- Install PIP
```
sudo apt install python3-pip
```
#### 3- Clone The Project
```
sudo git clone https://github.com/Atheer83/Implementation
```
#### 4- Install Virtual Environments
```
cd Implementation
sudo apt install python3-venv
```
#### 5- Create an Environment
```
python3 -m venv feature_request_venv
```
#### 6- Activate The Environment
```
. feature_request_venv/bin/activate
```
#### 7- Install Dependecies
```
pip3 install -r requirements.txt
```
#### 8- Repeat Steps
- Repeat steps 9 & 10 from [Deployment](#Deployment)
#### 9- Run The Wep App
```
python3 run.py
```
now the wep app is running on http://localhost:5000


## Running Tests
#### 1- Do same steps from [Running Locally](#running-locally) except step 9
#### 2- Run The Test
```
python3 test_app.py
```
