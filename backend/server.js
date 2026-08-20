const express=require('express');
const app=express();
const port=3000;

app.use(express.json());

app.get('/',(req,res) =>{
    res.send('Hello CRM ');
});

app.post('/test',(req,res)=>{
    const name=req.body.name;
    res.send(name);
    

});


app.listen(port, () => {
    console.log(`Server is connected on port ${port}`);
});