const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI')


const connectDB = async () => {
    try {
        await mongoose.connect(db, 
            {useNewUrlParser: true, 
            useCreateIndex: true, 
            useFindAndModify: false});
        
        console.log('MongoDB Connection Achieved!...')
    } catch(err){
        console.error(err.message);
        process.exit(1) // exits process
    }

}

module.exports  = connectDB