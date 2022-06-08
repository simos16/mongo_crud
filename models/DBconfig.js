const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://new-user:h0r3UvMipV2Cs5HQ@mycluster.azlqk.mongodb.net/myapp?retryWrites=true&w=majority\n',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true

    }, (err) => {
    if (!err) {
        console.log('DB connesso')
    }
    else {
        console.log('Errore nella connessione' + err)
    }
});

require('./emp.model');