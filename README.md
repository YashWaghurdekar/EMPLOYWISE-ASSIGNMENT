# EmployWise User Management System

A React application that integrates with the Reqres API to perform basic user management functions.

## Features

- User Authentication
- User List with Pagination
- Edit User Details
- Delete Users
- Responsive Design
- Toast Notifications
- Protected Routes

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd employwise-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. Login using the following credentials:
   - Email: eve.holt@reqres.in
   - Password: cityslicka

2. After successful login, you will be redirected to the Users page
3. On the Users page, you can:
   - View all users in a paginated list
   - Edit user details
   - Delete users
   - Navigate through different pages of users

## Technologies Used

- React
- TypeScript
- Material-UI
- React Router
- Axios
- React Toastify
- Vite

## API Documentation

The application uses the Reqres API (https://reqres.in/) for all operations:

- Login: POST https://reqres.in/api/login
- Get Users: GET https://reqres.in/api/users?page={page_number}
- Update User: PUT https://reqres.in/api/users/{user_id}
- Delete User: DELETE https://reqres.in/api/users/{user_id}

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── context/       # Context providers
  ├── pages/         # Page components
  ├── services/      # API services
  ├── types/         # TypeScript types
  ├── App.tsx        # Main app component
  └── main.tsx       # Entry point
```

## Error Handling

- The application includes comprehensive error handling for API requests
- Toast notifications for success and error messages
- Form validation for login and edit operations
- Protected routes for authenticated users only

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
