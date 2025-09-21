import React, { useState, useEffect } from "react";
import conferencePapers from "./data.js";
import "./data.css";
import "animate.css";

// Firebase imports
import { db, auth } from '../firebase';
import { collection, addDoc, updateDoc, doc, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";

const ConferenceList = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [manualPapers, setManualPapers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    authors: "",
    event: "",
    date: "",
    location: "",
    isbn: "",
    copyright: "",
    pdf: "",
  });
  const [editId, setEditId] = useState(null);
  const [user, setUser] = useState(null);
  const [notif, setNotif] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  // Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // Fetch manual papers from Firestore on mount
  useEffect(() => {
    const fetchManualPapers = async () => {
      const querySnapshot = await getDocs(collection(db, "conferenceNationalPapers"));
      const papers = [];
      querySnapshot.forEach((docSnap) => {
        papers.push({ ...docSnap.data(), id: docSnap.id });
      });
      setManualPapers(papers);
    };
    fetchManualPapers();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setUploading(true);
    setNotif("");
    setError("");
    if (editId) {
      // Update existing paper in Firestore
      try {
        const paperRef = doc(db, "conferenceNationalPapers", editId);
        const updatedPaper = {
          title: form.title,
          authors: form.authors,
          event: form.event,
          date: form.date,
          location: form.location,
          isbn: form.isbn,
          copyright: form.copyright,
          pdf: form.pdf,
        };
        await updateDoc(paperRef, updatedPaper);
        setManualPapers(manualPapers.map(p => p.id === editId ? { ...updatedPaper, id: editId } : p));
        setEditId(null);
        setForm({
          title: "",
          authors: "",
          event: "",
          date: "",
          location: "",
          isbn: "",
          copyright: "",
          pdf: "",
        });
        setNotif("Paper updated.");
      } catch (error) {
        setError("Error updating paper: " + error.message);
      }
    } else {
      // Add new paper to Firestore
      try {
        const newPaper = {
          title: form.title,
          authors: form.authors,
          event: form.event,
          date: form.date,
          location: form.location,
          isbn: form.isbn,
          copyright: form.copyright,
          pdf: form.pdf,
          createdAt: serverTimestamp(),
        };
        const docRef = await addDoc(collection(db, "conferenceNationalPapers"), newPaper);
        setManualPapers([{ ...newPaper, id: docRef.id }, ...manualPapers]);
        setForm({
          title: "",
          authors: "",
          event: "",
          date: "",
          location: "",
          isbn: "",
          copyright: "",
          pdf: "",
        });
        setNotif("Paper uploaded.");
      } catch (error) {
        setError("Error adding paper: " + error.message);
      }
    }
    setUploading(false);
  };

  const handleEdit = (paper) => {
    setEditId(paper.id);
    setForm({
      title: paper.title,
      authors: paper.authors,
      event: paper.event,
      date: paper.date,
      location: paper.location,
      isbn: paper.isbn,
      copyright: paper.copyright,
      pdf: paper.pdf,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this paper?")) return;
    setNotif("");
    setError("");
    try {
      await deleteDoc(doc(db, "conferenceNationalPapers", id));
      setManualPapers(manualPapers.filter(paper => paper.id !== id));
      setNotif("Paper deleted.");
    } catch (error) {
      setError("Error deleting paper: " + error.message);
    }
  };

  return (
    <div className="conference-container animate__animated animate__fadeIn">
      <h2 className="conference-title animate__animated animate__fadeInDown">
        National Conference Papers
      </h2>

      {/* Manual Upload/Edit Form */}
      {user && (
        <form
          className="book-upload-form"
          onSubmit={handleSubmit}
          style={{
            background: "#f8fafc",
            borderRadius: "18px",
            boxShadow: "0 4px 24px rgba(0,122,255,0.07)",
            padding: "24px 18px 18px 18px",
            marginBottom: "32px",
            maxWidth: "420px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            border: "1.5px solid #e3f0ff",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <h3 style={{ color: "#007aff", fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>
            {editId ? "Update Paper" : "Add Conference Paper"}
          </h3>
          <input
            type="text"
            name="authors"
            placeholder="Authors"
            value={form.authors}
            onChange={handleChange}
            required
            style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
          />
          <input
            type="text"
            name="event"
            placeholder="Event"
            value={form.event}
            onChange={handleChange}
            required
            style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
          />
          <input
            type="text"
            name="date"
            placeholder="Date"
            value={form.date}
            onChange={handleChange}
            style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
          />
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={form.isbn}
            onChange={handleChange}
            style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
          />
          <input
            type="text"
            name="copyright"
            placeholder="Copyright"
            value={form.copyright}
            onChange={handleChange}
            style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
          />
          <input
            type="text"
            name="pdf"
            placeholder="PDF URL"
            value={form.pdf}
            onChange={handleChange}
            style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
          />
          <button
            type="submit"
            disabled={uploading}
            style={{
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
            }}
          >
            {uploading ? "Saving..." : (editId ? "Update" : "Upload")}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm({
                  title: "",
                  authors: "",
                  event: "",
                  date: "",
                  location: "",
                  isbn: "",
                  copyright: "",
                  pdf: "",
                });
              }}
              style={{
                marginLeft: 10,
                background: "#eee",
                color: "#007aff",
                border: "none",
                borderRadius: 8,
                padding: "10px 0",
                fontSize: "1.08rem",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
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

      {/* Manual Papers List */}
      <ul className="conference-list">
        {manualPapers.map((paper, idx) => (
          <li
            key={paper.id}
            className="conference-item animate__animated animate__fadeInUp"
            style={{
              animationDelay: `${0.15 + idx * 0.07}s`,
              background: "#f8fafc",
              borderRadius: 12,
              padding: 16,
              boxShadow: "0 2px 8px rgba(0,122,255,0.07)",
              marginBottom: 12,
              position: "relative"
            }}
          >
            <strong>{paper.authors}</strong>
            <br />
            <em>{paper.title}</em>
            <br />
            {paper.event}, {paper.date}
            <br />
            {paper.location}
            <br />
            {paper.isbn && <span>{paper.isbn}</span>}
            <br />
            {paper.copyright && <span>© {paper.copyright}</span>}
            <br />
            {paper.pdf && (
              <a
                href={paper.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-btn"
                style={{
                  display: "inline-block",
                  marginTop: "0.5rem",
                  padding: "0.4rem 1.1rem",
                  background: "linear-gradient(90deg, #226ab7 60%, #1c658c 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(28,101,140,0.10)",
                  transition: "background 0.2s, box-shadow 0.2s",
                  letterSpacing: ".01em",
                  cursor: "pointer"
                }}
                onMouseOver={e => e.currentTarget.style.background = "#398ab9"}
                onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #226ab7 60%, #1c658c 100%)"}
              >
                📄 View PDF
              </a>
            )}
            {user && (
              <>
                <button
                  className="delete-book-btn"
                  onClick={() => handleDelete(paper.id)}
                  style={{
                    marginTop: '8px',
                    marginLeft: '8px',
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
                  onClick={() => handleEdit(paper)}
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
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Static Papers List */}
      <ul className="conference-list">
        {conferencePapers.map((paper, idx) => (
          <li
            key={paper.id}
            className="conference-item animate__animated animate__fadeInUp"
            style={{ animationDelay: `${0.15 + idx * 0.07}s` }}
          >
            <strong>{paper.authors}</strong>
            <br />
            <em>{paper.title}</em>
            <br />
            {paper.event}, {paper.date}
            <br />
            {paper.location}
            <br />
            {paper.isbn && <span>{paper.isbn}</span>}
            <br />
            {paper.copyright && <span>© {paper.copyright}</span>}
            <br />
            {paper.pdf && (
              <a
                href={paper.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-btn"
                style={{
                  display: "inline-block",
                  marginTop: "0.5rem",
                  padding: "0.4rem 1.1rem",
                  background: "linear-gradient(90deg, #226ab7 60%, #1c658c 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(28,101,140,0.10)",
                  transition: "background 0.2s, box-shadow 0.2s",
                  letterSpacing: ".01em",
                  cursor: "pointer"
                }}
                onMouseOver={e => e.currentTarget.style.background = "#398ab9"}
                onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #226ab7 60%, #1c658c 100%)"}
              >
                📄 View PDF
              </a>
            )}
          </li>
        ))}
      </ul>

      {pdfUrl && (
        <div className="pdf-modal" onClick={() => setPdfUrl(null)}>
          <div
            className="pdf-viewer"
            style={{
              background: "#fff",
              borderRadius: "8px",
              width: "80vw",
              height: "80vh",
              boxShadow: "0 2px 16px rgba(28,101,140,0.09)",
              position: "relative",
              display: "flex",
              flexDirection: "column"
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setPdfUrl(null)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 10,
                background: "#f54242",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "0.4rem 0.7rem",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem"
              }}
            >
              ×
            </button>
            <iframe
              src={pdfUrl}
              title="PDF Viewer"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "8px"
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConferenceList;
