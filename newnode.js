

const users =  [
    {name: "patrick", books: null, password: null},
    {name: "jon", books: "harry potter" , password: "hello"},
    {name: "sara", books: ["hunger games", "harry potter"] , password: null}
]

function remove(array, element) {
    const index = array.indexOf(element);
    
    if (index !== -1) {
        array.splice(index, 1);
    }
}

function add(array, element, user) {    
     let b = array.findIndex(a => a.name === user);
     let text = array[b].books;
     array[b].books = text.concat(", " + element);

}

add(users, "1984", "jon");
console.log(users);

let user = users.find(c => c.name === "jon");
console.log(user.books);