import React from 'react'

export const Landing = () => {
    return (
        <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Tutor Connector</h1>
          <p className="lead">
            Create a profile, share posts and participate in discussions with other students and tutors
            {/* <ul>
            <li> Share Teaching Approach</li>
            <li> Find Work as a Tutor</li>
            <li> Find a Tutor</li>
            </ul> */}
          </p>
          <div className="buttons">
            <a href="register.html" className="btn btn-primary">Sign Up</a>
            <a href="login.html" className="btn btn-light">Login</a>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Landing
