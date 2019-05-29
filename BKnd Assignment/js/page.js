

    var form = document.querySelector('form');
    var clear = document.getElementById('clear');
    var title = document.querySelector('#user-todo');
    var description = document.querySelector('#user-todo-description');
    var myTitle = title.value;
    var myDescription = description.value;

form.addEventListener('submit', function(e) {
    
    e.preventDefault();

    var form = document.querySelector('form');
    var myTitle = document.querySelector('#user-todo').value;
    var myDescription = document.querySelector('#user-todo-description').value;
  
     
    $.ajax({
        type: 'POST',
        url: `http://localhost:3000/submit`,
        data: {"title": myTitle, "description": myDescription},
        dataType: "text",
        success: function(result){

           todoArray = JSON.parse(result);
           location.reload();           

        }
    }); 
 
    title.value = description.value = '';
  

});



clear.addEventListener('click', function(e) {
    
    e.preventDefault();

  
    var clear = document.getElementById('clear');

     
    $.ajax({
        type: 'POST',
        url: `http://localhost:3000/clearAll`,
        data: {},
        dataType: "text",
        success: function(result){

            todoArray = JSON.parse(result);
            location.reload(); 
               
        }
    });

    title.value = description.value = '';  

});


function deleteOne(id){

    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/delete`,
        data: {delID: id},
        dataType: "text",
        success: function(result){

            todoArray = JSON.parse(result);
            location.reload(); 
               
        }
    });

}

function editMiddle(id){
   
   
   editOne(id, object);
}

function editOne(id, object){

    $.ajax({
        type: 'POST',
        url: `http://localhost:3000/edit`,
        data: {editID: id, myObj: JSON.stringify(object)},
        dataType: "text",
        success: function(result){

            todoArray = JSON.parse(result);
            //location.reload(); 
               
        }
    });

}



