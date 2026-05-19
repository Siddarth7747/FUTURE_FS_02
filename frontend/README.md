# Mini CRM System

A modern full-stack CRM (Customer Relationship Management) web application built using React.js, Node.js, Express.js, and MySQL.

The application helps businesses manage client leads professionally with features like adding leads, deleting leads, lead tracking, and status management.

# Features

* Add New Leads

* Delete Leads

* Track Lead Status

* Dashboard Analytics

* Responsive UI

* Professional Modern Design

* MySQL Database Integration

* REST API Integration

# Technologies Used

## Frontend

* React.js

* CSS

* Fetch API

## Backend

* Node.js

* Express.js

## Database

* MySQL

# Project Screenshots

## Dashboard

![alt text](image-3.png)

## Add Lead Page

![alt text](image-2.png)

## Database

![alt text](image-4.png)

# Folder Structure

FUTURE_FS_02/
│
├── backend/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── package.json
│   └── package-lock.json
│
└── README.md

# Installation & Setup

## 1. Clone Repository

git clone YOUR_GITHUB_REPOSITORY_LINK

## 2. Install Frontend Dependencies

cd frontend
npm install

## 3. Install Backend Dependencies

cd backend
npm install

# MySQL Database Setup

Create database:

sql
CREATE DATABASE crm_system;

Use database:

sql
USE crm_system;

Create table:

sql
CREATE TABLE leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    source VARCHAR(100),
    status VARCHAR(50),
    notes TEXT
);

# Run Frontend


cd frontend
npm start


Frontend runs on:


http://localhost:3000


# Run Backend


cd backend
node server.js


Backend runs on:


http://localhost:5000

# API Endpoints

## Get Leads


GET /leads

## Add Lead

POST /addLead

## Delete Lead

DELETE /deleteLead/:id

# Future Improvements

* Edit Lead Feature

* User Authentication

* Search & Filter

* Dark/Light Mode

* Deployment

# Author

Siddarth K

# Internship Task

Future Interns - Full Stack Development Internship Task 2
