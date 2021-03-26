
const fs = require('fs');
const path = require('path');

class Data {
    constructor(employees, departments) {
        this.employees = employees;
        this.department = departments;

    }
}
var allData = null;

module.exports.initialize = function () {

    return new Promise(function (resolve, reject) {
        fs.readFile('./data/employees.json', 'utf8', function (err, file1) {
            if (err) { reject("Error while reading Employees file") }
            else {
                fs.readFile('./data/departments.json', 'utf8', function (err2, file2) {
                    if (err2) { reject("Error while reading departments file") }
                    else {
                        allData = new Data(JSON.parse(file1), JSON.parse(file2));
                        resolve();
                    }
                })
            }
        });
    }
    );
}




module.exports.getAllEmployees = function () {
    return new Promise(function (resolve, reject) {
        if (allData.employees.length == 0) {
            reject("no results returned");
        } else {

            resolve(allData.employees);
        }
    });
}

module.exports.getDepartments = function () {
    return new Promise(function (resolve, reject) {
        if (allData.department.length == 0) {
            reject("no results returned");
        } else {
            resolve(allData.department);
        }
    });
}

module.exports.getManagers = function () {

    return new Promise(function (resolve, reject) {
        let count = [];
        if (allData.employees.length > 0) {
            for (let i = 0; i < allData.employees.length; i++) {
                if (allData.employees[i].isManager == true) {
                    count.push(allData.employees[i]);
                }
            }
            resolve(count);
        }
        else { reject("no results returned"); }
    });
}

module.exports.getEmployeesbyDepartment = function (deptno) {
    return new Promise(function (resolve, reject) {
        let array = []
        if (allData.employees.length == 0) {
            reject("no results returned");
        } else {
            for (let i = 0; i < allData.employees.length; i++) {
                if (allData.employees[i].department == deptno) {
                    array.push(allData.employees[i]);
                }
            }

        }
        resolve(array);
    });
}

module.exports.getEmployeesbyNum = function (Num) {
    return new Promise(function (resolve, reject) {


        if (allData.employees.length == 0) {
            reject("no results returned");
        } else {
            for (let i = 0; i < allData.employees.length; i++) {
                if (allData.employees[i].employeeNum == Num) {
                    resolve(allData.employees[i]);
                }
            }

        }

    });
}

module.exports.addEmployee = function (Dataa) {
    return new Promise((resolve, reject) => {
        if (typeof Dataa.isManager == "undefined") {
            Dataa.isManager = false;
        }
        else { Dataa.isManager = true; }
        Dataa.employeeNum = allData.employees.length + 1;
        allData.employees.push(Dataa);
        resolve(allData.employees);
    })

}

module.exports.getDepartmentById = function (id) {
    return new Promise((resolve, reject) => {


        for (let i = 0; i < allData.department.length; i++) {


            if (allData.department[i].departmentId == id) {

                resolve(allData.department[i]);
            }


        }
        reject("query returned 0 results")

    })
}


module.exports.updateEmployee = function (empdata) {
    return new Promise((resolve, reject) => {

        let temp = 0;
        for (let i = 0; i < allData.employees.length; i++) {


            if (allData.employees[i].SSN == empdata.SSN) {

                temp = i;

            }

        }

        allData.employees[temp].firstName = empdata.firstName;
        allData.employees[temp].lastName = empdata.lastName;
        allData.employees[temp].email = empdata.email;
        allData.employees[temp].addressStreet = empdata.addressStreet;
        allData.employees[temp].addressCity = empdata.addressCity;
        allData.employees[temp].addressState = empdata.addressState;
        allData.employees[temp].addressPostal = empdata.addressPostal;
        if (empdata.isManager == 'on') {
            allData.employees[temp].isManager = true;
        }
        else {
            allData.employees[temp].isManager = false;
        }
        allData.employees[temp].employeeManagerNum = empdata.employeeManagerNum;
        allData.employees[temp].status = empdata.status;
        allData.employees[temp].department = empdata.department;
        resolve();
    })



}
