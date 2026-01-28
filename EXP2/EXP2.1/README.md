# Bootstrap UI - Contact Form

A React + Vite project showcasing a modern contact form built with Bootstrap 5.

## Project Overview

This project demonstrates the creation of a professional contact form using Bootstrap 5 CSS framework. It features a gradient header navbar, centered form card, and responsive layout design.

## Features

- **Bootstrap 5 Integration**: Full Bootstrap CSS framework
- **Responsive Design**: Mobile-first approach with responsive grid system
- **Gradient Header**: Modern gradient background on navbar
- **Form Validation Ready**: Email input and textarea components
- **Shadow Effects**: Elegant card shadow styling
- **Dark Theme Button**: Styled submit button

## Tech Stack

- **React** 19.2.0 - UI library
- **Vite** 7.2.4 - Build tool and dev server
- **Bootstrap** 5.3.8 - CSS framework

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd btstrp_UI
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
btstrp_UI/
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

## Features Breakdown

### Navbar
- Dark theme navigation bar
- Gradient background (blue gradient from left to right)
- Shadow effect for depth
- Responsive container

### Contact Form
- Centered card design
- Email input field
- Observation textarea
- Submit button with full width

### Styling

The project uses inline styles defined in `App.jsx`:
- `appContainer`: Full viewport height with light background
- `customCard`: Card styling with border radius and transitions
- `formBox`: White background with padding and shadow
- `headerGradient`: Blue gradient effect for the navbar

## Customization

### Modify Form Fields
Edit the form inputs in `src/App.jsx` to add or remove fields.

### Change Color Scheme
Update the gradient colors in `styles.headerGradient` and button classes.

### Add Form Validation
Implement form state management using React hooks for input validation.

## Bootstrap Classes Used

- `.navbar` - Navigation bar
- `.form-control` - Form inputs
- `.form-label` - Form labels
- `.btn` - Button component
- `.container` - Responsive container
- `.row` / `.col-*` - Grid system
- `.mb-*` - Margin bottom utilities
- `.fw-bold` - Font weight
- `.text-secondary` - Text color
- `.bg-light` - Light background
- `.border-0` - No border
- `.w-100` - Full width
- `.shadow-sm` - Shadow effect

## Browser Support

Supports all modern browsers (Chrome, Firefox, Safari, Edge) that support ES2020+.

## Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Bootstrap Documentation](https://getbootstrap.com)

## License

This project is private and part of a college full-stack course.