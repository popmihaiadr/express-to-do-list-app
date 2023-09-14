# Express To-Do List App

## Introduction

This is a simple To-Do List application built using Express.js. The app allows you to manage your tasks, but before you can start using it, there are a few setup steps you need to follow.

## Prerequisites

Before running the app, make sure you have the following prerequisites in place:

- **MongoDB**: You must have MongoDB installed locally. The MongoDB credentials should match the values in your environment file.

## Getting Started

To get started, follow these steps:

1. Start a Docker container for MongoDB using the following command:

```shell
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=<user> -e MONGO_INITDB_ROOT_PASSWORD=<password> mongo  ``` 


After starting the app, you can access the API documentation at:

bash
http://localhost:<PORT>/api-docs/

Authentication
All requests to the API require authentication using a JSON Web Token (JWT). The JWT token should be sent in a custom header field, called 'token'. However, this will have to be refactored.
