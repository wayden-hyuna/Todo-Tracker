const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
var file_path = path.join(__dirname, './index.html');
var todosArray = [];

app.get('/', (req, res) => {
    res.sendFile(file_path);
});

class Todo{

   
    constructor(title, description)
    {
        this.title = title;
        this.description = description;
        this.status = "status";
        this.created = new Date();
        this.completed = "yy/mm/dd";

    }

}



//middleware/////////////////////////////////////////////////////////////////////////
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/javascript'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

//request handlers/////////////////////////////////////////////////////////////

app.post('/submit', (req, res) => {
    
    var data = req.body;
    var myTodo = new Todo(data.title, data.description);
    todosArray.push(myTodo);
    res.send(todosArray);

});

app.get('/refresh', (req,res) =>{

    res.send(todosArray);

});


app.post('/clearAll', (req, res) => {
    
    todosArray = [];
    res.send(todosArray);


});





// PORT//////////////////////////////////////////////////////////////////////
const port = 3000;
app.listen(port, () => console.log(`Gator listening on port ${port}...`));


