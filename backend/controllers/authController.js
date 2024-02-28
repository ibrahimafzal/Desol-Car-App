const User = require('../model/User');
const asyncHandler = require("express-async-handler")

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password'});
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = {
  loginUser,
};
