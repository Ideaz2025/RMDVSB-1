import React, { useState, useEffect } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "animate.css";
import "./CSS/Extra.css";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

// Cloudinary parameters
const CLOUD_NAME = "dtpqjzpnz";
const UPLOAD_PRESET = "murugadoss";

function Extra() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [user, setUser] = useState(null);

  // Listen for events in Firestore
  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, snapshot => {
      const eventsArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventsArray);
    });
    return () => unsubscribe();
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleFileChange = e => {
    setError("");
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  // Upload to Cloudinary, return publicId
  const uploadImageToCloudinary = async file => {
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

  // Handle event upload
  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    if (!title.trim() || !date || !file) {
      setError("Please provide title, date and image.");
      return;
    }
    try {
      setUploading(true);
      const publicId = await uploadImageToCloudinary(file);
      await addDoc(collection(db, "events"), {
        title: title.trim(),
        date,
        publicId,
        createdAt: new Date()
      });
      setTitle("");
      setDate("");
      setFile(null);
      setSuccessMsg("Event successfully added!");
    } catch (err) {
      setError("Failed to upload: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Delete event
  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteDoc(doc(db, "events", eventId));
      setSuccessMsg("Event deleted.");
    } catch(err) {
      setError("Failed to delete event: " + err.message);
    }
  };

  // Cloudinary instance
  const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });

  return (
    <div
      className="extra-events-wrapper" style={window.innerWidth <= 992 ? { padding: "2rem 1rem", maxWidth: "100%" } : { padding: "2rem 1rem", maxWidth: "900px", margin: "60px auto" }}>
   
      <div
        className="extra-events-wrapper"
        style={{
          padding: "1rem 1rem",
          maxWidth: "900px",
          margin: "0px auto",
          borderRadius: "1.6rem",
          boxShadow: "0 2px 16px rgba(28,101,140,0.09)",
          minHeight: "80vh",
          overflowY: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.8rem",
          scrollbarWidth: "thin",
          scrollbarColor: "#1c658c transparent",
          
        }}
      >
       
        
        {/* Upload form visible to all logged-in users */}
        {user ? (
          <form
            onSubmit={handleSubmit}
            style={{
              gridColumn: "1 / -1",
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 1px 8px rgba(28,101,140,0.10)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              maxWidth: 450,
              margin: "0 auto 3rem",
            }}
          >
            <h3 style={{ color: "#398ab9", marginBottom: "0.5rem", textAlign: "center" }}>
              Add New Event
            </h3>
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={uploading}
              required
              style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: 6, border: "1px solid #ccc" }}
            />
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              disabled={uploading}
              required
              style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: 6, border: "1px solid #ccc" }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
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
              {uploading ? "Uploading..." : "Add Event"}
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
  <h2
          style={{
            gridColumn: "1 / -1", 
            color: "#1c658c",
            fontWeight: 700,
            fontFamily: "'Archivo', sans-serif",
            letterSpacing: ".02em",
            textAlign: "center",
          
          }}
        >
          Recent Events Conducted
        </h2>
        {/* Display events loaded from Firestore */}
        {events.length === 0 ? (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#7d84ab" }}>
            No events found.
          </p>
        ) : (
          events.map((event, idx) => {
            const img = cld
              .image(event.publicId)
              .format('auto')
              .quality('auto')
              .resize(auto().gravity(autoGravity()).width(500).height(500));
            return (
              <>
        
              <div
                className="event-card animate__animated animate__fadeInUp"
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
                  position: "relative"
                }}
                key={event.id}
              >
               
                {/* Delete button for logged-in users */}
                {user && (
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
                    title="Delete this event"
                    onClick={() => handleDelete(event.id)}
                  >
                    ×
                  </button>
                )}
                <AdvancedImage cldImg={img} />
                <h3 style={{ color: "#398ab9", margin: "1rem 0 0.5rem 0" }}>{event.title}</h3>
                <div className="event-date" style={{ fontSize: "1rem", color: "#7d84ab" }}>
                  {new Date(event.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              </>
            );
          })
        )}
      </div>
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
      
      </div>
    </div>
  );
}

export default Extra;
