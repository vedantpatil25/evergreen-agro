import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: ""
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }
    
    return errors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: ""
        });
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="contact-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="contact-card">
              <div className="row g-0">
                <div className="col-lg-5 contact-info-section">
                  <div className="contact-info-content">
                    <h2 className="contact-title">Contact Us</h2>
                    <p className="contact-subtitle">
                      We'd love to hear from you. Please fill out the form or contact us using the information below.
                    </p>
                    
                    <div className="contact-details">
                      <div className="contact-detail-item">
                        <div className="contact-icon">
                          <i className="bi bi-geo-alt-fill"></i>
                        </div>
                        <div className="contact-text">
                          <h6>Our Location</h6>
                          <p>Jalgone Road, Pansemal</p>
                        </div>
                      </div>
                      
                      <div className="contact-detail-item">
                        <div className="contact-icon">
                          <i className="bi bi-telephone-fill"></i>
                        </div>
                        <div className="contact-text">
                          <h6>Phone Number</h6>
                          <p>+91 9424056126</p>
                        </div>
                      </div>
                      
                      <div className="contact-detail-item">
                        <div className="contact-icon">
                          <i className="bi bi-envelope-fill"></i>
                        </div>
                        <div className="contact-text">
                          <h6>Email Address</h6>
                          <p className="email-wrap">evergreenagropansemal@gmail.com</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="contact-social">
                      <h6>Follow Us</h6>
                      <div className="social-icons">
                        <a href="#" className="social-icon">
                          <i className="bi bi-facebook"></i>
                        </a>
                        <a href="#" className="social-icon">
                          <i className="bi bi-instagram"></i>
                        </a>
                        <a href="#" className="social-icon">
                          <i className="bi bi-twitter"></i>
                        </a>
                        <a href="#" className="social-icon">
                          <i className="bi bi-whatsapp"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-7 contact-form-section">
                  <div className="contact-form-content">
                    <h3 className="form-title">Send Us a Message</h3>
                    
                    {submitSuccess ? (
                      <div className="success-message">
                        <div className="success-icon">
                          <i className="bi bi-check-circle-fill"></i>
                        </div>
                        <h4>Thank You!</h4>
                        <p>Your message has been sent successfully. We'll get back to you soon.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className="form-floating">
                              <input
                                type="text"
                                className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                              />
                              <label htmlFor="firstName">First Name*</label>
                              {formErrors.firstName && (
                                <div className="invalid-feedback">{formErrors.firstName}</div>
                              )}
                            </div>
                          </div>
                          
                          <div className="col-md-6">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                              />
                              <label htmlFor="lastName">Last Name</label>
                            </div>
                          </div>
                          
                          <div className="col-md-6">
                            <div className="form-floating">
                              <input
                                type="tel"
                                className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`}
                                id="phone"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                              />
                              <label htmlFor="phone">Phone Number*</label>
                              {formErrors.phone && (
                                <div className="invalid-feedback">{formErrors.phone}</div>
                              )}
                            </div>
                          </div>
                          
                          <div className="col-md-6">
                            <div className="form-floating">
                              <input
                                type="email"
                                className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                                id="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                              />
                              <label htmlFor="email">Email Address*</label>
                              {formErrors.email && (
                                <div className="invalid-feedback">{formErrors.email}</div>
                              )}
                            </div>
                          </div>
                          
                          <div className="col-12">
                            <div className="form-floating">
                              <textarea
                                className={`form-control ${formErrors.message ? 'is-invalid' : ''}`}
                                id="message"
                                name="message"
                                placeholder="Your Message"
                                style={{ height: "150px" }}
                                value={formData.message}
                                onChange={handleChange}
                              ></textarea>
                              <label htmlFor="message">Your Message*</label>
                              {formErrors.message && (
                                <div className="invalid-feedback">{formErrors.message}</div>
                              )}
                            </div>
                          </div>
                          
                          <div className="col-12">
                            <button 
                              className="btn btn-success btn-submit" 
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                  Sending...
                                </>
                              ) : (
                                <>
                                  <i className="bi bi-send-fill me-2"></i>
                                  Send Message
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
