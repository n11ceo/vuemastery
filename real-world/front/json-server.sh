#!/bin/zsh
docker run -p 3000:3000 -v `pwd`:/data williamyeh/json-server --watch db.json
