const express = require('express');
const Joi = require('joi');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
var file_path = path.join(__dirname, './index.html');
var todosArray = [];
const hbs = require('express-handlebars');



class Todo{

   
    constructor(myID, title, description)
    {
        this.id = myID;
        this.title = title;
        this.description = description;
        this.status = "To Do";
        this.created = new Date();
        this.completed = "yy/mm/dd";

    }

}

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//middleware/////////////////////////////////////////////////////////////////////////

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

//request handlers/////////////////////////////////////////////////////////////

app.get('/', (req, res) => {

    res.render('index', { anyArray: todosArray});

});


app.post('/submit', (req, res) => {

    var data = req.body;
    const schema = {
       
        title: Joi.string().min(3).required(),
        description: Joi.string().max(250).required()
        
    };
//VALIDATION ///////////////////////////////////////////////////////////////////////////
    const result = Joi.validate(data, schema);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }
    else
/////////////////////////////////////////////////////////////////////////////////////////
    {
       
        var myTodo = new Todo(todosArray.length+1, data.title, data.description);
        todosArray.push(myTodo);
        res.send(todosArray);
    }


    
});

//CLEAR-ALL//////////////////////////////////////////////////////////////////////////////
app.post('/clearAll', (req, res) => {
    
    todosArray = [];
    res.send(todosArray);


});


//DELETE-ONE////////////////////////////////////////////////////////////////////////////

app.get('/delete', (req,res) => {

    var data = req.query;
    var remID = data.delID - 1;
    todosArray.splice(remID,1);
    res.send(todosArray);

});

//EDIT-ONE////////////////////////////////////////////////////////////////////////////

app.post('/edit', (req,res) => {

    var data = req.query;
    var dataID = data.editID;
    var dataObject = data.myObj; 
    todosArray[dataID] = dataObject;
    res.send(data);


});


// PORT//////////////////////////////////////////////////////////////////////
const port = 3000;
app.listen(port, () => console.log(`Gator listening on port ${port}...`));


