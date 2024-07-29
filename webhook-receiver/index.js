const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = 'your_secret_key';

app.use(bodyParser.json());

const verifySignature = (req, res, next) => {
    const signature = req.headers['x-signature'];
    const payload = JSON.stringify(req.body);
    const hash = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');

    if (hash === signature) {
        next();
    } else {
        res.status(401).send('Invalid signature');
    }
};

app.post('/webhook', verifySignature, (req, res) => {
    const payload = req.body;
    console.log('Received verified webhook:', payload);

    // Perform your processing logic here
    // ...

    res.status(200).send('Webhook received');
});

app.listen(PORT, () => {
    console.log(`Webhook receiver running on port ${PORT}`);
});
