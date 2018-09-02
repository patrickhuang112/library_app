const express = require('express');
const app = express();
const bodyParser = require('body-parser');  
const path = require('path');

app.use(bodyParser.json());
app.use(express.json());


let logged = false;

const users =  [
    {name: "patrick", books: [], password: "1234" },
    {name: "jon", books: ["Harry Potter"] , password: "hello"},
    {name: "sara", books: ["Hunger Games", "Harry Potter"] , password: "world"}
]

const booklist = ["1984", "Hunger Games", "Harry Potter"]



app.post('/api/verify', function(req, res, next){
    let names = users.map(a => a.name);
    let namecheck = names.indexOf(req.body.name); 
    let password = users.map(a => a.password);
    let passcheck = password.indexOf(req.body.password);

    if(namecheck === -1) return res.send('Invalid username');
    else if(passcheck === -1) return res.send('Invalid password');
    else if(namecheck !== passcheck) return res.send('Invalid name and password combination');
    else if(namecheck === passcheck) return logged = true;



 });



//home page
app.get ('/', (req, res) =>{
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get ('/all', (req, res) =>{
    res.send(JSON.stringify(users));
});

//get available books
app.get ('/books', (req, res) =>{
    var list = "";
    for(var i = 0; i <booklist.length; ++i ){
        if(i === booklist.length - 1) {
            
          list = list.concat(" " + booklist[i] + ".");
          
        }
        else{
          list = list.concat(" " + booklist[i] + ",");
        }
       
    }
    res.send("The available books we have are: " + list);

});


//get users
app.get ('/users', (req, res) =>{
    var list ="";
    var result = users.map(a => a.name);
    for(var i = 0; i <result.length; ++i){
        
        if(i === result.length - 1) {
            
            list = list.concat(" " + result[i] + ".");
            
          }
        
        else{
            list = list.concat(" " + result[i] + ","); 
        }
    }
    res.send("The users we have are: " + list);

});


//create new user
app.post('/users', (req, res) => {


    let names = users.map(a => a.name);
    let check = names.indexOf(req.body.name); 
    if(check > -1) return res.status(404).send("This username is already taken.");

    const user = {        
        name: req.body.name,
        password: req.body.password
    }
    users.push(user);
    res.send("User created with username: " + req.body.name + " and password: " + req.body.password);
});


//checkout book
app.put('/checkout', (req, res) =>{

    let bookname = req.body.books;
    let check = booklist.find(c => c === req.body.books);
    let user = users.find(c => c.name === req.body.name);
    
    let repeat = user.books.indexOf(req.body.books);

    let names = user.name;

    if(!check) return res.status(404).send('no applicable book found'); //check if book is in booklist
    if(repeat > -1) return res.status(404).send('book already checked out to you'); //check if book is already in user account
    
    else {
        remove(booklist, check); //remove checked out book from available booklist

        add(users, check, names); //add checked out book to user account
        res.send(check + " successfully checked out to " + names);
    }
    
});
 

//return book
app.put('/checkin', (req, res) =>{

    
    let user = users.find(c => c.name === req.body.name); 
    let repeat = user.books.indexOf(req.body.books); 
    let names = user.name;


    if(repeat === -1) return res.status(404).send('book not in your account'); //check if book is in user account
    
    else {
        reremove(users, req.body.books, names); //remove book from user account

        
        readd(booklist, req.body.books); //add returned book to available book list
        res.send("Thank you " + names + " for returning " + req.body.books + " to the library!");
    }
   

});

//view account
app.get ('/users/:name', (req, res) =>{
    
    let x = users.find(c => c.name === req.params.name);
    
    //let y = users.find(c => c.password === req.params.password);
    
    // var all_users = users.map(a => a.name);
    // var all_passwords = users.map(a => a.password);

    // var user_index = all_users.indexOf(x);
    // var passsword_index = all_passwords.indexOf(y);

    if(!x) return res.status(404).send('no user found');

    res.send(x);

  
});




//removing from array function
function remove (array, element) {
    const index = array.indexOf(element);
    
    if (index !== -1) {
        array.splice(index, 1);
    }
}

function reremove (array, element, user) {
    let b = array.findIndex(a => a.name === user);
    let text = array[b].books;

    const index = text.indexOf(element);
    
    if (index !== -1) {
        text.splice(index, 1);
    }

   
}


//adding to array function
function add (array, element, user) {    
    let b = array.findIndex(a => a.name === user);
    let text = array[b].books;
    text.push(element);

}

function readd (array, element) {    

    array.push(element);

}



//listening
app.listen(8000, () =>{
    console.log('Listening on port 8000...');
});




/*
app.get('/users/:name', (req, res) => {
    let user = users.find(c => c.name === )
    
});
*/
