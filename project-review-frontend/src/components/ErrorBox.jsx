export default function ErrorBox({ message }) {
  return (
    <div className="error" role="alert">
      {message}
    </div>
  )
}

