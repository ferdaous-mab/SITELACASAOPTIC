import { useEffect, useState } from 'react';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, AlertTriangle, Activity, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { productApi } from '../api/productApi';
import { salesApi } from '../api/salesApi';
import { authApi } from '../api/authApi';
import { formatPrice, formatDate } from '../utils/helpers';
import './dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [recentSales, setRecentSales] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, sales, users, revenue] = await Promise.all([
          productApi.getAllProducts(),
          salesApi.getAllSales(),
          authApi.getUsers(),
          salesApi.getTotalAmount(),
        ]);

        setStats({
          totalProducts: products.length,
          totalSales: sales.length,
          totalUsers: users.length,
          totalRevenue: revenue.total_amount || 0,
        });

        setRecentSales(sales.slice(0, 5));
        const lowStock = products.filter((p) => p.stock < 20);
        setLowStockProducts(lowStock);
      } catch (error) {
        console.error('Erreur lors du chargement des stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="login-container">
        <div className="animated-bg">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <div className="loader" style={{ width: '60px', height: '60px', borderWidth: '4px', margin: '0 auto 20px' }}></div>
          <p style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Fond animé */}
      <div className="dashboard-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      <div className="dashboard-grid"></div>

      <Navbar />
      
      <div className="dashboard-layout">
        <Sidebar />
        
        <main className="dashboard-main">
          {/* Header */}
          <div className="login-card" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#fff', marginBottom: '8px', background: 'linear-gradient(135deg, #c1121f 0%, #8b0000 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Tableau de bord
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity className="w-4 h-4" />
                  <span>Vue d'ensemble de votre activité en temps réel</span>
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Dernière mise à jour</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>
                  {new Date().toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            {/* Card Produits */}
            <div className="login-card hover-lift">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #c1121f 0%, #8b0000 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(193, 18, 31, 0.35)' }}>
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.9)', fontSize: '14px', fontWeight: '600' }}>
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+12%</span>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Produits</p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#fff' }}>{stats.totalProducts}</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '8px' }}>Total des produits en stock</p>
            </div>

            {/* Card Ventes */}
            <div className="login-card hover-lift">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(193, 18, 31, 0.35)' }}>
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.9)', fontSize: '14px', fontWeight: '600' }}>
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+8%</span>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Ventes</p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#fff' }}>{stats.totalSales}</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '8px' }}>Transactions réalisées</p>
            </div>

            {/* Card Utilisateurs */}
            <div className="login-card hover-lift">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #c1121f 0%, #8b0000 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(193, 18, 31, 0.35)' }}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.9)', fontSize: '14px', fontWeight: '600' }}>
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+5%</span>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Utilisateurs</p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#fff' }}>{stats.totalUsers}</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '8px' }}>Comptes actifs</p>
            </div>

            {/* Card Revenue */}
            <div className="login-card hover-lift" style={{ background: 'linear-gradient(135deg, #c1121f 0%, #8b0000 100%)', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DollarSign className="w-6 h-6" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255, 255, 255, 0.2)', padding: '4px 8px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' }}>
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+15%</span>
                </div>
              </div>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px', opacity: 0.95 }}>Chiffre d'affaires</p>
              <p style={{ fontSize: '32px', fontWeight: '700' }}>{formatPrice(stats.totalRevenue)}</p>
              <p style={{ fontSize: '12px', marginTop: '8px', opacity: 0.9 }}>Revenus totaux générés</p>
            </div>
          </div>

          {/* Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            {/* Recent Sales */}
            <div className="login-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c' }}>Ventes récentes</h2>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#718096', background: '#f7fafc', padding: '4px 12px', borderRadius: '20px' }}>
                  Dernières 5
                </span>
              </div>

              {recentSales.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                  <div style={{ width: '64px', height: '64px', background: '#f7fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <ShoppingCart className="w-8 h-8" style={{ color: '#cbd5e0' }} />
                  </div>
                  <p style={{ color: '#4a5568', fontWeight: '600' }}>Aucune vente récente</p>
                  <p style={{ color: '#a0aec0', fontSize: '14px', marginTop: '4px' }}>Les nouvelles ventes apparaîtront ici</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {recentSales.map((sale) => (
                    <div key={sale.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'linear-gradient(to right, #f7fafc, #edf2f7)', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #c1121f 0%, #8b0000 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', boxShadow: '0 4px 12px rgba(193,18,31,0.3)' }}>
                          {sale.quantity}
                        </div>
                        <div>
                          <p style={{ fontWeight: '600', color: '#2d3748' }}>{sale.product_nom}</p>
                          <p style={{ fontSize: '14px', color: '#718096' }}>Par <span style={{ fontWeight: '500' }}>{sale.user_nom}</span></p>
                          <p style={{ fontSize: '12px', color: '#a0aec0', marginTop: '4px' }}>{formatDate(sale.date)}</p>
                        </div>
                      </div>
                      <p style={{ fontWeight: '700', color: '#fff', fontSize: '18px' }}>{formatPrice(sale.prix_total)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Low Stock */}
            <div className="login-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(237, 137, 54, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ed8936' }}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c' }}>Stock faible</h2>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#ed8936', background: 'rgba(237, 137, 54, 0.1)', padding: '4px 12px', borderRadius: '20px' }}>
                  {lowStockProducts.length} alertes
                </span>
              </div>

              {lowStockProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                  <div style={{ width: '64px', height: '64px', background: 'rgba(72, 187, 120, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <Package className="w-8 h-8" style={{ color: '#fff' }} />
                  </div>
                  <p style={{ color: '#2d3748', fontWeight: '600' }}>Tous les stocks sont bons ! 👍</p>
                  <p style={{ color: '#718096', fontSize: '14px', marginTop: '4px' }}>Aucun produit ne nécessite de réapprovisionnement</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {lowStockProducts.map((product) => (
                    <div key={product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'linear-gradient(to right, rgba(237, 137, 54, 0.1), rgba(245, 101, 101, 0.1))', borderRadius: '12px', border: '1px solid rgba(237, 137, 54, 0.3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #ed8936 0%, #f56565 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', boxShadow: '0 4px 12px rgba(237, 137, 54, 0.3)' }}>
                          {product.stock}
                        </div>
                        <div>
                          <p style={{ fontWeight: '600', color: '#2d3748' }}>{product.nom}</p>
                          <p style={{ fontSize: '14px', color: '#718096' }}>Prix: <span style={{ fontWeight: '500' }}>{formatPrice(product.prix)}</span></p>
                        </div>
                      </div>
                      
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;