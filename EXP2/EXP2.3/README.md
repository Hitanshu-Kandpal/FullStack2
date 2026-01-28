# Bootstrap Navbar with Search Functionality

A React + Vite project demonstrating a fixed navigation bar with interactive search functionality using Bootstrap 5.

## Project Overview

This project showcases a sticky/fixed navbar with a search feature that updates displayed text dynamically. It demonstrates React state management combined with Bootstrap styling.

## Features

- **Fixed Navbar**: Sticky navigation bar that stays at the top
- **Search Functionality**: Real-time search input with submit handler
- **Dynamic Text Display**: Updates content based on search input
- **Bootstrap 5**: Responsive navbar with Bootstrap utilities
- **React Hooks**: Uses `useState` for state management
- **Responsive Design**: Mobile-friendly layout

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
cd btstrp-navbar
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
btstrp-navbar/
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

## How It Works

### State Management

The component uses React hooks to manage:
- `searchText`: Current search input value
- `displayText`: Text displayed on the page

### Event Handlers

- `handleSearch()`: Form submission handler that updates displayText

### Component Structure

1. **Navbar**: Fixed navigation at top with search form
2. **Main Content**: Displays dynamic text based on search

## Bootstrap Classes Used

- `.navbar` - Navigation bar component
- `.navbar-expand-lg` - Responsive navbar
- `.fixed-top` - Fixed positioning
- `.container-fluid` - Full-width container
- `.navbar-brand` - Brand/logo area
- `.collapse` - Collapsible content
- `.form-control` - Form input styling
- `.btn` - Button component
- `.btn-outline-success` - Outline button variant
- `.d-flex` - Flexbox display
- `.ms-auto` - Margin start auto
- `.me-2` - Margin end
- `.text-center` - Text alignment

## Custom Styling

The component includes inline CSS for:
- Body margin reset and background color
- Navbar shadow effect
- Main content padding to account for fixed navbar

## Usage Example

1. Type text into the search input
2. Click the "Search" button or press Enter
3. The heading displays the searched text
4. Default text "Hello World" is shown if input is empty

## Customization

### Change Default Text
Modify the `useState("Hello World")` value in `App.jsx`

### Add More Navbar Items
Extend the navbar with additional Bootstrap navbar utilities and components

### Change Colors
Update the Bootstrap button variant classes (e.g., `btn-outline-success` to `btn-outline-primary`)

### Add Navigation Links
Use Bootstrap navbar utilities to add navigation links alongside the search form

## Browser Support

Supports all modern browsers (Chrome, Firefox, Safari, Edge) that support ES2020+.

## Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Bootstrap Navbar Documentation](https://getbootstrap.com/docs/5.3/components/navbar/)
- [React Hooks Documentation](https://react.dev/reference/react)

## License

This project is private and part of a college full-stack course.