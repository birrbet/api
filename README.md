# Application Core

which is the main core part consists of the domain and services

## Running the app
```bash
# starting RabbitMQ and mongodb
$ git clone http://github.com/birrbet/api.git
$ cd api
$ docker-compose up
```
on another terminal tab
```bash
# starting the app on development mode
$ yarn i && yarn run start:dev
```