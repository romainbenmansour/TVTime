# Spectacle
API for spectacle !

## How it works
First you have to login with your facebook account. Then you will have access to all endpoints that you might need with your id and token.


## Endpoints

#### POST /user/login/facebook

Login via Facebook. You need to send a facebook access_token and your facebook user id.

###### HTTP POST PARAMS
```json
{
    "profile_id": "your facebook id",
    "access_token": "your facebook access token"
}
```

###### HTTP RESPONSES

200 -> Everything is great
```json
{
  "id": "your spectacle user id",
  "token": "your spectacle access token"
}
```
All your authentificated request need to send the id as user and token as password via HTTP Basic Auth.
   
400 -> Bad request
```json
{
    "message": "Why your request isn't good"
}
```

-------
#### GET /user/me

Get user information 

###### HTTP RESPONSES

200 -> Everything is great
```json
{
    "last_name": "user last name",
    "first_name": "user first name",
    "gender": "user gender",
    "email": "user email",
    "favorites": [
        "user favorites"
    ]
}
```
401 -> Need authentication

-------
#### GET /user/logout

Delete server side authentification token 

###### HTTP RESPONSES

200 -> Everything is great   
401 -> Need authentication

-------

#### DELETE /user

Delete user account

-------
#### GET /user/params

Get user params

###### HTTP RESPONSES

200 -> Everything is great
```json
[
    {
        "key": "name_of_the_key",
        "value": "value_of_the_key"
    }
]
```
401 -> Need authentication

-------

#### POST /user/params

Add and get user params


###### HTTP PARAMETERS

All POST variables sent to this endpoint will be saved as user parameters.

###### HTTP RESPONSES

200 -> Everything is great
```json
[
    {
        "key": "name_of_the_key",
        "value": "value_of_the_key"
    }
]
```
401 -> Need authentication

-------

#### GET /user/favorites

Retrieve all user favorite

###### HTTP RESPONSES

200 -> Everything is great
```json
[
    {
        "_id": "show id",
        "data": "JSON in string format of the show"
    }
]
```
401 -> Need authentication

-------

#### POST /user/favorites

Add a show in the favorite user's list 

###### HTTP POST PARAMS

You need to send the JSON of the show. Whatever you send, you will get it back with "GET / user/favorites".
You must provide an id within that JSON.

```json
{
    "data": {
        "id": 123,
        "whatever": "whatever",
        "etc": "etc"
    }
}
```

###### HTTP RESPONSES

200 -> Everything is great
```json
{
    "message": "ok"
}
```
400 -> Bad request : No "data" in http request or no data.id or bad formatted JSON.
```json
{
    "message": "message with error explained"
}
```
401 -> Need authentication

-------

#### DELETE /user/favorites/:id

Remove the show given in url parameters

###### HTTP RESPONSES

200 -> Everything is great
```json
{  
    "message": "ok"
}
```
401 -> Need authentication

-------

#### GET /user/device

Retrieve all user device id

###### HTTP RESPONSES

200 -> Everything is great
```json
[
    "device_id",
    "etc"
]
```
401 -> Need authentication

-------

#### POST /user/device

Register device for push notification

###### HTTP POST PARAMS

You need send the device ID for Google Cloud Messaging

```json
{
    "device": "id device"
}
```

###### HTTP RESPONSES

200 -> Everything is great
```json
{
    "message": "ok"
}
```
400 -> Bad request : No "device" in http request
```json
{
    "message": "message with error explained"
}
```
401 -> Need authentication

-------

#### DELETE /user/device/:id

Remove the device id given in url parameters

###### HTTP RESPONSES

200 -> Everything is great
```json
{  
    "message": "ok"
}
```
401 -> Need authentication

### Tests
Incoming bro

### Issues
You can post github issue if you have problem with any of this
