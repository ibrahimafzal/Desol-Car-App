const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoute');
const carRoutes = require('./routes/carRoute');
const dbConnect = require('./config/dbConnect');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
dbConnect()

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
