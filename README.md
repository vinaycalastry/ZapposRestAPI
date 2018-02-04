# ZapposRestAPI

### Technologies used
| Application   | Version       |       
| ------------- |:-------------:|
| Node.js       | 8.9.1         |
| npm           | 5.5.1         |
| MySQL         | 5.7           |
| Redis         | 3.0.6        |

__PS: Used Redis on Ubuntu whereas the rest were installed on Windows as Redis does not officially support Windows__

### Steps to run

1. Install Node.js, MySQL and Redis.
2. Run **git clone https://github.com/vinaycalastry/ZapposRestAPI.git** to get the code from GitHub.
3. Run the MySQLDB.sql script file provided for the tables to be created.
4. Edit the **.env** file provided with correct values for MySQL DB and Redis
5. Navigate to the restaurantapi folder(where package.json is located) and run **npm install** in console. This step is to install dependencies required for the RestAPI to work.
6. Run **npm test** to run the unit-test cases.
7. Run **npm start** inorder to start the webserver.


### Rest API Endpoints

**BaseURL**: http://localhost:5000

*Body type for POST*: application/json

_Please check included **Endpoints_and_testcases.xlsx** file for more info_

| Endpoint        | HTTP Verb | Purpose                                                                 | Example                            | JSON Example                                                                                          |
|-----------------|-----------|-------------------------------------------------------------------------|------------------------------------|-------------------------------------------------------------------------------------------------------|
| /               | GET       | Base URL to check if webservice is up                                   | http://localhost:5000              |                                                                                                       |
| /restaurant/:ID | GET       | Get a Restaurant details using its Restaurant ID                        | http://localhost:5000/restaurant/2 |                                                                                                       |
| /restaurant/:ID | DELETE    | Delete a Restaurant and its details using its Restaurant  ID            | http://localhost:5000/restaurant/2 |                                                                                                       |
| /restaurant     | POST      | Add a new restaurant to the Database and generate a Restaurant ID       | http://localhost:5000/restaurant   | {"RNAME":"Jack in the Box","ADDRESS":"San Fransisco","PHONE":"500-004-3003"}                          |
| /menu/:ID       | GET       | Get menus of a restaurant using its Menu ID                             | http://localhost:5000/menu/2       |                                                                                                       |
| /menu/:ID       | DELETE    | Delete Menus of a restaurant using its Menu ID                          | http://localhost:5000/menu/2       |                                                                                                       |
| /menu           | POST      | Add a new menu to a restaurant and generate a Menu ID                   | http://localhost:5000/menu         | {"MNAME":"Dinner","MDETAILS":"All dishes relating to dinner before 9:00PM are stored here","RID":"1"} |
| /menuItem/:ID   | GET       | Get menu items in a menu of a restaurant using its MenuItem ID          | http://localhost:5000/menuItem/2   |                                                                                                       |
| /menuItem/:ID   | DELETE    | Delete menu items in a menu of a restaurant using its MenuItem ID       | http://localhost:5000/menuItem/2   |                                                                                                       |
| /menuItem       | POST      | Add a new menuitem to a menu of a restaurant and generate a MenuItem ID | http://localhost:5000/menuItem     | {"MITEMNAME":"PrimeRib","MITEMDETAILS":"Burger","MITEMPRICE":4.95,"MID":"1","RID":"1"}                |