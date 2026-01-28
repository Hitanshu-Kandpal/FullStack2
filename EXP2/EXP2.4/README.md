# Material UI Component Demo

A React + Vite project showcasing Material UI components with a clean, modern interface.

## Project Overview

This project demonstrates the implementation of Material UI components including TextField and Button in a centered card layout. It serves as a learning resource for using Material UI in React applications.

## Features

- **Material UI Components**: Uses Button, TextField, and Card from `@mui/material`
- **Responsive Design**: Mobile-friendly card layout
- **Modern Styling**: Clean CSS with shadow effects and rounded corners
- **Fast Development**: Powered by Vite for instant HMR (Hot Module Replacement)

## Tech Stack

- **React** 19.2.0 - UI library
- **Vite** 7.2.4 - Build tool and dev server
- **Material UI** 7.3.7 - Component library
- **Emotion** 11.14+ - CSS-in-JS library (required by MUI)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd mui
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build the project for production:
```bash
npm run build
```

### Preview

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## Project Structure

```
mui/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Component styles
│   ├── main.jsx         # React DOM entry point
│   ├── index.css        # Global styles
│   └── assets/          # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── eslint.config.js     # ESLint configuration
```

## Components Used

- **TextField**: Material Design text input with label
- **Button**: Material Design button with contained variant
- **Card**: Container component for content organization

## Customization

### Modify the Form
Edit `src/App.jsx` to add more Material UI components or change the layout.

### Update Styles
Modify `src/App.css` to customize colors, spacing, and other visual properties.

### Change Theme
Import and use Material UI's `ThemeProvider` and `createTheme` for custom theming.

## ESLint Rules

The project includes ESLint configuration with:
- Recommended JS rules
- React Hooks rules
- React Refresh rules

## Browser Support

Supports all modern browsers (Chrome, Firefox, Safari, Edge) that support ES2020+.

## Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Material UI Documentation](https://mui.com)

## License

This project is private and part of a college full-stack course.