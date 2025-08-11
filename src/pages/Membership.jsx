import React, { useState, useEffect } from 'react';
import './data.css';
import 'animate.css';

// Firebase imports
import { db, auth } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";

const MembershipsSection = () => {
  const [user, setUser] = useState(null);
  const [manualMemberships, setManualMemberships] = useState([]);
  const [form, setForm] = useState({
    organization: "",
    membershipType: "",
    membershipId: "",
  });
  const [notif, setNotif] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  // Static memberships
  const memberships = [
    {
      organization: 'Indian Society for Technical Education (ISTE)',
      membershipType: 'Life Member',
      membershipId: 'LM 63596',
    },
    {
      organization: 'Computer Society of India (CSI)',
      membershipType: 'Life Member',
      membershipId: '01122973',
    },
  ];

  // Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // Fetch manual memberships
  useEffect(() => {
    const fetchManual = async () => {
      try {
        const q = query(collection(db, "membershipsManual"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const arr = [];
        snap.forEach(docSnap => arr.push({ ...docSnap.data(), id: docSnap.id }));
        setManualMemberships(arr);
      } catch (err) {
        setError("Failed to load memberships.");
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
      if (!form.organization || !form.membershipType || !form.membershipId) {
        throw new Error("Please fill all fields.");
      }
      await addDoc(collection(db, "membershipsManual"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setManualMemberships([{ ...form, id: Date.now().toString() }, ...manualMemberships]);
      setNotif("Membership added.");
      setForm({
        organization: "",
        membershipType: "",
        membershipId: "",
      });
    } catch (err) {
      setError(err.message);
    }
    setUploading(false);
  };

  // Delete
  const handleDelete = async (membership) => {
    if (!window.confirm("Delete this membership?")) return;
    setNotif("");
    setError("");
    try {
      await deleteDoc(doc(db, "membershipsManual", membership.id));
      setManualMemberships(manualMemberships.filter(j => j.id !== membership.id));
      setNotif("Membership deleted.");
    } catch (err) {
      setError("Failed to delete membership.");
    }
  };

  return (
    <div className="membership-container animate__animated animate__fadeIn">
      <h2 className="membership-title animate__animated animate__fadeInDown">Professional Memberships</h2>

      {/* Manual upload form for authenticated users */}
      {user && (
        <form
          className="membership-upload-form"
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
            Add Membership
          </h3>
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
            name="membershipType"
            placeholder="Membership Type"
            value={form.membershipType}
            onChange={handleFormChange}
            required
            style={{ padding: "10px 12px", border: "1.5px solid #d0e7ff", borderRadius: 8, fontSize: "1rem", background: "#f5faff" }}
          />
          <input
            type="text"
            name="membershipId"
            placeholder="Membership ID"
            value={form.membershipId}
            onChange={handleFormChange}
            required
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

      <ul className="membership-list">
        {manualMemberships.map((member, idx) => (
          <li
            key={member.id}
            className="membership-item animate__animated animate__fadeInUp"
            style={{
              animationDelay: `${0.15 + idx * 0.07}s`,
              border: "1px solid #e3f0ff",
              borderRadius: "10px",
              marginBottom: "18px",
              background: "#fafdff",
              position: "relative"
            }}
          >
            <strong>{member.organization}</strong><br />
            {member.membershipType} – ID: {member.membershipId}
            {user && (
              <button
                className="delete-membership-btn"
                onClick={() => handleDelete(member)}
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
        {memberships.map((member, idx) => (
          <li
            key={idx}
            className="membership-item animate__animated animate__fadeInUp"
            style={{ animationDelay: `${0.15 + (manualMemberships.length + idx) * 0.07}s` }}
          >
            <strong>{member.organization}</strong><br />
            {member.membershipType} – ID: {member.membershipId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembershipsSection;
