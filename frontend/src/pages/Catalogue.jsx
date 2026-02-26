import { useEffect, useState } from 'react';
import { MapPin, Phone, MessageCircle, AlertCircle } from 'lucide-react';
import NavbarClient from '../components/NavbarClient';
import { productApi } from '../api/productApi';
import './catalogue.css';

const Catalogue = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const CONTACT_INFO = {
    phone: '+212 667 166 583',
    whatsapp: 'https://wa.me/212667166583',
    address: 'LA CASA OPTIC 298 C Ain chkf, Fès 30050',
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.nom.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
      setError('Erreur lors du chargement des produits. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = () => {
    window.location.href = CONTACT_INFO.whatsapp;
  };

  if (loading) {
    return (
      <div className="catalogue-page">
        <NavbarClient />
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Chargement de nos produits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="catalogue-page">
      <NavbarClient />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Nos Lunettes</h1>
          <p className="hero-subtitle">Découvrez notre collection exclusive</p>
        </div>
      </section>

      {/* Conteneur Principal */}
      <div className="catalogue-container">
        {/* Barre de Recherche */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher une lunette..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Message d'Erreur */}
        {error && (
          <div className="error-message">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Grille de Produits */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                {/* Image Produit */}
                <div className="product-image-container">
                  <img
                    src={product.image_url || 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop'}
                    alt={product.nom}
                    className="product-image"
                  />
                  {product.stock <= 0 && (
                    <div className="stock-badge out-of-stock">Rupture de stock</div>
                  )}
                </div>

                {/* Contenu Produit */}
                <div className="product-content">
                  <h3 className="product-name">{product.nom}</h3>
                  
                  <div className="price-section">
                    <span className="product-price">{product.prix} DH</span>
                  </div>

                  {/* Boutons d'Action */}
                  <div className="action-buttons">
                    <button
                      className="btn-contact"
                      onClick={handleContactClick}
                      disabled={product.stock <= 0}
                    >
                      <MessageCircle size={18} />
                      Nous contacter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-products">
            <AlertCircle size={48} />
            <h2>Aucun produit trouvé</h2>
            <p>Essayez une autre recherche</p>
          </div>
        )}
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

export default Catalogue;
