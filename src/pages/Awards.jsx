import React, { useState, useEffect } from 'react';
import './data.css';
import 'animate.css';
import FsLightbox from 'fslightbox-react';
import certificateImages from '../assets/Routes/AllCertificate';

// Firebase imports
import { db, auth } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";

const AwardsSection = () => {
  const awards = [
    {
      title: 'Excellence in Research',
      organization: 'KPS Awards',
      date: 'June 5th, 2022',
      location: 'Tamil Nadu, India',
    },
    {
      title: 'Best Researcher Award',
      organization: 'IJIEMR – Elsevier SSRN Research Awards',
      date: 'September 2022',
      location: 'India',
      issn: 'ISSN.NO-2456-5083',
    },
  ];

  // Manual awards state
  const [manualAwards, setManualAwards] = useState([]);
  const [form, setForm] = useState({
    title: "",
    organization: "",
    date: "",
    location: "",
    issn: "",
  });
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

  // Fetch manual awards
  useEffect(() => {
    const fetchManual = async () => {
      try {
        const q = query(collection(db, "awardsManual"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const arr = [];
        snap.forEach(docSnap => arr.push({ ...docSnap.data(), id: docSnap.id }));
        setManualAwards(arr);
      } catch (err) {
        setError("Failed to load awards.");
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
      if (!form.title || !form.organization || !form.date || !form.location) {
        throw new Error("Please fill all fields.");
      }
      await addDoc(collection(db, "awardsManual"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setManualAwards([{ ...form, id: Date.now().toString() }, ...manualAwards]);
      setNotif("Award added.");
      setForm({
        title: "",
        organization: "",
        date: "",
        location: "",
        issn: "",
      });
    } catch (err) {
      setError(err.message);
    }
    setUploading(false);
  };

  // Delete
  const handleDelete = async (award) => {
    if (!window.confirm("Delete this award?")) return;
    setNotif("");
    setError("");
    try {
      await deleteDoc(doc(db, "awardsManual", award.id));
      setManualAwards(manualAwards.filter(j => j.id !== award.id));
      setNotif("Award deleted.");
    } catch (err) {
      setError("Failed to delete award.");
    }
  };

  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  function openLightboxOnSlide(number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    });
  }

  return (
    <div className="awards-container animate__animated animate__fadeIn">
      <h2 className="awards-title animate__animated animate__fadeInDown">Awards & Recognitions</h2>

      {/* Manual upload form for authenticated users */}
      {user && (
        <form
          className="awards-upload-form"
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
            Add Award
          </h3>
          <input
            type="text"
            name="title"
            placeholder="Award Title"
            value={form.title}
            onChange={handleFormChange}
            required
            style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
          />
          <input
            type="text"
            name="organization"
            placeholder="Organization"
            value={form.organization}
            onChange={handleFormChange}
            required
            style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
          />
          <input
            type="text"
            name="date"
            placeholder="Date"
            value={form.date}
            onChange={handleFormChange}
            required
            style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleFormChange}
            required
            style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
          />
          <input
            type="text"
            name="issn"
            placeholder="ISSN (optional)"
            value={form.issn}
            onChange={handleFormChange}
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
            {uploading ? "Saving..." : "Add"}
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

      <ul className="awards-list">
        {manualAwards.map((award, index) => (
          <li
            key={award.id}
            className="awards-item animate__animated animate__fadeInUp"
            style={{
              animationDelay: `${0.15 + index * 0.07}s`,
              border: "1px solid #e3f0ff",
              borderRadius: "10px",
              marginBottom: "18px",
              background: "#fafdff",
              position: "relative"
            }}
          >
            <strong>{award.title}</strong> – {award.organization}<br />
            <em>{award.date}, {award.location}</em>
            {award.issn && <div>ISSN: {award.issn}</div>}
            {user && (
              <button
                className="delete-award-btn"
                onClick={() => handleDelete(award)}
                style={{
                  position: "absolute",
                  top: 12,
                  right: 16,
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
        {awards.map((award, index) => (
          <li
            key={index}
            className="awards-item animate__animated animate__fadeInUp"
            style={{ animationDelay: `${0.2 + (manualAwards.length + index) * 0.1}s` }}
          >
            <strong>{award.title}</strong> – {award.organization}<br />
            <em>{award.date}, {award.location}</em>
            {award.issn && <div>ISSN: {award.issn}</div>}
          </li>
        ))}
      </ul>
      <h4 className="animate__animated animate__fadeInLeft">Certificates</h4>
      <span>─────</span>
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={certificateImages}
        slide={lightboxController.slide}
      />
      <div className="certificates-wrapper">
        <div className="certificates-gallery">
          {certificateImages.map((src, idx) => (
            <div className="certificates-thumb" key={idx}>
              <img src={src} alt={`Certificate ${idx + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwardsSection;
