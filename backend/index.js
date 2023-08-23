const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
require('./models/Config')
const app = express();

const contactRoutes = require('./router/contact');
const PORT = process.env.PORT
app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);

// const connectDB = require('./models/Config');
const User = require('./models/User');
const cookieParser = require('cookie-parser');

//connectDB();
app.use(cookieParser())

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '2h' });
};

app.post('/signup', async(req, res) => {
    try {
        const { userName, email, password, confirmPassword, phone, age, gender } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            phone,
            age,
            gender,
        });

        let result = await newUser.save();
        result = result.toObject();
        delete result.password;

        console.log('User saved:');
        res.status(201).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = generateToken(user._id);
        const { password: hashedPassword, ...userData } = user.toObject();



        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
            secure: true,
            sameSite: 'none',
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while processing your request' });

    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});