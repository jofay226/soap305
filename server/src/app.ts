import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoute from './routes/soap.route.ts'
import cors from 'cors';

const app = express();
dotenv.config();

app.use(bodyParser.text({type: "text/xml"}))
app.use(cors({origin: "http://localhost:3000"}))
app.use('/api/soap', userRoute)





export default app