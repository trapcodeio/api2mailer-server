# Api2Mailer

This package enables us to test online smtp/mailer functionality from localhost without changing nodemailer's Api.

## What is included?
- A web server.
- An importable package.


### Web Server
This webserver should be hosted on the same server your main project is using.

It takes in nodemailer's `sendMail` data via post request and sends the mail on the server.

#### Hosting the server.
Run
```shell
node app cli @ makeConfig
```