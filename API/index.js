const dotenv = require('dotenv');
const express = require('express');
const app = require();

dotenv.config();

app.use(express.json());
const router = express.Router();

router.get('/', (res,res) => {
  res.send('API working');
})

app.use('/', router);
app.listen(prototype, ()=>{
  console.log('API corriendo bien')
})