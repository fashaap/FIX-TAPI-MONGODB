### API README

This document provides an overview of the endpoints available in the API, along with their roles and permissions requirements.

#### Endpoints for Admin

- **/api/v1/auth/admin/signUp**
  - **Role:** Super Admin
  - **Description:** Endpoint for registering a new admin user.

- **/api/v1/auth/admin/signIn**
  - **Role:** Free Role (No authentication required)
  - **Description:** Endpoint for authenticating admin users.

- **/api/v1/auth/admin/:id**
  - **Method:** GET
  - **Role:** Admin
  - **Description:** Get admin details by ID.

- **/api/v1/auth/admin/:id**
  - **Method:** PUT
  - **Role:** Admin
  - **Description:** Update admin details by ID.

- **/api/v1/auth/admin/**
  - **Method:** GET
  - **Role:** Admin
  - **Description:** Get all admin users.

- **/api/v1/auth/admin/:id**
  - **Method:** DELETE
  - **Role:** Super Admin
  - **Description:** Delete admin user by ID.

#### Endpoints for User

- **/api/v1/auth/users/signUp**
  - **Role:** Admin
  - **Description:** Endpoint for registering a new user.

- **/api/v1/auth/users/signIn**
  - **Role:** Free Role (No authentication required)
  - **Description:** Endpoint for authenticating users.

- **/api/v1/auth/users/:id**
  - **Method:** GET
  - **Role:** Admin
  - **Description:** Get user details by ID.

- **/api/v1/auth/users/:id**
  - **Method:** PUT
  - **Role:** User
  - **Description:** Update user details by ID.

- **/api/v1/auth/users/**
  - **Method:** GET
  - **Role:** Admin
  - **Description:** Get all users.

- **/api/v1/auth/users/:id**
  - **Method:** DELETE
  - **Role:** Admin
  - **Description:** Delete user by ID.

#### Endpoints for Tickets

- **/api/v1/tickets/create**
  - **Role:** User
  - **Description:** Endpoint for creating a new ticket.

- **/api/v1/tickets/:id**
  - **Method:** GET
  - **Role:** User
  - **Description:** Get ticket details by ID.

- **/api/v1/tickets/:id**
  - **Method:** PUT
  - **Role:** User
  - **Description:** Update ticket details by ID.

- **/api/v1/tickets/**
  - **Method:** GET
  - **Role:** User
  - **Description:** Get all tickets.

- **/api/v1/tickets/:id**
  - **Method:** DELETE
  - **Role:** User
  - **Description:** Delete ticket by ID.

#### Endpoints for Location

- **/api/v1/location/:idUser**
  - **Method:** PUT
  - **Role:** User
  - **Description:** Update location details by user ID.

- **/api/v1/location/:idUser**
  - **Method:** GET
  - **Role:** Viewer
  - **Description:** Get location details by user ID.

- **/api/v1/location/**
  - **Method:** GET
  - **Role:** Viewer
  - **Description:** Get all locations.

- **/api/v1/location/:idUser**
  - **Method:** DELETE
  - **Role:** User
  - **Description:** Delete location by user ID.

#### Endpoints for Notification

- **/api/v1/notifications/create**
  - **Role:** Admin
  - **Description:** Endpoint for creating a new notification.

- **/api/v1/notifications/:idUser**
  - **Method:** GET
  - **Role:** User
  - **Description:** Get notifications for a user.

- **/api/v1/notifications/**
  - **Method:** GET
  - **Role:** User
  - **Description:** Get all notifications.

- **/api/v1/notifications/:idUser**
  - **Method:** DELETE
  - **Role:** User
  - **Description:** Delete notification by ID.

#### Endpoints for Questionnaire

- **/api/v1/questionnaire/create**
  - **Role:** User
  - **Description:** Endpoint for creating a new questionnaire.

- **/api/v1/questionnaire/:idUser**
  - **Method:** GET
  - **Role:** Free Role (No authentication required)
  - **Description:** Get questionnaire by user ID.

- **/api/v1/questionnaire/**
  - **Method:** GET
  - **Role:** Free Role (No authentication required)
  - **Description:** Get all questionnaires.

- **/api/v1/questionnaire/:idUser**
  - **Method:** DELETE
  - **Role:** User
  - **Description:** Delete questionnaire by user ID.

### Notes:
- **Role Definitions:**
  - **Super Admin:** Highest level of access, can perform all operations.
  - **Admin:** Can manage admin and user data, but with restrictions on user-specific operations.
  - **User:** Limited to operations involving their own data and generic user operations.
  - **Viewer:** Limited to viewing data, typically without the ability to modify or delete.

Ensure proper authentication and authorization mechanisms are in place to enforce these roles effectively.