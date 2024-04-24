const cluster = require("cluster");

const crypto = require('crypto')


// is file is being executed in cluster mode?
if (cluster.isMaster) {
  // cause index file to be run again child mode
  cluster.fork()
  // cluster.fork()
  // cluster.fork()
  // cluster.fork()
} else {
  // i am a child i am going to act like a server and do nothing else
  const express = require("express");
  const app = express();

  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {
      /* just loop */
    }
  }

  app.get("/", (req, res) => {
    doWork(5000);
    res.send("Hi there.");
  });

  app.get("/fast", (req, res) => {
    res.send("Hi this is fast.");
  });

  app.listen(3000);
}
