#!/bin/sh
####################################
# Reiniciar o serviço do infogreve
####################################

killall node

cd /var/nodejswww/crsr/public/

PORT=8080 nohup forever start -a -l forever.log -o out.log -e err.log --spinSleepTime 30000 server.js &
