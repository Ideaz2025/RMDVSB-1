import {
  AiOutlineMail,
  AiFillPhone,
  AiFillLinkedin,
  AiFillInstagram,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Container } from "react-bootstrap";
import { FiCopy } from "react-icons/fi";
import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./CSS/Contact.css";

function Contact() {
  const [alreadyCopy, setAlreadyCopy] = useState("Copy");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");

  function actionCopy() {
    setAlreadyCopy("Copied");
    setTimeout(function () {
      setAlreadyCopy("Copy");
    }, 1000);
  }

  // Contact details for Dr. R. Murugadoss
  const emails = [
    "murugadossphd@gmail.com",
    "drrmdcse@gmail.com",
    "ai@vsbcetc.com",
  ];
  const phones = [
    "+91-7659966780",
    "+91-8124948127"
  ];

  // Simple form handler (no backend, just demo)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("Sending...");
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setFormStatus("Thank you for your message!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setFormStatus("Failed to send. Please try again later.");
      }
    } catch (err) {
      setFormStatus("Failed to send. Please try again later.");
    }
    setTimeout(() => setFormStatus(""), 3000);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Contact</title>
        </Helmet>
      </HelmetProvider>
      <Container fluid className="contact-modern-wrapper">
        <div className="contact-modern-card animate__animated animate__fadeInDown">
          <div className="contact-modern-header">
            <img
              src="https://vsbcetc.edu.in/wp-content/uploads/2025/01/304869656_388447220127163_8756342302976187236_n.jpg"
              alt="Dr R Murugadoss"
              className="contact-modern-avatar"
            />
            <div>
              <h2>Dr R Murugadoss</h2>
              <h4>Professor &amp; HoD</h4>
              <p>Department of Artificial Intelligence and Data Science</p>
              <p>V.S.B. College of Engineering Technical Campus</p>
              <p>Kinathukadavu, Coimbatore - 642109</p>
            </div>
          </div>
          <div className="contact-modern-details">
            <div className="contact-modern-block">
              <h3><AiOutlineMail /> Email</h3>
              {emails.map((email) => (
                <div key={email} className="contact-modern-row">
                  <span>{email}</span>
                  <CopyToClipboard text={email}>
                    <button className="btn-copy-modern" onClick={actionCopy}>
                      {alreadyCopy} <FiCopy />
                    </button>
                  </CopyToClipboard>
                </div>
              ))}
            </div>
            <div className="contact-modern-block">
              <h3><AiFillPhone /> Phone</h3>
              {phones.map((phone) => (
                <div key={phone} className="contact-modern-row">
                  <span>{phone}</span>
                  <CopyToClipboard text={phone}>
                    <button className="btn-copy-modern" onClick={actionCopy}>
                      {alreadyCopy} <FiCopy />
                    </button>
                  </CopyToClipboard>
                </div>
              ))}
            </div>
            <div className="contact-modern-block">
              <h3><AiFillLinkedin /> LinkedIn</h3>
              <a
                href="https://www.linkedin.com/in/dr-r-murugadoss"
                target="_blank"
                rel="noreferrer"
                className="btn-direct-modern"
              >
                dr-r-murugadoss <AiOutlineArrowRight />
              </a>
            </div>
            <div className="contact-modern-block">
              <h3><AiFillInstagram /> Instagram</h3>
              <a
                href="https://www.instagram.com/dr_r_murugadoss/"
                target="_blank"
                rel="noreferrer"
                className="btn-direct-modern"
              >
                dr_r_murugadoss <AiOutlineArrowRight />
              </a>
            </div>
            <div className="contact-modern-block">
              <h3>
                <AiOutlineMail /> Google Scholar
              </h3>
              <a
                href="https://scholar.google.co.in/citations?user=j6RuO2gAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-direct-modern"
              >
                View Profile <AiOutlineArrowRight />
              </a>
            </div>
          </div>
          <div className="contact-modern-form-section">
            <h3><AiOutlineMail /> Send a Message</h3>
            <form className="contact-modern-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
              />
              <button type="submit" className="btn-direct-modern" style={{ width: "100%" }}>
                Send
              </button>
              {formStatus && (
                <div className="form-status-modern">
                  {formStatus}
                </div>
              )}
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Contact;
