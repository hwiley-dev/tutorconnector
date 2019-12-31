const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const {check, validationResult } = require('express-validator/check');

// Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/profile/me
// @desc Get current users profile
// @access Private

router.get('/me', auth, async (req,res) =>  {
    try {
const profile = await Profile.findOne({ user: req.user.id }).populate(
    'user',
    ['name', 'avatar']
);

if(!profile) {
    return res.status(400).json({ msg: 'There is no profile for this user' });
}
res.json(profile);
    } catch (err) {
        console.error(err.message);
    }
}); 

// @route POST api/profile
// @desc Create or Update users profile
// @access Private
router.post('/',[
    auth, 
    [
    check('status', 'Status is required')
        .not()
        .isEmpty(),
    check('skills', 'Skills is require')
        .not()
        .isEmpty()
    ]
], 
async (req, res) => {
const errors = validationResult(req);
if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
}

const {
    status, 
    skills, 
    linkedin,
    instagram

} = req.body 

// Build Profile Object
const profileFields = {}
profileFields.user = req.user.id;
if (status) profileFields.status = status;
if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
}
// if(website) profileFields.website = website;
// if (bio) profileFields.bio = bio;

// Build social object if you want to
profileFields.social = {};
if (linkedin) profileFields.social.linkedin = linkedin;
if (instagram) profileFields.social.instagram = instagram;


try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile){
        // Update
        profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true },
            { useFindAndModify: false }
        )
        return res.json(profile);
    }

    // If not found, Create profile
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
}

});


// @route GET api/profile
// @desc Get all profiles
// @access Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (err) {
        console.error(err.message)
    }
})

// @route GET api/profile/user/:user_id
// @desc Get user profile by ID
// @access Public

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])

        if (!profile) return res.status(400).json({msg: "There's no profile for this user!"}
        );

        res.json(profile)
    } catch (err) {
        console.error(err.message)
        if(err.kind = "ObjectId"){
            return res.status(400).json({msg: "profile not found!"})
        }
        res.status(500).send('Server Error')
    }
});

// @route DELETE api/profile
// @desc Delet profile, user & posts
// @access Public

router.delete('/', auth, async (req, res) => {
    try {
        //@todo - remove users posts

        // Remove Profile
        await Profile.findOneAndRemove({ user:req.user.id })
        // Remove user
        await User.findOneAndRemove({ _id:req.user.id })
        
        res.json({msg: 'User Deleted'})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');

    }
})
    

module.exports = router