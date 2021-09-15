## REST API

# Description
 This API will provide a way to administer a school database containing information about users and courses.

 # Technologies Used
  Javascript
  Express
  Sequelize
  Node
  Bcrypt
  Basic Authorization

 # How to interact with the app?
  Download project files
  Run npm install to acquire dependencies
  Use npm start to start the server and connect to database
  Use an API platform such as Postman to perform CRUD requests to the provided databas via localhost: 5000

# How the app works? 
  
  The API is separated into 2 distinc routes

  # User Route
  A /api/users GET route will return all properties and values for the currently authenticated User along with a 200 HTTP status code.
  
  A /api/users POST route will create a new user, set the Location header to "/", and return a 201 HTTP status code and no content.

  # Course Route

  A /api/courses GET route  will return all courses including the User associated with each course and a 200 HTTP status code.

  A /api/courses/:id GET route  will return the corresponding course including the User associated with that course and a 200 HTTP status code.

  A /api/courses POST route  will create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code and no content.

  A /api/courses/:id PUT route that will update the corresponding course and return a 204 HTTP status code and no content.

  A /api/courses/:id DELETE route that will delete the corresponding course and return a 204 HTTP status code and no content.

# Validation + Constraints + Authentication + Authorization

  # User Model 
  
  /api/users POST
  * firstName, lastName & password [STRING] values cannot be left empty or null.
    - password values will be encrypted using the bcrypt package before being uploaded to the database.

  * emailAddress values [STRING] must be unique and have a valid email structure.
    - The emailAddress will be use as the username in the basic Authorization header
  
  # Course Model

  /api/courses POST
  /api/courses PUT

  * title, description [STRING, TEXT] values cannot be left empty or null.

  # Authentication Middleware
  A user must be authenticated in order to get data on the current user or to create, update, or delete courses.

  The auth-user.js file contains a function whose purpose is to use the Authorization header on the request to authenticate the user credenticals. If authentication fails a 401 HTTP status code and "Access Denied" message is generated.

  This middleware would be used to authenticate the following routes:
  /api/users GET
  /api/courses POST
  /api/courses/:id PUT
  /api/courses/:id DELETE

# Testing 
  There are 2 ways two perform request tests in this api:

  1. RESTAPI.postman_collection.json file can be imported into Postman to test the requests.
  2. You can use the REST Client extension package in VS Code. Once installed you can test the API using the tests.http file.
