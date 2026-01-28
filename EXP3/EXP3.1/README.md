# Experiment 3.1 – Basic Routing in React

## Aim  
To understand and implement basic client-side routing in a React application using `react-router-dom`.

## Theory  
Routing in React allows us to create multiple views (pages) inside a single-page application without reloading the browser.  
`react-router-dom` provides components like:

- `BrowserRouter` – Wraps the entire app
- `Routes` – Holds all route definitions
- `Route` – Maps a path to a component

Each route renders a different component based on the URL.

## Implementation  

In this experiment, three pages are created:

- `/` → Home Page  
- `/contact` → Contact Page  
- `/about` → About Page  

All pages share a common full-screen UI using `100vw` and `100vh`.

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>
