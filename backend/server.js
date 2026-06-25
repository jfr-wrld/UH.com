const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const settingsRoutes = require('./routes/settings');
const referralsRoutes = require('./routes/referrals');
const billingRoutes = require('./routes/billing');

app.use('/api/settings', settingsRoutes);
app.use('/api/referrals', referralsRoutes);
app.use('/api/billing', billingRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
