import React, { useState } from 'react';
import { books as initialBooks } from './data.js';
import './data.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const Books = () => {
  const [books, setBooks] = useState(initialBooks);
  const [form, setForm] = useState({
    title: '',
    authors: '',
    publisher: '',
    isbn: '',
    issueDate: '',
    image: ''
  });
  const [editId, setEditId] = useState(null);

  // Example: Replace with your actual login check
  const isLoggedIn = true;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editId) {
      // Update existing book in Firestore
      try {
        const bookRef = doc(db, "books", editId);
        const updatedBook = {
          title: form.title,
          authors: form.authors.split(',').map(a => a.trim()),
          publisher: form.publisher,
          isbn: form.isbn,
          issueDate: form.issueDate,
          image: form.image,
        };
        await updateDoc(bookRef, updatedBook);
        setBooks(books.map(b => b.id === editId ? { ...updatedBook, id: editId } : b));
        setEditId(null);
        setForm({
          title: '',
          authors: '',
          publisher: '',
          isbn: '',
          issueDate: '',
          image: ''
        });
      } catch (error) {
        alert("Error updating book: " + error.message);
      }
    } else {
      // Add new book (optional, or you can remove this block)
      const newBook = {
        title: form.title,
        authors: form.authors.split(',').map(a => a.trim()),
        publisher: form.publisher,
        isbn: form.isbn,
        issueDate: form.issueDate,
        image: form.image,
        createdAt: new Date(),
      };
      try {
        const docRef = await addDoc(collection(db, "books"), newBook);
        setBooks([{ ...newBook, id: docRef.id }, ...books]);
        setForm({
          title: '',
          authors: '',
          publisher: '',
          isbn: '',
          issueDate: '',
          image: ''
        });
      } catch (error) {
        alert("Error adding book: " + error.message);
      }
    }
  };

  const handleEdit = (book) => {
    setEditId(book.id);
    setForm({
      title: book.title,
      authors: book.authors.join(', '),
      publisher: book.publisher,
      isbn: book.isbn,
      issueDate: book.issueDate,
      image: book.image
    });
  };

  const handleDelete = (id) => {
    setBooks(books.filter(book => book.id !== id));
    // To delete from Firestore, use deleteDoc (not shown here)
    // await deleteDoc(doc(db, "books", id));
    // Note: Deleting from Firestore is not implemented in this example
    alert("Book deleted successfully");

    
  };

  return (
    <div className="book-container">
      <HelmetProvider>
        <Helmet>
          <title>Books | Publication Summary</title>
        </Helmet>
      </HelmetProvider>
      <h2 className="book-title">Books</h2>

      {isLoggedIn && (
        <form className="book-upload-form" onSubmit={handleSubmit}>
          <h3>{editId ? "Update Book" : "Add a Book"}</h3>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="authors"
            placeholder="Authors (comma separated)"
            value={form.authors}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="publisher"
            placeholder="Publisher"
            value={form.publisher}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={form.isbn}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="issueDate"
            placeholder="Issue Date"
            value={form.issueDate}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />
          <button type="submit">{editId ? "Update Book" : "Upload Book"}</button>
          {editId && (
            <button type="button" onClick={() => {
              setEditId(null);
              setForm({
                title: '',
                authors: '',
                publisher: '',
                isbn: '',
                issueDate: '',
                image: ''
              });
            }} style={{marginLeft: 10}}>Cancel</button>
          )}
        </form>
      )}

      <ul className="book-list">
        {books.map(book => (
          <li key={book.id} className="book-item">
            {book.image && (
              <img
                src={book.image}
                alt={book.title}
                className="book-cover-image"
              />
            )}
            <div>
              <strong>Title:</strong> <em>{book.title}</em><br />
              <strong>Authors:</strong> {book.authors.join(", ")}<br />
              <strong>Publisher:</strong> {book.publisher}<br />
              <strong>ISBN:</strong> {book.isbn}<br />
              {book.issueDate && (
                <>
                  <strong>Issue Date:</strong> {book.issueDate}<br />
                </>
              )}
              <button
                className="delete-book-btn"
                onClick={() => handleDelete(book.id)}
                style={{
                  marginTop: '8px',
                  background: '#ff3b30',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '4px 12px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
              <button
                className="edit-book-btn"
                onClick={() => handleEdit(book)}
                style={{
                  marginTop: '8px',
                  marginLeft: '8px',
                  background: '#007aff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '4px 12px',
                  cursor: 'pointer'
                }}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
