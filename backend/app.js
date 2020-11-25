const express = require("express");
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const app = express();
const bcrypt = require("bcrypt");
var session = require('express-session');

app.use(express.json());
app.use(session({ secret: "sas546ddasd546asd34asd", resave: false, saveUninitialized: true }))

const PORT = 5000;

const db = require("./db");
const collection = "users";


const limiter = rateLimit(
  {
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "You have reached your IP limitation of accessing the page",
  }
)

app.post('/users', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword
    }

    console.log(newUser);

    db.getDB().collection(collection).insertOne(newUser, (error, result) => {
      if (result.insertedCount === 1) {
        res.status(200).send("user inserted");
      } else {
        throw new Error(error);
      }
    });

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'foster.rodriguez5@ethereal.email',
        pass: 'UwP53awwRZdjtFmR5C'
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: req.body.email, // list of receivers
      subject: "Successfully created user", // Subject line
      text: "Successfully created user", // plain text body

    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    main().catch(console.error);

  } catch{
    res.status(500).send();
  }
})

app.post('/login', async (req, res) => {
  try {
    const user = await db.getDB().collection(collection).findOne({ email: req.body.email });
    if (user == null) {
      return res.status(400).send("cannot find user");
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      req.session.user = user;
      req.session.email = user.email;
      res.status(200).send("sucess");
      console.log("sucess");
    } else {
      res.status(401).send("not allowed");
    }

  } catch (err) {
    res.status(500).send()
  }
})

app.get('/getSession', (req, res) => {
  console.log(req.session.user)
  if (!req.session.user) {
    return res.status(401).send();
  }
  return res.status(200).send('Welcome to session with key');
})

app.get('/logout', (req, res) => {
  console.log('logout clicked');
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
  });
  return res.status(200).send('Session destroyed');
})

app.use(limiter);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
