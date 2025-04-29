# Visual Representation of api front end to back end

``` MAPPING
Frontend (React)                   Backend (Express)                 Database (MongoDB)
    |                                   |                                  |
    |-- User clicks "Register" -->      |                                  |
    |-- POST /signup -------------->    |-- Validate data                  |
    |                                   |-- Hash password                  |
    |                                   |-- Save user ------------>        |
    |<- User data without password --   |<- Confirmation ---------         |
    |                                   |                                  |
    |-- User clicks "Login" -->         |                                  |
    |-- POST /signin --------------->   |-- Validate credentials -->       |
    |                                   |-- Check password against hash    |
    |<- JWT token ------------------    |<- User data ------------         |
    |-- Store token in localStorage     |                                  |
    |                                   |                                  |
    |-- User visits profile page -->    |                                  |
    |-- GET /users/me with token ---    |-- Verify token                   |
    |                                   |-- Get user data -------->        |
    |<- User profile data -----------   |<- User data ------------         |
    |-- Display profile                 |                                  |
    |                                   |                                  |
    |-- User adds clothing item -->     |                                  |
    |-- POST /items with token ------>  |-- Verify token                   |
    |                                   |-- Create item with user ID       |
    |                                   |-- Save item ------------>        |
    |<- New item data --------------    |<- Saved item data ------         |
    |-- Display updated item list       |                                  |
    ```
