const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const scheduler = require('./scheduler');

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/api/providers', require('./routes/providers'));

app.get('/', (req, res) => res.send('DevDash backend running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  scheduler.start();
});
