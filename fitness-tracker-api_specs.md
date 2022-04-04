# FitnessTracker Backend API Specifications

Create the backend for a fitness-tracker website. The frontend/UI is created in separate project. The html/css template has been created and can be used as a reference for functionality. All of the functionality below needs to be fully implmented in this project.

### Exercises

- List all exercises in the database
  - Authenticated users only
  - Selecet specific language (default=en)
  - Pagination
  - Select specific fields in result
  - Limit number of results
  - Filter by fields
- Get single exercise
  - Authenticated users only
  - by language (default=en)
- Create new exercise
  - Authenticated users only
  - Must have the role "admin"
  - Field validation via Mongoose
  - create translations before saving to database
- Upload a photo for exercise
  - Authenticated users only
  - Must have the role "admin"
  - Photo will be uploaded to local filesystem
- Update exercises
  - Authenticated users only
  - Must have the role "admin"
  - Validation on update
- Delete Exercise
  - Authenticated users only
  - Must have the role "admin"
  - Delete all translations for exercise

### ExercisesTranslations

- Get translation for exercise
- Create a translations
  - Authenticated users only
  - Must have the role "admin"
- Update translation
  - Admin only
- Delete translation
  - Admin only

### Workouts

- List all workouts
  - Authenticated users only
  - Pagination, filtering, etc
- Get single workout
- Create new workout
  - Authenticated users only
  - Only the owner or an admin can create a course for a bootcamp
  - Publishers can create multiple courses
- Update workout
  - Authenticated users only
  - Must have the role "admin"
- Delete course
  - Authenticated users only
  - Must have the role "admin"

### Users & Authentication

- Authentication will be ton using JWT/cookies
  - JWT and cookie should expire in 30 days
- User registration
  - Register as a "user" or "publisher"
  - Once registered, a token will be sent along with a cookie (token = xxx)
  - Passwords must be hashed
- User login
  - User can login with email and password
  - Plain text password will compare with stored hashed password
  - Once logged in, a token will be sent along with a cookie (token = xxx)
- User logout
  - Cookie will be sent to set token = none
- Get user
  - Route to get the currently logged in user (via token)
- Password reset (lost password)
  - User can request to reset password
  - A hashed token will be emailed to the users registered email address
  - A put request can be made to the generated url to reset password
  - The token will expire after 10 minutes
- Update user info
  - Authenticated user only
  - Separate route to update password
- User CRUD
  - Admin only
- Users can only be made admin by updating the database field manually

## Security

- Encrypt passwords and reset tokens
- Prevent NoSQL injections
- Add headers for security (helmet)
- Prevent cross site scripting - XSS
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution
- Use cors to make API public (for now)

## Documentation

- Use Postman to create documentation
- Use docgen to create HTML files from Postman
- Add html files as the / route for the api

## Deployment (Digital Ocean)

- Push to Github
- Create a droplet - https://m.do.co/c/5424d440c63a
- Clone repo on to server
- Use PM2 process manager
- Enable firewall (ufw) and open needed ports
- Create an NGINX reverse proxy for port 80
- Connect a domain name
- Install an SSL using Let's Encrypt

## Code Related Suggestions

- NPM scripts for dev and production env
- Config file for important constants
- Use controller methods with documented descriptions/routes
- Error handling middleware
- Authentication middleware for protecting routes and setting user roles
- Validation using Mongoose and no external libraries
- Use async/await (create middleware to clean up controller methods)
- Create a database seeder to import and destroy data
