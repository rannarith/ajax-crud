var express = require('express');
var bodyParser = require('body-parser');

var app = express();


var products = [
    {
        id:1,
        name: 'latop'
    },
    {
        id:2,
        name: 'latop'
    },
    {
        id:3,
        name: 'latop'
    }

];
var currentId = 3;

var PORT = process.env.PORT || 4000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/products', function(req, res) {
    res.send({products: products});
});

app.post('/products', function(req, res) {
    var productName = req.body.name;
    currentId++;

    products.push({
        id: currentId,
        name: productName
    });

    res.send('Succressfuly create products');
});

app.put('/products/:id', function(req, res) {
    var id = req.params.id;
    var newName = req.body.newName;

    var found = false;

    products.forEach(function(product, index) {
        if(!found && product.id === Number(id)) {
            product.name = newName;
        }
    });

    res.send('Successfuly Updated product');
});

app.delete('/products/:id', function(req, res) {
    var id = req.params.id;
    
    var found = false;

    products.forEach(function(product, index) {
        if(!found && product.id === Number(id)) {
            products.splice(index,1);
        }
    });

    res.send('Delete succesfully');
});

app.listen(PORT, function() {
    console.log('server Listening on '+ PORT);
});
