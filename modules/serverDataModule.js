
const fs = require('fs');

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

module.exports.addEmployee = function(Dataa){
    return new Promise((resolve, reject) => {
            Dataa.isManager = (Dataa.isManager) ? true : false;
            Dataa.employeeManagerNum = allData.employees.length + 1;
            allData.employees.push(Dataa);
            resolve(allData.employees);
        })

}


