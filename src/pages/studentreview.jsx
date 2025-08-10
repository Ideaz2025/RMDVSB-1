import React, { useState, useEffect } from 'react';
import './StudentReviews.css';

// Import Firestore from your common firebase.js
import { db } from "../firebase";
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";

// Emoji icons for avatars
const AVATAR_ICONS = [
  "🦉", "🦁", "🐼", "🦊", "🐧", "🐸", "🐻", "🐨", "🐯", "🦄", "🐶", "🐱", "🐰", "🐵", "🐢", "🐙", "🦋", "🦜", "🦩", "🦔"
];

function getRandomIcon() {
  return AVATAR_ICONS[Math.floor(Math.random() * AVATAR_ICONS.length)];
}

const StudentReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    comment: '',
  });
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState("");

  // Fetch reviews from Firestore on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, "studentReviews"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const fetched = [];
        querySnapshot.forEach((doc) => {
          fetched.push(doc.data());
        });
        setReviews(fetched);
        setCurrent(0);
      } catch (err) {
        setError("Failed to load reviews. Please try again later.");
      }
    };
    fetchReviews();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.name.trim() && formData.course.trim() && formData.comment.trim()) {
      const newReview = {
        name: formData.name.trim(),
        course: formData.course.trim(),
        comment: formData.comment.trim(),
        icon: getRandomIcon(),
        timestamp: serverTimestamp(),
      };
      try {
        await addDoc(collection(db, "studentReviews"), newReview);
        setReviews(prev => [newReview, ...prev]);
        setFormData({ name: '', course: '', comment: '' });
        setCurrent(0);
      } catch (err) {
        setError("Failed to submit review. Please try again.");
      }
    } else {
      setError("Please fill in all fields.");
    }
  };

  // Carousel navigation
  const prevReview = () => setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const nextReview = () => setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  return (
    <div className="reviews-main-wrapper">
      <section className="reviews-section">
        <h2>Student Feedback on Faculty</h2>
        <p className="section-subtitle">Read what students are saying about their faculty experience.</p>
        {error && <div className="error-message" role="alert">{error}</div>}
        <div className="review-carousel">
          <div className="carousel-row">
            {reviews.length > 0 && (
              <figure className="snip1533">
                <figcaption>
                  <div className="review-avatar" style={{ fontSize: "2.2rem", marginBottom: 8 }}>
                    {reviews[current].icon}
                  </div>
                  <blockquote aria-live="polite">{reviews[current].comment}</blockquote>
                  <h3>{reviews[current].name}</h3>
                  <h4>{reviews[current].course}</h4>
                </figcaption>
              </figure>
            )}
            {reviews.length > 1 && (
              <figure className="snip1533">
                <figcaption>
                  <div className="review-avatar" style={{ fontSize: "2.2rem", marginBottom: 8 }}>
                    {reviews[(current + 1) % reviews.length].icon}
                  </div>
                  <blockquote aria-live="polite">{reviews[(current + 1) % reviews.length].comment}</blockquote>
                  <h3>{reviews[(current + 1) % reviews.length].name}</h3>
                  <h4>{reviews[(current + 1) % reviews.length].course}</h4>
                </figcaption>
              </figure>
            )}
          </div>
          {reviews.length > 1 && (
            <div className="carousel-controls">
              <button onClick={prevReview} className="carousel-btn" aria-label="Previous Review">&#8592;</button>
              <span className="carousel-index">{current + 1} / {reviews.length}</span>
              <button onClick={nextReview} className="carousel-btn" aria-label="Next Review">&#8594;</button>
            </div>
          )}
        </div>
      </section>
      <section className="review-form-section">
        <h2>Submit Your Review About a Faculty Member</h2>
        <p className="section-subtitle">Your feedback helps us improve and appreciate great teaching.</p>
        <form onSubmit={handleSubmit} className="review-form" noValidate>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-required="true"
            aria-label="Your Name"
          />
          <input
            type="text"
            name="course"
            placeholder="Course / Subject Name"
            value={formData.course}
            onChange={handleChange}
            required
            aria-required="true"
            aria-label="Course or Subject Name"
          />
          <textarea
            name="comment"
            placeholder="Write your review about the faculty..."
            value={formData.comment}
            onChange={handleChange}
            required
            aria-required="true"
            aria-label="Review Comment"
          />
          <button type="submit">Submit Review</button>
        </form>
      </section>
    </div>
  );
};

export default StudentReviews;
