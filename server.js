/*********************************************************************************
* WEB700 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name:Raakesh Balaji Student ID: 124518200 Date: 21-02-2021
*
********************************************************************************/ 


const express = require('express');
const app = express();
const path = require('path')
const calli = require('./modules/serverDataModule.js');
const bodyparser = require('body-parser');
const Port = process.env.PORT || 8080;

calli.initialize().then(function () {
    app.listen(Port, () => {
        console.log("Listening on this port: " + Port);
    })

    app.get("/employees", (req, res) => {
        if (typeof req.query.department != "undefined") {
            calli.getEmployeesbyDepartment(req.query.department).then(function (data) { res.send(data); }).catch((err) => {
                res.json({ message: err })
            })
        }
        else {
            calli.getAllEmployees().then(function (data) { res.send(data) }).catch((err) => {
                res.json({ message: err });
            })
        }
    });

    app.get("/departments", (req, res) => {
        calli.getDepartments().then(function (data) { res.send(data); }).catch((err) => {
            res.json({ message: err })
        });

    });

    app.get("/managers", (req, res) => {
        calli.getManagers().then(function (data) { res.send(data); }).catch((data) => {
            res.json({ message: err })
        });


    });


    app.get("/employee/:num", (req, res) => {
        calli.getEmployeesbyNum(req.params.num).then(function (data) { res.send(data); }).catch((err) => {
            res.send(err)
        });

    });

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "/views/home.html"));
    })

    app.get("/about", (req, res) => {
        res.sendFile(path.join(__dirname, "/views/about.html"));
    })

    app.get("/htmlDemo", (req, res) => {
        res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
    })

    app.use(express.static("public"));
    app.use(bodyparser.urlencoded({extended:true}));
     app.get("/:nonsense", (req, res) => {
        res.status(404).sendFile(path.join(__dirname, "custom.html"));
     })
    
     app.get("/employees/add",(req,res)=>{
         res.sendFile(path.join(__dirname,"/views/addEmployee.html"));
     })
     app.post("/employees/add",(req,res)=>{
         calli.addEmployee(req.body).then(function(data){
             res.send(data)
         }).catch(function(data){
             res.send(data);
         })
     })


}).catch(function (err) {
    console.log("Server Cannot be started!! Error at Initializing data!");
})