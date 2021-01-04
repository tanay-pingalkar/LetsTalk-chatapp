# Lets talk

I had combined react app to api bye ``app.use('/', express.static('client/build'))``
and some start script
```"scripts": {
    "start": "nodemon index.js",
    "build":"cd client && npm run build",
    "install-client": "cd client && npm install",
    "heroku-postbuild":"npm run install-client && npm run build",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
