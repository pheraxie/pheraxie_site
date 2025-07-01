"use client";
import { useState, useRef, useLayoutEffect, useCallback, useEffect } from "react";
import styles from "./page.module.css";
import PheraxieAvatar from "./PheraxieAvatar";
import PheraxieLogo from "./PheraxieLogo";
import PheraxieAssistant from "./PheraxieAssistant";
import classNames from "classnames";
import FloatingPheraxieAssistant from "./components/FloatingPheraxieAssistant";
import StepWelcome from "./components/StepWelcome";
import StepType from "./components/StepType";
import StepStyle from "./components/StepStyle";
import StepPages from "./components/StepPages";
import StepPersonnalisation from "./components/StepPersonnalisation";
import StepPreview from "./components/StepPreview";

const siteTypes = [
  { key: "vitrine", label: "Site vitrine", description: "Présentez votre activité ou entreprise simplement.", emoji: "🏢" },
  { key: "portfolio", label: "Portfolio", description: "Montrez vos réalisations, projets ou créations.", emoji: "🎨" },
  { key: "blog", label: "Blog", description: "Partagez vos idées, articles ou actualités.", emoji: "✍️" },
  { key: "boutique", label: "Boutique", description: "Vendez vos produits ou services en ligne.", emoji: "🛒" },
  { key: "cv", label: "CV en ligne", description: "Présentez votre parcours et vos compétences.", emoji: "💼" },
];

const styleChoices = [
  { key: "moderne", label: "Moderne", description: "Design épuré, couleurs vives et typographie actuelle.", colors: ["#6366f1", "#f472b6", "#facc15"] },
  { key: "classique", label: "Classique", description: "Couleurs sobres, élégance intemporelle.", colors: ["#1e293b", "#e2e8f0", "#f1f5f9"] },
  { key: "fun", label: "Fun & Coloré", description: "Ambiance joyeuse, couleurs éclatantes.", colors: ["#f43f5e", "#fbbf24", "#10b981"] },
  { key: "pro", label: "Professionnel", description: "Sérieux, rassurant, idéal pour entreprises.", colors: ["#0ea5e9", "#64748b", "#f3f4f6"] },
];

const pageChoices = [
  { key: "home", label: "Accueil", description: "Page d'accueil principale." },
  { key: "about", label: "À propos", description: "Parlez de vous ou de votre activité." },
  { key: "contact", label: "Contact", description: "Permettez aux visiteurs de vous écrire." },
  { key: "gallery", label: "Galerie", description: "Montrez vos photos ou réalisations." },
  { key: "blog", label: "Blog", description: "Publiez des articles ou des actualités." },
  { key: "shop", label: "Boutique", description: "Vendez vos produits ou services." },
];

// Compliments et émotions IA
const complimentsType = [
  { msg: "Super choix ! Ce type de site va te mettre en valeur.", emotion: "smile" as const },
  { msg: "Génial, c'est un excellent point de départ !", emotion: "smile" as const },
  { msg: "Top, ce format est parfait pour toi.", emotion: "smile" as const },
  { msg: "J'adore ce choix, tu vas impressionner tes visiteurs !", emotion: "surprise" as const },
  { msg: "Ce type de site est très tendance !", emotion: "smile" as const },
];
const complimentsStyle = {
  moderne: [
    { msg: "Le moderne, c'est la classe !", emotion: "smile" as const },
    { msg: "Un style épuré, j'adore !", emotion: "smile" as const },
  ],
  classique: [
    { msg: "Sobre et élégant, très bon goût.", emotion: "neutral" as const },
    { msg: "Le classique, c'est indémodable !", emotion: "smile" as const },
  ],
  fun: [
    { msg: "Fun et coloré, ça va être joyeux !", emotion: "smile" as const },
    { msg: "On va mettre de la bonne humeur partout !", emotion: "smile" as const },
  ],
  pro: [
    { msg: "Professionnel, c'est sérieux !", emotion: "neutral" as const },
    { msg: "Un site rassurant, parfait pour inspirer confiance.", emotion: "smile" as const },
  ],
};
const complimentsPages = [
  { msg: "Plus il y a de pages, plus tu peux t'exprimer !", emotion: "smile" as const },
  { msg: "Bonne sélection, ça va être complet !", emotion: "smile" as const },
  { msg: "Tu penses à tout, bravo !", emotion: "smile" as const },
  { msg: "On va pouvoir tout montrer !", emotion: "surprise" as const },
];
const complimentsPersonnalisation = [
  { msg: "N'hésite pas à mettre un slogan qui te ressemble !", emotion: "smile" as const },
  { msg: "Un logo ou une image, ça donne tout de suite du style !", emotion: "smile" as const },
  { msg: "C'est le moment de personnaliser à fond !", emotion: "smile" as const },
];

export default function Home() {  const [step, setStep] = useState(0);
  const [pubIndex, setPubIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedPages, setSelectedPages] = useState<string[]>(["home"]);
  const [siteName, setSiteName] = useState("");
  const [siteSlogan, setSiteSlogan] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [deploying, setDeploying] = useState(false);
  const [deployUrl, setDeployUrl] = useState<string | null>(null);
  const [deployError, setDeployError] = useState<string | null>(null);
  const [aboutText, setAboutText] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [blogPosts, setBlogPosts] = useState<{ title: string; content: string }[]>([]);
  const [shopProducts, setShopProducts] = useState<{ name: string; price: string; image: string | null }[]>([]);
  const [siteMode, setSiteMode] = useState<'onepage' | 'multipage'>('onepage');
  const navRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [iaComplimentsByStep, setIaComplimentsByStep] = useState<{ [step: number]: { msg: string, emotion: 'smile' | 'neutral' | 'surprise' } }>({});
  const [footerYear, setFooterYear] = useState<number | null>(null);

  const updateNavHeight = useCallback(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  useLayoutEffect(() => {
    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);
    return () => window.removeEventListener('resize', updateNavHeight);
  }, [updateNavHeight]);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 700);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (step === 1) setIaComplimentsByStep({});
    else if (step === 2) setIaComplimentsByStep({});
    else if (step === 3) setIaComplimentsByStep({});
    else if (step === 4) setIaComplimentsByStep({});
  }, [step]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPubIndex(prev => (prev === 0 ? 1 : 0));
    }, 10000); // 10 secondes
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setFooterYear(new Date().getFullYear());
  }, []);

  let dynamicStep = 5;
  const aboutStep = selectedPages.includes("about") ? dynamicStep++ : null;
  const galleryStep = selectedPages.includes("gallery") ? dynamicStep++ : null;
  const blogStep = selectedPages.includes("blog") ? dynamicStep++ : null;
  const shopStep = selectedPages.includes("shop") ? dynamicStep++ : null;
  const contactStep = selectedPages.includes("contact") ? dynamicStep++ : null;
  const previewStep = dynamicStep;

  const navLinks = [
    { label: 'Accueil', onClick: () => { window.location.href = '/'; } },
    { label: 'Brouillon', onClick: () => { window.location.href = '/drafts'; } },
    { label: 'Projet', onClick: () => { window.location.href = '/projet'; } },
    { label: 'Paramètres', onClick: () => { window.location.href = '/parametre'; } },
  ];

  const userLinks = [
    { label: 'Log in', onClick: () => {/* TODO: ouvrir login */} },
    { label: 'Sign up', onClick: () => {/* TODO: ouvrir signup */} },
  ];

  // Définir le nombre total d'étapes principales (hors accueil)
  const totalSteps = 5;
  // Calcul de la progression : 0% à l'accueil, puis 20%, 40%, ... 100% pour les étapes 1 à 5
  const progress = step > 0 && step <= totalSteps ? (step / totalSteps) * 100 : 0;

  return (
    <div className={classNames(styles.page, styles.bgGradient)}>
      <div
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '14px 32px',
          boxSizing: 'border-box',
          zIndex: 1000,
          background: '#eaf1fb',
          boxShadow: '0 2px 12px #b6c6e355',
          minHeight: 64,
          borderBottom: '1px solid #b6c6e3',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <PheraxieLogo size={56} />
          <span style={{ fontWeight: 700, fontSize: '1.3rem', marginLeft: 16, color: '#22223b', letterSpacing: '0.5px' }}>Pheraxie Site</span>
        </div>
        <div style={{ flex: 1 }} />
        {isMobile ? (
          <>
            <div style={{ marginLeft: 12, display: 'flex', alignItems: 'center' }}>
              <button aria-label="Compte utilisateur" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} onClick={userLinks[0].onClick}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="14" cy="10" r="5.5" stroke="#6366f1" strokeWidth="2" />
                  <ellipse cx="14" cy="20.5" rx="8.5" ry="4.5" stroke="#6366f1" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <div style={{ flex: 1 }} />
            <button
              aria-label="Ouvrir le menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
              onClick={() => setIsMobileMenuOpen(v => !v)}
            >
              <svg width="32" height="32" viewBox="0 0 32 32"><rect y="6" width="32" height="4" rx="2" fill="#6366f1"/><rect y="14" width="32" height="4" rx="2" fill="#6366f1"/><rect y="22" width="32" height="4" rx="2" fill="#6366f1"/></svg>
            </button>
            {isMobileMenuOpen && (
              <div style={{ position: 'absolute', top: '100%', right: 16, background: '#fff', boxShadow: '0 2px 12px #b6c6e355', borderRadius: 12, minWidth: 140, padding: 8, zIndex: 2000 }}>
                {navLinks.map(link => (
                  <button
                    key={link.label}
                    style={{ display: 'block', width: '100%', background: 'none', border: 'none', padding: '0.7rem 1rem', textAlign: 'left', fontWeight: 600, color: '#2563eb', borderRadius: 8, cursor: 'pointer' }}
                    onClick={() => { link.onClick(); setIsMobileMenuOpen(false); }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div style={{ display: 'flex', gap: 12, marginLeft: 0, justifyContent: 'flex-end', flex: 1, alignItems: 'center' }}>
            {navLinks.map(link => (
              <button
                key={link.label}
                style={{ background: '#e0e7ff', color: '#3730a3', fontWeight: 600, border: 'none', borderRadius: 8, padding: '0.6rem 1.2rem', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s' }}
                onClick={link.onClick}
              >
                {link.label}
              </button>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 24 }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="10" r="5.5" stroke="#6366f1" strokeWidth="2" />
                <ellipse cx="14" cy="20.5" rx="8.5" ry="4.5" stroke="#6366f1" strokeWidth="2" />
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <button
                  style={{ background: 'none', color: '#6366f1', fontWeight: 600, border: 'none', borderRadius: 8, padding: '0.6rem 1.1rem', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s', lineHeight: 1.1, whiteSpace: 'nowrap' }}
                  onClick={userLinks[0].onClick}
                >
                  Log in
                </button>
                <button
                  style={{ background: 'none', color: '#6366f1', fontWeight: 600, border: 'none', borderRadius: 8, padding: '0.6rem 1.1rem', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s', lineHeight: 1.1, whiteSpace: 'nowrap' }}
                  onClick={userLinks[1].onClick}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Barre de progression dans le contenu, juste avant les étapes, visible uniquement si step > 0 */}
      {step > 0 && (
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
      )}
      <main className={styles.main} style={{ paddingTop: navHeight }}>
        {/* Étape 0 : Accueil */}
        {step === 0 && (
          <StepWelcome onStart={() => setStep(1)} pubIndex={pubIndex} />
        )}
        {/* IA flottante visible sur l'accueil, en bas à droite */}
        <FloatingPheraxieAssistant step={step} />
        {/* Étape 1 : Choix du type de site */}
        {step === 1 && (
          <StepType
            siteTypes={siteTypes}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
            complimentsType={complimentsType}
            setIaComplimentsByStep={setIaComplimentsByStep}
          />
        )}
        {/* Étape 2 : Choix du style visuel */}
        {step === 2 && (
          <StepStyle
            styleChoices={styleChoices}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            complimentsStyle={complimentsStyle}
            setIaComplimentsByStep={setIaComplimentsByStep}
          />
        )}
        {/* Étape 3 : Choix des pages */}
        {step === 3 && (
          <StepPages
            pageChoices={pageChoices}
            selectedPages={selectedPages}
            setSelectedPages={setSelectedPages}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
            complimentsPages={complimentsPages}
            setIaComplimentsByStep={setIaComplimentsByStep}
          />
        )}
        {/* Étape 4 : Personnalisation rapide */}
        {step === 4 && (
          <StepPersonnalisation
            siteName={siteName}
            setSiteName={setSiteName}
            siteSlogan={siteSlogan}
            setSiteSlogan={setSiteSlogan}
            coverImage={coverImage}
            setCoverImage={setCoverImage}
            onNext={() => setStep(5)}
            onBack={() => setStep(3)}
            complimentsPersonnalisation={complimentsPersonnalisation}
            setIaComplimentsByStep={setIaComplimentsByStep}
          />
        )}
        {/* Étape 5 : Aperçu du site */}
        {step === 5 && (
          <div className={styles.fadeIn} style={{ background: '#f9f9f9', borderRadius: '16px', padding: '2rem', maxWidth: '700px', margin: '0 auto', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
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
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
              <button
                className={styles.primary}
                style={{ padding: '0.8rem 2rem', fontSize: '1.05rem', borderRadius: '8px', cursor: 'pointer' }}
                onClick={() => setStep(previewStep - 1)}
              >
                Modifier
              </button>
              <button
                className={styles.secondary}
                style={{ padding: '0.8rem 2rem', fontSize: '1.05rem', borderRadius: '8px', cursor: 'pointer' }}
                onClick={() => {
                  const drafts = JSON.parse(localStorage.getItem('pheraxie_drafts') || '[]');
                  drafts.push({
                    siteName,
                    siteSlogan,
                    selectedPages,
                    selectedStyle,
                    coverImage,
                    aboutText,
                    galleryImages,
                    blogPosts,
                    shopProducts,
                    siteMode,
                    date: new Date().toISOString(),
                  });
                  localStorage.setItem('pheraxie_drafts', JSON.stringify(drafts));
                  alert('Brouillon enregistré !');
                }}
              >
                Garder comme brouillon
              </button>
              {deployUrl ? (
                <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                  <p style={{ fontWeight: 500, color: '#16a34a' }}>Ton site est en ligne !</p>
                  <a href={`https://${deployUrl}`} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 600 }}>
                    Voir mon site sur Vercel
                  </a>
                </div>
              ) : (
                <>
                  {deployError && (
                    <div style={{ color: 'red', marginBottom: 12 }}>
                      Erreur : {deployError}
                    </div>
                  )}
                  <button
                    className={styles.primary}
                    style={{ padding: '0.8rem 2rem', fontSize: '1.05rem', borderRadius: '8px', cursor: 'pointer', width: '100%' }}
                    onClick={async () => {
                      setDeploying(true);
                      setDeployUrl(null);
                      setDeployError(null);
                      try {
                        const res = await fetch('/api/deploy', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            siteName,
                            siteSlogan,
                            selectedPages,
                            selectedStyle,
                            coverImage,
                            aboutText,
                            galleryImages,
                            blogPosts,
                            shopProducts,
                            siteMode,
                          }),
                        });
                        const data = await res.json();
                        if (data.url) {
                          setDeployUrl(data.url);
                          // Sauvegarder le projet dans localStorage
                          const projects = JSON.parse(localStorage.getItem('pheraxie_projects') || '[]');
                          projects.push({
                            siteName,
                            siteSlogan,
                            selectedPages,
                            selectedStyle,
                            coverImage,
                            aboutText,
                            galleryImages,
                            blogPosts,
                            shopProducts,
                            siteMode,
                            url: data.url,
                            date: new Date().toISOString(),
                          });
                          localStorage.setItem('pheraxie_projects', JSON.stringify(projects));
                        } else {
                          setDeployError(data.error || JSON.stringify(data));
                        }
                      } catch (e: any) {
                        setDeployError(e.message || 'Erreur lors du déploiement.');
                      } finally {
                        setDeploying(false);
                      }
                    }}
                    disabled={deploying}
                  >
                    {deploying ? 'Déploiement en cours...' : 'Valider et créer mon site'}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </main>
      <footer style={{
        width: '100%',
        background: '#eaf1fb',
        borderTop: '1px solid #b6c6e3',
        padding: '1.2rem 0',
        textAlign: 'center',
        color: '#3730a3',
        fontSize: '1.05rem',
        marginTop: 32,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8
      }}>
        <div className={styles.footer}>
          <a href="https://web.facebook.com/profile.php?id=61577956103546" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H6v4h4v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            <span className={styles.socialText}>Facebook</span>
          </a>
          <a href="https://www.instagram.com/pheraxie/" target="_blank" rel="noopener noreferrer" style={{ color: '#e1306c', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
            <span className={styles.socialText}>Instagram</span>
          </a>
          <a href="mailto:pheraxieapp@gmail.com" style={{ color: '#6366f1', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
            <span className={styles.socialText}>pheraxieapp@gmail.com</span>
          </a>
        </div>
        <div style={{ color: '#aaa', fontSize: 13, marginTop: 4 }}>© {footerYear ?? ''} Pheraxie. Tous droits réservés.</div>
      </footer>
    </div>
  );
}