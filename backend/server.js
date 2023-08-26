const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const userModel = require("./schemae/UserSchema.js");
const consoleModel = require("./schemae/consoleSchema.js");
const brandModel = require("./schemae/brandsSchema.js");
const blogModel = require("./schemae/blogSchema.js");
const commentModel = require("./schemae/commentsSchema.js");
const tokenModel = require("./schemae/tokenSchema.js");
const museumModel = require("./schemae/museumSchema.js");
const ImportantDatesModel = require("./schemae/importantDatesSchema.js");
const subcatsModel = require("./schemae/subcategorySchema.js");
const merchModel = require("./schemae/merchSchema");
const documentsModel = require("./schemae/documentsSchema.js");
const aboutModel = require("./schemae/aboutSchema.js");
const orderModel = require("./schemae/ordersSchema.js");
const MerchCatModel = require("./schemae/MerchCatSchema.js");
const RequestsModel = require("./schemae/userrequestsSchema.js");
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const fs = require("fs");
const { OAuth2Client } = require("google-auth-library");
var path = require("path");
var http = require("http");
var ObjectID = require("bson").ObjectID;
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
const sharp = require("sharp");
const expressStaticGzip = require("express-static-gzip");
const axios = require("axios");
const querystring = require("querystring");
const cron = require("node-cron");
const crypto = require("crypto");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

const bitsAward = {
  "Correcting a mistake": 1,
  "Referring a friend to patreon": 50,
  "Wearing cnh merch": 50,
  "Shared something brand new": 500,
  "Brand new information from another source": 25,
  "New article gets picked up by another website": 25,
};

function verifyWebhook(hmacSignature, payload) {
  const secret =
    "U4icxkJRVVSbTRTbeRGKdyiH1kD0qGm3kVxPauzdczcm5en4T2g8rpSQ8jdRxla5"; // Replace with your actual webhook secret

  const generatedHmac = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return hmacSignature === generatedHmac;
}

// Use the client id and secret you received when setting up your OAuth account
var CLIENT_ID =
  "AnpYLOzCTVhtpp8WzRe-8Y5Gk0l-FlSd2BPtUzMc_9oJMb2YP9Hz-WQYQOg14EXB";
var CLIENT_SECRET =
  "PGlIgsHfh14TnWG3XinCudku-oa6rI-rAMkqyCk00tvuMGOgtjPLKDp3sBvBsCxp";
// var patreonOAuthClient = patreonOAuth(CLIENT_ID, CLIENT_SECRET);

var transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      type: "OAuth2",
      user: "computernostalgiaheaven@gmail.com",
      pass: "xuhcgcsuxlgeyppm",
    },
  })
);

const app = express();
const port = process.env.PORT || 1337;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/ConsoleDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

function GetExtension(file) {
  var ext = file.split(".").pop();
  if (ext === "jpg") {
    return "jpeg";
  }

  return ext;
}

function base64_encode(file) {
  var bitmap = fs.readFileSync(file);
  var b64String =
    "data:image/" +
    GetExtension(file) +
    ";base64," +
    new Buffer.from(bitmap).toString("base64");

  return b64String;
}

const adminId = new ObjectID();

const admin = {
  _id: adminId,
  email: "sabidi.bee15seecs@seecs.edu.pk",
  username: "admin1nostalgia",
  password: bcrypt.hashSync("S@ms3p10l", 10),
  authenticationtype: "Admin",
  country: "United Kingdom",
  twoFactorSecret: "",
  otpauth_url:
    "4AAQSkZJRgABAQEBLAEsAAD/4QByRXhpZgAASUkqAAgAAAABAA4BAgBQAAAAGgAAAAAAAABEZWZhdWx0IEF2YXRhciBQcm9maWxlIEljb24gVmVjdG9yLiBTb2NpYWwgTWVkaWEgVXNlciBJbWFnZS4gVmVjdG9yIElsbHVzdHJhdGlvbv/hBXdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw",
  image:
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QByRXhpZgAASUkqAAgAAAABAA4BAgBQAAAAGgAAAAAAAABEZWZhdWx0IEF2YXRhciBQcm9maWxlIEljb24gVmVjdG9yLiBTb2NpYWwgTWVkaWEgVXNlciBJbWFnZS4gVmVjdG9yIElsbHVzdHJhdGlvbv/hBXdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPgoJPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIgICB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiAgeG1sbnM6aXB0Y0V4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgcGhvdG9zaG9wOkNyZWRpdD0iR2V0dHkgSW1hZ2VzL2lTdG9ja3Bob3RvIiBHZXR0eUltYWdlc0dJRlQ6QXNzZXRJRD0iMTMzNzE0NDE0NiIgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cHM6Ly93d3cuaXN0b2NrcGhvdG8uY29tL2xlZ2FsL2xpY2Vuc2UtYWdyZWVtZW50P3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsIiA+CjxkYzpjcmVhdG9yPjxyZGY6U2VxPjxyZGY6bGk+TWFyaWEgU2hhcGlsb3ZhPC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5EZWZhdWx0IEF2YXRhciBQcm9maWxlIEljb24gVmVjdG9yLiBTb2NpYWwgTWVkaWEgVXNlciBJbWFnZS4gVmVjdG9yIElsbHVzdHJhdGlvbjwvcmRmOmxpPjwvcmRmOkFsdD48L2RjOmRlc2NyaXB0aW9uPgo8cGx1czpMaWNlbnNvcj48cmRmOlNlcT48cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz48cGx1czpMaWNlbnNvclVSTD5odHRwczovL3d3dy5pc3RvY2twaG90by5jb20vcGhvdG8vbGljZW5zZS1nbTEzMzcxNDQxNDYtP3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsPC9wbHVzOkxpY2Vuc29yVVJMPjwvcmRmOmxpPjwvcmRmOlNlcT48L3BsdXM6TGljZW5zb3I+CgkJPC9yZGY6RGVzY3JpcHRpb24+Cgk8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJ3Ij8+Cv/tAKJQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAhhwCUAAPTWFyaWEgU2hhcGlsb3ZhHAJ4AFBEZWZhdWx0IEF2YXRhciBQcm9maWxlIEljb24gVmVjdG9yLiBTb2NpYWwgTWVkaWEgVXNlciBJbWFnZS4gVmVjdG9yIElsbHVzdHJhdGlvbhwCbgAYR2V0dHkgSW1hZ2VzL2lTdG9ja3Bob3Rv/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/8IACwgCZAJkAQERAP/EABoAAQACAwEAAAAAAAAA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",

  thumbnail:
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QByRXhpZgAASUkqAAgAAAABAA4BAgBQAAAAGgAAAAAAAABEZWZhdWx0IEF2YXRhciBQcm9maWxlIEljb24gVmVjdG9yLiBTb2NpYWwgTWVkaWEgVXNlciBJbWFnZS4gVmVjdG9yIElsbHVzdHJhdGlvbv/hBXdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPgoJPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIgICB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiAgeG1sbnM6aXB0Y0V4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgcGhvdG9zaG9wOkNyZWRpdD0iR2V0dHkgSW1hZ2VzL2lTdG9ja3Bob3RvIiBHZXR0eUltYWdlc0dJRlQ6QXNzZXRJRD0iMTMzNzE0NDE0NiIgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cHM6Ly93d3cuaXN0b2NrcGhvdG8uY29tL2xlZ2FsL2xpY2Vuc2UtYWdyZWVtZW50P3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsIiA+CjxkYzpjcmVhdG9yPjxyZGY6U2VxPjxyZGY6bGk+TWFyaWEgU2hhcGlsb3ZhPC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5EZWZhdWx0IEF2YXRhciBQcm9maWxlIEljb24gVmVjdG9yLiBTb2NpYWwgTWVkaWEgVXNlciBJbWFnZS4gVmVjdG9yIElsbHVzdHJhdGlvbjwvcmRmOmxpPjwvcmRmOkFsdD48L2RjOmRlc2NyaXB0aW9uPgo8cGx1czpMaWNlbnNvcj48cmRmOlNlcT48cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz48cGx1czpMaWNlbnNvclVSTD5odHRwczovL3d3dy5pc3RvY2twaG90by5jb20vcGhvdG8vbGljZW5zZS1nbTEzMzcxNDQxNDYtP3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsPC9wbHVzOkxpY2Vuc29yVVJMPjwvcmRmOmxpPjwvcmRmOlNlcT48L3BsdXM6TGljZW5zb3I+CgkJPC9yZGY6RGVzY3JpcHRpb24+Cgk8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJ3Ij8+Cv/tAKJQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAhhwCUAAPTWFyaWEgU2hhcGlsb3ZhHAJ4AFBEZWZhdWx0IEF2YXRhciBQcm9maWxlIEljb24gVmVjdG9yLiBTb2NpYWwgTWVkaWEgVXNlciBJbWFnZS4gVmVjdG9yIElsbHVzdHJhdGlvbhwCbgAYR2V0dHkgSW1hZ2VzL2lTdG9ja3Bob3Rv/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/8IACwgCZAJkAQERAP/EABoAAQACAwEAAAAAAAAA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",
};

var Admin = new userModel(admin);
userModel.find(
  { username: "admin1nostalgia", authenticationtype: "Admin" },
  (err, result) => {
    if (err) console.log(err);
    else if (result.length === 0)
      Admin.save((err, result) => {
        if (err) {
          console.log("User already exists");
        }
      });
  }
);

app.get("/api/uploads", (req, res) => {
  RequestsModel.find({ BitsStatus: "Pending" }, function (err, result) {
    if (err) {
      res.status(400).send("Error while retrieving user uploads from database");
      throw err;
    } else {
      var isEnd = result.length < req.query.start + 12 ? true : false;
      var sliced = result.slice(req.query.start, req.query.start + 12);
      res.status(200).json({ uploads: sliced, isEnd: isEnd });
    }
  });
});

app.post("/api/addrequest", async (req, res) => {
  try {
    if (
      req.body.images &&
      req.body.description &&
      req.body.user &&
      req.body.type &&
      req.body.username
    ) {
      const rqst = {
        ...req.body,
        Bits: bitsAward[req.body.type],
        BitsString: `Application for ${bitsAward[req.body.type]} Bits for ${
          req.body.type
        }`,
        BitsDate: new Date(),
        BitsStatus: "Pending",
      };

      const request = new RequestsModel(rqst);
      await request.save();

      const user = await userModel.findById(req.body.user);
      if (!user) {
        console.log("Error finding user! Invalid User");
        return res
          .status(400)
          .json({ error: "Error finding user! Invalid User" });
      }

      user.bitshistory.push(request._id);
      await user.save();
      return res.status(200).json({ message: "OK" });
    } else {
      return res.status(400).json({ error: "Bad Request" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.post("/api/addrequest", (req, res) => {
//   if (
//     req.body.images &&
//     req.body.description &&
//     req.body.user &&
//     req.body.type &&
//     req.body.username
//   ) {
//     var rqst = req.body;
//     rqst.Bits = bitsAward[req.body.type];
//     rqst.BitsString =
//       "Application for " +
//       bitsAward[req.body.type] +
//       " Bits for " +
//       req.body.type;
//     rqst.BitsDate = new Date();
//     rqst.BitsStatus = "Pending";
//     var request = new RequestsModel(rqst);
//     request.save();

//     userModel.find({ _id: req.body.user }, (err, user) => {
//       if (err || user.length < 1) {
//         console.log("Error finding user! Invalid User");
//         res.status(400).send("Error finding user! Invalid User");
//       } else {
//         user[0].bitshistory.push(request._id);
//         user[0].save();
//         res.status(200).send("OK");
//       }
//     });
//   } else {
//     res.status(400).send("Bad Request");
//   }
// });

app.get("/api/approveupload", (req, res) => {
  if (req.query.id) {
    RequestsModel.find({ _id: req.query.id }, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send("Error1");
      } else if (data.length > 0) {
        userModel.find({ _id: data[0].user }, (err, user) => {
          if (err) {
            console.log(err);
            res.status(400).send("Error2");
          } else if (user.length > 0) {
            data[0].BitsStatus = "Approved";
            data[0].save();
            user[0].wallet.bits = user[0].wallet.bits + bitsAward[data[0].type];
            user[0].save();
            res.status(200).send("OK");
          } else {
            res.status(400).send("Error3");
          }
        });
      } else {
        res.status(400).send("Error4");
      }
    });
  }
});

app.get("/api/setbits", (req, res) => {
  if (req.query.id) {
    userModel.find({ _id: req.query.id }, (err, data) => {
      if (err || data.length < 1) {
        console.log(err);
        res.status(400).send("Not Found");
      } else {
        data[0].wallet.bits = req.query.bits;
        data[0].save();
        res.status(200).send("ok");
      }
    });
  } else {
    res.status(400).send("Not Found");
  }
});

// Patreon Webhook Endpoint
app.post("/api/patreon/webhook", async (req, res) => {
  try {
    const { event, data } = req.body;
    const patreonId = data.relationships.patron.data.id;

    switch (event) {
      // case "members:create":
      //   await handleMemberCreate(patreonId);
      //   break;
      case "members:pledge:update":
        await handleMemberPledgeUpdate(patreonId, data);
        break;
      case "members:update":
        await handleMemberUpdate(patreonId, data);
        break;
      default:
        console.log("Received unknown webhook event:", event);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error processing Patreon webhook:", error.message);
    res.sendStatus(500);
  }
});

async function handleMemberCreate(patreonId) {
  // Check if the user already exists in the database
  const existingUser = await User.findOne({ patreonId });

  if (!existingUser) {
    // Create a new user in the database
    const newUser = new User({ patreonId });
    await newUser.save();
  }
}

async function handleMemberPledgeUpdate(patreonId, data) {
  // Find the user in the database based on patreonId
  const user = await userModel.findOne({ patreonId });

  if (user) {
    // Update the user's pledge information
    user.isMember = true; // Assuming the presence of pledge indicates membership
    user.pledgeAmount = data.attributes.amount_cents / 100; // Store pledge amount in dollars
    await user.save();

    // Check if the user's subscription has reached six months
    if (isSixMonthsSubscription(user.joinedDate)) {
      user.bits += 100; // Award 200 bits to the user after six months
      await user.save();
    }
  }
}

async function handleMemberUpdate(patreonId, data) {
  // Find the user in the database based on patreonId
  const user = await userModel.findOne({ patreonId });

  if (user) {
    // Check if the subscription was canceled
    const wasActive = user.isActive; // Store previous active status
    user.isActive = data.attributes.patron_status === "active_patron";

    // If the user canceled the subscription, update the joined date
    if (wasActive && !user.isActive) {
      user.joinedDate = new Date(); // Store the date when the subscription was canceled
      user.isMember = false; // Assuming the absence of pledge indicates non-membership
      user.pledgeAmount = 0; // Reset pledge amount
    }

    // If the user rejoined, reset the joined date
    if (!wasActive && user.isActive) {
      user.joinedDate = null; // Reset the joined date when the subscription is active again
    }

    await user.save();
  }
}

function isSixMonthsSubscription(joinedDate) {
  if (!joinedDate) {
    return false;
  }

  const sixMonths = 6 * 30 * 24 * 60 * 60 * 1000; // Six months in milliseconds
  const currentTime = Date.now();
  const joinedTime = joinedDate.getTime();

  return currentTime - joinedTime >= sixMonths;
}

// Schedule the cron job to run at 12 noon every day
cron.schedule("0 12 * * *", async () => {
  try {
    // Get all users from the database
    const users = await userModel.find();

    // Loop through each user and check if six months have passed since their joined date
    for (const user of users) {
      if (isSixMonthsSubscription(user.joinedDate)) {
        user.bits += 100; // Award 100 bits to the user after six months
        await user.save();
      }
    }
  } catch (error) {
    console.error("Error running cron job:", error.message);
  }
});

app.get("/api/removerequest", (req, res) => {
  const bitsAward = {
    "Correcting a mistake": 1,
    "Referring a friend to patreon": 50,
    "Wearing cnh merch": 50,
    "Shared something brand new": 500,
    "Brand new information from another source": 25,
    "New article gets picked up by another website": 25,
  };
  if (req.query.id) {
    RequestsModel.find({ _id: req.query.id }, (err, data) => {
      if (err || data.length < 1) {
        console.log("Error: Data length < 1");
      } else {
        data[0].BitsStatus = "Rejected";
        data[0].save();
      }
    });
  } else {
    res.status(400).send("Bad Request");
  }
});

app.post("/api/adddocument", (req, res) => {
  if (req.body.id) {
    consoleModel.find({ _id: req.body.id }, (err, data) => {
      if (!err && data.length > 0) {
        documentsModel
          .insertMany(req.body.documents)
          .then((result) => {
            result.map((doc) => {
              data[0].documents.push(doc._id);
            });
            data[0].save();
            res.status(200).json({ status: true, msg: "Success" });
          })
          .catch((err) => console.log(err));
      }
    });
  }
});
//-Earn the most points in a month win an additional - 50 bits
cron.schedule("0 0 1 * *", async () => {
  const users = await userModel.find().sort({ bits: -1 }).limit(1);
  users[0].bits = users[0].bits + 50;
});

//-Remaining a patreon member for 6 months - 100 bits
// cron.schedule("0 2 * * *", () => {
//   // Code to check campaign membership

//   userModel.find({ authenticationtype: "Admin" }, (err, data) => {
//     if (err || data.length < 1) console.log(err);
//     else if (data[0].patreon_access_token) {
//       var access_token = data[0].patreon_access_token;
//       axios
//         .get(
//           "https://www.patreon.com//api/oauth2/v2/campaigns/{campaign_id}/members",
//           {
//             headers: {
//               Authorization: `Bearer ${access_token}`,
//             },
//           }
//         )
//         .then((response) => {
//           // Code to check campaign membership
//           const sixMonthsAgo = moment().subtract(6, "months");
//           response.data.data.forEach((member) => {
//             if (moment(member.attributes.created_at).isBefore(sixMonthsAgo)) {
//               // Member has been a part of the campaign for 6 months
//               userModel.find({ patreon_id: member.id }, (err, data) => {
//                 if (err || data.length < 1) {
//                   console.log(err);
//                   res.status(400).send(err);
//                 } else {
//                   data[0].bits = data[0].bits + 100;
//                 }
//               });
//               console.log(
//                 `Member ${member.id} has been a part of the campaign for 6 months`
//               );
//             }
//           });
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   });
// });

cron.schedule("0 0 * * *", () => {
  userModel
    .find({})
    .then((users) => {
      users.forEach((user) => {
        user.wallet.prevbits = user.wallet.bits;
        user.save();
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

async function checkPatreonPatron(patreonUserId) {
  try {
    // Fetch the pledge information for your campaign
    const response = await axios.get(
      `https://www.patreon.com/api/oauth2/api/campaigns/${PATREON_CAMPAIGN_ID}/pledges?include=patron.null`,
      {
        headers: {
          Authorization: `Bearer ${PATREON_ACCESS_TOKEN}`,
        },
      }
    );

    const pledges = response.data.data;
    const included = response.data.included;

    // Find the pledge associated with the Patreon user ID
    const pledge = pledges.find(
      (pledge) => pledge.relationships.patron.data.id === patreonUserId
    );

    if (pledge) {
      // The user is a patron of your campaign
      console.log("User is a patron");
      console.log(`Pledge details:`, pledge);
    } else {
      // The user is not a patron of your campaign
      console.log("User is not a patron");
    }
  } catch (error) {
    console.error("Error checking Patreon patron:", error);
  }
}

app.post("/api/patreonlogin", (req, res) => {
  var url = "https://www.patreon.com/api/oauth2/token";

  var UserData = {};

  var data = {
    grant_type: "authorization_code",
    code: req.body.code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: "http://localhost:3000/patreon",
  };

  var config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "thecnh.co.uk",
    },
  };

  axios
    .post(url, querystring.stringify(data), config)
    .then((response) => {
      // handle response
      UserData = response.data;
      access_token = response.data.access_token;
      url = "https://www.patreon.com/api/oauth2/v2/identity";
      config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "User-Agent": "thecnh.co.uk",
        },
        params: {
          include: "memberships",
          fields: {
            user: "id,full_name,vanity,is_email_verified,email",
          },
        },
      };

      axios
        .get(url, config)
        .then((response) => {
          userModel.find({ _id: req.body.userid }, (err, data) => {
            if (err || data.length < 1) {
              console.log("User not found");
              res.status(200).send(err);
            } else {
              data[0].patreon_id = response.data.data.id;
              data[0].patreon_full_name =
                response.data.data.attributes.full_name || "";
              data[0].patreon_email = response.data.data.attributes.email || "";
              data[0].patreon_access_token = access_token;
              data[0].save();
              res.status(200).send(response.data);
            }
          });
        })
        .catch((error) => {
          console.error(error.response.data);
        });
    })
    .catch((error) => {
      // handle error
      console.log(error.response.data);
    });
});

app.get("/api/twofa", (req, res) => {
  if (req.query.id && req.query.value) {
    userModel.find({ _id: req.query.id }, (err, data) => {
      if (err) {
        res.status(500).send("error");
      } else if (data.length > 0) {
        data[0].twoFactorEnabled = req.query.value;
        data[0].save();
      } else {
        res.status(500).send("error");
      }
    });
  } else {
    res.status(500).send("error");
  }
});

app.post("/api/patreon", (req, res) => {
  var code = req.query.code;
  var state = req.query.state;
  res.status(200).send("Ok");
});

app.post("/api/resetPassword", (req, res) => {
  if (req.body.id && req.body.password) {
    userModel.find({ _id: req.body.id }, (err, data) => {
      if (err || data.length < 1) {
        console.log(err);
        res.status(400).send(err);
      } else {
        bcrypt.hash(req.body.password, 10, function (error, hash) {
          if (error) {
            console.log(error);
            res.status(400).send(error);
          } else {
            data[0].password = hash;
            data[0].save();
            res.status(200).send("Password has been updated Succesfully!");
          }
        });
      }
    });
  } else {
    res.status(400).send("Bad Request");
  }
});

app.get("/api/resetPasswordRequest", (req, res) => {
  if (req.query.email && req.query.username) {
    userModel.find({ username: req.query.username }, (err, data) => {
      if (err || data.length < 1) {
        res.status(400).json({ msg: "Bad Request" });
      } else if (data.length > 0) {
        if (data[0].email !== req.query.email) {
          res.status(202).send("Wrong Email for the username!!!");
        } else if (data[0].email === req.query.email) {
          var mailOptions = {
            from: "computernostalgiaheaven@gmail.com",
            to: data[0].email,
            subject: "Password Reset",
            text:
              "Click the below link to reset your password\nhttps://thecnh.co.uk/resetPassword/?_id=" +
              data[0]._id,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              res.status(400).json({ msg: "Error Sending Email." });
            } else {
              console.log("Email sent: " + info.response);
              res.status(200).json({
                msg: "Email Sent. Please use the link to reset Password.",
              });
            }
          });
        }
      }
    });
  } else {
    res.status(400).json({ msg: "Bad Request" });
  }
});

app.get("/api/removecommonfault", (req, res) => {
  consoleModel.find({ _id: req.query.id }, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.status(400).send(err);
    } else {
      data[0].commonfaults.filter((comfaul) => {
        return comfaul._id !== req.query.cf;
      });
      data[0].save();
      documentsModel.find({ _id: req.query.cf }).deleteOne();
    }
  });
});

app.post("/api/changedisplay", (req, res) => {
  if (req.body.id) {
    userModel.find({ _id: req.body.id }, (err, data) => {
      if (err || data.length < 1) {
        res.status(400).send("Error finding User");
      } else {
        data[0].image = req.body.image;
        data[0].thumbnail = req.body.image;
        data[0].save();
        res.status(200).send("Success");
      }
    });
  } else {
    res.status(400).send("Bad Request");
  }
});

app.get("/api/removedocument", (req, res) => {
  consoleModel.find({ _id: req.query.id }, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.status(400).send(err);
    } else {
      data[0].documents.filter((docu) => {
        return docu._id !== req.query.doc;
      });
      data[0].save();
      documentsModel.find({ _id: req.query.doc }).deleteOne();
    }
  });
});

app.post("/api/addfaults", (req, res) => {
  if (req.body.id) {
    consoleModel.find({ _id: req.body.id }, (err, data) => {
      if (!err && data.length > 0) {
        documentsModel
          .insertMany(req.body.faults)
          .then((result) => {
            result.map((doc) => {
              data[0].commonfaults.push(doc._id);
            });
            data[0].save();
            res.status(200).json({ status: true, msg: "Success" });
          })
          .catch((err) => console.log(err));
      }
    });
  }
});

app.post("/api/about", (req, res) => {
  if (req.body.about || req.body.aboutimage) {
    aboutModel.find({}, (err, data) => {
      if (data.length > 0) {
        data[0].about = req.body.about;
        data[0].aboutimage = req.body.aboutimage;
        data[0].save();
      } else {
        var newAbout = new aboutModel({
          about: req.body.about,
          aboutimage: req.body.aboutimage,
        });
        newAbout.save();
      }
      res.status(200).send();
    });
  } else if (req.body.giveaways || req.body.giveawayimage) {
    aboutModel.find({}, (err, data) => {
      if (data.length > 0) {
        data[0].giveaways = req.body.giveaways;
        data[0].giveawayimage = req.body.giveawayimage;
        data[0].save();
      } else {
        var newAbout = new aboutModel({
          giveaways: req.body.giveaways,
          giveawayimage: req.body.giveawayimage,
        });
        newAbout.save();
      }
      res.status(200).send();
    });
  } else res.status(201).send("");
});

app.get("/api/getabout", (req, res) => {
  aboutModel.find({}, (err, data) => {
    if (err || data.length < 1)
      res
        .status(200)
        .json({ about: "", aboutimage: "", giveaways: "", giveawayimage: "" });
    else if (data.length > 0) res.status(200).send(data[0]);
  });
});

app.get("/api/getdocuments", (req, res) => {
  if (req.query.ids && req.query.ids.length > 0) {
    documentsModel.find(
      {
        _id: {
          $in: req.query.ids,
        },
        isdocument: true,
      },
      (err, data) => {
        if (!err) {
          res.status(200).send(data);
        }
      }
    );
  } else
    res.status(201).json({ status: false, msg: "Id not found in request" });
});

app.get("/api/getfaults", (req, res) => {
  if (req.query.ids && req.query.ids.length > 0) {
    documentsModel.find(
      {
        _id: {
          $in: req.query.ids,
        },
        isdocument: false,
      },
      (err, data) => {
        if (!err) {
          res.status(200).send(data);
        }
      }
    );
  } else
    res.status(201).json({ status: false, msg: "Id not found in request" });
});

app.post("/api/addmuseum", (req, res) => {
  var newmuseum = new museumModel(req.body);
  newmuseum.save((err, data) => {
    if (err) res.status(201).json({ msg: err });
    else {
      res.status(200).send(data);
    }
  });
});
app.get("/api/removemuseum", (req, res) => {
  if (req.query.id) {
    museumModel
      .find({ _id: req.query.id }, (err, data) => {
        if (err) res.status(201).json({ msg: err });
      })
      .deleteOne();
    res.status(200).send();
  } else res.status(201).json({ msg: "Error in request" });
});

app.get("/api/museums", (req, res) => {
  museumModel.find({ ismuseum: true }, (err, data) => {
    if (err) res.status(200).json({ msg: err });
    else res.status(200).send(data);
  });
});

app.get("/api/kiosks", (req, res) => {
  museumModel.find({ ismuseum: false }, (err, data) => {
    if (err) res.status(200).json({ msg: err });
    else res.status(200).send(data);
  });
});

app.get("/api/allmuseum", (req, res) => {
  museumModel.find({}, (err, data) => {
    if (err) res.status(400).send(err);
    else {
      var isEnd = data.length < req.query.start + 12 ? true : false;
      var sliced = data.slice(req.query.start, req.query.start + 12);
      res.status(200).json({ museums: sliced, isEnd: isEnd });
    }
  });
});

app.get("/api/getsubcats", (req, res) => {
  if (req.query.id) {
    brandModel.find({ _id: req.query.id }, (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.status(201).send([]);
      } else {
        subcatsModel.find(
          {
            _id: {
              $in: data[0].subcats,
            },
          },
          (err, data) => {
            if (err) {
              console.log(err);
              res.status(201).send([]);
            } else {
              res.status(200).send(data);
            }
          }
        );
      }
    });
  }
});

app.post("/api/addsubcat", (req, res) => {
  if (req.body.brand) {
    brandModel.find({ _id: req.body.brand }, (err, data) => {
      if (err || data.length < 1) {
        console.log(err);
        res.status(201).json({ status: false, msg: err });
      } else if (data.length > 0) {
        var newsubcat = new subcatsModel(req.body);
        newsubcat.save((err, ret) => {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          } else {
            data[0].subcats.push(newsubcat);
            data[0].variations = data[0].variations + 1;
            data[0].save();
            res.status(200).json({ status: true, data: newsubcat });
          }
        });
      }
    });
  } else {
    res.status(400).json({ status: false, msg: "Brand not found" });
  }
});

app.get("/api/addimportantdate", (req, res) => {
  if ((req.query.text, req.query.date)) {
    var newImportantData = new ImportantDatesModel({
      text: req.query.text,
      date: req.query.date,
      isDate: true,
    });
    newImportantData.save();
    res.status(200).send();
  } else res.status(201).json({ msg: "Error in request" });
});
app.get("/api/removeimportantdate", (req, res) => {
  if (req.query.id) {
    ImportantDatesModel.find({ _id: req.query.id }, (err, data) => {
      if (err) res.status(201).json({ msg: err });
    }).deleteOne();
    res.status(200).send();
  } else res.status(201).json({ msg: "Error in request" });
});
app.get("/api/importantdates", (req, res) => {
  ImportantDatesModel.find({ isDate: true }, (err, data) => {
    if (err) res.status(200).send([]);
    else res.status(200).send(data.slice(0, 5));
  });
});

app.get("/api/addmeetup", (req, res) => {
  if ((req.query.text, req.query.date)) {
    var newmeetup = new ImportantDatesModel({
      text: req.query.text,
      date: req.query.date,
      isDate: false,
    });
    newmeetup.save();
    res.status(200).send();
  } else res.status(201).json({ msg: "Error in request" });
});
app.get("/api/removemeetup", (req, res) => {
  if (req.query.id) {
    ImportantDatesModel.find({ _id: req.query.id }, (err, data) => {
      if (err) res.status(201).json({ msg: err });
    }).deleteOne();
    res.status(200).send();
  } else res.status(201).json({ msg: "Error in request" });
});
app.get("/api/meetups", (req, res) => {
  ImportantDatesModel.find({ isDate: false }, (err, data) => {
    if (err) res.status(200).send([]);
    else res.status(200).send(data.slice(0, 5));
  });
});

app.get("/api/user", (req, res) => {
  if (req.query.id) {
    const users = userModel.find({ _id: req.query.id }, (err, u) => {
      if (err) {
        res.status(400).send("User Not Found");
      } else {
        delete u["password"];
        res.status(200).send(u[0]);
      }
    });
  } else {
    res.status(400).send("User Id not found");
  }
});

app.post("/api/editbits", (req, res) => {
  if (req.body.id) {
    userModel.find({ _id: req.body.id }, (err, data) => {
      if (err) res.status(400).send(err);
      else if (data.length > 0) {
        data[0].wallet.bits = req.body.bits;
        data[0].save();
        res.status(200).send("Success");
      }
    });
  }
});

app.post("/api/isadmin", (req, res) => {
  if (req.body.id && req.body.token) {
    const users = userModel.find({ _id: req.body.id }, (err, u) => {
      if (err) {
        res.status(200).send(false);
      } else if (u.length > 0) {
        if (u[0].authenticationtype === "Admin") {
          // console.log(req.body.token);
          tokenModel.find({ token: req.body.token }, (Err, data) => {
            if (Err) {
              console.log(Err);
              res.status(200).send(false);
            } else if (data.length > 0) {
              if (data[0].authtype === "Admin") {
                res.status(200).send(true);
              } else {
                res.status(200).send(false);
              }
            }
          });
        } else {
          res.status(200).send(false);
        }
      } else {
        res.status(200).send(false);
      }
    });
  } else {
    res.status(200).send(false);
  }
});

app.post("/api/editblog", (req, res) => {
  if (req.body.ogtitle) {
    blogModel.findOneAndUpdate(
      { title: req.body.ogtitle },
      req.body.blog,
      (err, result) => {
        if (err) {
          res.status(200).json({ errMsg: err, status: false });
        } else {
          res.status(200).json({ errMsg: "", status: true });
        }
      }
    );
  }
});

app.post("/api/removeuser", (req, res) => {
  if (req.body.userid) {
    tokenModel.find({ userid: req.body.userid }, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else if (result.length > 0) {
        userModel
          .find({ _id: req.body.id }, (err, u) => {
            if (err) {
              console.log(err);
            }
          })
          .deleteOne((err, result) => {
            if (!err) {
              res.status(200).json({ removed: true });
            }
          });
      }
    });
  }
});

app.post("/api/removeblog", (req, res) => {
  if (req.body.userid) {
    tokenModel.find({ userid: req.body.userid }, (err, result) => {
      if (err) console.log(err);
      else if (result.length > 0 && result[0].authtype === "Admin") {
        blogModel.findOneAndDelete({ _id: req.body.id }, (err, u) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({ removed: true });
          }
        });
      }
    });
  }
});

app.get("/api/addtoMain", (req, res) => {
  if (req.query.userid) {
    tokenModel.find({ userid: req.query.userid }, (err, result) => {
      if (err) console.log(err);
      else if (result.length > 0 && result[0].authtype === "Admin") {
        blogModel.find({ _id: req.query.id }, (err, u) => {
          if (err) {
            console.log(err);
          } else if (u.length > 0) {
            u[0].isMain = true;
            u[0].save();

            blogModel.find({ isMain: true }, (err, result) => {
              if (result.length > 5) {
                for (var i = 5; i < result.length; i++) {
                  result[i].isMain = false;
                  result[i].save();
                }
              }
            });
            res.status(200).send(true);
          }
        });
      }
    });
  } else {
    res.status(400).send("Bad Request");
  }
});

app.get("/api/setSecondary", (req, res) => {
  if (req.query.userid) {
    tokenModel.find({ userid: req.query.userid }, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else if (result.length > 0 && result[0].authtype === "Admin") {
        blogModel.find({ isSecondary: true }, (err, u) => {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          } else if (u.length > 0) {
            u[0].isSecondary = false;
            u[0].save();
          }
          blogModel.find({ _id: req.query.id }, (err, ret) => {
            if (err) {
              res.status(400).send(err);
              console.log(err);
            } else {
              ret[0].isSecondary = true;
              ret[0].save();
              res.status(200).send(true);
            }
          });
        });
      }
    });
  } else {
    res.status(400).send("Bad Request");
  }
});

app.get("/api/showLatest", (req, res) => {
  consoleModel
    .find()
    .sort({ _id: 1 })
    .limit(30)
    .exec(function (err, data) {
      if (err) {
        res.status(400).send(err);
        console.log(err);
      } else if (data.length > 0) {
        var toSend = [];
        data.map((val, index) => {
          var value = { _id: val._id, images: [val.images[0]], name: val.name };
          toSend.push(value);
        });
        res.status(200).send(toSend);
      } else {
        res.status(200).send([]);
      }
    });
});

app.get("/api/allusers", (req, res) => {
  if (req.query.id) {
    tokenModel.find({ userid: req.query.id }, (err, result) => {
      if (err) console.log(err);
      else if (result.length > 0) {
        userModel.find({ authenticationtype: "Standard" }, (err, u) => {
          if (err) {
            res.status(400).send("User Not Found");
          } else {
            var isEnd = u.length < req.query.start + 8 ? true : false;
            var sliced = u.slice(req.query.start, req.query.start + 8);
            sliced.map((item) => delete item["password"]);
            var toSend = [];
            sliced.map((currentUser) => {
              toSend.push({
                username: currentUser.username,
                thumbnail: currentUser.thumbnail,
                email: currentUser.email,
                isPremium: currentUser.isPremium,
                wallet: currentUser.wallet,
              });
            });

            res.status(200).json({ users: sliced, isEnd: isEnd });
          }
        });
      } else res.status(400).send("Error!");
    });
  } else {
    res.status(400).send("User Id not found");
  }
});

app.get("/api/getbrand", (req, res) => {
  if (req.query.name) {
    brandModel.find({ name: req.query.name }, (err, data) => {
      if (err) res.status(201).send("");
      else {
        res.status(200).send(data[0]._id);
      }
    });
  } else res.status(201).send("");
});

// //add a new console
// app.post("/api/addconsole", (req, res) => {
//   if (req.body) {
//     let con = new consoleModel(req.body);
//     subcatsModel.find({ _id: req.body.subcat }, (err, data) => {
//       if (err) console.log(err);
//       if (data.length > 0) {
//         data[0].consoles.push(con._id);

//         data[0].save((err, data) => {
//           if (err) {
//             res.status(400).json({
//               errorMessage: err,
//               status: false,
//             });
//           } else {
//             userModel.find({ _id: req.body.addedby }, (err, data) => {
//               if (err) {
//                 res.status(400).json({
//                   errorMessage: err,
//                   status: false,
//                 });
//               } else if (data.length > 0) {
//                 if (data[0].authenticationtype === "Admin") {
//                   con.approved = true;
//                 } else {
//                   //-Adding a new console to the base - 5 bits
//                   data[0].myconsoles.push(con._id);
//                   if (
//                     !data[0].isPremium
//                       ? data[0].wallet.bits + 5 - data[0].wallet.prevbits <= 25
//                       : data[0].wallet.bits + 5 - data[0].wallet.prevbits <= 50
//                   ) {
//                     data[0].wallet.bits = data[0].wallet.bits + 5;
//                   }
//                 }

//                 data[0].save();

//                 con.save((err, data) => {
//                   if (err) {
//                     res.status(400).json({
//                       errorMessage: err,
//                       status: "couldnt add console to user",
//                     });
//                     console.log(err);
//                   } else {
//                     res.status(200).json({
//                       status: true,
//                       msg: "console added successfully.",
//                     });
//                   }
//                 });
//               }
//             });
//           }
//         });
//       } else {
//         res.status(400).json({
//           errorMessage: "Brand not found please add brand first",
//           status: false,
//         });
//       }
//     });
//   } else {
//     res.status(400).send("Error in Request");
//   }
// });

app.post("/api/addconsole", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send("Error in Request");
    }

    const con = new consoleModel(req.body);
    const subcatData = await subcatsModel
      .findOne({ _id: req.body.subcat })
      .exec();

    if (!subcatData) {
      return res.status(400).json({
        errorMessage: "Brand not found, please add the brand first",
        status: false,
      });
    }

    const userData = await userModel.findOne({ _id: req.body.addedby }).exec();

    if (!userData) {
      return res.status(400).json({
        errorMessage: "User not found",
        status: false,
      });
    }

    if (userData.authenticationtype === "Admin") {
      con.approved = true;
    } else {
      userData.myconsoles.push(con._id);

      if (
        (!userData.isPremium &&
          userData.wallet.bits + 5 - userData.wallet.prevbits <= 25) ||
        (userData.isPremium &&
          userData.wallet.bits + 5 - userData.wallet.prevbits <= 50)
      ) {
        userData.wallet.bits += 5;
      }

      await userData.save();
    }

    await con.save();
    subcatData.consoles.push(con._id);
    await subcatData.save();
    return res.status(200).json({
      status: true,
      msg: "Console added successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errorMessage: "Internal server error",
      status: false,
    });
  }
});

app.post("/api/editwhereami", (req, res) => {
  if (req.body.id) {
    consoleModel.find({ _id: req.body.id }, (err, data) => {
      if (err || data.length === 0)
        res.status(400).json({ msg: "Error finding console" });
      else {
        data[0].whereami = req.body.whereami;
        data[0].save();
        res.status(200).send(true);
      }
    });
  } else {
    res.status(400).send("Bad Request");
  }
});

app.post("/api/editconsole", (req, res) => {
  consoleModel.find({ _id: req.body.id }, (err, data) => {
    if (req.body.con.rating) {
      data[0].rating = req.body.con.rating;
    }
    if (req.body.con.images) {
      data[0].images = req.body.con.images;
    }
    if (req.body.con.desire) {
      data[0].desire = req.body.con.desire;
    }
    if (req.body.con.approved) {
      data[0].approved = req.body.con.approved;
    }

    data[0].links = new Array(
      req.body.con.links[0],
      req.body.con.links[1],
      req.body.con.links[2]
    );

    // console.log(data[0].links);

    data[0].save();
    res.status(200).send("Success");
  });
});

// app.get("/api/removesubcat", (req, res) => {
//   subcatsModel.find({ _id: req.query.id }, (err, ret) => {
//     if (err || ret.length === 0)
//       res.status(201).json({ status: false, msg: "Error finding subcat" });
//     else {
//       consoleModel
//         .find({
//           _id: {
//             $in: ret[0].consoles,
//           },
//         })
//         .deleteMany();
//       brandModel.find({ _id: ret[0].brand }, (err, data) => {
//         if (!err && data.length > 0) {
//           data[0].variations = data[0].variations - 1;
//           data[0].subcats.filter((subcat) => {
//             subcat._id !== req.query.id;
//           });
//           data[0].save();
//         }
//       });
//       ret[0].deleteOne();
//       res.status(200).json({ status: true, msg: "" });
//     }
//   });
// });

app.get("/api/removesubcat", (req, res) => {
  subcatsModel.findOne({ _id: req.query.id }, (err, ret) => {
    if (err || !ret) {
      return res
        .status(400)
        .json({ status: false, msg: "Error finding subcat" });
    }

    consoleModel.deleteMany({ _id: { $in: ret.consoles } }, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ status: false, msg: "Error deleting consoles" });
      }

      brandModel.findOne({ _id: ret.brand }, (err, data) => {
        if (!err && data) {
          data.variations = data.variations - 1;
          data.subcats = data.subcats.filter(
            (subcat) => subcat._id.toString() !== req.query.id
          );

          data.save((err) => {
            if (err) {
              return res
                .status(400)
                .json({ status: false, msg: "Error updating brand" });
            }

            ret.deleteOne((err) => {
              if (err) {
                return res
                  .status(400)
                  .json({ status: false, msg: "Error deleting subcat" });
              }

              res.status(200).json({ status: true, msg: "" });
            });
          });
        } else {
          res.status(400).json({ status: false, msg: "Error finding brand" });
        }
      });
    });
  });
});

app.get("/api/removebrand", (req, res) => {
  const brandId = req.query.id;

  if (!brandId) {
    return res.status(400).json({ status: false, msg: "Brand ID is missing" });
  }

  // Find the brand by ID and handle the result in a single callback
  brandModel.findById(brandId, (err, brand) => {
    if (err) {
      return res
        .status(500)
        .json({ status: false, msg: "Error finding brand" });
    }

    if (!brand) {
      return res.status(404).json({ status: false, msg: "Brand not found" });
    }

    // Retrieve subcategories associated with the brand
    subcatsModel.find({ _id: { $in: brand.subcats } }, (err, subcategories) => {
      if (err) {
        return res
          .status(500)
          .json({ status: false, msg: "Error finding subcategories" });
      }

      // Collect all console IDs from subcategories
      const consoleIds = subcategories.reduce(
        (acc, subcat) => [...acc, ...subcat.consoles],
        []
      );

      // Delete consoles
      consoleModel.deleteMany({ _id: { $in: consoleIds } }, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ status: false, msg: "Error deleting consoles" });
        }

        // Delete subcategories
        subcatsModel.deleteMany({ _id: { $in: brand.subcats } }, (err) => {
          if (err) {
            return res
              .status(500)
              .json({ status: false, msg: "Error deleting subcategories" });
          }

          // Delete the brand
          brandModel.deleteOne({ _id: brandId }, (err) => {
            if (err) {
              return res
                .status(500)
                .json({ status: false, msg: "Error deleting brand" });
            }

            return res.status(200).json({ status: true, msg: "Success" });
          });
        });
      });
    });
  });
});

// app.get("/api/removebrand", (req, res) => {
//   if (req.query.id) {
//     brandModel
//       .find({ _id: req.query.id }, (err, ret) => {
//         if (err || ret.length < 1)
//           res.status(200).json({ status: false, msg: err });
//         else if (ret.length > 0) {
//           subcatsModel.find(
//             {
//               _id: {
//                 $in: ret[0].subcats,
//               },
//             },
//             (err, data) => {
//               if (data.length > 0) {
//                 data.map((d) => {
//                   consoleModel
//                     .find({
//                       _id: {
//                         $in: d.consoles,
//                       },
//                     })
//                     .deleteMany();
//                 });
//               }
//               data.deleteMany();
//             }
//           );
//           res.status(200).json({ status: true, msg: "Success" });
//         }
//       })
//       .deleteOne();
//   } else {
//     res.status(400).send("Error deleting brand");
//   }
// });

app.post("/api/updatebrand", (req, res) => {
  if (req.body.id) {
    brandModel.findOneAndUpdate({ _id: req.body.id }, req.body, (err, data) => {
      if (err) res.status(201).json({ status: false, msg: err });
      else res.status(200).json({ status: true, msg: "Success" });
    });
  } else res.status(201).json({ status: false, msg: "Error in request" });
});

app.post("/api/updatesubcat", (req, res) => {
  if (req.body.id) {
    subcatsModel.findOneAndUpdate(
      { _id: req.body.id },
      req.body,
      (err, data) => {
        if (err) res.status(201).json({ status: false, msg: err });
        else res.status(200).json({ status: true, msg: "Success" });
      }
    );
  } else res.status(201).json({ status: false, msg: "Error in request" });
});

app.get("/api/isVerified", (req, res) => {
  userModel.find({ _id: req.query._id }, (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      res.status(400).send(err);
    } else if (data[0].verified) {
      res.status(200).send("OK");
    } else {
      res.status(200).send(false);
    }
  });
});

app.get("/api/verify", (req, res) => {
  if (req.query._id) {
    userModel.find({ _id: req.query._id }, (err, data) => {
      if (err) {
        console.log(err);
        res
          .status(200)
          .json({ status: false, msg: "Error: Error finding user" });
      } else if (data.length > 0) {
        tokenModel.find({ token: req.query.token }, (error, tok) => {
          if (error) {
            console.log(error);
            res.status(200).json({ status: false, msg: error });
          } else {
            data[0].verified = true;
            data[0].save();
            res.status(200).send({ status: true, msg: "Verified" });
          }
        });
      } else {
        res.status(200).json({ status: false, msg: "User not found" });
      }
    });
  } else {
    res.status(200).json({ status: false, msg: "Bad Request" });
  }
});

app.get("/api/addlikedblog", (req, res) => {
  if (req.query.blog && req.query.user) {
    userModel.find({ _id: req.query.user }, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else if (result.length > 0) {
        if (
          !result[0].likedblogs.find((blog) => {
            return blog == req.query.blog;
          })
        ) {
          result[0].likedblogs.push(req.query.blog);
          result[0].save();
          res.status(200).send("Added");
        } else {
          const index = result[0].likedblogs.indexOf(req.query.blog);
          if (index > -1) {
            // only splice array when item is found
            result[0].likedblogs.splice(index, 1); // 2nd parameter means remove one item only
            result[0].save();
            res.status(201).send("Removed");
          }
        }
      }
    });
  } else {
    res.status(400).send("Error in Request");
  }
});

app.get("/api/addlink", (req, res) => {
  if (req.query.id) {
    consoleModel.find({ _id: req.query.id }, (err, data) => {
      if (!err && data.length > 0) {
        data[0].links.push(req.query.link);
        data[0].save();
        res.status(200).send();
      }
    });
  } else res.status(201).json({ status: false, msg: "Id not found in req" });
});

app.get("/api/setrating", (req, res) => {
  if (req.query.id) {
    consoleModel.find({ _id: req.query.id }, (err, data) => {
      if (!err && data.length > 0) {
        data[0].rating = req.query.rating;
        data[0].save();
      }
    });
  }
});

app.get("/api/setdesire", (req, res) => {
  if (req.query.id) {
    consoleModel.find({ _id: req.query.id }, (err, data) => {
      if (!err && data.length > 0) {
        data[0].desire = req.query.desire;
        data[0].save();
        res.status(200).send();
      } else {
        res.status(201).send();
      }
    });
  } else res.status(201).send();
});

app.get("/api/getlinks", (req, res) => {
  if (req.query.id) {
    consoleModel.find({ _id: req.query.id }, (err, data) => {
      if (!err && data.length > 0) {
        res.status(200).send(data);
      }
    });
  } else res.status(201).send();
});

app.get("/api/addtocollection", (req, res) => {
  if (req.query.con && req.query.user) {
    userModel.find({ _id: req.query.user }, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else if (result.length > 0) {
        if (result[0].myconsoles.includes(req.query.con)) {
          result[0].myconsoles.filter((cons) => {
            return cons._id !== req.query.con;
          });

          res.status(200).send("Removed");
        } else {
          result[0].myconsoles.push(req.query.con);
          result[0].save();
          res.status(200).send("Added");
        }
      }
    });
  } else {
    res.status(400).send("Error in request");
  }
});

app.post("/api/removeconsole", async (req, res) => {
  try {
    const consoleId = req.body.id;

    // Find the console by ID
    const consoleData = await consoleModel.findById(consoleId);

    if (!consoleData) {
      return res.status(404).send("Console not found with the given ID");
    }

    // Find the subcategory associated with the console
    const subcatData = await subcatsModel.findById(consoleData.subcat);

    if (subcatData) {
      // Remove the console ID from the subcategory's consoles array
      subcatData.consoles = subcatData.consoles.filter(
        (con) => con._id !== consoleId
      );
      await subcatData.save();
    }

    // Delete the console
    await consoleData.deleteOne();

    res.status(200).send("Success");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// app.post("/api/removeconsole", (req, res) => {
//   consoleModel.find({ _id: req.body.id }, (err, condata) => {
//     if (err) {
//       console.log(err);
//       res.status(400).send(err);
//     } else if (condata.length > 0) {
//       subcatsModel.find({ _id: condata[0].subcat }, (err, data) => {
//         if (data.length > 0) {
//           data[0].consoles.filter((con) => {
//             return con._id !== condata._id;
//           });
//         }
//       });
//       condata[0].deleteOne();
//       res.status(200).send("success");
//     } else {
//       res.status(200).send("Console not found with the given id");
//     }
//   });
// });

app.get("/api/addlikedconsole", (req, res) => {
  if (req.query.con && req.query.user) {
    userModel.find({ _id: req.query.user }, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else if (result.length > 0) {
        if (
          !result[0].likedconsoles.find((con) => {
            return con == req.query.con;
          })
        ) {
          result[0].likedconsoles.push(req.query.con);
          result[0].save();
          res.status(200).send("Added");
        } else {
          const index = result[0].likedconsoles.indexOf(req.query.con);
          if (index > -1) {
            // only splice array when item is found
            result[0].likedconsoles.splice(index, 1); // 2nd parameter means remove one item only
            result[0].save();

            res.status(201).send("Removed");
          }
        }
      }
    });
  } else {
    res.status(400).send("Error in request");
  }
});
// add a new brand
app.post("/api/addbrand", (req, res) => {
  if (req.body) {
    let brand = new brandModel(req.body.brand);

    brandModel.find(
      { name: req.body.brand.name, type: req.body.brand.type },
      (err, data) => {
        if (err) res.status(201).json({ status: false, msg: err });
        else if (data.length > 0)
          res.status(201).json({ status: false, msg: "Brand Already Exists" });
        else {
          userModel.find({ _id: req.body.userid }, (err, data) => {
            if (err || data.length < 1) {
              console.log(err);
              res.status(400).send("User not found");
            } else if (data[0].authenticationtype === "Admin") {
              brand.isApproved = true;
              brand.save();
              res.status(200).json({ status: true, msg: brand });
            } else {
              brand.isApproved = false;
              brand.save();
              res.status(200).json({ status: true, msg: brand });
            }
          });
        }
      }
    );
  } else {
    res.status(400).send("Error in request");
  }
});

app.get("/api/getmerchimages", (req, res) => {
  if (req.query.id) {
    merchModel.find({ _id: req.query.id }, (err, data) => {
      if (err || data.length < 1) {
        console.log(err);
        res.status(200).json({ images: [], thumbnail: null });
      } else {
        res
          .status(200)
          .json({ images: data[0].images, thumbnail: data[0].thumbnail });
      }
    });
  } else {
    res.status(400).send("Bad Request");
  }
});

app.get("/api/getconsole", (req, res) => {
  if (req.query.id) {
    consoleModel.find({ _id: req.query.id }, (err, con) => {
      if (err) {
        res.status(400).send("Error fetching console");
      } else if (con.length > 0) {
        res.status(200).send(con[0]);
      } else {
        res.status(500).send("Bad Request");
      }
    });
  } else {
    res.status(400).send("Error in reqeust");
  }
});

app.get("/api/getbrands", (req, res) => {
  if (req.query.type) {
    brandModel.find({ type: req.query.type, isApproved: true }, (err, data) => {
      if (err) {
        res.status(200).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
});

// return console based on req parameters
app.get("/api/getallunapprovedconsoles", (req, res) => {
  consoleModel.find({ approved: false }, function (err, result) {
    if (err) {
      res.status(400).send("Error while retrieving consoles from database");
      throw err;
    } else {
      var isEnd = result.length < req.query.start + 12 ? true : false;
      var sliced = result.slice(req.query.start, req.query.start + 12);
      res.status(200).json({ consoles: sliced, isEnd: isEnd });
    }
  });
});

app.post("/api/approveconsole", (req, res) => {
  if (req.body.id && req.body.token) {
    tokenModel.find({ token: req.body.token }, (err, data) => {
      if (err) {
        res.status(400).send("Bad Request");
      } else if (data.length > 0) {
        consoleModel.find({ _id: req.body.id }, (err, data) => {
          if (err) {
            res.status(200).send("Console not found");
          } else {
            data[0].approved = true;
            data[0].save();
            brandModel.find(
              { name: data[0].brand, type: data[0].type },
              (err, brand) => {
                if (err) {
                  res.status(200).send("Error finding Brand");
                } else if (brand.length > 0) {
                  brand[0].variations++;
                  brand[0].save();
                }
              }
            );
          }
        });
        res.status(200).send("Console Approved");
      }
    });
  } else {
    res.status(400).send("Bad request");
  }
});

app.post("/api/approvebrand", (req, res) => {
  if (req.body.id && req.body.token) {
    tokenModel.find({ token: req.body.token }, (err, data) => {
      if (err) {
        res.status(400).send("Token not found Bad Request");
      } else if (data.length > 0) {
        brandModel.find({ _id: req.body.id }, (err, brand) => {
          if (err) {
            res.status(200).send("Error finding Brand");
          } else if (brand.length > 0) {
            brand[0].isApproved = true;
            brand[0].save();
          }
        });
      }
    });
    res.status(200).send("Brand Approved");
  } else {
    res.status(400).send("Bad request");
  }
});

app.post("/api/disapproveconsole", (req, res) => {
  if (req.body.id && req.body.token) {
    tokenModel.find({ token: req.body.token }, (err, data) => {
      if (err) {
        res.status(400).send("Bad Request");
      } else if (data.length > 0) {
        consoleModel
          .find({ _id: req.body.id }, (err, data) => {
            if (err) {
              res.status(200).send("Console not found");
            } else if (data.length > 0) {
              brandModel.find(
                { name: data[0].brand, type: data[0].type },
                (err, brand) => {
                  if (err) {
                    res.status(200).send("Error finding Brand");
                  } else if (brand.length > 0) {
                    brand[0].variations++;
                    brand[0].save();
                  }
                }
              );
            }
          })
          .deleteOne();
        res.status(200).send("Console Approved");
      }
    });
  } else {
    res.status(400).send("Bad request");
  }
});

// return console based on req parameters
app.get("/api/getallconsoles", (req, res) => {
  if (req.query.start) {
    consoleModel.find({ approved: true }, function (err, result) {
      if (err) {
        res.status(400).send("Error while retrieving consoles from database");
      } else if (result.length > 0) {
        var isEnd = result.length < req.query.start + 16 ? true : false;
        var sliced = result.slice(
          parseInt(req.query.start),
          parseInt(req.query.start) + 16
        );
        res.status(200).json({ consoles: sliced, isEnd: isEnd });
      } else {
        res.status(200).json({ consoles: [], isEnd: true });
      }
    });
  } else {
    res.status(400).send("Error in request");
  }
});

app.get("/api/getconsoles", (req, res) => {
  subcatsModel.find({ _id: req.query.id }, (err, cat) => {
    if (err) {
      res.status(400).send(err);
    } else if (cat.length > 0) {
      consoleModel.find(
        {
          _id: {
            $in: cat[0].consoles,
          },

          approved: true,
        },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            var isEnd = false;
            var sliced = docs.slice(
              parseInt(req.query.start),
              parseInt(req.query.start) + 8
            );
            if (parseInt(req.query.start) + 8 > docs.length) isEnd = true;

            var toSend = [];
            sliced.map((val, index) => {
              var value = {
                _id: val._id,
                images: [val.images[0]],
                name: val.name,
                color: val.color,
                country: val.country,
                releasetype: val.releasetype,
                regionalcode: val.regionalcode,
                type: val.type,
              };
              toSend.push(value);
            });
            res.status(200).json({ consoles: toSend, isEnd: isEnd });
          }
        }
      );
    }
  });
});

app.get("/api/allconsoles", (req, res) => {
  consoleModel.find({}, function (err, result) {
    if (err) {
      res.status(400).send("Error while retrieving consoles from database");
      console.log(err);
    } else if (result.length > 0) {
      var isEnd = req.query.start + 8 > result.length ? true : false;
      var sliced = result.slice(req.query.start, req.query.start + 8);
      res.status(200).json({ consoles: sliced, isEnd: isEnd });
    } else {
      res.status(200).json({ consoles: [], isEnd: true });
    }
  });
});

app.get("/api/getconsolenumber", (req, res) => {
  if (req.query.id) {
    subcatsModel.find({ _id: req.query.id }, (err, cat) => {
      if (err) {
        res.status(400).send(err);
      } else if (cat.length > 0) {
        consoleModel.find(
          {
            _id: {
              $in: cat[0].consoles,
            },
            approved: true,
          },
          function (err, docs) {
            if (err) {
              res.status(400).send("Error finding consoles");
            } else {
              res.status(200).send(docs.length.toString());
            }
          }
        );
      }
    });
  } else {
    res.status(400).send("Error in request");
  }
});

app.get("/api/getallconsolenumber", (req, res) => {
  consoleModel.find({}, (err, cat) => {
    if (err) {
      res.status(400).send(err);
    } else if (cat.length > 0) {
      res.status(200).send(cat.length.toString());
    }
  });
});

// returns all brands names
app.get("/api/brandnames", (req, res) => {
  brandModel.find({}, function (err, result) {
    if (err) {
      res.status(400).send("Error while retrieving brands from database");
      throw err;
    } else if (result.length > 0) {
      var names = [];
      result.map((brand, index) => {
        names.push(brand.name);
      });
      res.status(200).send(names);
    }
  });
});

app.get("/api/brand", (req, res) => {
  if (req.query.id) {
    brandModel.find({ _id: req.query.id }, function (err, result) {
      if (err) {
        res.status(400).send("Error while retrieving brands from database");
        throw err;
      } else if (result.length > 0) {
        res.status(200).send(result);
      }
    });
  } else {
    res.status(201).json({ status: false, msg: "Error in request" });
  }
});

app.get("/api/subcat", (req, res) => {
  if (req.query.id) {
    subcatsModel.find({ _id: req.query.id }, (err, data) => {
      if (err || data.length < 1) console.log(err);
      else {
        res.status(200).send(data[0]);
      }
    });
  }
});

// returns all brands
app.get("/api/allbrands", (req, res) => {
  brandModel.find({ isApproved: true }, function (err, result) {
    if (err) {
      res.status(400).send("Error while retrieving brands from database");
      throw err;
    } else if (result.length > 0) {
      var brandslist = { Console: [], Mobile: [], PC: [] };
      result.map((b, index) => {
        brandslist[b.type].push(b);
      });
      res.status(200).send(brandslist);
    } else {
      var brandslist = { Console: [], Mobile: [], PC: [] };
      res.status(200).send(brandslist);
    }
  });
});

app.get("/api/getbrandtype", (req, res) => {
  brandModel.find({ type: req.query.type }, (err, data) => {
    if (err) res.status(400).send("Error");
    else {
      res.status(200).send(data);
    }
  });
});

app.get("/api/getallbrands", (req, res) => {
  brandModel.find({ isApproved: true }, function (err, result) {
    if (err) {
      res.status(400).send("Error while retrieving brands from database");
      console.log(err);
    } else {
      var isEnd = false;
      if (result.length < req.query.start + 12) isEnd = true;
      var sliced = result.slice(req.query.start, req.query.start + 12);
      res.status(200).json({ brands: sliced, isEnd: isEnd });
    }
  });
});

app.get("/api/getunapprovedbrands", (req, res) => {
  brandModel.find({ isApproved: false }, function (err, result) {
    if (err) {
      res.status(400).send("Error while retrieving brands from database");
      console.log(err);
    } else {
      var isEnd = false;
      if (result.length < req.query.start + 12) isEnd = true;
      var sliced = result.slice(req.query.start, req.query.start + 12);
      res.status(200).json({ brands: sliced, isEnd: isEnd });
    }
  });
});

app.get("/api/allsubcats", (req, res) => {
  subcatsModel.find({}, (err, data) => {
    if (err) res.status(400).send(err);
    else {
      var isEnd = data.length < req.query.start + 8 ? true : false;
      var sliced = data.slice(req.query.start, req.query.start + 8);
      res.status(200).json({ subcats: sliced, isEnd: isEnd });
    }
  });
});

app.post("/api/login", (req, res) => {
  try {
    // console.log(req.body);
    if (req.body && req.body.username && req.body.password) {
      userModel.find({ username: req.body.username }, (err, data) => {
        if (data.length > 0) {
          if (bcrypt.compareSync(req.body.password, data[0].password)) {
            if (data[0].consecutive_logins >= 7) {
              // User has logged in consecutively for 7 days
              data[0].consecutive_logins = 0;
              if (
                !data[0].isPremium
                  ? data[0].wallet.bits + 5 - data[0].wallet.prevbits <= 25
                  : data[0].wallet.bits + 5 - data[0].wallet.prevbits <= 50
              ) {
                data[0].bits = data[0].bits + 5;
              }
              data[0].save();
            } else {
              const lastLogin = new Date(data[0].last_login);
              const currentTime = new Date();
              const timeDiff = Math.abs(currentTime - lastLogin);
              const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

              if (hoursDiff >= 24) {
                // User has logged in after 24 hours, increment the consecutiveLogins field by 1
                data[0].lastLogin = new Date();
                data[0].consecutive_logins = data[0].consecutive_logins + 1;
                data[0].save();
              }
            }
            checkUserAndGenerateToken(data[0], req, res, false, true);
          } else {
            res.status(200).json({
              errorMessage: "Username or password is incorrect!",
              status: false,
            });
          }
        } else {
          res.status(200).json({
            errorMessage: "Username or password is incorrect!",
            status: false,
          });
        }
      });
    } else {
      res.status(200).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(200).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

app.post("/api/editorderstatus", (req, res) => {
  orderModel.find({ _id: req.body.id }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else if (data.length > 0) {
      data[0].status = req.body.status;
      data[0].save();
    }
  });
});

/* register api */
app.post("/api/register", (req, res) => {
  try {
    if (
      req.body &&
      req.body.username &&
      req.body.password &&
      req.body.country &&
      req.body.email
    ) {
      userModel.find(
        {
          $or: [{ email: req.body.email }, { username: req.body.username }],
        },
        (err, data) => {
          if (data.length === 0) {
            var passwordHash = "";

            bcrypt.hash(req.body.password, 10, function (err, hash) {
              if (err) {
                res.status(200).json({
                  errorMessage: "Error Registering User",
                  status: false,
                });
              } else {
                let User = new userModel({
                  username: req.body.username,
                  password: hash,
                  country: req.body.country,
                  email: req.body.email,
                });

                User.save((err, data) => {
                  if (err) {
                    console.log(err);
                    res.status(200).json({
                      errorMessage: `UserName or Email Already Exists!`,
                      status: false,
                    });
                  } else {
                    checkUserAndGenerateToken(User, req, res, true, false);
                  }
                });
              }
            });
          } else {
            res.status(200).json({
              errorMessage: `UserName or Email Already Exists!`,
              status: false,
            });
          }
        }
      );
    } else {
      res.status(200).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(200).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

app.post("/api/updateUser", (req, res) => {
  try {
    if (
      (req.body && req.body.id) ||
      req.body.username ||
      req.body.password ||
      req.body.country ||
      req.body.email ||
      req.body.image
    ) {
      userModel.find({ _id: req.body.id }, (err, data) => {
        if (data.length > 0) {
          if (req.body.username !== "") {
            data[0].username = req.body.username;
          }
          if (req.body.email !== "") {
            data[0].email = req.body.email;
          }
          if (req.body.country !== "") {
            data[0].country = req.body.country;
          }
          if (req.body.image) {
            data[0].image = req.body.image;
          }
          if (req.body.password !== "") {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
              if (err) {
                res.status(200).json({
                  errorMessage: "Error Registering User",
                  status: false,
                });
              } else {
                data[0].password = hash;

                data[0].save((err, data) => {
                  if (err) {
                    res.status(200).json({
                      errorMessage:
                        err + `Error Updating User: ${data[0].username}!`,
                      status: false,
                    });
                  } else {
                    res.status(200).json({
                      status: true,
                      title: "Updated Successfully.",
                    });
                  }
                });
              }
            });
          } else {
            data[0].save((err, data) => {
              if (err) {
                res.status(200).json({
                  errorMessage:
                    err + `Error Updating User: ${data[0].username}!`,
                  status: false,
                });
              } else {
                res.status(200).json({
                  status: true,
                  title: "Updated Successfully.",
                });
              }
            });
          }
        }
      });
    } else {
      res.status(200).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(200).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

app.get("/api/changeEmail", (req, res) => {
  if (req.query.id && req.query.updatedEmail) {
    userModel.find({ _id: req.query.id }, (err, data) => {
      if (err || data.length < 1) {
        console.log(err);
        res.status(400).send(err);
      } else {
        data[0].email = req.query.updatedEmail;
        data[0].save();
        res.status(200).send("success");
      }
    });
  } else {
    res.status(400).send("Error");
  }
});

app.post("/api/updatebits", (req, res) => {
  userModel.find({ _id: req.body.id }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      data[0].wallet.bits = req.body.bits;
      data[0].save();
      res.status(200).send(true);
    }
  });
});

// function checkUserAndGenerateToken(
//   data,
//   req,
//   res,
//   sendMail,
//   twofactorauthentication
// ) {
//   const qrCodeOptions = {
//     errorCorrectionLevel: "L", // Error correction level (L - low, M - medium, Q - quartile, H - high)
//     type: "image/png", // Output QR code image format
//     quality: 0.9, // Image quality (0.1 to 1)
//     margin: 1, // QR code margin (number of modules)
//   };
//   jwt.sign(
//     { user: data.username, id: data._id },
//     "shhhhh11111",
//     { expiresIn: "1d" },
//     (err, token) => {
//       if (err) {
//         res.status(200).json({
//           status: false,
//           errorMessage: "Error Creating Token",
//         });
//       } else {
//         let tok = new tokenModel({
//           token: token,
//           authtype: data.authenticationtype,
//           userid: data._id,
//         });
//         tok.save((err, result) => {
//           if (err) {
//             console.log(err);
//             res
//               .status(200)
//               .json({ status: false, errorMessage: "Error Saving Token" });
//           } else {
//             if (sendMail) {
//               var mailOptions = {
//                 from: "computernostalgiaheaven@gmail.com",
//                 to: data.email,
//                 subject: "Email Verification",
//                 text:
//                   "Click the below link to verify your email\nhttps://thecnh.co.uk/verify/?_id=" +
//                   data._id +
//                   "&token=" +
//                   token,
//               };

//               transporter.sendMail(mailOptions, function (error, info) {
//                 if (error) {
//                   console.log(error);
//                 } else {
//                   console.log("Email sent: " + info.response);
//                 }
//               });
//             }
//             if (twofactorauthentication && data.twoFactorEnabled) {
//               if (!data.twoFactorSetup) {
//                 // Generate a secret key for the user
//                 const secret = speakeasy.generateSecret();
//                 data.twoFactorSecret = secret.base32; // Store the secret key in the user document
//                 data.twoFactorEnabled = true;
//                 data.otpauth_url = secret.otpauth_url;
//                 data.twoFactorSetup = true;
//                 data.save((err) => {
//                   if (err) {
//                     console.error("Error setting up 2FA:", err.message);
//                     return res
//                       .status(500)
//                       .json({ message: "Internal server error" });
//                   }

//                   // Generate QR code URL to be used with 2FA authenticator apps (e.g., Google Authenticator)
//                   qrcode.toDataURL(
//                     secret.otpauth_url,
//                     qrCodeOptions,
//                     (err, codeString) => {
//                       if (err) res.status(500).send("Internal Server Error");
//                       if (!err)
//                         res.status(200).json({
//                           message: "Login Successfully.",
//                           token: token,
//                           status: true,
//                           id: data.id,
//                           username: data.username,
//                           profileImage: data.image,
//                           authenticationtype: data.authenticationtype,
//                           twoFactorEnabled: data.twoFactorEnabled,
//                           qrlCode: codeString,
//                         });
//                     }
//                   );
//                 });
//               } else {
//                 qrcode.toDataURL(
//                   data.otpauth_url,
//                   qrCodeOptions,
//                   (err, codeString) => {
//                     if (err) res.status(500).send("Internal Server Error");
//                     if (!err)
//                       res.status(200).json({
//                         message: "Login Successfully.",
//                         token: token,
//                         status: true,
//                         id: data.id,
//                         username: data.username,
//                         profileImage: data.image,
//                         authenticationtype: data.authenticationtype,
//                         twoFactorEnabled: data.twoFactorEnabled,
//                         qrlCode: codeString,
//                       });
//                   }
//                 );
//               }
//             } else {
//               res.status(200).json({
//                 message: "Login Successfully.",
//                 token: token,
//                 status: true,
//                 id: data.id,
//                 username: data.username,
//                 profileImage: data.image,
//                 authenticationtype: data.authenticationtype,
//                 twoFactorEnabled: false,
//               });
//             }
//           }
//         });
//       }
//     }
//   );
// }

function checkUserAndGenerateToken(
  data,
  req,
  res,
  sendMail,
  twofactorauthentication
) {
  const qrCodeOptions = {
    errorCorrectionLevel: "L",
    type: "image/png",
    quality: 0.9,
    margin: 1,
  };

  jwt.sign(
    { user: data.username, id: data._id },
    "shhhhh11111",
    { expiresIn: "20m" },
    (err, token) => {
      if (err) {
        res.status(200).json({
          status: false,
          errorMessage: "Error Creating Token",
        });
      } else {
        let tok = new tokenModel({
          token: token,
          authtype: data.authenticationtype,
          userid: data._id,
        });

        tok.save((err, result) => {
          if (err) {
            console.log(err);
            res
              .status(200)
              .json({ status: false, errorMessage: "Error Saving Token" });
          } else {
            if (sendMail) {
              var mailOptions = {
                from: "computernostalgiaheaven@gmail.com",
                to: data.email,
                subject: "Email Verification",
                text:
                  "Click the below link to verify your email\nhttps://thecnh.co.uk/verify/?_id=" +
                  data._id +
                  "&token=" +
                  token,
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
            }
            if (twofactorauthentication && data.twoFactorEnabled) {
              if (!data.twoFactorSetup) {
                const secret = speakeasy.generateSecret();
                data.twoFactorSecret = secret.base32;
                data.twoFactorEnabled = true;
                data.otpauth_url = secret.otpauth_url;
                data.twoFactorSetup = true;
                data.save((err) => {
                  if (err) {
                    console.error("Error setting up 2FA:", err.message);
                    return res
                      .status(500)
                      .json({ message: "Internal server error" });
                  }

                  qrcode.toDataURL(
                    data.otpauth_url,
                    qrCodeOptions,
                    (err, codeString) => {
                      if (err) res.status(500).send("Internal Server Error");
                      if (!err)
                        res.status(200).json({
                          message: "Login Successfully.",
                          token: token,
                          status: true,
                          id: data.id,
                          username: data.username,
                          profileImage: data.image,
                          authenticationtype: data.authenticationtype,
                          twoFactorEnabled: data.twoFactorEnabled,
                          qrlCode: codeString,
                        });
                    }
                  );
                });
              } else {
                qrcode.toDataURL(
                  data.otpauth_url,
                  qrCodeOptions,
                  (err, codeString) => {
                    if (err) res.status(500).send("Internal Server Error");
                    if (!err)
                      res.status(200).json({
                        message: "Login Successfully.",
                        token: token,
                        status: true,
                        id: data.id,
                        username: data.username,
                        profileImage: data.image,
                        authenticationtype: data.authenticationtype,
                        twoFactorEnabled: data.twoFactorEnabled,
                        qrlCode: codeString,
                      });
                  }
                );
              }
            } else {
              res.status(200).json({
                message: "Login Successfully.",
                token: token,
                status: true,
                id: data.id,
                username: data.username,
                profileImage: data.image,
                authenticationtype: data.authenticationtype,
                twoFactorEnabled: false,
              });
            }
          }
        });
      }
    }
  );
}

// API endpoint for verifying 2FA token
app.post("/api/verify", async (req, res) => {
  const { username, token } = req.body;

  try {
    const user = await userModel.findOne({ username });

    if (!user || !user.twoFactorEnabled) {
      res.status(401).json({ message: "2FA is not enabled for this user" });
    }

    // Verify the token using the secret key stored in the user document
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1, // Allow tokens to be valid for a short time before and after the current time
    });

    res.json({ valid: verified });
  } catch (error) {
    console.error("Error verifying 2FA token:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/logout", (req, res) => {
  if (req.query.token) {
    tokenModel.deleteOne({ token: req.query.token }, (err, result) => {
      if (err) {
        res.status(400).send("Error Deleting Token");
      } else {
        res.status(200).send("Token Deleted Successfully");
      }
    });
  } else {
    res.status(200).send("Logged out Successfully");
  }
});

app.get("/api/checkfacebook", (req, res) => {
  if (req.query.name && req.query.id) {
    userModel.find(
      {
        username: req.query.username,
        externalid: req.query.password,
        authenticationtype: "other",
      },
      (err, data) => {
        if (err || data.length < 1) {
          res.status(404).send("No record found");
        } else {
          if (data[0].consecutive_logins >= 7) {
            // User has logged in consecutively for 7 days
            data[0].consecutive_logins = 0;
            if (
              !data[0].isPremium
                ? data[0].wallet.bits + 5 - data[0].wallet.prevbits <= 25
                : data[0].wallet.bits + 5 - data[0].wallet.prevbits <= 50
            ) {
              data[0].bits = data[0].bits + 5;
            }
            data[0].save();
          } else {
            const lastLogin = new Date(data[0].last_login);
            const currentTime = new Date();
            const timeDiff = Math.abs(currentTime - lastLogin);
            const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

            if (hoursDiff >= 24) {
              // User has logged in after 24 hours, increment the consecutiveLogins field by 1
              data[0].lastLogin = new Date();
              data[0].consecutive_logins = data[0].consecutive_logins + 1;
              data[0].save();
            }
          }
          checkUserAndGenerateToken(data[0], req, res, false, true);
        }
      }
    );
  } else {
    res.status(400).send("Bad Request");
  }
});

app.post("/api/loginfacebook", (req, res) => {
  if (
    req.body &&
    req.body.username &&
    req.body.password &&
    req.body.country &&
    req.body.email &&
    req.body.accesstoken
  ) {
    userModel.find(
      {
        $or: [
          { email: req.body.email },
          { username: req.body.username },
          { externalid: req.body.password },
        ],
      },
      (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        } else if (data.length < 1) {
          let User = new userModel({
            username: req.body.username,
            country: req.body.country,
            password: req.body.password,
            email: req.body.email,
            authenticationtype: "other",
            isexternalaccount: true,
            externalid: req.body.password,
          });
          User.save();
          checkUserAndGenerateToken(User, req, res, false, false);
        } else {
          res.status(201).json({
            errormsg: "An account already exists with such credentials",
          });
        }
      }
    );
  } else {
    res.status(400).send("Error in request");
  }
});

const getDecodedOAuthJwtGoogle = async (token) => {
  const CLIENT_ID_GOOGLE =
    "1022277434989-epcqu1cf2ldd355p4gi2shf7v3ailpml.apps.googleusercontent.com";

  try {
    const client = new OAuth2Client(CLIENT_ID_GOOGLE);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID_GOOGLE,
    });

    return ticket;
  } catch (error) {
    return { status: 500, data: error };
  }
};

app.post("/api/logingoogle", async (req, res) => {
  if (req.body.token) {
    const user = await getDecodedOAuthJwtGoogle(req.body.token);

    let User = new userModel({
      username: user.payload.name,
      country: "",
      password: user.payload.jti,
      email: user.payload.email,
      authenticationtype: "other",
    });

    User.save((err, data) => {
      if (err) {
      } else {
        checkUserAndGenerateToken(User, req, res, false, false);
      }
    });
  }
});

// return console based on req parameters
app.get("/api/consoles", (req, res) => {
  data = {};

  if (req.query.releasetype) {
    data["releasetype"] = { $in: req.query.releasetype };
  }
  if (req.query.country) {
    data["country"] = { $in: req.query.country };
  }
  if (req.query.color) {
    data["color"] = { $in: req.query.color };
  }
  if (req.query.regionalcode) {
    data["regionalcode"] = { $in: req.query.regionalcode };
  }
  if (req.query.type) {
    data["type"] = { $in: req.query.type };
  }

  data["approved"] = true;

  consoleModel.find(data, function (err, result) {
    if (err) {
      res.status(400).send("Error while retrieving brands from database");
      throw err;
    } else if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(200).send([]);
    }
  });
});

app.get("/api/searchbrands", (req, res) => {
  if (req.query.search) {
    brandModel.find(
      { name: { $regex: new RegExp(req.query.search, "i") } },
      (err, brands) => {
        if (err) res.status(200).json({ status: false, data: [] });
        res.status(200).json({ status: true, data: brands });
      }
    );
  } else {
    res.status(200).json({ status: false, data: [] });
  }
});
app.get("/api/searchblogs", (req, res) => {
  if (req.query.search) {
    blogModel.find(
      { title: { $regex: new RegExp(req.query.search, "i") } },
      (err, blogs) => {
        if (err) res.status(200).send(err);
        else {
          res.status(200).json({ status: true, data: blogs });
        }
      }
    );
  } else {
    res.status(200).json({ status: false, data: [] });
  }
});
app.get("/api/searchconsoles", (req, res) => {
  if (req.query.search) {
    consoleModel.find(
      { name: { $regex: new RegExp(req.query.search, "i") } },
      (err, consoles) => {
        if (err) res.status(200).json({ status: false, data: err });
        else {
          res.status(200).json({ status: true, data: consoles });
        }
      }
    );
  } else {
    res.status(200).json({ status: false, data: [] });
  }
});

app.get("/api/getifliked", (req, res) => {
  userModel.find({ _id: req.query.user }, (err, data) => {
    if (err || data.length < 1) {
      console.log(err);
      res.status(400).send(err);
    } else if (data[0].myconsoles.includes(req.query.con)) {
      res.status(200).send(true);
    } else res.status(200).send(false);
  });
});

app.get("/api/searchsubcats", (req, res) => {
  if (req.query.search) {
    subcatsModel.find(
      { name: { $regex: new RegExp(req.query.search, "i") } },
      (err, consoles) => {
        if (err) res.status(200).json({ status: false, data: err });
        else {
          res.status(200).json({ status: true, data: consoles });
        }
      }
    );
  } else {
    res.status(200).json({ status: false, data: [] });
  }
});

app.get("/api/leaderboard", (req, res) => {
  userModel.find({ authenticationtype: "Standard" }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(404).send([]);
    } else {
      res.status(200).send(result);
    }
  });
});

// returns all blogs
app.get("/api/blogs", (req, res) => {
  var isEnd = false;
  blogModel.find({}, (err, blogs) => {
    if (err) {
      res.status(400).send(err);
    } else if (blogs.length > 0) {
      var sliced = blogs;

      if (req.query.start + 12 > blogs.length) {
        isEnd = true;
      }
      if (req.start) {
        sliced = blogs.slice(req.query.start, req.query.start + 12);
        sliced.map((sl) => {
          delete sl.image;
        });
      }
      res.status(200).json({ blogs: sliced, isEnd: isEnd });
    } else {
      res.status(200).json({ blogs: sliced, isEnd: true });
    }
  });
});

app.get("/api/allblogs", (req, res) => {
  blogModel.find({}, (err, blogs) => {
    if (err) {
      res.status(400).send(err);
    } else if (blogs.length > 0) {
      res.status(200).send(blogs);
    } else {
      res.status(200).send([]);
    }
  });
});

// returns all blogs
app.get("/api/sideBlog", (req, res) => {
  blogModel.find({ isSecondary: true }, (err, result) => {
    if (err) {
      res.status(200).send(null);
    } else if (result.length > 0) {
      res.status(200).send(result[0]);
    } else {
      res.status(200).send(null);
    }
  });
});
app.get("/api/mainBlog", (req, res) => {
  blogModel.find({ isMain: true }, (err, result) => {
    if (err) {
      res.status(200).send(null);
    } else if (result.length > 0) {
      res.status(200).send(result.slice(0, 5));
    } else {
      res.status(200).send(null);
    }
  });
});

app.get("/api/blogsnumber", (req, res) => {
  blogModel.find({}, (err, blogs) => {
    if (err) {
      res.status(400).send(err);
    } else res.status(200).send(blogs.length.toString());
  });
});

// returns all blogs
app.get("/api/getlikedblogs", (req, res) => {
  if (req.query.blogs) {
    blogModel.find({ _id: { $in: req.query.blogs } }, (err, blogs) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(blogs);
      }
    });
  } else {
    res.status(400).send("Error in request");
  }
});

app.get("/api/getlikedconsoles", (req, res) => {
  if (req.query.consoles) {
    consoleModel.find({ _id: { $in: req.query.consoles } }, (err, consoles) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(consoles);
      }
    });
  } else {
    res.status(400).send("Error in request");
  }
});

app.get("/api/getmyconsoles", (req, res) => {
  if (req.query.consoles) {
    consoleModel.find({ _id: { $in: req.query.consoles } }, (err, consoles) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(consoles);
      }
    });
  } else {
    res.status(400).send("Error in request");
  }
});

// return one blog based on id
app.get("/api/blog", (req, res) => {
  if (req.query.id) {
    blogModel.find({ _id: req.query.id }, (err, blog) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(blog);
      }
    });
  } else {
    res.status(400).send("Error in request");
  }
});

//add blog to database
app.post("/api/addblog", (req, res) => {
  let blg = new blogModel(req.body);

  blg.save((err, result) => {
    if (err) {
      res.status(200).json({ status: false, msg: err });
    } else {
      res.status(200).json({ status: true, msg: result });
    }
  });
});

app.post("/api/addcomment", (req, response) => {
  if (req.body) {
    let cmnt = commentModel(req.body);

    userModel.find({ _id: req.body.user }, (err, user) => {
      if (err) {
        response.status(400).send("Error:" + err);
      }
      if (user) {
        user[0].comments.push(cmnt._id);
        user[0].save();
        cmnt.profilephoto = user[0].image;
        cmnt.save((err, result) => {
          if (err) {
            response.status(400).send(err);
          } else {
            response.status(200).send("Comment Added");
            if (req.body.posttype === "blog") {
              blogModel.find({ _id: req.body.post }, (err, blog) => {
                if (blog) {
                  blog[0].comments.push(cmnt._id);
                  blog[0].save();
                } else {
                }
              });
            } else if (req.body.posttype === "console") {
              consoleModel.find({ _id: req.body.post }, (err, con) => {
                if (con) {
                  con[0].comments.push(cmnt._id);
                  con[0].save();
                } else {
                  response.status(400).send(err);
                }
              });
            }
          }
        });
      }
    });
  } else {
    res.status(400).send("Error in request");
  }
});

app.get("/api/getcomments", (req, response) => {
  if (req.query.id) {
    commentModel.find({ _id: { $in: req.query.id } }, (err, comments) => {
      if (err) {
        response.status(400).send(err);
      } else {
        response.status(200).send(comments);
      }
    });
  } else {
    response.status(404).send("Id not found in request");
  }
});

app.post("/api/getmerch", (req, res) => {
  if (req.body.id) {
    merchModel.find({ _id: req.body.id }, (err, data) => {
      if (err) {
        console.log(err);
        res.status(404).json({ msg: err, items: [] });
      } else {
        res.status(200).json({ msg: "Success", items: data[0], isEnd: false });
      }
    });
  } else {
    merchModel.find({}, (err, data) => {
      if (err) {
        console.log(err);
        res.status(404).json({ msg: err, items: [] });
      } else {
        var isEnd = req.body.start + 8 > data.length ? true : false;
        var arr = data.slice(req.body.start, req.body.start + 8);

        var toSend = [];
        arr.map((val, index) => {
          var value = {
            _id: val._id,
            title: val.title,
            thumbnail: val.thumbnail,
            price: val.price,
            discount: val.discount,
            category: val.category,
            description: val.description,
            quantity: val.quantity,
            bits: val.bits,
          };
          toSend.push(value);
        });
        res.status(200).json({ msg: "Success", items: toSend, isEnd: isEnd });
      }
    });
  }
});

app.get("/api/getmerchcats", (req, res) => {
  MerchCatModel.find({}, (err, data) => {
    if (err || data.length < 1) {
      res.status(400).send("No categories retrieved");
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/api/addmerchcat", (req, res) => {
  if (req.query.name) {
    var merchcat = new MerchCatModel(req.query);
    merchcat.save();
    res.status(200).send(merchcat._id);
  } else {
    res.status(400).send("Bad Request");
  }
});

app.get("/api/removemerchcat", (req, res) => {
  if (req.query.id) {
    MerchCatModel.findById(req.query.id, (err, data) => {
      if (err || !data) {
        console.error("Error finding document:", err);
        res.status(400).send("Bad Request");
      } else {
        if (data.merch.length > 0) {
          merchModel.deleteMany(
            { _id: { $in: data.merch } },
            (error, result) => {
              if (error) {
                console.error("Error deleting document:", error);
                res.status(500).send("Internal Server Error");
              } else {
                // After successfully deleting associated merchModels, now delete the MerchCatModel document itself
                data.deleteOne((deleteErr) => {
                  if (deleteErr) {
                    console.error("Error deleting document:", deleteErr);
                    res.status(500).send("Internal Server Error");
                  } else {
                    res.status(200).send("OK");
                  }
                });
              }
            }
          );
        } else {
          // No associated merchModels, directly delete the MerchCatModel document
          data.deleteOne((deleteErr) => {
            if (deleteErr) {
              console.error("Error deleting document:", deleteErr);
              res.status(500).send("Internal Server Error");
            } else {
              res.status(200).send("OK");
            }
          });
        }
      }
    });
  } else {
    res.status(400).send("Bad Request");
  }
});

app.get("/api/updatemerchcat", (req, res) => {
  if (req.query.id) {
    MerchCatModel.find({ _id: req.query.id }, (err, data) => {
      if (err || data.length < 1) {
        res.status(400).send("Bad Request");
      } else {
        data[0].name = req.query.name;
        data[0].save();
      }
    });
  } else {
    res.status(400).send("Bad Request");
  }
});

// app.get("/api/mycollection", (req, res) => {
//   console.log(req.query.id);
//   if (req.query.id) {
//     userModel.find({ _id: req.query.id }, (err, data) => {
//       if (err) {
//         res.status(400).send(err);
//         console.log(err);
//       } else if (data.length > 0) {
//         consoleModel.find(
//           {
//             _id: {
//               $in: data[0].myconsoles,
//             },
//           },
//           (err, consoles) => {
//             if (err) {
//               // res.status(400).send("No Consoles Found");
//               console.log(err);
//             } else {
//               orderModel.find(
//                 {
//                   _id: {
//                     $in: data[0].myOrders,
//                   },
//                 },
//                 (err, ret) => {
//                   if (err) {
//                     console.log(err);
//                     // res.status(400).send(err);
//                   } else {
//                     var bitshistory = [];
//                     RequestsModel.find(
//                       {
//                         _id: {
//                           $in: data[0].bitshistory,
//                         },
//                       },
//                       (err, histories) => {
//                         if (err || histories.length < 1) {
//                           console.log("Error! No user requests found");
//                         } else {
//                           console.log(histories);
//                           bitshistory = histories;
//                         }
//                       }
//                     );
//                     var consolestoSend = [];
//                     consoles.map((con) => {
//                       consolestoSend.push({
//                         name: con.name,
//                         _id: con._id,
//                         img: con.images[0],
//                         country: con.country,
//                         color: con.color,
//                       });
//                     });

//                     var ordersToSend = [];
//                     ret.map((ord) => {
//                       ordersToSend.push({
//                         payer_name: ord.payer.name,
//                         _id: ord._id,
//                         img: ord.cart[0].img,
//                       });
//                     });

//                     var toSend = {
//                       myconsoles: consolestoSend,
//                       verified: data[0].verified,
//                       isPremium: data[0].isPremium,
//                       bits: data[0].wallet.bits,
//                       image: data[0].thumbnail,
//                       username: data[0].username,
//                       country: data[0].country,
//                       myOrders: ordersToSend,
//                       isAdmin:
//                         data[0].authenticationtype === "Admin" ? true : false,
//                       email: data[0].email,
//                       bitshistory: bitshistory,
//                       twoFactorEnabled: data[0].twoFactorEnabled,
//                     };

//                     res.status(200).send(toSend);
//                   }
//                 }
//               );
//             }
//           }
//         );
//       } else {
//         res.status(200).send(false);
//       }
//     });
//   } else {
//     res.status(400).send("Bad Request");
//   }
// });

app.get("/api/mycollection", async (req, res) => {
  try {
    const userId = req.query.id;
    if (!userId) {
      return res.status(400).send("Bad Request");
    }

    const userData = await userModel.findOne({ _id: userId });
    if (!userData) {
      return res.status(400).send(false);
    }

    const [consoles, orders, histories] = await Promise.all([
      consoleModel.find({ _id: { $in: userData.myconsoles } }),
      orderModel.find({ _id: { $in: userData.myOrders } }),
      RequestsModel.find({ _id: { $in: userData.bitshistory } }),
    ]);

    const consolestoSend = consoles.map((con) => ({
      name: con.name,
      _id: con._id,
      img: con.images[0],
      country: con.country,
      color: con.color,
    }));

    const ordersToSend = orders.map((ord) => ({
      payer_name: ord.payer.name,
      _id: ord._id,
      img: ord.cart[0].img,
    }));

    const bitshistory = histories || [];

    const toSend = {
      myconsoles: consolestoSend,
      verified: userData.verified,
      isPremium: userData.isPremium,
      bits: userData.wallet.bits,
      image: userData.thumbnail,
      username: userData.username,
      country: userData.country,
      myOrders: ordersToSend,
      isAdmin: userData.authenticationtype === "Admin",
      email: userData.email,
      bitshistory: bitshistory,
      twoFactorEnabled: userData.twoFactorEnabled,
    };

    res.status(200).send(toSend);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/bitslog", async (req, res) => {
  try {
    const userId = req.query.id;
    if (!userId) {
      return res.status(400).send("Bad Request");
    }

    const userData = await userModel.findOne({ _id: userId });
    if (!userData) {
      return res.status(400).send(false);
    }

    const [histories] = await Promise.all([
      RequestsModel.find({ _id: { $in: userData.bitshistory } }),
    ]);

    const bitshistory = histories || [];

    res.status(200).send(bitshistory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const sharpProcessor = (buffer, width, height) => {
  return sharp(Buffer.from(buffer.split("base64,")[1], "base64"))
    .resize(500, 500)
    .webp({ lossless: false })
    .toBuffer({ resolveWithObject: false });
};

app.post("/api/addmerch", (req, res) => {
  var newMerch = new merchModel(req.body);
  newMerch.save((err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.status(200).json({ msg: "Success", id: newMerch._id });
    }
  });

  // newMerch.title = .title;
  // newMerch.price = req.body.price;
  // newMerch.description = req.body.description;
  // newMerch.quantity = req.body.quantity;
  // newMerch.discount = req.body.discount;
  // newMerch.bits = req.body.bits;
  // var images = req.body.images;
  // var promises = [];

  // images.map((img) => {
  //   promises.push(sharpProcessor(img));
  // });

  // Promise.all(promises).then((response) => {
  //   response.map((img, index) => {
  //     newMerch.images[index] =
  //       "data:image/webp;base64," + Buffer.from(img).toString("base64");
  //   });

  // });
});

app.get("/api/bits", (req, res) => {
  if (req.query.id) {
    userModel.find({ _id: req.query.id }, (err, data) => {
      if (err || data.length < 1) {
        console.log(err);
        return res.status(400).send("Bad Request");
      } else {
        return res.status(200).send(JSON.stringify(data[0].wallet.bits));
      }
    });
  } else {
    return res.status(400).send("Bad Request");
  }
});

app.post("/api/editmerch", (req, res) => {
  merchModel.findOneAndUpdate(
    { _id: req.body.id },
    req.body.merch,
    { new: true },
    (err, result) => {
      if (err) {
        res.status(200).json({ result: err, status: false });
      } else {
        res.status(200).json({ result: result, status: true });
      }
    }
  );
});

app.post("/api/deletemerch", (req, res) => {
  merchModel.findOneAndDelete({ id: req.body.id }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send("Success");
    }
  });
});

// app.post("/api/neworder", (req, res) => {
//   if (req.body.user) {
//     var newOrder = new orderModel(req.body);
//     newOrder.save((err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(400).send(err);
//       } else {
//         userModel.find({ _id: req.body.user }, (err, data) => {
//           if (err) {
//             console.log(err);
//             res.status(400).send("Error Finding User");
//           } else if (data.length > 0) {
//             data[0].myOrders.push(result._id);
//             var bithist = new RequestsModel({
//               user: data[0]._id,
//               username: data[0].username,
//               description: "",
//               type: "",
//               Bits: req.body.bitsSpent,
//               BitsString:
//                 "Spent " + req.body.bitsSpent + "Bits in nostalgia store",
//               BitsDate: new Date(),
//               BitsStatus: "Deducted",
//             });
//             bithist.save();
//             data[0].bitshistory.push(bithist._id);
//             data[0].save();

//             newOrder.cart.map((item) => {
//               merchModel.find({ _id: item.id }, (err, merch) => {
//                 if (err || merch.length < 1) {
//                   console.log(err);
//                 } else {
//                   merch[0].quantity = merch[0].quantity - item.quantity;
//                   if (merch[0].quantity === 0) {
//                     merch[0].deleteOne();
//                   } else {
//                     merch[0].save();
//                   }
//                 }
//               });
//             });
//             res.status(200).send("Success");
//           } else {
//             res.status(400).send("User Not Found in Database");
//           }
//         });
//       }
//     });
//   } else {
//     res.status(400).send("Bad Request");
//   }
// });

app.post("/api/neworder", async (req, res) => {
  try {
    if (!req.body.user) {
      return res.status(400).json({ error: "Bad Request" });
    }

    const newOrder = new orderModel(req.body);
    const savedOrder = await newOrder.save();

    const userData = await userModel.findById(req.body.user);
    if (!userData) {
      return res.status(400).json({ error: "User Not Found in Database" });
    }

    userData.myOrders.push(savedOrder._id);

    const bithist = new RequestsModel({
      user: userData._id,
      username: userData.username,
      description: "",
      type: "",
      Bits: req.body.bitsSpent,
      BitsString: "Spent " + req.body.bitsSpent + "Bits in nostalgia store",
      BitsDate: new Date(),
      BitsStatus: "Deducted",
    });
    await bithist.save();
    userData.bitshistory.push(bithist._id);
    await userData.save();

    for (const item of newOrder.cart) {
      const merch = await merchModel.findById(item.id);
      if (merch && merch.quantity > 0) {
        merch.quantity -= item.quantity;
        if (merch.quantity === 0) {
          await merch.remove();
        } else {
          await merch.save();
        }
      }
    }

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/getorders", (req, res) => {
  // add check for admin Login
  orderModel.find({}, (err, data) => {
    if (err) res.status(400).send(err);
    else {
      var isEnd = data.length < req.body.start + 12 ? true : false;
      var sliced = data.slice(req.body.start, req.body.start + 12);
      res.status(200).json({ orders: sliced, isEnd: isEnd });
    }
  });
});

app.post("/api/editBrand", (req, res) => {
  brandModel.find({ _id: req.body.id }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    if (req.body.brand.image) {
      data[0].image = req.body.brand.image;
    }
    if (req.body.brand.name) {
      data[0].name = req.body.brand.name;
    }
    data[0].save();
    res.status(200).send(data[0]);
  });
});

app.post("/api/editcategory", (req, res) => {
  subcatsModel.find({ _id: req.body.id }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    if (req.body.subcat.image) {
      data[0].image = req.body.subcat.image;
    }
    if (req.body.subcat.name) {
      data[0].name = req.body.subcat.name;
    }
    data[0].save();
    res.status(200).send(data[0]);
  });
});

app.post("/api/deleteorder", (req, res) => {
  // add check for admin Login
  if (req.body.id) {
    orderModel.find({ _id: req.body.id }).deleteOne((err, data) => {
      if (err) res.status(400).send(err);
      else res.status(200).send("Success");
    });
  } else res.status(400).send("Bad Request");
});

app.post("/api/getstats", async (req, res) => {
  try {
    const stats = {
      orders: await orderModel.countDocuments(),
      products: await merchModel.countDocuments(),
      users: await userModel.countDocuments(),
      comments: await commentModel.countDocuments(),
      brands: await brandModel.countDocuments(),
      consoles: await consoleModel.countDocuments(),
      blogs: await blogModel.countDocuments(),
      loggedInUsers: await tokenModel.countDocuments(),
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Serve the static files from the build directory
app.use(
  expressStaticGzip(path.join(__dirname, "build/"), {
    enableBrotli: true, // Enable Brotli compression
    orderPreference: ["br", "gzip", "deflate"], // Serve Brotli files first
  })
);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

http.createServer(app).listen(1337, () => {
  console.log("Server is running." + port);
});
