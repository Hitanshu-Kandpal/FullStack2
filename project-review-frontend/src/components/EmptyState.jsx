export default function EmptyState({ title = 'No results', message = 'Nothing to show yet.' }) {
  return (
    <div className="panel" aria-live="polite">
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div style={{ color: '#6b7280', fontSize: 14 }}>{message}</div>
    </div>
  )
}

