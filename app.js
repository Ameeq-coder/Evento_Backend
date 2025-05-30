require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require('express');
const app = express();
const sequelize = require('./config/database'); // ✅ import database connection

app.use(express.json());

const authRouter = require('./route/authroute');
const verificationRoute = require('./route/verificationroute');

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Server Working Successful',
    message: 'Welcome To Evento Backend'
  });
});

app.use('/api/v1/verification', verificationRoute);
app.use('/api/v1/auth', authRouter);

const PORT = process.env.APP_PORT || 4000;

// ✅ First connect to the database, then start server
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully!');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Unable to connect to the database:', error);
  });

module.exports = app;
