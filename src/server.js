import express from 'express';
import routes from './routes/route';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}`);
});

export default app;
