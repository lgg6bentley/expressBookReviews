const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully" });
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(books);
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const { isbn } = req.params;
  const book = books.find(book => book.isbn === isbn);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).json(book);
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const { author } = req.params;
  const booksByAuthor = books.filter(book => book.author === author);

  if (booksByAuthor.length === 0) {
    return res.status(404).json({ message: "No books found by this author" });
  }

  return res.status(200).json(booksByAuthor);
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const { title } = req.params;
  const booksByTitle = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));

  if (booksByTitle.length === 0) {
    return res.status(404).json({ message: "No books found with this title" });
  }

  return res.status(200).json(booksByTitle);
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const { isbn } = req.params;
  const book = books.find(book => book.isbn === isbn);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).json(book.reviews || []);
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

