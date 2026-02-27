import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    skills: [],
    address: '',
    state: '',
  })

  // Calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return ''
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSkillsChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setFormData({
        ...formData,
        skills: [...formData.skills, value],
      })
    } else {
      setFormData({
        ...formData,
        skills: formData.skills.filter((skill) => skill !== value),
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Form Submitted!\n\nFirst Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nGender: ${formData.gender}\nDOB: ${formData.dob}\nAge: ${calculateAge(formData.dob)}\nSkills: ${formData.skills.join(', ')}\nAddress: ${formData.address}\nState: ${formData.state}`)
    console.log(formData)
  }

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      skills: [],
      address: '',
      state: '',
    })
  }

  return (
    <div className="container">
      <h1>User Registration Form</h1>
      <form onSubmit={handleSubmit} className="form">
        
        {/* First Name */}
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            placeholder="Enter your first name"
          />
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            placeholder="Enter your last name"
          />
        </div>

        {/* Gender Radio Buttons */}
        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleInputChange}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleInputChange}
                required
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === 'Other'}
                onChange={handleInputChange}
                required
              />
              Other
            </label>
          </div>
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        {/* Age (Auto-calculated) */}
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={calculateAge(formData.dob)}
            disabled
            placeholder="Auto-calculated"
          />
        </div>

        {/* Skills Checkboxes */}
        <div className="form-group">
          <label>Skills:</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="JavaScript"
                checked={formData.skills.includes('JavaScript')}
                onChange={handleSkillsChange}
              />
              JavaScript
            </label>
            <label>
              <input
                type="checkbox"
                value="React"
                checked={formData.skills.includes('React')}
                onChange={handleSkillsChange}
              />
              React
            </label>
            <label>
              <input
                type="checkbox"
                value="HTML/CSS"
                checked={formData.skills.includes('HTML/CSS')}
                onChange={handleSkillsChange}
              />
              HTML/CSS
            </label>
            <label>
              <input
                type="checkbox"
                value="Node.js"
                checked={formData.skills.includes('Node.js')}
                onChange={handleSkillsChange}
              />
              Node.js
            </label>
            <label>
              <input
                type="checkbox"
                value="MongoDB"
                checked={formData.skills.includes('MongoDB')}
                onChange={handleSkillsChange}
              />
              MongoDB
            </label>
          </div>
        </div>

        {/* Address */}
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            placeholder="Enter your address"
            rows="4"
          />
        </div>

        {/* State Dropdown */}
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select State --</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button type="submit" className="btn btn-submit">Submit</button>
          <button type="button" className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default App
