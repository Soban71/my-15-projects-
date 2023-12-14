const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 3000;

app.use(cors());

const MONGODB_URI = "mongodb+srv://janjuasoban846:ZywvEgTkgrsbrMy5@cluster0.r3z0gav.mongodb.net/?retryWrites=true&w=majority";
try{
  mongoose.connect(MONGODB_URI,{ useUnifiedTopology: true });
   console.log("Database Connected Successfully");
}
catch(error){
   console.log('error',error);
}



const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },
  userName: String,
  URLField: String,
  password: String,
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.userId) {
    const count = await mongoose.model('User').countDocuments();
    console.log('Current document count:', count);
    user.userId = count + 1;
  }
  next();
});


const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

app.use(express.static('public'));



app.post('/signup', async (req, res) => {
  const { userName, URLField, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  const newUser = new User({
    userName,
    URLField,
    password,
  });

  try {
    await newUser.save();

    res.json({
      message: 'User registered successfully',
      userId: newUser._id,
      clearedFields: { userName: '', URLField: '', password: '', confirmPassword: '' },
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/users', async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findOneAndDelete({ userId: parseInt(userId, 10) });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Internal server error: ${err.message}` });
  }
});


app.put('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;

  try {
      const updatedUser = await User.findOneAndUpdate({ userId: userId }, updatedUserData, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User updated successfully' });
  } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ message: 'Error updating user' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



