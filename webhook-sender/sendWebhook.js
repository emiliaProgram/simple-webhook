const axios = require('axios');
const crypto = require('crypto');

const SECRET = 'your_secret_key';

const sendWebhook = async () => {
    const url = 'http://localhost:3000/webhook';
    const payload = {
        event: 'user_signup',
        user: {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com'
        }
    };
    const payloadString = JSON.stringify(payload);
    const signature = crypto.createHmac('sha256', SECRET).update(payloadString).digest('hex');

    try {
        const response = await axios.post(url, payload, {
            headers: {
                'x-signature': signature
            }
        });
        console.log('Webhook sent:', response.data);
    } catch (error) {
        console.error('Error sending webhook:', error.message);
    }
};

sendWebhook();
