# FitnessTracker Backend API Specifications

Create the backend for a fitness-tracker website. The frontend/UI is created in separate project. It is currently using firebase and can be found at https://fitness-tracker-de06b.web.app/. This new API must completely mimic the firebase implementation, though being implemented with Node.js, express, MongoDB, Mongoose tech stack.

## MVP notes

Backend-API MVP is hosted on https://fitness-tracker.live (you can try it out immediately simply from the browser https://fitness-tracker.live/exercises?lang=ukr,en or using [Postman](https://documenter.getpostman.com/view/11961976/UzBmMSbR) )

### Exercises (MVP - released)

- List all exercises in the database
  - Authenticated users only
  - Selecet specific language (default=en)
  - Pagination
  - Select specific fields in result
  - Limit number of results
  - Filter by fields
- Get single exercise
  - Authenticated users only
  - Select specific fields in result
  - Select language
- Create new exercise
  - Authenticated users only
  - Field validation via Mongoose
  - create translations before saving to database
- Update exercises
  - Authenticated users only
  - Validation on update
- Delete Exercise
  - Authenticated users only
  - Must have the role "admin"
  - Delete all translations for exercise

### Exercises quick search (Post MVP - to be done)

- Algolia integration
- Endpoint for exercises quick search by name

### ExercisesTranslations (MVP - released)

- Implemented by Integration with Google Translate API
- Possibility to select one of languages: ["en","ukr","bg","ru"]
- Two possibilities to select language:
  - custom query: `?language=ukr,bg`
  - `select` query: `select=ukr`, for specific fields `select=ukr.name, ukr.instructions`

### Workouts (Post MVP - to be done)

- List all workouts
  - Authenticated users only
  - Pagination, filtering, etc
- Get single workout
- Create new workout
  - Authenticated users only
  - Must have the role "admin"
- Update workout
  - Authenticated users only
  - Must have the role "admin"
- Delete course
  - Authenticated users only
  - Must have the role "admin"

### Users & Authentication (MVP - released)

Authentication/Authorization should be implemented by integrating with existed FirebaseAuth functionality.

- Authentication will be done using JWT
- User registration
  - Register as a "TRAINEE" or "admin"
  - Once registered, a token will be sent
- User login
  - User can login with email and password
  - Plain text password will compare with stored hashed password
  - Once logged in, a token will be sent along with a cookie (token = xxx)
- Get user
  - Route to get the currently logged in user (via token)

### \*_Post MVP Auth (to be done)_ :

- Register as "admin"
- User logout (\*post MVP)
  - Cookie will be sent to set token = none
- Password reset (lost password) (\*post MVP)
  - User can request to reset password
  - A hashed token will be emailed to the users registered email address
  - A put request can be made to the generated url to reset password
  - The token will expire after 10 minutes
- Update user info (\*post MVP)
  - Authenticated user only
  - Separate route to update password
- User CRUD (\*post MVP)
  - Admin only
- Users can be made by endpoint (\*post MVP)

## Security (MVP - released)

- Encrypt passwords and reset tokens
- Prevent NoSQL injections
- Add headers for security (helmet)
- Prevent cross site scripting - XSS
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution
- Use cors to make API public (for now)

## Code quality (MVP - released)

- ESlint
- Husky:
  - pre-commit hook: lint
  - pre-push hook: lint + test
- Prettier

## Documentation (MVP - released)

- Use Postman to create documentation
- Use docgen to create HTML files from Postman
- Add html files as the / route for the api

## Deployment (Digital Ocean) (MVP - released)

- Push to Github
- Create a droplet - https://m.do.co/c/5424d440c63a
- Clone repo on to server
- Use PM2 process manager
- Enable firewall (ufw) and open needed ports
- Create an NGINX reverse proxy for port 80
- Connect a domain name
- Install an SSL using Let's Encrypt

## CI/CD (MVP - released)

- CI pipeline for Pull requests: lint, test, build
- CD pipeline consist of 2 consequent jobs:
  - lint, test, build
  - deploy
- CI/CD implemented by use of Github Actions with Secrets
