const https = require("https");

const options = {
  hostname: "https://92.205.59.153/",
  port: 1337,
  method: "GET",
};

const req = https.request(options, (res) => {
  console.log("SSL/TLS Protocol Version:", res.socket.getProtocol());
  // This should log the SSL/TLS protocol version being used, such as "TLSv1.2"

  // Do something with the response
});

req.on("error", (e) => {
  console.error(e);
});

req.end();
