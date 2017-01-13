ls
node -version
sudo su
apt-get update
apt-get install nodejs
node --version
npm install nodejs-legacy
apt-get install nodejs-legacy
node --version
apt-get install npm
ls
mkdir GlobishSpace2
ls
chmod 777 GlobishSpace2/
cd GlobishSpace2/
ls
npm init
ls
npm install
ls
nano server.js
ls
node server.js 
npm install express --save
ls
nano package.json 
node server.js 
npm install body-parser --save
node server.js 
nano CONFIG.json
node server.js 
mkdir cert
cd cert
nano server.key
nano server.crt
cd ../
node server.js 
npm install socket.io --save
node server.js 
npm install mongodb --save
node server.js 
nano CONFIG.json 
node server.js 
npm install forever -g
forever start server.js 
git init
apt-get install git
git init
git remote add origin https://github.com/GlobishAcademia/globish2.space.git
git add .
git commit -m "jan-11-application initialized"
rm .git/
rm -rf .git/
nano .gitignore
git init
git remote add origin https://github.com/GlobishAcademia/globish2.space.git
git add .
git commit -m "jan-11-app initializing"
git push origin master
cd ../
ls
cd tmp/
ls
openssl genrsa -des3 -out server.key 2048
openssl rsa -in server.key -out server.key.insecure
mv server.key server.key.secure
mv server.key.insecure server.key
openssl req -new -key server.key -out server.csr
ls
cd ../
ls
cd GlobishSpace2/
ls
nano CONFIG.json 
sudo su
cd GlobishSpace2/
ls
forever stop server.js 
forever start server.js 
cd GlobishSpace2/
forever restart server.js 
sudo su
cd GlobishSpace2/
ls
npm install opentok --save
forever stop server.js 
node server.js 
git add .
git commit -m "jan12-opentok serssion creation"
git push origin master
sudo su
ls
mkdir GlobishSpace2-beta
chmod 777 GlobishSpace2-beta/
cd GlobishSpace2
$ npm install express-mvc-generator -g 
$ \\npm install express-mvc-generator -g 
npm install express-mvc-generator -g 
express sample
ls
cd sample/
ls
cd app
ls
cd ../
ls
cd ../
ls
rm -rf sample/
ls
cd ../
ls
cd GlobishSpace2
ls
cd ../
cd GlobishSpace2-beta/
ls
express myapp
ls
cd myapp/
ls
cd public/
ls
cd ../
ls
express myapp
ls
cd myapp/
ls
cd app/
ls
cd controllers/
ls
nano home.js 
cd ../
ls
node app.js 
npm install
cd ../
rm -rf myapp/
ls
cd ../
rm -rf GlobishSpace2-beta/
ls
mv GlobishSpace2/ GlobishSpace2-base
ls
express GlobishSpace2
ls
cd GlobishSpace2
ls
npm install
ls
node app.js 
mongod
cd ../
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
service mongod status
cd GlobishSpace2
ls
node app.js 
service mongod start
service mongod restart
node app.js 
mongodb
mongo
node app.js 
netstat -nlp |grep 27017
node app.js 
forever stop server.js
node app.js 
npm install fs --save
node app.js 
npm install socket.io --save
node app.js 
