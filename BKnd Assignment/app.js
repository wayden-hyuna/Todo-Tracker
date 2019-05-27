const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
var file_path = path.join(__dirname, './index.html');


app.get('/', (req, res) => {
    res.sendFile(file_path);
});



app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/javascript'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/submit', submitForm);

function submitForm(req, res){
    
    var data = req.body;
    var form = data.form;
    var input = data.input;
    
    // form.addEventListener('submit', function(e) {
    //         e.preventDefault();
    //         todoMaker(input.value);
    //         todosArray.push(input.value);
    //         localStorage.setItem('todos', JSON.stringify(todosArray));
    //         input.value = '';
    //     });
    res.send(data);

}

// PORT
const port = 3000;
app.listen(port, () => console.log(`Gator listening on port ${port}...`));


