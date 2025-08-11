import React, { useState, useEffect } from "react";
import "./data.css";
import "animate.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const JournalInternational = () => {
  const pageTitle = "International Journals | Publication Summary";

  // Static journals
  const internationalJournals = [
    {
      id: 8,
      authors: "Dr.R.Murugadoss",
      title: "An Investigation and Evaluation of Cloud Computing Capabilities and Data Duplication Methods",
      journal: "International Journal of Cloud Computing and Services Science (IJ-CLOSER)",
      year: "2020",
      issn: "Print: 2319-1775, Online: 2320-7876",
      volume: " Vol. 9, No. 1",
      pages: "  1-12",
      publisher: "  International Association of Cloud Computing and Services Science",
      link: "https://drive.google.com/file/d/18d1cOCDV3m-N0FDVhiJTPxbqn-03_DEW/view?usp=sharing"
    },
    {
      id: 9,
      authors: "Dr. R. Murugadoss, Dr. Lekshmy P L, Dr. Sivaraj Rengaraj, Dr. Mamta Jagdish Baheti, Dr. G. Kavitha",
      title: "Enhancing Brain Tumor Diagnosis: A Comprehensive AI Approach Using BTuNet for Classification of MRI Images",
      journal: "International Journal of Imaging Systems and Technology",
      year: " 2024",
      issn: "SSN: 2147-6799",
      volume: " Vol. 34, No. 1",
      pages: "  1-12",
      publisher: "  John Wiley & Sons, Inc.",
      link: "https://drive.google.com/file/d/185dqrn5Wp9blLpmvB5YZn7uSt0_ymSzx/view?usp=sharing"
    },
    {
      id: 10,
      authors: "Dr. R. Murugadoss",
      title: "AI-Powered Monitoring for Mitigating Human-Animal Conflicts in Agricultural and Forest Zones",
      journal: "2025 IEEE International Conference on Data Science, Agents, and Artificial Intelligence (ICDSAAI 2025)",
      year: 2025,
      volume: " Vol. 9, No. 7",
      pages: "  536-549",
      publisher: "IEEE",
      isbn: "979-8-3315-3755-5",
      link: "https://drive.google.com/file/d/1CCENSqcJywcekBOEbU8NKBcReN-RQprq/view?usp=sharing",
      date: "28-29 March 2025",
      location: "Chennai, India"
    },
    {
      id: 6,
      authors: "Dr.R.Murugadoss",
      title: "Early Prediction of Diabetes Using Deep Learning Convolution Neural Network and Harris Hawks Optimization",
      journal: "INTERNATIONAL JOURNAL OF INTEGRATED ENGINEERING (IJIE)",
      year: 2021,
      volume: "VOL. 13 NO. 1",
      pages: "88-100",
      publisher: "Universiti Tun Hussein Onn Malaysia",
      link: "http://penerbit.uthm.edu.my/ojs/index.php/ijie"
    },
    {
      id: 7,
      authors: "Dr.R.Murugadoss, Maddali M.V.M.Kumar",
      title: "The Quality of Experience Framework for HTTP Adaptive Streaming Algorithm in Video Streaming over Wireless Networks",
      journal: "International Journal of Future Generation Communication and Networking (IJFGCN)",
      publisher: "SERSC",
      year: 2020,
      issn: "ISSN: 2233-7857",
      volume: "Volume 13, Number 2",
      pages: "1491-1502",
      link: ""
    },
  ];

  // Manual upload state
  const [manualJournals, setManualJournals] = useState([]);
  const [form, setForm] = useState({
    authors: "",
    title: "",
    journal: "",
    year: "",
    issn: "",
    volume: "",
    pages: "",
    publisher: "",
    link: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [notif, setNotif] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  // Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // Fetch manual journals
  useEffect(() => {
    const fetchManual = async () => {
      try {
        const q = query(collection(db, "journalInternational"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const arr = [];
        snap.forEach(docSnap => arr.push({ ...docSnap.data(), id: docSnap.id }));
        setManualJournals(arr);
      } catch (err) {
        setError("Failed to load manual journals.");
      }
    };
    fetchManual();
  }, []);

  // Form handlers
  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    setUploading(true);
    setError("");
    setNotif("");
    try {
      if (!form.title || !form.authors || !form.journal || !form.link) {
        throw new Error("Please fill all required fields.");
      }
      if (editId) {
        // Update not implemented for simplicity
        setError("Edit not implemented in this demo.");
      } else {
        await addDoc(collection(db, "journalInternational"), {
          ...form,
          createdAt: serverTimestamp(),
        });
        setManualJournals([{ ...form, id: Date.now().toString() }, ...manualJournals]);
        setNotif("Journal uploaded.");
      }
      setForm({
        authors: "",
        title: "",
        journal: "",
        year: "",
        issn: "",
        volume: "",
        pages: "",
        publisher: "",
        link: "",
        description: "",
      });
      setEditId(null);
    } catch (err) {
      setError(err.message);
    }
    setUploading(false);
  };

  // Delete
  const handleDelete = async (journal) => {
    if (!window.confirm("Delete this journal?")) return;
    setNotif("");
    setError("");
    try {
      await deleteDoc(doc(db, "journalInternational", journal.id));
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

      <div className="journal-intl-container animate__animated animate__fadeIn">
        <h1 className="journal-intl-title animate__animated animate__fadeInDown">Publication Summary</h1>
        <section>
          <h2 className="journal-intl-section-title animate__animated animate__fadeInLeft">📙 International Journals</h2>
          {/* Manual upload form for authenticated users */}
          {user && (
            <form
              className="intl-upload-form"
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
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <h3 style={{ color: "#007aff", fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>
                Upload International Journal
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
                type="text"
                name="publisher"
                placeholder="Publisher"
                value={form.publisher}
                onChange={handleFormChange}
                style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
              />
              <input
                type="url"
                name="link"
                placeholder="PDF/Publication Link"
                value={form.link}
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
                {uploading ? "Saving..." : "Upload"}
              </button>
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

          <ul className="journal-intl-list">
            {manualJournals.map((p, idx) => (
              <li
                key={p.id}
                className="journal-intl-item animate__animated animate__fadeInUp"
                style={{ animationDelay: `${0.15 + idx * 0.07}s`, border: "1px solid #e3f0ff", borderRadius: "10px", marginBottom: "18px", background: "#fafdff" }}
              >
                <strong>{p.authors}</strong><br />
                <em>{p.title}</em><br />
                {p.journal && (
                  <>
                    <span><strong>Journal:</strong> {p.journal}</span><br />
                  </>
                )}
                {p.publisher && (
                  <>
                    <span><strong>Publisher:</strong> {p.publisher}</span><br />
                  </>
                )}
                {p.year && (
                  <>
                    <span><strong>Year:</strong> {p.year}</span><br />
                  </>
                )}
                {p.issn && (
                  <>
                    <span><strong>ISSN:</strong> {p.issn}</span><br />
                  </>
                )}
                {p.volume && (
                  <>
                    <span><strong>Volume:</strong> {p.volume}</span><br />
                  </>
                )}
                {p.pages && (
                  <>
                    <span><strong>Pages:</strong> {p.pages}</span><br />
                  </>
                )}
                {p.description && (
                  <>
                    <span><strong>Description:</strong> {p.description}</span><br />
                  </>
                )}
                {p.link && p.link.trim() && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
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
                      letterSpacing: ".01em"
                    }}
                    onMouseOver={e => e.currentTarget.style.background = "#398ab9"}
                    onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #226ab7 60%, #1c658c 100%)"}
                  >
                    View Publication
                  </a>
                )}
                {user && (
                  <button
                    className="delete-intl-btn"
                    onClick={() => handleDelete(p)}
                    style={{
                      marginTop: "10px",
                      marginLeft: "10px",
                      background: "#ff3b30",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "4px 12px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
            {internationalJournals.map((p, idx) => (
              <li
                key={p.id}
                className="journal-intl-item animate__animated animate__fadeInUp"
                style={{ animationDelay: `${0.15 + (manualJournals.length + idx) * 0.07}s` }}
              >
                <strong>{p.authors}</strong><br />
                <em>{p.title}</em><br />
                {p.journal && (
                  <>
                    <span><strong>Journal:</strong> {p.journal}</span><br />
                  </>
                )}
                {p.publisher && (
                  <>
                    <span><strong>Publisher:</strong> {p.publisher}</span><br />
                  </>
                )}
                {p.year && (
                  <>
                    <span><strong>Year:</strong> {p.year}</span><br />
                  </>
                )}
                {p.issn && (
                  <>
                    <span><strong>ISSN:</strong> {p.issn}</span><br />
                  </>
                )}
                {p.volume && (
                  <>
                    <span><strong>Volume:</strong> {p.volume}</span><br />
                  </>
                )}
                {p.pages && (
                  <>
                    <span><strong>Pages:</strong> {p.pages}</span><br />
                  </>
                )}
                {p.link && p.link.trim() && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
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
                      letterSpacing: ".01em"
                    }}
                    onMouseOver={e => e.currentTarget.style.background = "#398ab9"}
                    onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #226ab7 60%, #1c658c 100%)"}
                  >
                    View Publication
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default JournalInternational;
