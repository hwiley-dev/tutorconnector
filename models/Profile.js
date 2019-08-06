const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    }
    // specialty: {
    //     type: String,
    //     required: true
    // },
    // website: {
    //     type: String
    // },
    // bio: {
    //     type: String
    // }

})

module.exports = Profile = mongoose.model('profile', ProfileSchema)