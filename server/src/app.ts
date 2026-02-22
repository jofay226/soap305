import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoute from './routes/user.route.ts'

const app = express();
dotenv.config();

app.use(bodyParser.text({type: "text/xml"}))
app.use('/api/soap', userRoute)




export default app