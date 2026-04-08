function normalizeStatus(status) {
  const s = String(status || '').trim().toUpperCase()
  return s
}

function statusLabel(status) {
  const s = normalizeStatus(status)
  if (s === 'PENDING') return 'Pending'
  if (s === 'APPROVED') return 'Approved'
  if (s === 'CHANGES_REQUIRED') return 'Changes required'
  return s || 'Unknown'
}

function statusClass(status) {
  const s = normalizeStatus(status)
  if (s === 'PENDING') return 'badge pending'
  if (s === 'APPROVED') return 'badge approved'
  if (s === 'CHANGES_REQUIRED') return 'badge changes_required'
  return 'badge neutral'
}

export default function StatusBadge({ status }) {
  return <span className={statusClass(status)}>{statusLabel(status)}</span>
}

