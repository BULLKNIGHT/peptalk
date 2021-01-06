const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
const messages = []
app.get('/history', (req, res) => {
  res.send(messages);
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', ()=>{
    console.log('user disconnected')
  });

  socket.on('Peptalk', (msg) => {
    console.log('msg: ' + msg);
    messages.push(msg);
    io.emit('Peptalk_broadcast', msg);
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});