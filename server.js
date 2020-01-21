const express = require('express');
const connectDB = require('./config/db')

const app = express()

// Connect to MongoDB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }))


app.get('/', (req ,res) => res.send('API Running'));

// Defining Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// app.use('/api/profile/experience'), require('./routes/api/profile/experience');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))