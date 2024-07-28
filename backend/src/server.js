const app = require('./app.js');
const connect = require('./configs/db.js');
require('dotenv').config()

const PORT = process.env.PORT || 8080;
app.listen(PORT,async()=>{
    try{
        await connect();
        console.log(`listening on port,${PORT}`);
    }catch(err){
        console.log(err.message);
    }
})