const express = require('express');
const app = express();
const path = require('path')
const calli = require('./modules/serverDataModule.js');
const Port= process.env.PORT || 8080;

calli.initialize().then(function(){app.listen(Port,()=>{
    console.log("Listening on this port: "+Port);


app.get("/employees",(req,res)=>{
        if (typeof req.query.department =="undefined" )
        {
        calli.getAllEmployees().then(function(data){  res.send(data); })
        }
        else {

        calli.getEmployeesbyDepartment(req.query.department).then(function(data1){res.send(data1)});
        }
    });
        
app.get("/departments",(req,res)=>{
        calli.getDepartments().then(function(data){  res.send(data);  }).catch((data)=>{
            res.send(data)
        });

});

app.get("/managers",(req,res)=>{
   calli.getManagers().then(function(data){  res.send(data);  }).catch((data)=>{
    res.send(data)
});

   
});


app.get("/employee/:num",(req,res)=>{
        calli.getEmployeesbyNum(req.params.num).then(function(data){  res.send(data);  }).catch((data)=>{
            res.send(data)
        });
        
    } );

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/home.html"));
})

app.get("/about",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/about.html"));
})

app.get("/htmlDemo",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/htmlDemo.html"));
})


app.get("/:nonsense",(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,"download.jpg"));
})


});}).catch(function(){
    console.log("Server Cannot be started!! Error at Initializing data!");
})