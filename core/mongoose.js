const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/lojinha', { useNewUrlParser: true, useUnifiedTopology: true });
    
    mongoose.connection.on('open', () => {
        console.log('Conectado ao banco de dados');
    })
};