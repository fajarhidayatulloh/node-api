define(    { "api":         [            {                "type": "post",                "url": "/auth/login",                "title": "Login",                "name": "Get Token",                "group": "Client",                "parameter": {                    "fields": {                        "Parameter": [                            {                            "group": "Parameter",                            "type": "String",                            "optional": false,                            "field": "email",                            "description": "<p>Users Email Registered.</p.</p>"                            },                            {                            "group": "Parameter",                            "type": "String",                            "optional": false,                            "field": "password",                            "description": "<p>Users Password Registered.</p>"                            }                        ]                    }                },                "success": {                    "examples": [                        {                            "title": "Success-Response:",                            "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"true\",\n  \"status_code\": \"200\",\n  \"token_type\": \"Bearer\",\n  \"access_token\": \"Access Token\"\n}",                            "type": "json"                        }                    ]                },                "error": {                    "examples": [                        {                            "title": "Error-Response:",                            "content": "HTTP/1.1 404 Error\n{\n  \"status\": \"false\",\n  \"status_code\": \"401\",\n  \"message\": \"Email or Password is not Matches.\"\n}",                            "type": "json"                        }                    ]                },                "version": "1.0.0",                "filename": "./apidoc/_apidoc.js",                "groupTitle": "Client"            },            {                "type": "post",                "url": "/users/registration",                "title": "Users Registration",                "name": "Users Registration",                "group": "Client",                "parameter": {                    "fields": {                        "Parameter": [                            {                            "group": "Parameter",                            "type": "String",                            "optional": false,                            "field": "name",                            "description": "<p>Users Full Name</p.</p>"                            },                            {                            "group": "Parameter",                            "type": "String",                            "optional": false,                            "field": "email",                            "description": "<p>Users Email Address</p.</p>"                            },                            {                            "group": "Parameter",                            "type": "String",                            "optional": false,                            "field": "password",                            "description": "<p>Users Password</p>"                            }                        ]                    }                },                "success": {                    "examples": [                        {                            "title": "Success-Response:",                            "content": "HTTP/1.1 200 Success\n{\n  \"status\": \"200\",\n  \"error\": \"null\",\n  \"message\": \"Registration Successfully.\"\n}",                            "type": "json"                        }                    ]                },                "error": {                    "examples": [                        {                            "title": "Error-Response:",                            "content": "HTTP/1.1 500 Error\n{\n  \"status\": \"500\",\n  \"error\": \"null\",\n  \"message\": \"Whoops, Something Wrong.\"\n}",                            "type": "json"                        }                    ]                },                "version": "1.0.0",                "filename": "./apidoc/_apidoc.js",                "groupTitle": "Client"            },            {                "type": "get",                "url": "/users",                "title": "Users List",                "name": "Users List",                "group": "Client",                "success": {                    "examples": [                        {                            "title": "Success-Response:",                            "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"200\",\n  \"error\": \"null\",\n  \"data\": [\n      {\n          \"nama\": \"Full Name\",\n          \"email\": \"fajar@bareksa.com\",\n          \"created_at\": \"Date Time\"\n      }\n   ]\n}",                            "type": "json"                        }                    ]                },                "error": {                    "examples": [                        {                            "title": "Error-Response:",                            "content": "HTTP/1.1 401 Error\n{\n  \"status\": \"401\",\n  \"error\": \"null\",\n  \"message\": \"Unauthorize.\"\n}",                            "type": "json"                        }                    ]                },                "version": "1.0.0",                "filename": "./apidoc/_apidoc.js",                "groupTitle": "Client"            },            {                "type": "get",                "url": "/users/profile/:id",                "title": "Users Profile",                "name": "Users Profile",                "group": "Client",                "parameter": {                    "fields": {                        "Parameter": [                            {                            "group": "Parameter",                            "type": "Integer",                            "optional": false,                            "field": "id",                            "description": "<p>User id.</p.</p>"                            }                        ]                    }                },                "success": {                    "examples": [                        {                            "title": "Success-Response:",                            "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"true\",\n  \"error\": \"null\",\n  \"data\": [\n      {\n          \"nama\": \"Full Name\",\n          \"email\": \"fajar@bareksa.com\"\n      }\n   ]\n}",                            "type": "json"                        }                    ]                },                "error": {                    "examples": [                        {                            "title": "Error-Response:",                            "content": "HTTP/1.1 401 Error\n{\n  \"status\": \"401\",\n  \"error\": \"null\",\n  \"message\": \"Unauthorize.\"\n}",                            "type": "json"                        }                    ]                },                "version": "1.0.0",                "filename": "./apidoc/_apidoc.js",                "groupTitle": "Client"            }        ]    });