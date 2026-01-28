# Bootstrap Card-Based Layout

A React + Vite project showcasing a responsive card grid layout using Bootstrap 5 with hover effects.

## Project Overview

This project demonstrates how to create a responsive card-based layout using Bootstrap's grid system. It features multiple cards with hover animations and is fully responsive across all device sizes.

## Features

- **Bootstrap Grid System**: Responsive column layout
- **Card Components**: Bootstrap card styling with content organization
- **Hover Effects**: Smooth transitions and lift animation
- **Dynamic Rendering**: Cards rendered from data array using `.map()`
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Modern Animations**: CSS transitions for interactive effects

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
cd btstrp-card-based
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
btstrp-card-based/
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

## Layout Structure

### Responsive Breakpoints

The layout adjusts based on Bootstrap breakpoints:
- **Mobile** (`col-sm-6`): 2 cards per row
- **Tablet** (`col-md-3`): 4 cards per row
- **Desktop**: 4 cards per row

### Card Data

Cards are dynamically generated from the `cardData` array:
```javascript
{
  title: "Card Title",
  description: "Card description text"
}
```

## Bootstrap Classes Used

- `.container` - Main content wrapper
- `.row` - Flex row container
- `.col-md-3` - Medium device 3-column layout
- `.col-sm-6` - Small device 6-column layout
- `.mb-4` - Margin bottom spacing
- `.card` - Card component
- `.h-100` - Height 100% (equal height cards)
- `.card-body` - Card content area
- `.text-center` - Text alignment
- `.card-title` - Title styling
- `.card-text` - Description text
- `.btn` - Button component
- `.btn-primary` - Primary button variant

## Custom Styling

### Hover Effect

The `.custom-card` class provides:
- Smooth transform animation (translateY movement)
- Box shadow enhancement on hover
- 0.3s ease transition

### Responsive Behavior

- Full viewport height with centered content
- Light background color (#f8f9fa)
- Proper spacing between cards

## Component Features

### Card Title
- Semantic heading (h5)
- Bold font weight via Bootstrap

### Card Description
- Descriptive paragraph text
- Centered alignment

### Action Button
- Primary colored button
- Full interactive state

## Customization

### Add More Cards

Update the `cardData` array in `App.jsx`:
```javascript
{
  title: "Your Card Title",
  description: "Your card description"
}
```

### Change Grid Layout

Modify Bootstrap column classes:
- `col-md-3` → `col-md-4` for 3 cards per row
- `col-md-3` → `col-md-2` for 6 cards per row

### Adjust Hover Animation

Modify the `.custom-card:hover` styles in the `<style>` tag to customize:
- Transform distance: `translateY(-5px)`
- Shadow intensity: `rgba(0, 0, 0, 0.2)`
- Transition speed: `0.3s ease`

### Change Button Variant

Replace `btn-primary` with other Bootstrap button variants:
- `btn-secondary`
- `btn-success`
- `btn-warning`
- `btn-danger`

## Performance Considerations

- Cards are rendered using `.map()` with proper key props
- CSS transitions are GPU-accelerated
- Lightweight Bootstrap CSS (~30KB gzipped)

## Browser Support

Supports all modern browsers (Chrome, Firefox, Safari, Edge) that support ES2020+.

## Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Bootstrap Grid System](https://getbootstrap.com/docs/5.3/layout/grid/)
- [Bootstrap Cards](https://getbootstrap.com/docs/5.3/components/card/)

## License

This project is private and part of a college full-stack course.