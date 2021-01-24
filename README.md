# Lets talk

I had combined react app to api by
```javascript 
app.use('/', express.static('client/build'))
```
and some start script you will find in package.json. <br>
To run it for developing you had to change some code.<br>
## This is the ui of my chat app <br>
![](/client/ui.jpg)<br>


## start<br>
`node index.js`<br>
### if you have nodemon<br>
`nodemon index.js`<br>


## for developing
you have to change axios base url at https://github.com/tanay-pingalkar/LetsTalk-chatapp/blob/main/client/src/components/axios.js and endpoint at https://github.com/tanay-pingalkar/LetsTalk-chatapp/blob/main/client/src/components/roomChat.js to localhost:9000<br>
### run client<br>
`cd client`<br>
`npm start`<br>
### run server in another terminal<br>
`nodemon index.js`
thats it<br>

### to run changes in combined mern app<br>
reset all changes we had made <br>
then<br>
`cd client`<br>
`npm run build`<br>
`cd ..`<br>
`nodemon index.js`
