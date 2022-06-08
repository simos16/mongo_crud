const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('empModel');

router.get('/', (req, res) => {
    res.render("employee/addupdate", {
        viewTitle: "inserisci risorsa"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var employee = new Employee();
    employee.full_name = req.body.full_name;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.address = req.body.address;
    employee.salary = req.body.salary;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addupdate", {
                    viewTitle: "Aggiungi risorsa",
                    employee: req.body
                });
            } else
                console.log('Errore durante l\'inserimento: ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.updateOne({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addupdate", {
                    viewTitle: 'Aggiorna',
                    employee: req.body
                });
            } else
                console.log('Errore durante l\inserimento ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                emplist: docs
            });
        } else {
            console.log('Errore nella visualizzazione' + err);
        }
    });
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'full_name':
                body['full_nameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addupdate", {
                viewTitle: "Modifica la risorsa",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        } else {
            console.log('Errore durante la rimozione' + err);
        }
    });
});

module.exports = router;