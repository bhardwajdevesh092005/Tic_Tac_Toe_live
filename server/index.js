const express = require('express');
const app = express();
const PORT = 4000;
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors({
    origin:"http://localhost:3000"
}));

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});
    

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});