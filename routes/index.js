var express = require('express');
var router = express.Router();
var fs = require('fs'), fileStream;
/*var usernew = require('../models/users');

/* GET home page. 
router.get('/', function(req, res, next) {
  //if(!req.session.userId){
    var data = [];
    res.render('index', {
      title: 'Express',
      data1 : data
     });
  /*}else{
    usernew.findOne({ _id:req.session.userId }).then((data) =>{
        res.render('index', {
          title: 'Express',
          data1 : data
         });
    })
  }*//*
});

*/
var Imap = require('imap');
var  inspect = require('util').inspect;

var imap = new Imap({
  user: 'mohammed.asaed1@gmail.com',
  password: '0191497509',
  host: 'imap.gmail.com',
  port: 993,
  tls: true
});

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.once('ready', function() {
  console.log('error');
  openInbox(function(err, box) {
    console.log('errr');
    if (err) throw err;
    var f = imap.seq.fetch('1:3', {
      bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
      struct: true
    });
    f.on('message', function(msg, seqno) {
      console.log('Message #%d', seqno);
      var prefix = '(#' + seqno + ') ';
      msg.on('body', function(stream, info) {
        var buffer = '';
        stream.on('data', function(chunk) {
          buffer += chunk.toString('utf8');
        });
        stream.once('end', function() {
          console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
        });
      });
      msg.once('attributes', function(attrs) {
        console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
      });
      msg.once('end', function() {
        console.log(prefix + 'Finished');
      });
    });
    f.once('error', function(err) {
      console.log('Fetch error: ' + err);
    });
    f.once('end', function() {
      console.log('Done fetching all messages!');
      imap.end();
    });
  });
});

imap.once('error', function(err) {
  console.log('err');
});

imap.once('end', function() {
  console.log('Connection ended');
});

imap.connect();/*
openInbox(function(err, box) {
  if (err) throw err;
  var f = imap.seq.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
  f.on('message', function(msg, seqno) {
    console.log('Message #%d', seqno);
    var prefix = '(#' + seqno + ') ';
    msg.on('body', function(stream, info) {
      if (info.which === 'TEXT')
        console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
      var buffer = '', count = 0;
      stream.on('data', function(chunk) {
        count += chunk.length;
        buffer += chunk.toString('utf8');
        if (info.which === 'TEXT')
          console.log(prefix + 'Body [%s] (%d/%d)', inspect(info.which), count, info.size);
      });
      stream.once('end', function() {
        if (info.which !== 'TEXT')
          console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
        else
          console.log(prefix + 'Body [%s] Finished', inspect(info.which));
      });
    });
    msg.once('attributes', function(attrs) {
      console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
    });
    msg.once('end', function() {
      console.log(prefix + 'Finished');
    });
  });
  f.once('error', function(err) {
    console.log('Fetch error: ' + err);
  });
  f.once('end', function() {
    console.log('Done fetching all messages!');
    imap.end();
  });
});
// using the functions and variables already defined in the first example ...

/*
openInbox(function(err, box) {
  if (err) throw err;
  imap.search([ 'UNSEEN', ['SINCE', 'May 20, 2010'] ], function(err, results) {
    if (err) throw err;
    var f = imap.fetch(results, { bodies: '' });
    f.on('message', function(msg, seqno) {
      console.log('Message #%d', seqno);
      var prefix = '(#' + seqno + ') ';
      msg.on('body', function(stream, info) {
        console.log(prefix + 'Body');
        stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
      });
      msg.once('attributes', function(attrs) {
        console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
      });
      msg.once('end', function() {
        console.log(prefix + 'Finished');
      });
    });
    f.once('error', function(err) {
      console.log('Fetch error: ' + err);
    });
    f.once('end', function() {
      console.log('Done fetching all messages!');
      imap.end();
    });
  });
});*/
module.exports = router;
