const express = require('express');
const app = express();
const employeeRoute = express.Router();
let Employee = require('../model/Employee');
// Add Employee
employeeRoute.route('/add-employee').post((req, res, next) => {

    Employee.create(req.body)
    .then((data) => {
        res.send({
            kq: 1,
            msg: data,
            isSuccess: true
        });
    })
    .catch((err) => {
        res.send({
            kq: 0,
            msg: 'error',
            isSuccess: false
        });
        console.error(err);
    });
});
// Get all Employee
employeeRoute.route('/').get((req, res) => {
    Employee.find().then((Items) => {
        console.log(Items);
        res.send({
            kq: 0,
            msg: Items,
            isSuccess: true
        });
        //res.render("list", {newItem:Items});
    }).catch(function(err){
    console.log(err);
    });
})
// Get Employee
employeeRoute.route('/read-employee/:id').get((req, res) => {
    console.log('ssssdcsss');
    console.log( req.params.id);
    Employee.findById(req.params.id).then(data => {
        res.send({
            kq: 0,
            msg: data,
            isSuccess: true
        })
    }).catch(function(error){
            console.log('aaa ' + error);
    });
})

// Update Employee
employeeRoute.route('/update-employee/:id').put((req, res, next) => {
    console.log('puttt');
    console.log( req.body);
    Employee.findByIdAndUpdate(req.params.id,  req.body).then((error, data) => {
        if (error) {
            res.send({
                kq: 0,
                msg: data,
                isSuccess: true
            })
        } else {
            res.send({
                kq: 0,
                msg: data,
                isSuccess: true
            })
        console.log('Book updated successfully!')
        }
    }).catch(function(error){
        res.send({
            kq: 0,
            msg: error,
            isSuccess: false
        })
    });
})
// Delete Employee
employeeRoute.route('/delete-employee/:id').delete((req,res, next) => {
    console.log('saaasssd');
    console.log( req.params.id);
     Employee.findByIdAndRemove(req.params.id).then((error,data) => {
        if (error) {
            res.send({
                kq: 0,
                msg: error,
                isSuccess: false
            })
        } else {
            res.send({
                kq: 0,
                msg: data,
                isSuccess: true
            })
        }
    }).catch(function(err){
        res.send({
            kq: 0,
            msg: error,
            isSuccess: false
        })
    }); 
})
module.exports = employeeRoute;