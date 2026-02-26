import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import NavbarClient from '../components/NavbarClient';
import './contact.css';

const Contact = () => {
  const CONTACT_INFO = {
    phone: '+212 667 166 583',
    whatsapp: 'https://wa.me/212667166583',
    email: 'contact@optique.com',
    address: 'LA CASA OPTIC 298 C Ain chkf, Fès 30050',
    hours: 'Lun-Ven: 09h30-20h30 | Sam: 09h30-14h30 | Dim: Fermé',
  };

  const handleWhatsApp = () => {
    window.open(CONTACT_INFO.whatsapp, '_blank');
  };

  const handlePhone = () => {
    window.location.href = `tel:${CONTACT_INFO.phone}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${CONTACT_INFO.email}`;
  };

  return (
    <div className="contact-page">
      <NavbarClient />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1 className="hero-title">Nous Contacter</h1>
          <p className="hero-subtitle">Nous sommes là pour vous aider</p>
        </div>
      </section>

      {/* Conteneur Principal */}
      <div className="contact-container">
        <div className="contact-grid">
          {/* Formulaire de Contact */}
          <div className="contact-form-section">
            <h2>Envoyez-nous un message</h2>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Votre nom complet"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="votre.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Sujet de votre message"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Votre message..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Envoyer le message
              </button>
            </form>
          </div>

          {/* Informations de Contact */}
          <div className="contact-info-section">
            <h2>Informations de Contact</h2>

            {/* Téléphone */}
            <div className="info-card">
              <div className="info-icon">
                <Phone size={24} />
              </div>
              <div className="info-content">
                <h3>Téléphone</h3>
                <button onClick={handlePhone} className="info-link">
                  {CONTACT_INFO.phone}
                </button>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="info-card">
              <div className="info-icon whatsapp">
                <MessageCircle size={24} />
              </div>
              <div className="info-content">
                <h3>WhatsApp</h3>
                <button onClick={handleWhatsApp} className="info-link">
                  Nous contacter via WhatsApp
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="info-card">
              <div className="info-icon">
                <Mail size={24} />
              </div>
              <div className="info-content">
                <h3>Email</h3>
                <button onClick={handleEmail} className="info-link">
                  {CONTACT_INFO.email}
                </button>
              </div>
            </div>

            {/* Adresse */}
            <div className="info-card">
              <div className="info-icon">
                <MapPin size={24} />
              </div>
              <div className="info-content">
                <h3>Adresse</h3>
                <p>{CONTACT_INFO.address}</p>
              </div>
            </div>

            {/* Heures d'Ouverture */}
            <div className="info-card">
              <div className="info-icon">
                <Clock size={24} />
              </div>
              <div className="info-content">
                <h3>Heures d'Ouverture</h3>
                <p>{CONTACT_INFO.hours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Carte */}
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d604.2230590678064!2d-5.009937150375985!3d33.99728304000071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b005a186f5b%3A0xb5bae1d077d86e0c!2sLA%20CASA%20OPTIC!5e0!3m2!1sfr!2sma!4v1772110437419!5m2!1sfr!2sma"
  width="100%"
  height="400"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Localisation Boutique"
/>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>À Propos</h4>
            <p>Votre boutique d'optique de confiance depuis des années.</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p className="contact-item">
              <Phone size={16} />
              {CONTACT_INFO.phone}
            </p>
            <p className="contact-item">
              <MapPin size={16} />
              {CONTACT_INFO.address}
            </p>
          </div>
          <div className="footer-section">
  <h4>Suivez-nous</h4>
  <div className="social-links">
  <a
    href="https://www.tiktok.com/@youssefmabrouki02?_r=1&_t=ZS-94FRaA43kSj"
    className="social-link"
    target="_blank"
    rel="noopener noreferrer"
  >
    TikTok
  </a>
  <a
    href="https://www.instagram.com/lacasa.optic?igsh=dzZnbDhiOGc5ODBy"
    className="social-link"
    target="_blank"
    rel="noopener noreferrer"
  >
    Instagram
  </a>
</div>
  
    </div>
        </div>
        <div className="footer-bottom">
          <p>&copy;  Optique. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
