#!/bin/bash
curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -
sudo yum -y install nodejs
sudo yum install gcc-c++ make
cd /var/www/phplaravel
npm install
npm run production