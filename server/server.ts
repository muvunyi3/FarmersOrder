import express, { Request, Response, Router } from 'express';
import farmerRouter from './routes/farmerRouter'; 
import productRouter from './routes/productRouter'; 
import orderRouter from './routes/orderRouter'; 
import paymentRouter from './routes/payment.Router'; 
import bodyParser from 'body-parser';
import { errorHandler } from './middleware/errorMiddleware';
import { logger } from './middleware/appLogger';

const app:express.Application = express();
const PORT:number = 5000;
const hostname:string = "127.0.0.1";


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/farmers', farmerRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/payment', paymentRouter);

app.use(logger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://${hostname}:${PORT}`);
});
