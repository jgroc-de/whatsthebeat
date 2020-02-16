#!/usr/bin/env bash

apt-get update && apt-get -y upgrade && apt-get -y autoremove
apt-get install -y apache2 php
if ! [ -L /var/www ]; then
  rm -rf /var/www
  ln -fs /vagrant /var/www
fi

