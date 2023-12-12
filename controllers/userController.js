import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register User
const registerUser = async (req, res) => {
  try {
    // get data
    const { firstName, lastName, email, password } = req.body;
    // check if email already in use
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      res.status(400).json({ message: 'Email already registered' });
    } else {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(200).json({ message: 'Registration successful!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (user) {
      // check if passwords match
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        const token = jwt.sign(
          {
            userId: user._id,
          },
          process.env.JWT_SECRET
        );

        res.json(token);
      } else {
        res.status(400).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).populate('courses.courseId');
    // convert to object then delete the password property
    const foundUser = user.toObject();
    delete foundUser.password;
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const { userId } = req.user;
    const user = await User.findById(userId);

    // check if email was was changed
    if (user.email === email) {
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();
      res.status(201).json({ message: 'Profile updated successfully' });
    } else if (user.email !== email) {
      // check if email already exists
      const isUserExisting = await User.findOne({ email });
      if (isUserExisting) {
        res.status(400).json({ message: 'Email already registered' });
      } else {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        await user.save();
        res.status(201).json({ message: 'Profile updated successfully' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { registerUser, loginUser, getUserProfile, updateUserProfile };
