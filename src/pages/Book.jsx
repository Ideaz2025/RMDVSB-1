import React, { useState, useEffect } from 'react';
import { books as initialBooks } from './data.js';
import './data.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { db, auth } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";

const Books = () => {
  const [books, setBooks] = useState(initialBooks);
  const [manualBooks, setManualBooks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    authors: '',
    publisher: '',
    isbn: '',
    issueDate: '',
    image: ''
  });
  const [editId, setEditId] = useState(null);
  const [notif, setNotif] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);

  // Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // Fetch manual books from Firestore
  useEffect(() => {
    const fetchManualBooks = async () => {
      try {
        const q = query(collection(db, "booksManual"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const arr = [];
        snap.forEach(docSnap => arr.push({ ...docSnap.data(), id: docSnap.id }));
        setManualBooks(arr);
      } catch (err) {
        setError("Failed to load books.");
      }
    };
    fetchManualBooks();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setUploading(true);
    setError("");
    setNotif("");
    try {
      if (!form.title || !form.authors || !form.publisher || !form.isbn) {
        throw new Error("Please fill all required fields.");
      }
      if (editId) {
        // Update existing manual book
        const bookRef = doc(db, "booksManual", editId);
        const updatedBook = {
          title: form.title,
          authors: form.authors.split(',').map(a => a.trim()),
          publisher: form.publisher,
          isbn: form.isbn,
          issueDate: form.issueDate,
          image: form.image,
        };
        await updateDoc(bookRef, updatedBook);
        setManualBooks(manualBooks.map(b => b.id === editId ? { ...updatedBook, id: editId } : b));
        setNotif("Book updated.");
        setEditId(null);
      } else {
        // Add new manual book
        const newBook = {
          title: form.title,
          authors: form.authors.split(',').map(a => a.trim()),
          publisher: form.publisher,
          isbn: form.isbn,
          issueDate: form.issueDate,
          image: form.image,
          createdAt: serverTimestamp(),
        };
        const docRef = await addDoc(collection(db, "booksManual"), newBook);
        setManualBooks([{ ...newBook, id: docRef.id }, ...manualBooks]);
        setNotif("Book uploaded.");
      }
      setForm({
        title: '',
        authors: '',
        publisher: '',
        isbn: '',
        issueDate: '',
        image: ''
      });
    } catch (err) {
      setError(err.message);
    }
    setUploading(false);
  };

  const handleEdit = (book) => {
    setEditId(book.id);
    setForm({
      title: book.title,
      authors: Array.isArray(book.authors) ? book.authors.join(', ') : book.authors,
      publisher: book.publisher,
      isbn: book.isbn,
      issueDate: book.issueDate,
      image: book.image
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    setNotif("");
    setError("");
    try {
      await deleteDoc(doc(db, "booksManual", id));
      setManualBooks(manualBooks.filter(book => book.id !== id));
      setNotif("Book deleted.");
    } catch (err) {
      setError("Failed to delete book.");
    }
  };

  // Responsive styles
  const responsiveStyles = {
    container: {
      maxWidth: "1000px",
      margin: "40px auto",
      padding: "1rem",
      borderRadius: 16,
      boxShadow: "0 2px 16px rgba(28,101,140,0.07)",
    },
    form: {
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 1px 8px rgba(28,101,140,0.10)",
      padding: "1.5rem",
      marginBottom: "2rem",
      maxWidth: 600,
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    },
    list: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "1.5rem",
      padding: 0,
      listStyle: "none"
    },
    item: {
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 1px 8px rgba(28,101,140,0.10)",
      padding: "1.2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: 260,
      position: "relative"
    },
    image: {
      width: "100%",
      maxWidth: 120,
      height: "auto",
      borderRadius: 8,
      marginBottom: 12,
      objectFit: "cover",
      boxShadow: "0 2px 8px rgba(28,101,140,0.08)"
    },
    btn: {
      marginTop: '8px',
      background: '#ff3b30',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      padding: '4px 12px',
      cursor: 'pointer'
    },
    editBtn: {
      marginTop: '8px',
      marginLeft: '8px',
      background: '#007aff',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      padding: '4px 12px',
      cursor: 'pointer'
    }
  };

  // Responsive media queries (for mobile)
  const responsiveMedia = `
    @media (max-width: 600px) {
      .book-title {
        font-size: 1.3rem !important;
      }
      .book-upload-form {
        padding: 1rem !important;
        max-width: 98vw !important;
      }
      .book-list {
        grid-template-columns: 1fr !important;
        gap: 1rem !important;
      }
      .book-item {
        padding: 0.8rem !important;
      }
      .book-cover-image {
        max-width: 90vw !important;
      }
    }
  `;

  return (
    <div className="book-container" style={responsiveStyles.container}>
      <HelmetProvider>
        <Helmet>
          <title>Books | Publication Summary</title>
          <style>{responsiveMedia}</style>
        </Helmet>
      </HelmetProvider>
      <h2 className="book-title" style={{ textAlign: "center", color: "#1c658c", fontWeight: 700, marginBottom: 30, fontSize: "2rem" }}>Books</h2>

      {user && (
        <form className="book-upload-form" onSubmit={handleSubmit} style={responsiveStyles.form}>
          <h3 style={{ color: "#398ab9", textAlign: "center" }}>{editId ? "Update Book" : "Add a Book"}</h3>
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
          <button type="submit" style={{
            background: "linear-gradient(90deg, #007aff 60%, #5ac8fa 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 0",
            fontSize: "1.08rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,122,255,0.10)",
            transition: "background 0.2s, transform 0.15s"
          }}>{editId ? "Update Book" : "Upload Book"}</button>
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
            }} style={{
              marginLeft: 10,
              background: "#eee",
              color: "#007aff",
              border: "none",
              borderRadius: 8,
              padding: "10px 0",
              fontSize: "1.08rem",
              fontWeight: 700,
              cursor: "pointer"
            }}>Cancel</button>
          )}
          {notif && (
            <div
              className="success-msg"
              style={{
                background: "#e6f9ed",
                color: "#1a7f37",
                border: "1.5px solid #b6f2d2",
                borderRadius: "8px",
                padding: "10px 14px",
                marginTop: "10px",
                fontWeight: 600,
                fontSize: "1rem",
                boxShadow: "0 2px 8px rgba(26,127,55,0.07)",
                textAlign: "center"
              }}
            >
              {notif}
            </div>
          )}
          {error && (
            <div
              className="error-msg"
              style={{
                background: "#ffeaea",
                color: "#c53030",
                border: "1.5px solid #ffc2c2",
                borderRadius: "8px",
                padding: "10px 14px",
                marginTop: "10px",
                fontWeight: 600,
                fontSize: "1rem",
                boxShadow: "0 2px 8px rgba(197,48,48,0.07)",
                textAlign: "center"
              }}
            >
              {error}
            </div>
          )}
        </form>
      )}

      <ul className="book-list" style={responsiveStyles.list}>
        {manualBooks.map(book => (
          <li key={book.id} className="book-item" style={responsiveStyles.item}>
            {book.image && (
              <img
                src={book.image}
                alt={book.title}
                className="book-cover-image"
                style={responsiveStyles.image}
              />
            )}
            <div style={{ width: "100%" }}>
              <strong>Title:</strong> <em>{book.title}</em><br />
              <strong>Authors:</strong> {Array.isArray(book.authors) ? book.authors.join(", ") : book.authors}<br />
              <strong>Publisher:</strong> {book.publisher}<br />
              <strong>ISBN:</strong> {book.isbn}<br />
              {book.issueDate && (
                <>
                  <strong>Issue Date:</strong> {book.issueDate}<br />
                </>
              )}
              {user && (
                <>
                  <button
                    className="delete-book-btn"
                    onClick={() => handleDelete(book.id)}
                    style={responsiveStyles.btn}
                  >
                    Delete
                  </button>
                  <button
                    className="edit-book-btn"
                    onClick={() => handleEdit(book)}
                    style={responsiveStyles.editBtn}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
        {books.map(book => (
          <li key={book.id} className="book-item" style={responsiveStyles.item}>
            {book.image && (
              <img
                src={book.image}
                alt={book.title}
                className="book-cover-image"
                style={responsiveStyles.image}
              />
            )}
            <div style={{ width: "100%" }}>
              <strong>Title:</strong> <em>{book.title}</em><br />
              <strong>Authors:</strong> {Array.isArray(book.authors) ? book.authors.join(", ") : book.authors}<br />
              <strong>Publisher:</strong> {book.publisher}<br />
              <strong>ISBN:</strong> {book.isbn}<br />
              {book.issueDate && (
                <>
                  <strong>Issue Date:</strong> {book.issueDate}<br />
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;