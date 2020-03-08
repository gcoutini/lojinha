const app = require('./core/express');

process.env.PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}...`);
});