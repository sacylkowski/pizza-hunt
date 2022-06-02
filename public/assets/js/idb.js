// create variable to hold db connection
let db;

// establish a connection to IndexDB database call "pizza_hunt" and set it to version 1
// request acts as an event listener for the database, the event listener is created when we open the connection to the database
const request = indexDB.open("pizza_hunt", 1);
// the two parameters are: the name of the IndexedDB database, and the version of the database (by default we start at 1)

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc)
request.onupgradeneeded = function(event) {
    // save a reference to the database
    const db = event.target.result;
    // create an object store (table) called `new_pizza`, set it to have an auto incrementing primary key of sorts
    db.createObjectStore("new_pizza", { autoIncrement: true });
};

// upon a successful
request.onsuccess = function(event) {
    // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;

    // check if app is online, if yes run uploadedPizza() function to send all local db data to api
    if (navigator.onLine) {
        //uploadPizza();
    }
};

request.onerror - function(event) {
    console.log(event.target.errorCode);
}