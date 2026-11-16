export class ApiError extends Error {
  constructor({ message, status, errors = [], isNetworkError = false }) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors // [{ field, message }], form ke fields par dikhane ke liye
    this.isNetworkError = isNetworkError
  }
}