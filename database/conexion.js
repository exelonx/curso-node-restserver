
const mongoose = require('mongoose');
require('colors');

const dbCnn = async()=>{
    try {

        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Base de datos conectada'.green.bold)
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar a la base de datos'.red);
    }
}

module.exports = {
    dbCnn
}