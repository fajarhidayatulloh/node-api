define({ "api": [    {        "type": "post",        "url": "/auth/login",        "title": "Login",        "name": "Get Token",        "group": "Client",        "parameter": {            "fields": {                "Parameter": [                    {                    "group": "Parameter",                    "type": "String",                    "optional": false,                    "field": "email",                    "description": "<p>Users Email Registered.</p.</p>"                    },                    {                    "group": "Parameter",                    "type": "String",                    "optional": false,                    "field": "password",                    "description": "<p>Users Password Registered.</p>"                    }                ]            }        },        "success": {            "examples": [                {                    "title": "Success-Response:",                    "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"true\",\n  \"status_code\": \"200\",\n  \"token_type\": \"Bearer\",\n  \"access_token\": \"Access Token\"\n}",                    "type": "json"                }            ]        },        "error": {            "examples": [                {                    "title": "Error-Response:",                    "content": "HTTP/1.1 404 Error\n{\n  \"status\": \"false\",\n  \"status_code\": \"401\",\n  \"message\": \"Email or Password is not Matches.\"\n}",                    "type": "json"                }            ]        },        "version": "1.0.0",        "filename": "./apidoc/_apidoc.js",        "groupTitle": "Client"      }] });