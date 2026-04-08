export default function Loading({ label = 'Loading...' }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      {label}
    </div>
  )
}

