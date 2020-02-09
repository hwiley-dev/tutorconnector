import React, { Fragment, useState } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = () => {
    const [formData, setFormData ] = useState({ 
        name: '',
        email: '',
        password: '',
});

const { name, email, password } = formData

const onChange = e => 
setFormData({ ...formData, [e.target.name] : e.target.value})

const onSubmit = async e  => {
  e.preventDefault();
   
      console.log('SUCCESS')
   
};

    return (
    <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign In to Your Account</p>
        <form className="form" onSubmit ={ e => onSubmit(e)} >
          <div className="form-group">
            <input 
            type="text" 
            placeholder="Name" 
            name="name"
            value={name}
            onChange={e => onChange(e)} 
            required />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={e => onChange(e)}
              name="email" />
            <small className="form-text"
              >This site uses Gravatar so if you want a profile image, use a
              Gravatar email</small
            >
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={e => onChange(e)}
              minLength="6"
            />
          </div>
         
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to='/login'>Sign Up</Link>
        </p>
      </Fragment>
    )
  }
    
export default Login;