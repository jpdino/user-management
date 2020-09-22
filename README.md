# RESTful API | User Management

## Dev Environment
- Node v14.4.0
- npm v6.14.5
- Express v4.17.1
- MongoDB v4.4.1
- Typescript v4.0.3

## Installation
npm install

## Run
- run typescript compiler in command line: 'tsc'
- run local server: 'npm run test / npm run dev'
    - if database doesn't exist, app will create default/primary data 'Administrator'

## Test
Use any REST client (ie. Postman) to test the following endpoints:
- '/api/createUser' => Adds a user into db 
- '/api/listUser' => lists all non 'archived' users.
- '/api/getUser/:id' => fetch only one user by id.
- '/api/updateUser/:id' => update user's data, user selected is based on id.
- '/api/deleteUser/:id' => remove a user from db
    
````````
Sample data
{
    "name" : "Bruce Wayne",
    "email": "iamthebat@night.jk",
    "age":  40,
    "birthdate": "05/31/1980"
}

```````` 

### MongoDB connection url 
This is currently set to run locally.

### TODO
1. Validation for all fields (could be done on client side, but supplement in back end):
	- name: Must only contain valid 'name' format (No numbers, no special characters)
	- email: Must be a valid email address
	- age: Verify that is is a number
	- birthdate: Curently using MM/DD/YYYY format, may need to change validation to follow DD/MM/YYYY  
	
2. User Creation:
    - (optional) email addresses may not be duplicated
    
3. MongoDB connection:
    - Setup staging DB location (add secure db connection credentials) 
    
4. Further testing and playing around with different scenarios
    

