import React from "react";

interface StepPreviewProps {
  siteName: string;
  siteSlogan: string;
  coverImage: string | null;
  selectedStyle: string | null;
  selectedPages: string[];
  pageChoices: { key: string; label: string; description: string }[];
  aboutText: string;
  galleryImages: string[];
  blogPosts: { title: string; content: string }[];
  shopProducts: { name: string; price: string; image: string | null }[];
}

const StepPreview: React.FC<StepPreviewProps> = ({ siteName, siteSlogan, coverImage, selectedStyle, selectedPages, pageChoices, aboutText, galleryImages, blogPosts, shopProducts }) => (
  <div style={{ background: '#f9f9f9', borderRadius: '16px', padding: '2rem', maxWidth: '700px', margin: '0 auto', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
    <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Aperçu de ton site</h2>
    <div style={{ border: '1.5px solid #ddd', borderRadius: 12, background: '#fff', padding: '0', marginBottom: '1.5rem', boxShadow: '0 2px 8px #0001', minHeight: 220, overflow: 'hidden' }}>
      <div style={{ background: selectedStyle === 'moderne' ? '#6366f1' : selectedStyle === 'classique' ? '#1e293b' : selectedStyle === 'fun' ? '#f43f5e' : '#0ea5e9', color: '#fff', textAlign: 'center', padding: '2rem 0' }}>
        {coverImage && (
          <img src={coverImage} alt="logo" style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover', boxShadow: '0 1px 4px #0001', marginBottom: 8 }} />
        )}
        <h1 style={{ margin: 0, fontSize: '2.2rem' }}>{siteName || 'Nom du site'}</h1>
        {siteSlogan && <div style={{ fontSize: '1.05rem', color: '#e0e7ff', marginTop: 2 }}>{siteSlogan}</div>}
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '1.2rem' }}>
          {selectedPages.map((pageKey) => {
            const page = pageChoices.find(p => p.key === pageKey);
            return (
              <span key={pageKey} style={{
                padding: '0.5rem 1rem',
                borderRadius: 8,
                background: '#e0e7ff',
                color: '#3730a3',
                fontWeight: 500,
                fontSize: '1rem',
              }}>{page?.label}</span>
            );
          })}
        </nav>
      </div>
      <div style={{ padding: '1.5rem', background: '#fff' }}>
        {/* Sections dynamiques */}
        {(!selectedPages || selectedPages.includes('home')) && (
          <section id="home" style={{ marginBottom: 24 }}>
            <h2>Bienvenue sur {siteName} !</h2>
            <p>{siteSlogan}</p>
          </section>
        )}
        {selectedPages.includes('about') && aboutText && (
          <section id="about" style={{ marginBottom: 24 }}>
            <h2>À propos</h2>
            <p>{aboutText}</p>
          </section>
        )}
        {selectedPages.includes('gallery') && galleryImages.length > 0 && (
          <section id="gallery" style={{ marginBottom: 24 }}>
            <h2>Galerie</h2>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {galleryImages.map((img, i) => (
                <img key={i} src={img} alt="galerie" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8, boxShadow: '0 1px 4px #0001' }} />
              ))}
            </div>
          </section>
        )}
        {selectedPages.includes('blog') && blogPosts.length > 0 && (
          <section id="blog" style={{ marginBottom: 24 }}>
            <h2>Blog</h2>
            {blogPosts.map((post, i) => (
              <article key={i} style={{ marginBottom: 18 }}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </article>
            ))}
          </section>
        )}
        {selectedPages.includes('shop') && shopProducts.length > 0 && (
          <section id="shop" style={{ marginBottom: 24 }}>
            <h2>Boutique</h2>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {shopProducts.map((prod, i) => (
                <div key={i} style={{ background: '#f9fafb', padding: 12, borderRadius: 8, boxShadow: '0 1px 4px #0001', minWidth: 120, maxWidth: 160 }}>
                  <div style={{ fontWeight: 600 }}>{prod.name}</div>
                  <div style={{ color: '#f472b6', marginBottom: 4 }}>{prod.price} €</div>
                  {prod.image && <img src={prod.image} alt={prod.name} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8, marginBottom: 4 }} />}
                </div>
              ))}
            </div>
          </section>
        )}
        {selectedPages.includes('contact') && (
          <section id="contact" style={{ marginBottom: 24 }}>
            <h2>Contact</h2>
            <form style={{ maxWidth: 340, margin: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input type="text" placeholder="Nom" style={{ padding: 8, borderRadius: 6, border: '1px solid #ddd' }} />
              <input type="email" placeholder="Email" style={{ padding: 8, borderRadius: 6, border: '1px solid #ddd' }} />
              <textarea placeholder="Message" style={{ padding: 8, borderRadius: 6, border: '1px solid #ddd', minHeight: 60 }} />
              <button type="submit" style={{ background: selectedStyle === 'moderne' ? '#6366f1' : selectedStyle === 'classique' ? '#1e293b' : selectedStyle === 'fun' ? '#f43f5e' : '#0ea5e9', color: '#fff', padding: 10, border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}>Envoyer</button>
            </form>
          </section>
        )}
      </div>
      <footer style={{ textAlign: 'center', padding: '1.5rem 0', color: '#f472b6', fontSize: '1rem', background: '#fff' }}>Site généré par Pheraxie IA</footer>
    </div>
  </div>
);

export default StepPreview; 