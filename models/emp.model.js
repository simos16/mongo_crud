const mongoose = require('mongoose');
// employeeSchema
var empSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: 'Inserisci  il nome completo'
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        type: String
    },
    salary: {
        type: String
    }
});

// email validation
empSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Inseirsici una mail valida');

mongoose.model('empModel', empSchema);