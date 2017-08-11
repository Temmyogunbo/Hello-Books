# Temmyogunbo.github.io
[![Build Status](https://travis-ci.org/Temmyogunbo/Temmyogunbo.github.io.svg?branch=feature2)](https://travis-ci.org/Temmyogunbo/Temmyogunbo.github.io)

HelloBooks
HelloBooks provides REST endpoints for library application system. It supports the CRUD operation which are create, read, update, and delete. It only allows authorized users to use the application.

API DOCUMENTATION
The API uses HTTP response code to indicate its status and errors.


Features
Users: A created user will have by default the role of a user
 . A user 
   . Can create account
   . sign in into his account 
   . view all books in the library
   . borrow book in the library
   . return book(s)
   . view books yet to be returned
   . add book to the library
   . modify book in the library
   . delete book in the library
   
   A book can have a category, title, quantity, and author.
   
   Authentication: 
   Users are authenticated using jsonwebtoken(jwt).
   
   Endpoints
   . POST - api/v1//users/signup
   
   . POST - api/users/signin
   
   . POST -'/api/v1/books'
  
  . GET - '/api/v1/books'
  
  . PUT- '/api/v1/books/:bookId'
 
 . POST - '/api/v1/users/:userId/:bookId'
 
 . GET - '/api/v1/users/:userId/books'
 
 
 . PUT '/api/v1/users/:userId/:bookId'

Developments

HelloBooks is built using the following technologies

. ECMASCRIPT2016

. Nodejs and Express framework

. Sequelize

. Postgres

Installation


Install NodeJs and Postgres on your machine

Clone the repository $ git clone https://github.com/temmyogunbo.github.io/hellobooks.git

Change into the directory $ cd /temmyogunbo.github.io

Install all required dependencies with $ npm install

Create a .env file in your root directory

Start the app with npm start

Run Test npm test

License
This project is authored by Ogunbo Emmanuel in partial fulfillment to becoming a fellow at Andela.
