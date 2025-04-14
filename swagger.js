const m2s = require('mongoose-to-swagger'); // μετατρέπει σε json κι εμφανίζει το μοντέλο του mongoose (user.model)
const User = require('./models/user.model');

exports.options = {
  "components": {
    "schemas": {
      User: m2s(User)
    },
    "securitySchemes": {  // ορισμός τύπων security - για κλήσεις που θέλουν authorization
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "security": [ // τύποι security που χρησιμοποιούνται
    {"bearerAuth":[]}
  ],
  "openapi":"3.1.1",
  "info":{  // στοιχεία της εφαρμογής μας
    "version": "1.0.0",
    "title": "Users CRUD API",
    "description":"An application for creating and managing users.",
    "contact": {
      "name": "API Support",
      "url": "https://aueb.gr",
      "email":"support@example.com"
    }
  },
  "servers": [
    {
      url:"http://localhost:3000",
      description:"Local Server"
    },
    {
      url:"http://www.backend.aueb.gr",
      description: "Testing server"
    }
  ],
  "tags": [
    {
      "name": "Users",
      "description": "Endpoints for User"
    },
    {
      "name": "Users and Products",
      "description": "Endpoints for users and their products"
    },
    {
      "name":"Auth",
      "description": "Endpoints for Authentication"
    }
  ],
  "paths": {
    "/api/users": {
      "get": {
        "tags":["Users"]
        , // μπορούμε να ορίσουμε πάνω από ένα tags
        "description":"Returns a list of all users",
        "responses":{
          "200":{
            "description": "List of all users",
            "content": {
              "application/json": {
                "schema": {
                  "type":"array",
                  "items": {  // περιεχόμενα του type (array)
                    "$ref":"#/components/schemas/User"
                  }
                }
              }
            }
          }
        }
      },
      "post":{
        "tags": ["Users"],
        "description": "Data of users that we want to create",
        "requestBody":{
          "description": "JSON with user data",
          "content": {
            "application/json": {
              "schema":{
                "type":"object",
                "properties":{
                  "username": {"type":"string"},
                  "password": {"type":"string"},
                  "name": {"type": "string"},
                  "surname": {"type":"string"},
                  "email": {"type":"string"},
                  "address": {
                    "type": "object",
                    "properties": {
                      "area": {"type":"string"},
                      "road": {"type":"string"}
                    }
                  },
                  "phone": {
                    "type":"array",
                    "items": {
                      "type": "object",
                      "properties":{
                        "type": {"type": "string"},
                        "number": {"type": "number"}
                      }
                    }
                  }
                },
                "required":["username", "password", "name", "surname", "email"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "JSON of new user"
          }
        }
      }      
    },
    "/api/users/{username}":{
      "get": {
        "tags": ["Users"],
        "parameters": [ // εδώ τεκμηριώνονται οι path parameters σε array
          {
            "name": "username",
            "in":"path",
            "required":true,
            "description": "Username of the user we want to find",
            "type": "string"
          }
        ],
        "description": "Returns user details for specific username",
        "responses": {
          "200": {
            "description": "User details",
            "content":{
              "application/json":{
                "schema": {
                  "$ref":"#/components/schemas/User"
                }
              }
            }            
          }
        }
      },
      "patch":{
        "tags": ["Users"],
        "description": "Update user",
        "parameters":[
          {
            "name":"username",
            "in":"path",
            "required":true,
            "description": "Username of user that can update",
            "type":"string"
          }
        ],
        "requestBody":{
          "description":"Data of user to update",
          "content": {
            "application/json":{
              "schema": {
                "type":"object",
                "properties":{
                  "username": {"type":"string"},
                  "name": {"type":"string"},
                  "surname": {"type":"string"},
                  "email":{"type": "string"},
                  "address": {
                    "type":"object",
                    "properties":{
                      "area": {"type": "string"},
                      "road": {"type": "string"}
                    }
                  }
                },
                "required": ["email"]
              }
            }
          }
        },
        "responses":{
          "200":{
            "descripiton": "Update user"
          }
        }
      },
      "delete": {
        "tags": ["Users"],
        "description": "Delete user from DB",
        "parameters": [
            {
                "name": "username",
                "in":"path",
                "description": "User to delete",
                "type": "string",
                "required": true
            }
        ],
        "responses": {
            "200":{
                "description":"Delete user"
            }
        }
      }
    },
    "/api/auth/login": {
      "post": {
        "tags": ["Auth"],
        "description": "Login User",
        "requestBody": {
          "description": "User sends username and password and gets a jwt token for response",
          "content": {
            "application/json":{
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "password": { "type": "string" }
                },
                "required": ["username", "password"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Token returned"
          }
        }
      }
    },
    "/api/user-product/{username}":{
        "get": {
            "tags": ["Users and Products"],
            "parameters": [
                {
                    "name":"username",
                    "in":"path",
                    "required":true,
                    "description": "Find user and products",
                    "type": "string"
                }
            ],
            "responses":{
                "200": {
                    "description": "User and Products",
                    "schema": {
                        "$ref": "#/components/schemas/User"
                    }
                }
            }
        }
    }
  }
}