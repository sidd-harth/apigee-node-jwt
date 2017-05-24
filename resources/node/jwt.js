// sign with default (HMAC SHA256) 
var jwt = require('jsonwebtoken');
var apigee = require('apigee-access');
var http = require('http');
var express = require('express');
var usergrid = require('usergrid');

var app = express();
app.use(express.bodyParser());




app.get('/generateToken', function(req, resp) {
var devAppName  = apigee.getVariable(req,'verifyapikey.Verify-API-Key-1.DisplayName');
var devEmail = apigee.getVariable(req,'developer.email');
var apiToken = apigee.getVariable(req,'apigee.client_id');
//var secretKey = 'secret2';
var secretKey = apiToken;
    var JWTOKEN = apigee.getVariable(req, 'jwtToken');
    console.log("JWTOKEN is ", JWTOKEN);
    if (JWTOKEN === null) {
        var payload = {
            "iss": "siddharth.cfapps.io",
            "aud": "API Developers",
            "app":devAppName,
            "email":devEmail,
            "iat": Math.floor(Date.now() / 1000) - 30, //token issued at
            "nbf": Math.floor(Date.now() / 1000) + (60), //token not valid -- not before this time
            "exp": Math.floor(Date.now() / 1000) + (600), //token expiration time set to 3600secs
            "typ": "/online/transactionstatus/v2"
        };


        var token = jwt.sign(payload, secretKey);
        console.log(token);
        if (token !== null) {
            resp.jsonp(200, {
                "deatils": {
                    'message': 'this token has exp time and nbf claim, please check them',
                    'token': token,
                }
            });
            return;
        }

    } else {
        ///verify token
        var verify = jwt.verify(JWTOKEN, secretKey, function(err, decoded) {
            if (err) {
                console.log("wrong signature ", err)
                //var error2=JSON.parse(err)
                console.log("error name is ",err.name);
                    if(err.name === 'NotBeforeError'){
                        //console.log("NBF is active");
                        resp.jsonp(400, {
                                'errror': "token is not yet active",
                                'activeAt': err.date
                            });
                                return;
                        }else if(err.name === "TokenExpiredError"){
                            resp.jsonp(401, {
                                'errror': "token is expired",
                                'expiredAt': err.expiredAt
                            });
                                return;
                        }else{
                            resp.jsonp(400, {
                                'errror': "error in JWT...error is not about nbf & exp",
                            });
                                return; 
                        }
            }
            console.log("payload is ", decoded) // bar 
            if (decoded !== null) {
                resp.jsonp(200, {
                    "deatils": {
                        'payload': decoded
                    }
                });
                return;
            }
        });


    }
    //resp.end('Testing generation & verification of JWT');
});

app.listen(9000, function() {
    console.log('Node HTTP server is listening');
});