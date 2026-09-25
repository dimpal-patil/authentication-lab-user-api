
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection
db.on('error', (error) => console.log(error.message + ' mongo is not running!'))
db.on('connected', () => console.log('mongo is connected!'))
db.on('disconnected',() => console.log('mongo has been disconnected!'))