const express=require('express');
const app=express();

require('express-async-errors')
const db=require('./db');
const productRouter=require('./controller/product.controller');
const bodyParser = require('body-parser');
const path=require('path');




//middleware

app.use(express.static(path.join(__dirname, 'product-crud/browser')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/Frontend/browser/index.html'));
});

app.use(bodyParser.json())
app.use('/api/product_table',productRouter)

app.use((err,req,res,next)=>{
  console.log(err)
  res.status(err.status || 500).send('Something went wrong')
})


db.query("SELECT * from product_table")
   .then(() => {
     console.log('db connection succeeded')
     app.listen(3000,
        ()=> console.log('server started at http://localhost:3000/'))

   })
   .catch(err => console.log('db connection failed \n' + err))
      
      
     


