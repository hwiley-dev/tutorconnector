const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');


// @route   POST api/
// @desc    Register User
// @access  Public
router.post(
    '/',
    [
        check('name', 'Name is required')
        .not()
        .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Password Required'
            ).isLength({ min: 6 })
    ],
  async  (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

// Destructuring response
const { name, email, password } = req.body

// Check if email exists, if so send 400 error
try { 

let user = await User.findOne({ email});

if(user) { 
    return res.status(400).json({ errors: [{ msg: 'User already exists'}]});
}

// Getting user gravatar
const avatar = gravatar.url(email, {
    s: '200', // sizing of avatar
    r: 'pg', // rating (prevents nudity)
    d: 'mm' // default image
})

// Creates user object from input value in post request
user = new User({
    name,
    email,
    avatar,
    password
});


// Add salt
const salt = await bcrypt.genSalt(10);

// Hashbrowns and salt, no ketchup
user.password = await bcrypt.hash(password, salt);

await user.save()

const payload = {
    user: {
        id: user.id
    }
}

jwt.sign(
    payload, 
    config.get('jwtSecret'),
    {expiresIn: 360000},
    (err, token) => {
        if(err) throw err;
        res.json( {token} )}
);
// END TRY method
    } catch(err) { //catch the error
        console.error(err.message)
        res.status(500).send('Server Error Dude!')
    }


}); // End .post()


module.exports = router