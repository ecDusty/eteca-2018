# Server side code

## API Documentation

site root: http://23.98.37.11/api

### End points

#### User

* ```/user/get.php?id={id}```
Retrieves user details using ID

* ```/user/create.php?name={name}&email={email}&password={password}```
Creates a new user

* ```/user/authenticate.php?email={email}&password={password}```
Authenticates the user (login)

* ```/user/groopys.php?id={id}```
Retrieves list of groopys attended (or will be attended) by user with ID

* ```/user/checkin.php?code={code}```
Checks in user after scanning QR code at groopy venue

* ```/user/join.php?id={user_id}&g_id={groopy_id}```
User (attempts to) join specific groopy


#### Restaurant

* ```/restaurant/get.php?id={id}```
Retrieves restaurant details using ID

* ```/restaurant/list.php```
List all restaurants


#### Groopy

* ```/groopy/get.php?id={id}```
Retrieves groopy using ID

* ```/groopy/list.php```
List all groopys

* ```/groopy/list.php?r_id={r_id}```
List all groopys by restaurant ID
