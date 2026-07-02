const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const settingsRoutes = require('./routes/settings');
const referralsRoutes = require('./routes/referrals');
const billingRoutes = require('./routes/billing');
const documentsRoutes = require('./routes/documents');
const servicesRoutes = require('./routes/services');
const taMutawwifRoutes = require('./routes/ta-mutawwif');
const taFinanceRoutes = require('./routes/ta-finance');

app.use('/api/settings', settingsRoutes);
app.use('/api/referrals', referralsRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/ta/mutawwif', taMutawwifRoutes);
app.use('/api/ta/finance', taFinanceRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
