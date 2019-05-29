const express = require('express');
const Joi = require('joi');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
var file_path = path.join(__dirname, './index.html');
var todosArray = [];
const hbs = require('express-handlebars');

app.get('/', (req, res) => {
    res.sendFile(file_path);
});

class Todo{

   
    constructor(myID, title, description)
    {
        this.id = myID;
        this.title = title;
        this.description = description;
        this.status = "status";
        this.created = new Date();
        this.completed = "yy/mm/dd";

    }

}

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//middleware/////////////////////////////////////////////////////////////////////////
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

//request handlers/////////////////////////////////////////////////////////////

app.post('/submit', (req, res) => {
    
    const schema = {
       
        title: Joi.string().min(1).required(),
        description: Joi.string().max(250).required()
        
    };
//VALIDATION ///////////////////////////////////////////////////////////////////////////
    const result = Joi.validate(req.body, schema);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }
    else
/////////////////////////////////////////////////////////////////////////////////////////
    {
        var data = req.body;
        var myTodo = new Todo(todosArray.length+1, data.title, data.description);
        todosArray.push(myTodo);
        res.send(todosArray);
    }
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


