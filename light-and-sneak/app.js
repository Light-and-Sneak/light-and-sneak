var express = require ('express'),   
    app = express ();

app.use (express.static ('public'));

app.listen (8080, function (){
    console.log ("SERVER START at http://localhost:8080/");
});

//test comment
