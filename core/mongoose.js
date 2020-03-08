const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect(`mongodb+srv://lojinha:${process.env.DB_PASSWORD}@cluster0-mgg45.mongodb.net/lojinha?retryWrites=true&w=majority`, 
        { useNewUrlParser: true, useUnifiedTopology: true });
    
    mongoose.connection.on('open', () => {
        console.log('Conectado ao banco de dados');
    })
};