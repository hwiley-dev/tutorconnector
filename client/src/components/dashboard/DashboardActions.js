import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-dom'


const DashboardActions = props => {
  return (
    <div class="dash-buttons">
      <Link to="/edit-profile.html" class="btn btn-light">
        <i class="fas fa-user-circle text-primary" /> Edit Profile</Link>
      <Link to="/add-experience.html" class="btn btn-light"></Link>
        <i class="fab fa-black-tie text-primary" /> Add Experience
      <Link to="/add-education.html" class="btn btn-light">
        <i class="fas fa-graduation-cap text-primary" /> Add Education
        </Link>
      </div>
  )
}

DashboardActions.propTypes = {

}

export default DashboardActions
