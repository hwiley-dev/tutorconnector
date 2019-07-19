const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check')

const User = require('../../models/User')
const auth = require('../../middleware/auth');

// @route api/auth
// @desc
// @access

router.get('/', auth, async (req,res) =>  {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    }catch (err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }

});

// @route   POST api/auth
// @desc    Authenticate & Get token
// @access  Public
router.post(
    'api/auth',
    [
        check('name', 'Name is required!')
        .not()
        .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please required'
            ).exists()
    ],
  async  (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

// Destructuring response
const { email, password } = req.body

// Check if user exists, if NOT send 400 error
try { 

let user = await User.findOne({ email});

if(!user) { 
    return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials'}]});
}

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch){
    return res
    .status(400)
    .json({errors:[{ msg: 'Invalid Credentials'}]})
}
// Getting user gravatar
const avatar = gravatar.url(email, {
    s: '200', // sizing of avatar
    r: 'pg', // rating (prevents nudity)
    d: 'mm' // default image
})



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