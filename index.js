process.env.UV_THREADPOOL_SIZE=1

const cluster = require("cluster");



// is file is being executed in cluster mode?
if (cluster.isMaster) {
  // cause index file to be run again child mode
  cluster.fork()
  cluster.fork()
} else {
  const crypto = require('crypto')

  // i am a child i am going to act like a server and do nothing else
  const express = require("express");
  const app = express();


  app.get("/", (req, res) => {
    crypto.pbkdf2('a','b',100000,512,'sha512',()=>{
      res.send("Hi there.");
    })
  });

  app.get("/fast", (req, res) => {
    res.send("Hi this is fast.");
  });

  app.listen(3000);
}



// ab -c 50 -n 500 localhost:3000/fast
// for checking the bench  marking of our /fast route -c 50 means 50 req must be present at a moment and -n 500 represents 500 request to be send