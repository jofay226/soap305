import http from 'http';
import app from './app.ts';


const server = http.createServer(app);


const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(`docker port ${process.env.PORT}`);
    console.log(`server is running on port ${PORT}🚀🚀`);
})