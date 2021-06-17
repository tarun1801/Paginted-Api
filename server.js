const express = require("express");
const app = express();
const mongoose = require('mongoose');
var cors = require('cors')

app.use(cors()) 



mongoose.connect('mongodb://localhost:27017/pagination', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const restaurantSchema = new mongoose.Schema({
    name: {
        type:String,
        required :true
    }
  });


  const Restaurant = mongoose.model('Restaurant', restaurantSchema);



  db.once('open', async function() {
    if( await Restaurant.countDocuments().exec()>0)
    {
        return;
    }
   Promise.all([
      Restaurant.create({name:"Restaurant 1"}),    
      Restaurant.create({name:"Restaurant 2"}),   
      Restaurant.create({name:"Restaurant 3"}),   
      Restaurant.create({name:"Restaurant 4"}),   
      Restaurant.create({name:"Restaurant 5"}),   
      Restaurant.create({name:"Restaurant 6"}),   
      Restaurant.create({name:"Restaurant 7"}),   
      Restaurant.create({name:"Restaurant 8"}),   
      Restaurant.create({name:"Restaurant 9"}),   
      Restaurant.create({name:"Restaurant 10"}),   
      Restaurant.create({name:"Restaurant 11"}),   
      Restaurant.create({name:"Restaurant 12"}),   
      Restaurant.create({name:"Restaurant 13"}),   
      Restaurant.create({name:"Restaurant 14"}),   
      Restaurant.create({name:"Restaurant 15"}),   
      Restaurant.create({name:"Restaurant 16"}),   
      Restaurant.create({name:"Restaurant 17"}),   
      Restaurant.create({name:"Restaurant 18"}),   
      Restaurant.create({name:"Restaurant 19"}),   
      Restaurant.create({name:"Restaurant 20"}),   
      Restaurant.create({name:"Restaurant 21"}),   
      Restaurant.create({name:"Restaurant 22"}),   
      Restaurant.create({name:"Restaurant 23"}),   
      Restaurant.create({name:"Restaurant 24"}),   
      Restaurant.create({name:"Restaurant 24"}),   
      Restaurant.create({name:"Restaurant 25"}),   
      Restaurant.create({name:"Restaurant 26"}),   
      Restaurant.create({name:"Restaurant 27"}),   
      Restaurant.create({name:"Restaurant 28"}),   
      Restaurant.create({name:"Restaurant 29"}),   
      Restaurant.create({name:"Restaurant 30"}),   
      Restaurant.create({name:"Restaurant 31"}),   
      Restaurant.create({name:"Restaurant 32"}),   
      Restaurant.create({name:"Restaurant 33"}),   
      Restaurant.create({name:"Restaurant 34"}),   
      Restaurant.create({name:"Restaurant 35"}),   
      Restaurant.create({name:"Restaurant 36"}),   
      Restaurant.create({name:"Restaurant 37"}),   
      Restaurant.create({name:"Restaurant 38"}),   
      Restaurant.create({name:"Restaurant 39"}),   
      Restaurant.create({name:"Restaurant 40"}),   
      Restaurant.create({name:"Restaurant 41"}),   
      Restaurant.create({name:"Restaurant 42"}),   
      Restaurant.create({name:"Restaurant 43"}),   
      Restaurant.create({name:"Restaurant 44"}),   
        Restaurant.create({name:"Restaurant 45"}),     Restaurant.create({name:"Restaurant 51"}),   
        Restaurant.create({name:"Restaurant 46"}),   
        Restaurant.create({name:"Restaurant 47"}),   
        Restaurant.create({name:"Restaurant 48"}),   
        Restaurant.create({name:"Restaurant 49"}),   
        Restaurant.create({name:"Restaurant 50"}),   
   ]
   ).then(()=>{
       console.log("Added Restaurants");
   })

  });
  

app.get("/restaurants",paginatedResults(Restaurant),(req,res)=>{
   
    res.json(res.data);
})


function paginatedResults(model)
{
    return async (req,res,next)=>{
        const searchField = req.query.q;
        const page = parseInt(req.query.page);
        const limit = 10
        const lowerIndex = (page-1 )*limit;
        const upperIndex = page*limit;
        const result = {};
        const lastPageNum = await Math.ceil(model.countDocuments().exec()/limit);
         
        console.log(lastPageNum)
        if(page !== lastPageNum)
        {
            result.next = {
                page:page+1,
                limit : limit
            }
    
        }
       
        if(page!==1)
        {
            result.previous = {
                page:page-1,
                limit : limit
            }
        }

        try{
            
         model.find({name:{$regex :searchField,$options : '$i'}}).then(data =>{
             console.log(data);
             result.docs = data.slice(lowerIndex,upperIndex);
         })
    
        result.numfound = await model.countDocuments().exec();
        
        res.data = result;
        next();
        } catch(e){
           res.status(500).json({message:e.message})
        }
      

    }
}

app.listen(8080,function(){
    console.log("Server listening oin the port 8080")
})