const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'))
const socket = require('socket.io');

const app = express();

const port = process.env.PORT || 3000;
const server = http.Server(app);
const io = socket(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// allow-cors
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, 'dist')));

//app.use('/api', api);



const loadFile = (file) => {
  return fs.readFileAsync(file,'utf-8')
  .then((data) => {
    const lastIndex = data.lastIndexOf("\n");
    const firstIndex = data.indexOf("\n");
    const newDataStr = data.substring(firstIndex + 1, lastIndex - 1);

    const newData = JSON.parse(newDataStr.replace(/\'/g, '\"'));
    return newData;
  });
}

io.on('connection', (socket) => {
  console.log(__dirname);
  console.log("Connected to Socket!!"+ socket.id);
  socket.on("openFile", (data) => {
    return loadFile('./dist/' + data.file)
    .then((fileData) => {
      console.log('fileData: ', fileData);
      socket.emit('jsonData', fileData);
    });
  });
});

server.listen(port,() => {
  console.log(`App Server Listening at ${port}`);
});
