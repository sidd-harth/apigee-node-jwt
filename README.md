# Apigee Node JWT
Simple implementation of JWT **generation**,**validation** & **verification** using Nodejs in Apigee.

Few error cases are handled using JWT tag:
```
"iat": Math.floor(Date.now() / 1000) - 30, // token issued at
"nbf": Math.floor(Date.now() / 1000) + (60), //token is not valid before this time
"exp": Math.floor(Date.now() / 1000) + (600), //token expiration time set to 3600 secs
```
