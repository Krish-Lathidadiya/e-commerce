require('dotenv').config();
const express=require('express');
const connectionDB=require('./config/db');
const cookieParser=require('cookie-parser');
const cors=require('cors');

const corsOptions={
    origin:["http://localhost:5173"],
    methods:["GET","POST","DELETE","PUT"],
    Credential:true
}
const app=express();
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json());

connectionDB();

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`listening on ${port}`);
})