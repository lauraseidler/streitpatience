import express from 'express';

const port = process.env.PORT || 80;
const app = express();

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
