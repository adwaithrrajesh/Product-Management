const express = require('express');
const cors = require('cors');
const morgan  = require('morgan');
const app = express();
const dotenv = require('dotenv');
const productRoute = require('./Routes/productRouter')
require('./database/config')


//------------ Requiring DOTENV -----------------
dotenv.config();

//-------------- CORS --------------------


app.use(express.json());
app.use(cors({
    origin: '*',
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials:true
}));
app.use(morgan('dev'));
app.use('/api',productRoute)

//-------------------------------------------- PORT --------------------------------------------

const port = process.env.PORT;



//----------------------------------------------- STARTING SERVER -------------------------------------

app.listen(port,()=>{console.log(`server started at port ${port}`);});
