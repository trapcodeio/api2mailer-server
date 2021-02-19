# Api2Mailer

This package enables you to test online smtp/mailer functionality from localhost without changing nodemailer's Api.

## What is included?
- A web server. (This Repo)
- An importable package. [api2mailer](https://npmjs.com/package/api2mailer)


### Web Server
This webserver should be hosted on the same server your main project is using.

It takes in nodemailer's `sendMail` data via post request and sends the mail on the server.

#### Hosting the server.
- clone this repo
- run `npm install` or `yarn install` 
- run `node app cli @ makeConfig` (Create env.json)

Env.json Example:
```json
{
  "port": 2222,
  "transporters": {
    "default": {
      "host": "smtp.mailtrap.io",
      "port": 2525,
      "auth": {
        "user": "",
        "pass": ""
      }
    }
  }
}
```

#### Start Server
```shell
node app
# OR using pm2
pm2 start app.js
```
This will start a server at `http://localhost:2222` or using your desired port.

### Sending Mail to Server

```js
// Example of how you send mail using `nodemailer`
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({/* Transporter Settings */})
await transporter.sendMail({/* Mail Options */});

// Example of how you send mail using `api2mailer`
const nodemailer = require('api2mailer')
const transporter = nodemailer.createTransport({/* Transporter Settings */})
await transporter.sendMail({/* Mail Options */});
```

The difference between both is: `api2mailer` proxies your data to your `api2mailer-server` endpoint to send your mail.