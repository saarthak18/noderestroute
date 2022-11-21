let express =require('express');
//for reading value from .env
let app=express();
let dotenv = require('dotenv');
 dotenv.config()

//for logging purpose
let morgan=require('morgan');
let fd=require('fs');
let port=process.env.PORT || 9800;
let cors = require('cors');
let mongo = require('mongodb');
const { query } = require('express');
let MongoClient =mongo.MongoClient;
let mongoUrl=process.env.MongoLive;
let bodyParser=require('body-parser')
let db;


app.use(morgan('short',{stream:fd.createWriteStream('./app.logs')}))
app.get('/',(req,res)=>{
    res.send('this is from express')
})

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.get('/home',(req,res)=>{
    res.send('this is home page')
})





//connect node to mongo
MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log("error");
    db=client.db('myntra');
    app.listen(port,()=>{
        console.log(`listing to port ${port}`)
    })
})


//getting all data
// app.get('/formals',(req,res)=>{
//     db.collection('formals').find().toArray((err,result)=>{
//         if(err) throw err;
//         res.send(result);
//     })
// }) 
//home page get


app.get('/homedod',(req,res)=>{
    let query={};
    let id=req.query.id;
   if(id)
   {
    query={
        id:id
    }
}
    db.collection('dod').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })

})


app.get('/homebom',(req,res)=>{
    let query={};
    let id=req.query.id;
    if(id)
    {
        query={id:id}
    }
    
    db.collection('bom').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })

})

app.get('/kids',(req,res)=>{
    let query={};
    let brand=req.query.brand;
    let lcost=Number(req.query.lcost);
    let hcost=Number(req.query.hcost);
    let size=req.query.size;
    let sort={price:1};
    let id=req.query.id;
    if(req.query.sort)
    {
        sort={price:req.query.sort}
    }
    if(id)
    {
        query={
            _id:id
        } 
    }
    if(brand && size)
    {
        query={
            brand:brand,
            $and:[{size:size}]
        }
    }
    else if(lcost && hcost)
    {
        query={
        
            $and:[{price:{$gt:lcost,$lt:hcost}}]
        
            
        }
    }
       else if(brand)
        {
            query={brand:brand};
        }
    else if(size)
    {
        query={size:size}
    }
    db.collection('kids').find(query).sort(sort).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
}) 


app.get('/kurtas',(req,res)=>{
    let query={};
    let brand=req.query.brand;
    let lcost=Number(req.query.lcost);
    let hcost=Number(req.query.hcost);
    let size=req.query.size;
    let sort={price:1};
    let id=req.query.id;
    if(req.query.sort)
    {
        sort={price:req.query.sort}
    }
    if(id)
    {
        query={
            _id:id
        } 
    }
    if(brand && size)
    {
        query={
            brand:brand,
            $and:[{size:size}]
        }
    }
    else if(lcost && hcost)
    {
        query={
        
            $and:[{price:{$gt:lcost,$lt:hcost}}]
        
            
        }
    }
       else if(brand)
        {
            query={brand:brand};
        }
    else if(size)
    {
        query={size:size}
    }
    db.collection('kurtas').find(query).sort(sort).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
}) 


app.get('/pants',(req,res)=>{
    let query={};
    let brand=req.query.brand;
    let lcost=Number(req.query.lcost);
    let hcost=Number(req.query.hcost);
    let size=req.query.size;
    let sort={price:1};
    let id=req.query.id;
    if(req.query.sort){
        sort={price:req.query.sort}
    }
    if(id)
    {
        query={
            _id:id
        } 
    }
    if(brand && size)
    {
        query={
            brand:brand,
            $and:[{size:size}]
        }
    }
    else if(lcost && hcost)
{
    query={
        $and:[{price:{$gt:lcost,$lt:hcost}}]
    
        
    }

}
    
       else if(brand)
        {
            query={brand:brand};
        }
    else if(size)
    {
        query={size:size}
    }
    db.collection('pants').find(query).sort(sort).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
}) 





app.get('/formals',(req,res)=>{
    let query={};
    let id=(req.query.id);
    let brand=req.query.brand;
    let size=req.query.size;
    let sort={price:1}
    let lcost=Number(req.query.lcost);
    let hcost=Number(req.query.hcost);
    if(req.query.sort){
        sort={price:req.query.sort}
    }
    if(id)
    {
        console.log(id);
        query={
            _id:id
        }
    }
   
if(brand && size)
{
    query={
        brand:brand,
        $and:[{size:size}]
    }
}

else if(lcost && hcost)
{
    query={
        $and:[{price:{$gt:lcost,$lt:hcost}}]
        
    }

}
 else if(brand)
    {
        query={brand:brand};
    }
    else if(size)
    {
        query={size:size};
    }
    db.collection('formals').find(query).sort(sort).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
}) 

// 2in 1

// app.get('/formals/:brand',(req,res)=>{
//     let query={};
//     let sort={price:1};
//     let brand=req.query.brand;
//     let lcost=Number(req.query.lcost);
//     let hcost=Number(req.query.hcost);
    
//     if(req.query.sort){
//         sort={price:req.query.sort}
//     }
    
    

//     query={
//         brand:brand,
//         $and:[{price:{$gt:lcost,$lt:hcost}}],
      
//     }
    
    
//     db.collection('formals').find(query).sort(sort).toArray((err,result)=>{
//         if(err) throw err;
//         res.send(result);
//     })

// })




app.get('/formals/:brand',(req,res) => {
    let query = {};
    let sort = {price:1}
    let brand=req.params.brand;
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    if(req.query.sort){
        sort={price:req.query.sort}
    }
    
        query={
           brand:brand,
        
            $and:[{price:{$gt:lcost,$lt:hcost}}]
        }

   
    db.collection('formals').find(query).sort(sort).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

app.get('/pants/:brand',(req,res) => {
    let query = {};
    let sort = {price:1}
    let brand=req.params.brand;
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    if(req.query.sort){
        sort={price:req.query.sort}
    }
    
        query={
           brand:brand,
        
            $and:[{price:{$gt:lcost,$lt:hcost}}]
        }

   
    db.collection('pants').find(query).sort(sort).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

app.get('/kids/:brand',(req,res) => {
    let query = {};
    let sort = {price:1}
    let brand=req.params.brand;
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    if(req.query.sort){
        sort={price:req.query.sort}
    }
    
        query={
           brand:brand,
        
            $and:[{price:{$gt:lcost,$lt:hcost}}]
        }

   
    db.collection('kids').find(query).sort(sort).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})


app.get('/kurtas/:brand',(req,res) => {
    let query = {};
    let sort = {price:1}
    let brand=req.params.brand;
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    if(req.query.sort){
        sort={price:req.query.sort}
    }
    
        query={
           brand:brand,
        
            $and:[{price:{$gt:lcost,$lt:hcost}}]
        }

   
    db.collection('kurtas').find(query).sort(sort).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})


app.get('/oderhistory',(req,res)=>{
    no=Number(req.query.no);
   let query={};
    if(no)
    {
        query={
            phone_no:no
        }
    }
    db.collection('orders').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})


app.get('/cart-items',(req,res)=>{
   
   let query={};

    db.collection('cart').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.get('/wishlist-items',(req,res)=>{
   
    let query={};
 
     db.collection('wishlist').find(query).toArray((err,result)=>{
         if(err) throw err;
         res.send(result);
     })
 })

//post calls
app.post('/placeOrder',(req,res)=>{
    console.log(req.body);
   db.collection('orders').insert(req.body,(err,result)=>{
    if(err) throw err;
    res.send('order placed')
   })
})



app.post('/addcart',(req,res)=>{
    console.log(req.body);
   db.collection('cart').insert(req.body,(err,result)=>{
    if(err) throw err;
    res.send('added to cart')
   })
})


app.post('/wishlist',(req,res)=>{
    console.log(req.body);
   db.collection('wishlist').insert(req.body,(err,result)=>{
    if(err) throw err;
    res.send('wishlisted')
   })
})

//put
app.put('/updateOrder/:id',(req,res) => {
    let oid = Number(req.params.id);
    db.collection('orders').updateOne(
        {order_id:oid},
        {
            $set:{
                "status":req.body.status,
               
                "date":req.body.date
            }
        },(err,result) => {
            if(err) throw err;
            res.send('Order Updated')
        }
    )
})

//Delete
app.delete('/deleteOrder/:id',(req,res) => {
    let order_id = Number(req.params.id);
    let query={};
    query={
        order_id:order_id
    }
    db.collection('orders').deleteOne(query,(err,result) => {
        if(err) throw err;
        res.send('Order Deleted')
    })
})

