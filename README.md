# Ticket Blaster

TicketBlaster is an online ticketing application designed for purchasing tickets to music concerts and stand-up comedy events. This application features user-friendly navigation and robust functionality across three user types, allowing browsing, ticket purchasing, and full event management.

## Installation

Clone the repository:

```bash
git clone https://github.com/Milanka81/Ticket-Blaster-App.git
```

- To start the application, follow these steps:

1. Start the React app:

   - Open a terminal.
   - Navigate to the React app directory:
     ```bash
     cd clientReact
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React app:
     ```bash
     npm run dev
     ```
     The React app will be accessible at [http://localhost:5173](http://localhost:5173).

2. Start the Express app:

- Open another terminal.
- Navigate to the Express app directory:
  ```bash
  cd severNode
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the Express app:
  ```bash
  npm start
  ```
  The Express app will be accessible at [http://localhost:9005](http://localhost:9005).

Make sure to start both the React app and the Express app in separate terminals to keep them running simultaneously. This will allow the frontend and backend to communicate properly.

## Features & User Types

TicketBlaster offers distinct access levels:

1. Unregistered Users: Can browse events but cannot purchase tickets.
2. Registered Users: Can log in to purchase tickets and manage their profile.
3. Admin Users: Have extended access to create and delete events, as well as manage other users.

## Usage

### Login and Signup

You can login as an admin with credentials:

```bash
email: admin, password: pass1234
```

and as a user with

```bash
email: user, password: pass1234
```

or register as a new user with your own credentials.

## Technology Stack

TicketBlaster uses the following technologies:

### Frontend

- React/Vite
- HTML & CSS (no CSS frameworks allowed)

### Backend

- Node.js with Express.js
- MongoDB for data storage
- JWT stored in httpOnly cookie for user authentication
- Middleware for file upload and validation
- Bcrypt for password hashing
- Mailer service for sending emails

## Microservices Architecture

TicketBlaster is built with a service-oriented architecture, divided into the following services:

**Auth Service:** Handles user authentication.
**User Service:** Manages user accounts.
**Event Service:** Manages event data.
**E-commerce Service:** Manages cart and checkout functionality.
**Proxy Service:** Unifies services under a single endpoint.

All services are secured with JWT for authenticated access.

## Bonus Features

For additional functionality, implemented:

Mobile-Friendly CSS
Email Confirmation for Registration
Email Ticket Delivery
Ticket Quantity Limiting

## Application Pages

### Login

Allows users to log in with email and password. On success, icons for the cart and user profile appear in the header.

### Create Account

Enables users to register a new account. Validates for existing accounts to prevent duplicates.

### Forgot password

Users can reset their password via a link sent to their registered email.

### Home Page:

Displays upcoming events, with a hero section showcasing the nearest event. Sections for "Musical Concerts" and "Stand-up Comedy" present events sorted by date.

### Search Page:

Allows users to search events by title, ticket price and description.

### Category Pages:

Shows events in each category, with a "Load More" button if there are more than 10 events.

### Event Details:

Displays detailed information about an event, including an "Add to Cart" button for logged-in users.

### User Profile:

Both Admins and Users can view and update their personal information, with a separate section for changing the password.

### Ticket History:

Displays purchased tickets. Past event tickets appear faded, while upcoming events are fully visible. Users can print tickets, which display event details and a QR code.

### Checkout:

Shows a list of items in the cart with a form to enter payment information.

### Cart:

Displays selected events. Users can remove events added to the cart, return to browsing, or proceed to checkout.

### Admin Events and Users Management:

Allows admins to create, edit, or delete events. Admins can promote regular users to admin, demote admins, or perform a soft delete of user accounts.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please submit a pull request or open an issue.
