require('dotenv').config();
const cors = require('cors')
const connectDB = require('./config/db')
const express = require('express');
const app = express();

const leadRouter = require('./routes/leadRoutes')


const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/lead', leadRouter);


app.get('/health', (req, res) => {
 res.status(200).send('ok')
})

connectDB();
app.listen(process.env.PORT, () => console.log(`server running on ${PORT}`))