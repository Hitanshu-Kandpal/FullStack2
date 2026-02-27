import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  // Get email validation feedback
  const getEmailFeedback = (email) => {
    if (!email) return ''

    // Check total length
    if (email.length > 254) return 'Email too long (max 254 characters)'

    // Must contain exactly ONE @
    const atCount = (email.match(/@/g) || []).length
    if (atCount === 0) return 'Email must contain @ symbol'
    if (atCount > 1) return 'Email cannot contain multiple @ symbols'

    // Split into local and domain parts
    const atIndex = email.indexOf('@')
    const localPart = email.substring(0, atIndex)
    const domain = email.substring(atIndex + 1)

    // Both parts must be non-empty
    if (!localPart) return 'Local part (before @) cannot be empty'
    if (!domain) return 'Domain part (after @) cannot be empty'

    // LOCAL PART validation (before @)
    if (localPart.length > 64) return 'Local part too long (max 64 characters)'
    if (localPart.startsWith('.')) return 'Local part cannot start with a dot'
    if (localPart.endsWith('.')) return 'Local part cannot end with a dot'
    if (localPart.includes('..')) return 'Local part cannot have consecutive dots'
    
    // Check allowed characters in local part: A-Z, a-z, 0-9, ., _, -, +
    const localPartRegex = /^[A-Za-z0-9]+([._+-]?[A-Za-z0-9]+)*$/
    if (!localPartRegex.test(localPart)) return 'Local part contains invalid characters (allowed: A-Z, a-z, 0-9, . _ - +)'

    // DOMAIN validation (after @)
    if (domain.startsWith('.')) return 'Domain cannot start with a dot'
    if (domain.endsWith('.')) return 'Domain cannot end with a dot'
    if (domain.includes('..')) return 'Domain cannot have consecutive dots'
    if (domain.startsWith('-')) return 'Domain cannot start with hyphen'
    if (domain.endsWith('-')) return 'Domain cannot end with hyphen'
    if (!domain.includes('.')) return 'Domain must contain at least one dot'

    // Check allowed characters in domain: A-Z, a-z, 0-9, -, .
    const domainRegex = /^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/
    if (!domainRegex.test(domain)) return 'Domain contains invalid characters'

    return ''
  }

  // Password validation
  const validatePassword = (password) => {
    const hasCapitalLetter = /[A-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    const length = password.length >= 5

    return hasCapitalLetter && hasNumber && hasSpecialChar && length
  }

  // Get password validation feedback
  const getPasswordFeedback = (password) => {
    const feedback = []
    if (!/[A-Z]/.test(password)) feedback.push("• Must start with a capital letter")
    if (!/[0-9]/.test(password)) feedback.push("• Must have at least one number")
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) feedback.push("• Must have at least one special character")
    if (password.length < 5) feedback.push("• Must have at least 5 characters")
    return feedback
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Real-time validation
    if (name === 'email' && value) {
      const feedback = getEmailFeedback(value)
      setErrors({
        ...errors,
        email: feedback,
      })
    }

    if (name === 'password' && value) {
      const feedback = getPasswordFeedback(value)
      setErrors({
        ...errors,
        password: feedback.length > 0 ? feedback.join('\n') : '',
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Final validation
    const emailFeedback = getEmailFeedback(formData.email)
    const passwordFeedback = getPasswordFeedback(formData.password)

    const emailValid = !emailFeedback
    const passwordValid = passwordFeedback.length === 0

    if (!emailValid) {
      setErrors({
        ...errors,
        email: emailFeedback,
      })
    }

    if (!passwordValid) {
      setErrors({
        ...errors,
        password: passwordFeedback.join('\n'),
      })
    }

    if (emailValid && passwordValid) {
      alert(`Login Successful!\n\nEmail: ${formData.email}\nPassword: ${formData.password}`)
      handleCancel()
    }
  }

  const handleCancel = () => {
    setFormData({
      email: '',
      password: '',
    })
    setErrors({
      email: '',
      password: '',
    })
  }

  return (
    <div className="container">
      <h1>Client-Side Form Validation</h1>
      <form onSubmit={handleSubmit} className="form">
        
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email ID:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@domain.com"
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />
          {errors.password && (
            <div className="error-message password-feedback">
              {errors.password.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          )}
          {!errors.password && formData.password && (
            <span className="success-message">✓ Password is valid</span>
          )}
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button 
            type="submit" 
            className="btn btn-submit"
            disabled={!formData.email || !formData.password || errors.email || errors.password}
          >
            Submit
          </button>
          <button type="button" className="btn btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
