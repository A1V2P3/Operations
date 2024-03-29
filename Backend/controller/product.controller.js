const express =require('express');
 const router=express.Router()
  
 const service=require('../services/product.services');
const bodyParser = require('body-parser');


//http://localhost:3000/api/product_table/

 router.get('/',async(req,res)=>{
   const product1=await service.getAllProduct()
    res.send(product1)
 })

 router.get('/:pr_id',async(req,res)=>{
   const product2=await service.getAllProductById(req.params.pr_id)
    res.send(product2)
 })

 router.delete('/:pr_id',async(req,res)=>{
   const affectedRows=await service.deleteProduct(req.params.pr_id)

   if(affectedRows==0){
     res.status(404).json('no record with given id :' + req.params.pr_id)
   }
   else
      res.send('deleted successfully')
   
 })


 
 router.post('/',async(req,res)=>{
  await service.addOrEditProduct(req.body)
  res.status(201).send('created successfully.' )
  
})

router.put('/:pr_id',async(req,res)=>{
  const data =await service.addOrEditProduct(req.body,req.params.pr_id)
  res.send(data);
  
})

 
 
 module.exports=router;