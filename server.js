import app from './src/app';

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
export default app.server.listen(PORT, HOST);
