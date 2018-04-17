#!/bin/sh

# bss
docker build -t kanche-taurus:$1 .
docker tag -f kanche-taurus:$1 docker.kanche.com/kanche-taurus:$1
docker push docker.kanche.com/kanche-taurus:$1
