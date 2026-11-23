const OPTIONS = { day: '2-digit', month: 'short', year: 'numeric' }

export const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString('en-IN', OPTIONS) : '—'

export const formatDateTime = (value) =>
  value
    ? new Date(value).toLocaleString('en-IN', { ...OPTIONS, hour: '2-digit', minute: '2-digit' })
    : '—'