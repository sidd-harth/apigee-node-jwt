# Apigee Node JWT
Simple implementation of JWT **generation**,**validation** & **verification** using Nodejs in Apigee.

This makes use of an **API Key** to get developer details, so add the proxy to an product to use the Api Key.

Moreover **jsonwebtoken** node module has to be installed in your Apigee Environment before using this.

## Few error cases are handled using JWT tag:

- "iat": Math.floor(Date.now() / 1000) - 30, // token issued at
- "nbf": Math.floor(Date.now() / 1000) + (60), //token is not valid before this time
- "exp": Math.floor(Date.now() / 1000) + (600), //token expiration time set to 3600 secs
