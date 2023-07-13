const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");
const TransferSchema = require("./utils/TransferSchema").Transfers;  
const { connectDB, db:mongoose } = require('./utils/ConnectToDb');

app.use(cors());
app.use(express.json());

app.post("/webhook", async (req, res) =>{
  try {
    await connectDB();  
    
    const {body} = req;
    
    if(body.confirmed){      
      let newTransfers = [];
            
      for (transfer of body.erc20Transfers){
        newTransfers.push({
          fromAddress: transfer.from,     
          toAddress: transfer.to,       
          value: transfer.value,        
          valueWithDecimals: transfer.valueWithDecimals,
        });   
      }
    
      if (newTransfers.length >0) {
        await TransferSchema.insertMany(newTransfers); 
        console.log("Added New Transfer To DB")    
      }      
    }
    
    res.status(200).json();
    
  } catch(err) {
    console.log(err);
    res.status(500).json({error: 'Internal server error'})  
  }
});

app.listen(port, () => {  
  console.log(`Transfer API listening on port ${port}!`)
});