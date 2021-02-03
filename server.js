const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;



const mongoose = require('mongoose');
const Msg = require('./models/messages');
app.use(express.static('public'))
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/fonts', express.static(__dirname + '/public/fonts'));
app.set('views', './views')
app.set('view engine', 'ejs')

const mongoDB = "mongodb+srv://Prashant:parsuB@8852@cluster0.sa8pj.mongodb.net/<chat_database>?retryWrites=true&w=majority";


mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('connected')
}).catch(err => console.log(err))
io.on('connection', (socket) => {
  Msg.find({memId : 2525}).then(result => {
      socket.emit('output-messages', result)
  })
  console.log('a user connected');
  socket.emit('message', 'Hello world');
  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
  socket.on('chatmessage', msg => {
      const message = new Msg({ 'msg' : msg, memId : 2525 });
      message.save().then(() => {
          io.emit('message', msg)
      })
  })
});







app.get('/', (req, res) => {
  res.render('index')
  //res.sendFile(__dirname + '/views/index.html');
});
app.get('/chat', (req, res) => {
  res.render('index')
});



http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
