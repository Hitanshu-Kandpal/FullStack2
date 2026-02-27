```markdown
# EXP6.1 - Full Stack Development Experiment

## Overview
This experiment, EXP6.1, is a Full Stack Development project focusing on building a React application with modern frontend features such as lazy loading, Context API, and Suspense. It demonstrates the use of React hooks for form handling and state management within a clean and modular project structure.

## Features
- Lazy Loading of components for optimized performance
- Context API for state management across components
- Form handling using React's `useState` hook
- Suspense for handling asynchronous component loading

## Technologies Used
- React
- React DOM
- Vite (build tool)

## Installation Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd EXP6.1
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173` (or the port specified in the terminal).

## Project Structure
```
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   └── main.jsx
└── vite.config.js
```

## How It Works
- The application initializes in `main.jsx` where the root React component (`App.jsx`) is rendered.
- `App.jsx` utilizes React's Context API to provide global state management.
- Components are loaded lazily using React's `lazy` and `Suspense` to improve load times.
- Forms within the app are managed using the `useState` hook, enabling controlled inputs.
- Suspense boundaries handle the loading state of lazy-loaded components gracefully.

## Screenshots
*No screenshots provided.*

## Key Concepts
- **Lazy Loading:** Defers loading of components until they are needed, reducing initial load time.
- **Context API:** Enables sharing of state across multiple components without prop drilling.
- **useState Hook:** Manages local component state, particularly useful for form inputs.
- **Suspense:** Provides a fallback UI while waiting for lazy-loaded components to load.

## Usage
- Run the development server following the installation steps.
- Interact with the form components to observe state management.
- Navigate through the app to experience lazy loading and Suspense in action.

## Best Practices
- Utilize React's Context API judiciously to avoid unnecessary re-renders.
- Keep components small and focused to maximize the benefits of lazy loading.
- Use Suspense fallbacks that enhance user experience during loading states.
- Manage form state with controlled components using `useState` for predictable behavior.
```