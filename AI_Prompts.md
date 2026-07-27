Prompt 1 – Create the React Project

Create a new React application using Vite for a Doctor Appointment Booking System. Configure React Router and organize the project for scalability.

Prompt 2 – Folder Structure

Design a scalable folder structure for both the React frontend and Express backend using industry best practices.

Prompt 3 – Backend Setup

Create an Express.js backend with a clean architecture including routes, controllers, middleware, models, services, and configuration folders.

Prompt 4 – Install Dependencies

List all required frontend and backend dependencies for this project, explain why each package is needed, and provide the installation commands.

Prompt 5 – MongoDB Connection

Generate the code to connect the Express backend to MongoDB using Mongoose and environment variables.

Prompt 6 – User Model

Create a MongoDB User model with name, email, password, and timestamps. Passwords should be encrypted using bcrypt before saving.

Prompt 7 – Doctor Model

Create a Doctor model containing name, specialty, hospital, image, email, and availability information.

Prompt 8 – Appointment Model

Create an Appointment model linking users and doctors with appointment date, reason for visit, and appointment status.

Prompt 9 – User Registration

Build a secure registration API with validation, duplicate email checking, password hashing, and proper error handling.

Prompt 10 – User Login

Generate a login API using JWT authentication. Return a signed token after successful authentication.

Prompt 11 – Authentication Middleware

Create Express middleware that protects private routes using JWT authentication.

Prompt 12 – Seed Doctors

Generate a doctor seed file that inserts several doctors into MongoDB with realistic data.

Prompt 13 – Display Doctors

Build a responsive React page that displays doctors as cards showing image, name, hospital, specialty, and a Book Appointment button.

Prompt 14 – React Routing

Configure React Router with routes for Home, Login, Register, Doctors, Book Appointment, My Account, and Not Found.

Prompt 15 – Registration Page

Build a responsive registration page with client-side validation and API integration.

Prompt 16 – Login Page

Create a login page that authenticates users, stores the JWT token securely, and redirects authenticated users.

Prompt 17 – Axios Configuration

Create a reusable Axios instance that automatically includes the JWT token in protected API requests.

Prompt 18 – Authentication Context

Implement React Context API to manage authentication state throughout the application.

Prompt 19 – Book Appointment Form

Create an appointment booking form allowing users to choose a doctor, select a future date, enter a reason for the visit, and submit the booking.

Prompt 20 – Availability Check

Before saving an appointment, verify that the selected doctor does not already have an appointment on the chosen date.

Prompt 21 – Prevent Invalid Dates

Prevent users from booking appointments for today or past dates. Display appropriate validation messages.

Prompt 22 – My Appointments Page

Build a dashboard where users can view all their booked appointments including doctor name, date, status, and visit reason.

Prompt 23 – Cancel Appointment

Implement appointment cancellation, update the appointment status, and remove future availability conflicts.

Prompt 24 – Confirmation Emails

Send professional confirmation emails to both the patient and the doctor after a successful appointment booking using Nodemailer.

Prompt 25 – Cancellation Emails

Send cancellation emails to both the patient and the doctor whenever an appointment is cancelled.

Prompt 26 – Protected Routes

Prevent unauthenticated users from accessing protected pages by implementing ProtectedRoute components in React.

Prompt 27 – Logout

Implement logout functionality that clears authentication tokens and redirects users to the login page.

Prompt 28 – Navbar

Create a responsive navigation bar that displays different menu options depending on whether the user is logged in.

Prompt 29 – Error Handling

Improve both frontend and backend error handling with meaningful messages and proper HTTP status codes.

Prompt 30 – Loading Indicators

Add loading spinners and disabled buttons while waiting for API responses.

Prompt 31 – Responsive Design

Make the entire application fully responsive using Tailwind CSS, ensuring it works well on desktop, tablet, and mobile devices.

Prompt 32 – Form Validation

Add client-side and server-side validation for registration, login, and appointment booking forms.

Prompt 33 – Dashboard Improvements

Improve the My Appointments dashboard with appointment status badges, sorting by date, and clean card layouts.

Prompt 34 – Project Security

Improve application security by using environment variables, secure password storage, JWT expiration, and input validation.

Prompt 35 – Code Refactoring

Review the project and refactor duplicated code into reusable components, custom hooks, and utility functions.

Prompt 36 – GitHub Preparation

Prepare the project for GitHub by generating a professional README, organizing the folder structure, adding a LICENSE file, and documenting installation instructions.

Prompt 37 – Deployment Preparation

Prepare both the frontend and backend for deployment by configuring production environment variables and build scripts.

Prompt 38 – Testing

Suggest manual test cases for authentication, appointment booking, appointment cancellation, protected routes, and email notifications.

Prompt 39 – Documentation

Generate comprehensive API documentation explaining all endpoints, request bodies, authentication requirements, and expected responses.

Prompt 40 – Project Review

Perform a complete code review of the application. Identify possible improvements for performance, maintainability, scalability, security, and user experience, and recommend best practices before deployment.

These prompts were used incrementally throughout development. AI was used as a development assistant to generate boilerplate code, explain concepts, suggest architecture, and assist with debugging. All generated code was reviewed, tested, and refined manually before being integrated into the final application.