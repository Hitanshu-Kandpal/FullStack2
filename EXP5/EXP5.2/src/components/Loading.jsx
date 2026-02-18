import './loading.css'

export default function Loading() {
  return (
    <div className="loading-wrap">
      <div className="spinner" aria-hidden></div>
      <div className="loading-card">
        <h3>Loading content...</h3>
        <p className="muted">Preparing a faster, lighter experience for you.</p>
        <div className="progress">
          <div className="bar" />
        </div>
      </div>
    </div>
  )
}
