var express = require ('express'),   
    app = express ();

app.use (express.static ('public'));

app.listen (6969, function (){
    console.log ("SERVER START at http://localhost:6969/");
});

//test comment
