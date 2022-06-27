# FitnessTracker API

> Backend API for [FitnessTracker](https://fitness-tracker-de06b.web.app/) application, which is an app to create and explore fitness Exercises and Workouts for different levels of trainees, with different equipment and many more interesting features.
> Specification can be found [here](https://github.com/Arthur-Fedotiev/fintess-tracker-api/blob/master/fitness-tracker-api_specs.md)

## Usage

Rename "config/config.env.env" to "config/config.development.env" and add "config/config.test.env" and update the values/settings\*.
To get environment variables concerned with credentials refer to responsible person on a project.

## Install Dependencies

```
yarn
```

## Run App

```
# Run in dev mode
yarn serve

# Run in prod mode
yarn start

# Lint
yarn lint
yarn lint:check
yarn lint:fix

# Test
yarn test
```

## Database Seeder

Can be found in `src/seeder` (Currently only for `exercises` collection, but easily extensible)

```
# Import exercises
yarn import

# Destroy exercises collection
yarn destroy
```

## Demo

The API is live at [fitness-tracker.live](https://fitness-tracker.live) (you can try it out immediately simply from the browser [listing exercises in English and Ukrainian languages](https://fitness-tracker.live/exercises?lang=ukr,en) or using [Postman](https://documenter.getpostman.com/view/11961976/UzBmMSbR) )

Extensive documentation with examples [here](https://documenter.getpostman.com/view/11961976/UzBmMSbR)

- Version: 1.0.0
- License: MIT
- Author: Artur Fedotiev
