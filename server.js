const express = require('express');
const app = express();
const path = require('path')
const calli = require('./modules/serverDataModule.js');
const Port = process.env.PORT || 8080;

calli.initialize().then(function () {
    app.listen(Port, () => {
        console.log("Listening on this port: " + Port);
        app.get("/employees", (req, res) => {
            if (typeof req.query.department != "undefined") {
                calli.getEmployeesbyDepartment(req.query.department).then(function (data) { res.send(data); }).catch(() => {
                    res.json({ message: "no results" })
                })
            }
            else {
                calli.getAllEmployees().then(function (data) { res.send(data) }).catch(() => {
                    res.json({ message: "no results" });
                })
            }
        });

        app.get("/departments", (req, res) => {
            calli.getDepartments().then(function (data) { res.send(data); }).catch((data) => {
                res.json({ message: "no results" })
            });

        });

        app.get("/managers", (req, res) => {
            calli.getManagers().then(function (data) { res.send(data); }).catch((data) => {
                res.json({ message: "no results" })
            });


        });


        app.get("/employee/:num", (req, res) => {
            calli.getEmployeesbyNum(req.params.num).then(function (data) { res.send(data); }).catch((data) => {
                res.send(data)
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


        app.get("/:nonsense", (req, res) => {
            res.status(404).sendFile(path.join(__dirname, "download.jpg"));
        })


    });
}).catch(function () {
    console.log("Server Cannot be started!! Error at Initializing data!");
})