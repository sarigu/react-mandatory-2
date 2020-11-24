const express = require("express");
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limiter');


const app = express();
const bcrypt = require("bcrypt");

//var jsonParser = bodyParser.json();

app.use(express.json());

app.use(limiter);

const PORT = 5000;

const db = require("./db");
const collection = "users";


const limiter = rateLimit( 
  {
windowMs : 15 * 60 * 1000,
max: 100,
message : "You have reached your IP limitation of accessing the page",
  }
)

/*app.get('/', (req, res) => {
  db.getDB().collection(collection).find().toArray((error, collection) => {
    console.log(collection);
  });
});*/

app.post('/createAccount', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword
    }


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
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


main().catch(console.error);

    db.getDB().collection(collection).insertOne(newUser, (error, result) => {
      console.log(result.ops[0]);
      if (result.insertedCount === 1) {
        console.log("new user");
      } else {
        throw new Error(error);
      }
    });

  } catch{
    res.status(500).send();
  }
})

app.post('/login', async (req, res) => {
  let user = "";
  try {
    user = await db.getDB().collection(collection).findOne({ email: req.body.email });
    console.log(user);

    if (user == null) {
      //return res.status(400).send("cannot find user")
      console.log("cannot find user");
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      //res.send("sucess")
      console.log("sucess");
    } else {
      //res.send("not allowed")
      console.log("not allowed");
    }

  } catch (err) {
    res.status(500).send()
  }



})

/* app.get('/', (req, res) => {



  db.getDB().collection(collection).find().toArray((error, collection) => {
console.log(collection);
  });

}); */



app.get('/', (req, res) => {
  res.render('Hello');
})



app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
