const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Routes
const truckRoutes = require('./controllers/truckControllers');
const authRoutes = require('./middlewares/auth');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// === Middlewares ===
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));

// === API Routes ===
app.use('/api/trucks', truckRoutes);         // CRUD for trucks
app.use('/api/auth', authRoutes);            // Login & registration

app.get("/", (req, res) => {
  res.send("API is running ✅");
});


// === 404 Handler ===
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// === Global Error Handler (Optional) ===
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ message: 'Server Error' });
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
