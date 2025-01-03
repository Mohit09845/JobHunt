import app from './app.js';
import dotenv from 'dotenv';
import connectDb from './database/db.js';

dotenv.config({})

connectDb();

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})
