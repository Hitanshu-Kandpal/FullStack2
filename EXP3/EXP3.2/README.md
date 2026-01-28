
---

## 📘 `EXP_3_2_README.md`

```md
# Experiment 3.2 – Routing with Navigation

## Aim  
To implement routing in React along with navigation using `Link` from `react-router-dom`.

## Theory  
In addition to routing, React allows in-app navigation using the `Link` component.  
`Link` prevents full page reloads and enables smooth transitions between routes.

Key components used:

- `BrowserRouter`
- `Routes`
- `Route`
- `Link`

## Implementation  

Routes used:

- `/` → Dashboard  
- `/profile` → Profile  
- `/dashboard` → Dashboard  

Navigation buttons are provided using `Link`:

```jsx
<Link to="/profile">
  <button>Go to Profile</button>
</Link>

<Link to="/dashboard">
  <button>Go to Dashboard</button>
</Link>
