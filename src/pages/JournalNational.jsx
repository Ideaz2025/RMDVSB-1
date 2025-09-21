import React, { useState, useEffect } from "react";
import "./data.css";
import "animate.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Firebase imports
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";

const JournalList = () => {
  const [user, setUser] = useState(null);
  const pageTitle = "National Journals | Publication Summary";
  const nationalJournals = [
    {
      id: 13,
      authors: "Dr.R.Murugadoss",
      title: "FOR SECURE DYNAMIC DATA DEDUPLICATION WITH CLOUD STORAGE: AUGMENTED COLLINEAR ENCRYPTION KEY GENERATION",
      journal: "JOURNAL OF OPTOELECTRONICS LASER",
      year: 2022,
      volume: "Volume 41, Issue 11",
      doi: "10050086.2022.12.05",
      issn: "ISSN: 1005-0086",
      link: "https://drive.google.com/file/d/1dX8WikSdHzxsFxmE74dMRpHoWR_idI0G/view?usp=sharing"
    },
    {
      id: 6,
      authors: "R. Murugadoss, M. Ramakrishnan",
      title: "Feed Forward Single Hidden Layer Fuzzy Neural Network with Sigmoidal Signals",
      journal: "Unspecified",
      year: 2022,
      link: "https://drive.google.com/file/d/1pv50Yyp9rhqA3hjTsHgVFzf4zeqbYK9E/view?usp=sharing"
    },
    {
      id: 7,
      authors: "R. Murugadoss, M. Ramakrishnan",
      title: "Neural Fuzzy Models of Feed Forward Networks for Function Approximation using Sigmoidal Signals",
      journal: "Unspecified",
      year: 2022,
      link: "https://drive.google.com/file/d/1OQtCmbgFHuA7hQSmj_jcuJYFtllPTIQD/view?usp=sharing"
    },
    {
      id: 8,
      authors: "R. Murugadoss, S. Leena Nesamani, A. Banushri, K. M. Monica, M. Vairavel, S. Nirmal Sugirtha Rajini, Gopi P.",
      title: "A review of using deep learning from an ecology perspective to address climate change and air pollution",
      journal: "Global NEST Journal",
      year: 2024,
      volume: "Vol 26, No 2",
      pages: "05697",
      link: "https://drive.google.com/file/d/1hukgOxMu6Dd7pAgOd7MSrjD-lunyh8C4/view?usp=sharing"
    },
    {
      id: 9,
      authors: "R. Murugadoss.",
      title: "Efficient AI-based water quality prediction and classification for sustainable urban environments in Texas city",
      journal: "Edelweiss Applied Science and Technology",
      year: 2025,
      volume: "Vol. 9, No. 7",
      pages: "536-549",
      doi: "10.55214/25768484.v9i7.8654",
      issn: "ISSN: 2576-8484",
      publisher: "Learning Gate",
      link: "https://drive.google.com/file/d/1P-wCHdskNWfPQ85y6Vr4X5tY-FhEcsim/view?usp=sharing"
    },
    {
      id: 10,
      authors: "R. Murugadoss.",
      title: "Universal Approximation with Non-Sigmoid Hidden Layer Activation Functions by Using Artificial Neural Network Modeling",
      link: "https://drive.google.com/file/d/1bjd2SQqGU9_a4JXofJ4DIq0G_9WM-0S4/view?usp=sharing"
    },
    {
      id: 4,
      authors: "R. Murugadoss, Dr. M. Ramakrishnan",
      title: "Implementation of Machine Learning to Detect Android Malware with Significant Permission",
      journal: "Unspecified",
      year: 2025,
      affiliation: "Sathyabama University, Research",
      link: ""
    },
    {
      id: 5,
      authors: "R. Murugadoss, Dr. M. Ramakrishnan",
      title: "Universal Approximation Using Probabilistic Neural Networks with Sigmoid Activation Functions",
      journal: "Unspecified",
      year: 2025,
      affiliation: "Sathyabama University, Research",
      link: ""
    },
    {
      id: 11,
      authors: "Dr.R.Murugadoss",
      title: "EVALUATION OF FETEL HEAD CIRCUMFRENECE (HC) AND ULTRASOUND IMAGES USING CNN",
      journal: "NEUROQUANTOLOGY",
      year: 2022,
      volume: "Volume 20, Issue 10",
      pages: "11680-11690",
      doi: "10.14704/NQ.2022.20.10.NQ551133",
      eissn: "eISSN:1303-5150",
      link: "http://penerbit.uthm.edu.my/ojs/index.php/ijie"
    },
    {
      id: 12,
      authors: "Dr.R.Murugadoss",
      title: "AN ANALYSIS OF MRI BRAIN IMAGE BY DEEP LEARNING AND MULTI-CLASS SVM",
      journal: "IJIEMR",
      year: 2022,
      volume: "Volume 11, Issue 09",
      pages: "127-135",
      doi: "10.48047/IJIEMR/V11/ISSUE 09/14",
      issn: "ISSN: 2456 – 5083",
      link: "http://penerbit.uthm.edu.my/ojs/index.php/ijie"
    },
  ];
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);
  
  // Manual upload state
  const [manualJournals, setManualJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState("");
  const [error, setError] = useState("");

  // Upload/Edit form
  const [form, setForm] = useState({
    title: "",
    authors: "",
    journal: "",
    year: "",
    volume: "",
    pages: "",
    issn: "",
    pdfUrl: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Fetch all manual journals for public view
  useEffect(() => {
    setLoading(true);
    const fetchJournals = async () => {
      try {
        const q = collection(db, "journalNational");
        const snap = await getDocs(q);
        const arr = [];
        snap.forEach(docSnap => arr.push({ ...docSnap.data(), id: docSnap.id }));
        setManualJournals(arr);
      } catch (err) {
        setError("Failed to load journals.");
      }
      setLoading(false);
    };
    fetchJournals();
  }, []);

  // Upload/Edit handlers
  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    setUploading(true);
    setError("");
    setNotif("");
    try {
      if (!form.pdfUrl) throw new Error("Please provide a PDF URL.");
      if (editId) {
        // Update Firestore only
        const journalRef = doc(db, "journalNational", editId);
        await updateDoc(journalRef, {
          title: form.title,
          authors: form.authors,
          journal: form.journal,
          year: form.year,
          volume: form.volume,
          pages: form.pages,
          issn: form.issn,
          pdfUrl: form.pdfUrl,
          description: form.description,
        });
        setManualJournals(manualJournals.map(j => j.id === editId ? { ...j, ...form } : j));
        setNotif("Journal updated.");
      } else {
        // Add to Firestore
        const docRef = await addDoc(collection(db, "journalNational"), {
          title: form.title,
          authors: form.authors,
          journal: form.journal,
          year: form.year,
          volume: form.volume,
          pages: form.pages,
          issn: form.issn,
          pdfUrl: form.pdfUrl,
          description: form.description,
          createdAt: serverTimestamp(),
        });
        setManualJournals([{ id: docRef.id, ...form }, ...manualJournals]);
        setNotif("Journal uploaded.");
      }
      setForm({
        title: "",
        authors: "",
        journal: "",
        year: "",
        volume: "",
        pages: "",
        issn: "",
        pdfUrl: "",
        description: "",
      });
      setEditId(null);
    } catch (err) {
      setError(err.message);
    }
    setUploading(false);
  };

  // Edit
  const handleEdit = (journal) => {
    setEditId(journal.id);
    setForm({
      title: journal.title || "",
      authors: journal.authors || "",
      journal: journal.journal || "",
      year: journal.year || "",
      volume: journal.volume || "",
      pages: journal.pages || "",
      issn: journal.issn || "",
      pdfUrl: journal.pdfUrl || "",
      description: journal.description || "",
    });
  };

  // Delete
  const handleDelete = async (journal) => {
    if (!window.confirm("Delete this journal?")) return;
    setNotif("");
    setError("");
    try {
      await deleteDoc(doc(db, "journalNational", journal.id));
      setManualJournals(manualJournals.filter(j => j.id !== journal.id));
      setNotif("Journal deleted.");
    } catch (err) {
      setError("Failed to delete journal.");
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
      </HelmetProvider>
      <div className="container" style={{ padding: "20px" }}>
         <h2 className="journal-title animate__animated animate__fadeInDown" >National Journal Publications</h2>
        {user ? (
          <div className="journal-container animate__animated animate__fadeIn">
           
            <form
              className="paper-upload-form"
              onSubmit={handleFormSubmit}
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
                marginLeft: "350px",
              }}
            >
              <h3 style={{ color: "#007aff", fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>
                {editId ? "Update Journal" : "Upload National Journal"}
              </h3>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleFormChange}
                required
                style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
              />
              <input
                type="text"
                name="authors"
                placeholder="Authors"
                value={form.authors}
                onChange={handleFormChange}
                required
                style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
              />
              <input
                type="text"
                name="journal"
                placeholder="Journal Name"
                value={form.journal}
                onChange={handleFormChange}
                required
                style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
              />
              <input
                type="text"
                name="year"
                placeholder="Year"
                value={form.year}
                onChange={handleFormChange}
                style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
              />
              <input
                type="text"
                name="volume"
                placeholder="Volume"
                value={form.volume}
                onChange={handleFormChange}
                style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
              />
              <input
                type="text"
                name="pages"
                placeholder="Pages"
                value={form.pages}
                onChange={handleFormChange}
                style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
              />
              <input
                type="text"
                name="issn"
                placeholder="ISSN"
                value={form.issn}
                onChange={handleFormChange}
                style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
              />
              <input
                type="url"
                name="pdfUrl"
                placeholder="PDF URL"
                value={form.pdfUrl}
                onChange={handleFormChange}
                required
                style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleFormChange}
                rows={2}
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
                      journal: "",
                      year: "",
                      volume: "",
                      pages: "",
                      issn: "",
                      pdfUrl: "",
                      description: ""
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
            </form>
            {notif && <div className="success-msg">{notif}</div>}
            {error && <div className="error-msg">{error}</div>}
          </div>
        ) : null}
        <div className="journal-list-container">
          <ul className="journal-list">
            {manualJournals.map((journal, idx) => (
              <li
                key={journal.id}
                className="journal-item animate__animated animate__fadeInUp"
                style={{ animationDelay: `${0.15 + idx * 0.07}s` }}
              >
                <strong>{journal.authors}</strong><br />
                <em>{journal.title}</em><br />
                {journal.journal}, {journal.volume} ({journal.year})<br />
                {journal.pages && <>pp. {journal.pages}<br /></>}
                {journal.issn && <span>{journal.issn}<br /></span>}
                {journal.description && <span>{journal.description}<br /></span>}
                {journal.pdfUrl && (
                  <button
                    className="pdf-btn"
                    onClick={() => window.open(journal.pdfUrl, "_blank")}
                    type="button"
                    style={{
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
                  </button>
                )}
                {user && (
                  <>
                    <button
                      className="delete-book-btn"
                      onClick={() => handleDelete(journal)}
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
                      onClick={() => handleEdit(journal)}
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
                      Update
                    </button>
                  </>
                )}
              </li>
            ))}
            {nationalJournals.map((journal, idx) => (
              <li
                key={journal.id}
                className="journal-item animate__animated animate__fadeInUp"
                style={{ animationDelay: `${0.15 + (manualJournals.length + idx) * 0.07}s` }}
              >
                <strong>{journal.authors}</strong><br />
                <em>{journal.title}</em><br />
                {journal.journal}, {journal.volume} ({journal.year})<br />
                {journal.pages && <>pp. {journal.pages}<br /></>}
                {journal.issn && <span>{journal.issn}<br /></span>}
                {journal.eissn && <span>{journal.eissn}<br /></span>}
                {journal.doi && <span>DOI: {journal.doi}<br /></span>}
                {journal.link && journal.link.trim() && (
                  <button
                    className="pdf-btn"
                    onClick={() => window.open(journal.link, "_blank")}
                    type="button"
                    style={{
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
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default JournalList;
