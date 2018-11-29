#!/usr/bin/env bash
host=39.106.55.176
app=balance

npm run build
ssh root@$host "rm -rf /data/service/$app-admin/*"
scp -r ./dist/* root@$host:/data/service/$app-admin/
echo "success"
