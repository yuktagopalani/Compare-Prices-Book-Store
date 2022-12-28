const connection = require('./connection');
var bookSchema = require('../models/book');

async function getBooks(genre){
    var books = [];
    const db = await connection.getConnection();
    let collection = db.collection(genre);
    let response = await collection.find({}).toArray();
    console.log(genre);
    response.forEach((data)=>{
        var book = new bookSchema.Book(data.title,data.price,data.type,"","");
        books.push(book);
    });

    return books;
}

exports.getBooks = getBooks;