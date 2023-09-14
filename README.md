# express-to-do-list-app
In order to run the app please make sure you start mongodb locally and that the mongodb credentials match the env file
<code>`docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=<user> -e
MONGO_INITDB_ROOT_PASSWORD=<password> mongo`<code>

Visit the api documentation at http://localhost:<PORT>/api-docs/.

All the request require a JWT token, which is sent under a  custom value in the header (to be rewritten in order to use proper authentification conventions).
