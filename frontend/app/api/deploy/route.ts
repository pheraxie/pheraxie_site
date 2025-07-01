import { NextRequest, NextResponse } from 'next/server';

const stylePresets: Record<string, { primary: string; secondary: string; bg: string; text: string }> = {
  moderne:   { primary: '#6366f1', secondary: '#f472b6', bg: '#f9fafb', text: '#22223b' },
  classique: { primary: '#1e293b', secondary: '#e2e8f0', bg: '#f1f5f9', text: '#22223b' },
  fun:       { primary: '#f43f5e', secondary: '#fbbf24', bg: '#fff7ed', text: '#22223b' },
  pro:       { primary: '#0ea5e9', secondary: '#64748b', bg: '#f3f4f6', text: '#22223b' },
};

function cleanProjectName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-') // remplace tout sauf lettres, chiffres, . _ -
    .replace(/-+/g, '-')            // remplace plusieurs - par un seul
    .replace(/^-+|-+$/g, '')        // retire les - en début/fin
    .slice(0, 100);                 // limite à 100 caractères
}

export async function POST(req: NextRequest) {
  const { siteName, siteSlogan, selectedPages, selectedStyle, coverImage, aboutText, galleryImages, blogPosts, shopProducts, siteMode } = await req.json();
  const style = stylePresets[selectedStyle] || stylePresets.moderne;

  // Responsive CSS commun
  const responsiveCss = `
    <style>
      body { margin:0; font-family:sans-serif; }
      header, main, footer { box-sizing:border-box; }
      main { max-width:700px; margin:2rem auto; padding:2rem; background:#fff; border-radius:16px; box-shadow:0 2px 8px #0001; }
      nav { display:flex; flex-wrap:wrap; gap:1rem; justify-content:center; }
      nav a { padding:0.5rem 1rem; border-radius:8px; background:#e0e7ff; color:#3730a3; font-weight:500; font-size:1rem; text-decoration:none; }
      section { margin-bottom:2rem; }
      @media (max-width: 600px) {
        main { padding:1rem; border-radius:8px; }
        h1 { font-size:2rem !important; }
        nav a { font-size:0.95rem; padding:0.4rem 0.7rem; }
        section { margin-bottom:1.2rem; }
      }
    </style>
  `;

  // Menu HTML (pour multipage, liens vers .html)
  const menu = (selectedPages || ["home"]).map((p: string) => {
    const labels: Record<string, string> = {
      home: 'Accueil', about: 'À propos', contact: 'Contact', gallery: 'Galerie', blog: 'Blog', shop: 'Boutique'
    };
    return `<a href="${siteMode === 'multipage' ? (p === 'home' ? 'index.html' : p + '.html') : '#' + p}" style="margin:0 1rem;">${labels[p]||p}</a>`;
  }).join('');

  // Logo/image
  const logoHtml = coverImage ? `<img src="${coverImage}" alt="logo" style="width:64px;height:64px;border-radius:16px;object-fit:cover;box-shadow:0 1px 4px #0001;margin-bottom:1rem;" />` : '';

  // Génération des sections HTML (pour one page ou chaque page)
  function getSections(page: string|null = null) {
    let sections = '';
    if ((!page && (!selectedPages || selectedPages.includes('home'))) || page === 'home') {
      sections += `<section id="home"><h2>Bienvenue sur ${siteName} !</h2><p>${siteSlogan || ''}</p></section>`;
    }
    if ((!page && selectedPages && selectedPages.includes('about') && aboutText) || page === 'about') {
      sections += `<section id="about"><h2>À propos</h2><p>${aboutText}</p></section>`;
    }
    if ((!page && selectedPages && selectedPages.includes('gallery') && galleryImages && galleryImages.length > 0) || (page === 'gallery' && galleryImages && galleryImages.length > 0)) {
      sections += `<section id="gallery"><h2>Galerie</h2><div style="display:flex;gap:12px;flex-wrap:wrap;">${galleryImages.map((img: string) => `<img src='${img}' alt='galerie' style='width:100px;height:100px;object-fit:cover;border-radius:8px;box-shadow:0 1px 4px #0001' />`).join('')}</div></section>`;
    }
    if ((!page && selectedPages && selectedPages.includes('blog') && blogPosts && blogPosts.length > 0) || (page === 'blog' && blogPosts && blogPosts.length > 0)) {
      sections += `<section id="blog"><h2>Blog</h2>${blogPosts.map((post: any) => `<article style='margin-bottom:1.5rem;'><h3>${post.title}</h3><p>${post.content}</p></article>`).join('')}</section>`;
    }
    if ((!page && selectedPages && selectedPages.includes('shop') && shopProducts && shopProducts.length > 0) || (page === 'shop' && shopProducts && shopProducts.length > 0)) {
      sections += `<section id="shop"><h2>Boutique</h2><div style='display:flex;gap:16px;flex-wrap:wrap;'>${shopProducts.map((prod: any) => `<div style='background:#f9fafb;padding:12px;border-radius:8px;box-shadow:0 1px 4px #0001;min-width:120px;max-width:160px;'><div style='font-weight:600;'>${prod.name}</div><div style='color:${style.secondary};margin-bottom:4px;'>${prod.price} €</div>${prod.image ? `<img src='${prod.image}' alt='${prod.name}' style='width:64px;height:64px;object-fit:cover;border-radius:8px;margin-bottom:4px;' />` : ''}</div>`).join('')}</div></section>`;
    }
    if ((!page && selectedPages && selectedPages.includes('contact')) || page === 'contact') {
      sections += `<section id="contact"><h2>Contact</h2><form style='max-width:340px;margin:auto;display:flex;flex-direction:column;gap:8px;'><input type='text' placeholder='Nom' style='padding:8px;border-radius:6px;border:1px solid #ddd;' /><input type='email' placeholder='Email' style='padding:8px;border-radius:6px;border:1px solid #ddd;' /><textarea placeholder='Message' style='padding:8px;border-radius:6px;border:1px solid #ddd;min-height:60px;'></textarea><button type='submit' style='background:${style.primary};color:#fff;padding:10px;border:none;border-radius:6px;font-weight:600;cursor:pointer;'>Envoyer</button></form></section>`;
    }
    return sections;
  }

  // Génération des fichiers HTML
  let files: { file: string; data: string }[] = [];
  if (siteMode === 'multipage') {
    // Un fichier par page sélectionnée
    (selectedPages || ['home']).forEach((page: string) => {
      const pageFile = page === 'home' ? 'index.html' : `${page}.html`;
      files.push({
        file: pageFile,
        data: `<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>${siteName}</title>${responsiveCss}</head><body style="background:${style.bg};color:${style.text};font-family:sans-serif;margin:0;">
          <header style="padding:2rem 0;text-align:center;background:${style.primary};color:#fff;">
            ${logoHtml}
            <h1 style="margin:0;font-size:2.5rem;">${siteName}</h1>
            ${siteSlogan ? `<div style="font-size:1.2rem;margin-top:0.5rem;">${siteSlogan}</div>` : ''}
            <nav style="margin-top:1.5rem;">${menu}</nav>
          </header>
          <main>${getSections(page)}</main>
          <footer style="text-align:center;padding:1.5rem 0;color:${style.secondary};font-size:1rem;">Site généré par Pheraxie IA</footer>
        </body></html>`
      });
    });
  } else {
    // One page : tout sur index.html
    files = [
      {
        file: 'index.html',
        data: `<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>${siteName}</title>${responsiveCss}</head><body style="background:${style.bg};color:${style.text};font-family:sans-serif;margin:0;">
          <header style="padding:2rem 0;text-align:center;background:${style.primary};color:#fff;">
            ${logoHtml}
            <h1 style="margin:0;font-size:2.5rem;">${siteName}</h1>
            ${siteSlogan ? `<div style="font-size:1.2rem;margin-top:0.5rem;">${siteSlogan}</div>` : ''}
            <nav style="margin-top:1.5rem;">${menu}</nav>
          </header>
          <main>${getSections()}</main>
          <footer style="text-align:center;padding:1.5rem 0;color:${style.secondary};font-size:1rem;">Site généré par Pheraxie IA</footer>
        </body></html>`
      }
    ];
  }

  const vercelRes = await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: cleanProjectName(siteName),
      files,
      projectSettings: { framework: null },
    }),
  });

  const vercelData = await vercelRes.json();

  if (!vercelRes.ok) {
    return NextResponse.json({ error: vercelData.error?.message || JSON.stringify(vercelData) }, { status: 500 });
  }

  return NextResponse.json({ url: vercelData.url });
} 