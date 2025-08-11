import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./data.css"; // Add this line for custom styles

// Set the workerSrc to a valid CDN version or your local worker file
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.js`;

export default function BookView({ pdf }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Manual book upload state
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    authors: "",
    publisher: "",
    isbn: "",
    issueDate: "",
    image: "",
  });

  // Example: Replace with your actual login check
  const isLoggedIn = true;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      id: Date.now(),
      title: form.title,
      authors: form.authors.split(",").map((a) => a.trim()),
      publisher: form.publisher,
      isbn: form.isbn,
      issueDate: form.issueDate,
      image: form.image,
    };
    setBooks([newBook, ...books]);
    setForm({
      title: "",
      authors: "",
      publisher: "",
      isbn: "",
      issueDate: "",
      image: "",
    });
  };

  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div style={{ marginTop: 16 }}>
        <button
          onClick={() => setPageNumber((page) => Math.max(page - 1, 1))}
          disabled={pageNumber <= 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 12px" }}>
          Page {pageNumber} of {numPages}
        </span>
        <button
          onClick={() => setPageNumber((page) => Math.min(page + 1, numPages))}
          disabled={pageNumber >= numPages}
        >
          Next
        </button>
      </div>

      {/* Manual Book Upload Section */}
      {isLoggedIn && (
        <form className="book-upload-form" onSubmit={handleSubmit} style={{ marginTop: 32, width: "100%", maxWidth: 420 }}>
          <h3>Add a Book</h3>
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
          <button type="submit">Upload Book</button>
        </form>
      )}

      {/* Book List with Delete Option */}
      <ul className="book-list" style={{ width: "100%", maxWidth: 600 }}>
        {books.map((book) => (
          <li key={book.id} className="book-item" style={{ marginBottom: 18, background: "#f8fafc", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,122,255,0.07)" }}>
            {book.image && (
              <img
                src={book.image}
                alt={book.title}
                className="book-cover-image"
                style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, marginBottom: 8 }}
              />
            )}
            <div>
              <strong>Title:</strong> <em>{book.title}</em>
              <br />
              <strong>Authors:</strong> {book.authors.join(", ")}
              <br />
              <strong>Publisher:</strong> {book.publisher}
              <br />
              <strong>ISBN:</strong> {book.isbn}
              <br />
              {book.issueDate && (
                <>
                  <strong>Issue Date:</strong> {book.issueDate}
                  <br />
                </>
              )}
              <button
                className="delete-book-btn"
                onClick={() => handleDelete(book.id)}
                style={{
                  marginTop: "8px",
                  background: "#ff3b30",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "4px 12px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "1rem",
                  boxShadow: "0 2px 8px rgba(255,59,48,0.10)",
                  transition: "background 0.2s",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}