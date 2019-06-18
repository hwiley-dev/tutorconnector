const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User')


// @route   POST api/
// @desc    Register User
// @access  Public

router.post(
    '/',
    [
        check('name', 'Name is required!')
        .not()
        .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
            ).isLength({ min: 6 })
    ],
  async  (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

const { name, email, password } = req.body

// Check if user exists

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
user = new User({
    name,
    email,
    avatar,
    password
});

const salt = await bcrypt.genSalt(10);

user.password = await bcrypt.hash(password, salt);

await user.save()
// return JWT
return res.send('user registered!!')

} catch(err) { //catch the error
    console.error(err.message)
    res.status(500).send('Server Error Dude!')
}




// Encrypt user password
// Create a salt to hash pw



// Return jsonwebtoken

    
        res.send('User route');

});


module.exports = router