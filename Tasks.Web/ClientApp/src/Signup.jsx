import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signup = () => {

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', });

  const navigate = useNavigate()
  const onSubmit = async e => {
    e.preventDefault()
    await axios.post('/api/account/signup', formData);
    navigate('/login')
  }
  const onTextChange = e => {
    const copy = { ...formData }
    copy[e.target.name] = e.target.value;
    setFormData(copy)
  }

  return (
    <div className="container" style={{ marginTop: 80 }}>
      <main role="main" className="pb-3">
        <div
          className="row"
          style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
        >
          <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
            <h3>Sign up for a new account</h3>
            <form>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="form-control"
                defaultValue=""
                onChange={onTextChange}
              />
              <br />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="form-control"
                defaultValue=""
                onChange={onTextChange}
              />
              <br />
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="form-control"
                defaultValue=""
                onChange={onTextChange}
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                defaultValue=""
                onChange={onTextChange}
              />
              <br />
              <button onClick={onSubmit} className="btn btn-primary">Signup</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Signup;