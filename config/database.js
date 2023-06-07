const mongoose = require('mongoose');
const dbURI='mongodb+srv://ahmed:auth-user.Ahmed@auth-cluster.iwkwl.mongodb.net/?retryWrites=true&w=majority'

const connectDatabase = () => {
    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: false
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
})
}
module.exports = connectDatabase; 