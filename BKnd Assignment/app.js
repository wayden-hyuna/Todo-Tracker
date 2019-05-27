const express = require('express');
const app = express();
const path = require('path');
var file_path = path.join(__dirname, './index.html');


app.get('/', (req, res) => {
    res.sendFile(file_path);
});



app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/javascript'));
app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname));


app.get('/api/courses', (req, res) =>{
    res.send([1, 2, 3]);
});

app.get('/api/courses/:id', (req,res)=>{

    res.send(req.params.id);

})

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Gator listening on port ${port}...`));


