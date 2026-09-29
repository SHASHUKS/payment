const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Mock API endpoint simulating NPCI/Drunix infrastructure
app.post('/api/transact', (req, res) => {
    const { amount, action } = req.body;
    
    // Generate a mock transaction ID
    const txId = 'NPCI' + Date.now().toString().slice(-6);
    
    console.log(`Processing ${action} for ₹${amount}`);
    
    // Send success response back to frontend
    res.json({
        success: true,
        transactionId: txId,
        message: `Successfully processed ₹${amount} for ${action}.`
    });
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});