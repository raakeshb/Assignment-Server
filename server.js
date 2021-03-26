/*********************************************************************************
* WEB700 – Assignment 05
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: _Raakesh Balaji_ Student ID: 124518200 Date: 2021-03-26
*
* Online (Heroku) Link:https://quiet-coast-57526.herokuapp.com/
*
********************************************************************************/


const express = require('express');
const app = express();
const path = require('path')
const exphbs = require('express-handlebars');
const calli = require('./modules/serverDataModule.js');
const { mainModule } = require('process');
const Port = process.env.PORT || 8080;


calli.initialize().then(function () {
    app.listen(Port, () => {
        console.log("Listening on this port: " + Port);
    })
    app.use(function (req, res, next) {
        let route = req.baseUrl + req.path;
        app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
        next();
    });

    app.engine(".hbs", exphbs({
        extname: ".hbs",
        defaultLayout: "main",
        helpers: {
            navLink: function (url, options) {
                return '<li' +
                    ((url == app.locals.activeRoute) ? ' class="nav-item active" ' : ' class="nav-item" ') +
                    '><a class="nav-link" href="' + url + '">' + options.fn(this) + '</a></li>';
            },
            equal: function (lvalue, rvalue, options) {
                if (arguments.length < 3)
                    throw new Error("Handlebars Helper equal needs 2 parameters");
                if (lvalue != rvalue) {
                    return options.inverse(this);
                } else {
                    return options.fn(this);
                }
            }
        }
    }))
    app.set("view engine", ".hbs");

    app.get("/employees", (req, res) => {
        if (typeof req.query.department != "undefined") {
            calli.getEmployeesbyDepartment(req.query.department).then(function (data) {
                res.render("employees", { Employees: data });
            }).catch((err) => {
                res.render("employees", { message: "no results" });
            })
        }
        else {
            calli.getAllEmployees().then(function (data) {
                res.render("employees", {
                    Employees: data

                })
            }).catch((err) => {
                res.render("employees", { message: "no results" });
            })
        }
    });

    app.get("/departments", (req, res) => {
        calli.getDepartments().then(function (data) { res.render("departments", { departments: data }); }).catch((err) => {
            res.json({ message: err })
        });

    });



    app.get("/employee/:num", (req, res) => {
        calli.getEmployeesbyNum(req.params.num).then(function (data) { res.render("employee", { employee: data }); }).catch((err) => {
            res.send(err)
        });

    });

    app.get("/", (req, res) => {
        res.render("home");
        // res.sendFile(path.join(__dirname, "/views/home.html"));
    })

    app.get("/about", (req, res) => {
        res.render("about");
        //res.sendFile(path.join(__dirname, "/views/about.html"));
    })

    app.get("/htmlDemo", (req, res) => {
        res.render("htmlDemo");
        //res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
    })

    app.use(express.static("public"));
    app.use(express.urlencoded({ extended: true }));
    app.get("/:nonsense", (req, res) => {
        res.render("custom");
        //res.status(404).sendFile(path.join(__dirname, "/views/custom.html"));
    })

    app.get("/employees/add", (req, res) => {
        res.render("addEmployee")
        //res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
    })
    app.post("/employees/add", (req, res) => {
        calli.addEmployee(req.body).then(function (data) {
            res.redirect("/employees")
        }).catch(function (data) {
            res.send(data);
        })
    })

    app.get("/department/:id", (req, res) => {

        calli.getDepartmentById(req.params.id).then(function (data) {
            res.render("department", { department: data });
        }).catch((dataa) => {
            res.json({ message: dataa })
        })
    });

    app.post("/employee/update", (req, res) => {
        calli.updateEmployee(req.body).then(function () {
           res.redirect("/employees")
          
        })
    })


}).catch(function (err) {
    console.log("Server Cannot be started!! Error at Initializing data!");
})