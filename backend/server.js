const  dotenv = require("dotenv");
const connectDb = require("./config/db");
const app = require("./app");

dotenv.config();
connectDb();

const PORT = 3000 ;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    
});