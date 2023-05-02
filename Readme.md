# BudgetBonsai

## About

This is my final exam project for Codecool's Junior Fullstack API Developer course. It's a fullstack expense and income tracker web application, in which - after logging in with Google - you can add, see, modify and delete transactions, and also see statistics. This repository is for the frontend of the app. This won't work without the backend server.

# Instructions:

1. Run `npm install` in the root directory
2. Set environment variables:
   - Create a `.env` file in the root directory
   - Paste the following lines into the file:
     ```
      VITE_BACKEND_BASE_URL=http://localhost:8000
      VITE_CLIENT_BASE_URL=http://localhost:5173
     ```
     _Note: If you need to, you can modify the ports. However, be careful to stay consistent with the backend's URLs specified in that repository's `.env` file._
3. For the development server, run `npm run dev`.

   **Important:** You need to start the backend server first, which is in another repository [here](https://github.com/vucben99/budget-bonsai-server).
