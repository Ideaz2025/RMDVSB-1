import React, { useState, useEffect } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import "animate.css";
import "./CSS/Extra.css";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

// Cloudinary parameters
const CLOUD_NAME = "dtpqjzpnz";
const UPLOAD_PRESET = "murugadoss"; // your unsigned upload preset

function Subject() {
  const [subjects, setSubjects] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [user, setUser] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  // Listen for subjects in Firestore
  useEffect(() => {
    const q = query(collection(db, "subjectsHandled"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, snapshot => {
      const subjectsArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubjects(subjectsArray);
    });
    return () => unsubscribe();
  }, []);

  // Cloudinary instance
  const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    if (!file) throw new Error("No file selected");
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    const res = await fetch(url, { method: "POST", body: formData });
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    return data.public_id;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    if (!title.trim() || !file) {
      setError("Please provide subject name and image.");
      return;
    }
    try {
      setUploading(true);
      const publicId = await uploadImageToCloudinary(file);
      await addDoc(collection(db, "subjectsHandled"), {
        title: title.trim(),
        publicId,
        createdAt: new Date(),
        userId: user?.uid || null, // Save user ID
        userEmail: user?.email || null // Optionally save email
      });
      setTitle("");
      setFile(null);
      setSuccessMsg("Subject successfully added!");
    } catch (err) {
      setError("Failed to upload: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Handle delete subject
  const handleDelete = async (subjectId) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;
    try {
      await deleteDoc(doc(db, "subjectsHandled", subjectId));
      setSuccessMsg("Subject deleted.");
    } catch (err) {
      setError("Failed to delete subject: " + err.message);
    }
  };

  return (
    <div
      className="extra-events-wrapper"
      style={{
        padding: "2rem 1rem",
        maxWidth: "900px",
        margin: "60px auto",
        borderRadius: "1.6rem",
        boxShadow: "0 2px 16px rgba(28,101,140,0.09)",
        minHeight: "60vh",
        overflowY: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.5rem",
        scrollbarWidth: "thin",
        scrollbarColor: "#1c658c transparent",
      }}
    >
      <h2
        style={{
          gridColumn: "1 / -1",
          color: "#1c658c",
          fontWeight: 700,
          fontFamily: "'Archivo', sans-serif",
          letterSpacing: ".02em",
          textAlign: "center",
          marginBottom: "1.5rem"
        }}
      >
        Subjects Handled
      </h2>
      <p style={{
        gridColumn: "1 / -1",
        textAlign: "center",
        margin: "0 0 1.5rem 0",
        color: "#55597a",
        fontSize: "1.05rem"
      }}>
        Here you can view, add, and manage the list of subjects you have handled, each with an accompanying image. To include a new subject, provide its name and upload a representative image.
      </p>
      {/* Add Subject Form */}
      {user ? (
      <form
        onSubmit={handleSubmit}
        style={{
          gridColumn: "1 / -1",
          background: "#fff",
          padding: "1.2rem",
          borderRadius: "12px",
          boxShadow: "0 1px 8px rgba(28,101,140,0.10)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: 400,
          margin: "0 auto 2rem",
        }}
      >
        <h3 style={{ color: "#398ab9", marginBottom: "0.5rem", textAlign: "center" }}>
          Add Subject
        </h3>
        <input
          type="text"
          placeholder="Subject Name"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={uploading}
          required
          style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: 6, border: "1px solid #ccc" }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setFile(e.target.files[0])}
          disabled={uploading}
          required
          style={{ fontSize: "1rem" }}
        />
        <button
          type="submit"
          disabled={uploading}
          style={{
            backgroundColor: "#1c658c",
            color: "#fff",
            fontWeight: "700",
            fontSize: "1.1rem",
            borderRadius: 6,
            border: "none",
            padding: "0.6rem",
            cursor: "pointer",
          }}
        >
          {uploading ? "Uploading..." : "Add Subject"}
        </button>
        {error && (
          <div style={{ color: "#c53030", fontWeight: "600", textAlign: "center" }}>
            {error}
          </div>
        )}
        {successMsg && (
          <div style={{ color: "#226ab7", fontWeight: "600", textAlign: "center" }}>
            {successMsg}
          </div>
        )}
      </form>
      ) : null}
      {/* Subject Cards */}
      {subjects.length === 0 ? (
        <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#7d84ab" }}>
          No subjects found.
        </p>
      ) : (
        subjects.map((subject, idx) => {
          const img = cld
            .image(subject.publicId)
            .format('auto')
            .quality('auto')
            .resize(auto().gravity(autoGravity()).width(300).height(300));
          return (
            <div
              className="subject-card animate__animated animate__fadeInUp"
              style={{
                animationDelay: `${0.1 + idx * 0.13}s`,
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 1px 8px rgba(28,101,140,0.10)",
                padding: "1.2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                minHeight: "320px",
                position: "relative"
              }}
              key={subject.id}
            >
              {/* Delete button */}
              {user && subject.userId === user.uid && (
                <button
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 16,
                    background: "#f54242",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    padding: "0.4rem 0.7rem",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    zIndex: 2,
                  }}
                  title="Delete this subject"
                  onClick={() => handleDelete(subject.id)}
                >
                  ×
                </button>
              )}
              <AdvancedImage cldImg={img} />
              <h3 style={{ color: "#398ab9", margin: "1rem 0 0.5rem 0" }}>{subject.title}</h3>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Subject;
