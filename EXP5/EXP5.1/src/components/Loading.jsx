import './loading.css'

export default function Loading() {
  return (
    <div className="loading-wrap">
      <div className="spinner" aria-hidden></div>
      <div className="loading-card">
        <h3>Loading...</h3>
        <p className="muted">Hang tight — restoring your view.</p>
      </div>
    </div>
  )
}
