const translations = {
  fr: {
    company: "Société de Service et Travaux PB Wassim",
    nav_services: "Services",
    nav_projects: "Projets",
    nav_about: "À propos",
    nav_contact: "Contact",
    slogan: "Votre projet, notre savoir-faire !",
    hero_1: "Services professionnels dans le domaine du bâtiment",
    hero_2: "Qualité supérieure selon les normes les plus récentes",
    hero_3: "Équipe spécialisée avec une grande expérience",
    cta: "Demander un devis",
    services_title: "Nos services",
    s1_title: "Travaux de bâtiment et génie civil",
    s2_title: "Maçonnerie et enduits",
    s3_title: "Plomberie",
    s4_title: "Travaux publics",
    s5_title: "Piscines et aménagements",
    projects_title: "Nos projets",
    projects_text: "Notre galerie de réalisations sera bientôt ajoutée.",
    about_title: "À propos de nous",
    about_text: "SSTPW est une société de services et de travaux basée à Sfax. Nous réalisons vos projets avec une équipe spécialisée et expérimentée, dans le respect des normes les plus récentes.",
    contact_title: "Contactez-nous",
    address: "Sfax – Tunisie",
    form_name: "Votre nom",
    form_phone: "Votre téléphone",
    form_msg: "Décrivez votre projet",
    form_send: "Envoyer",
    form_ok: "Merci ! Nous vous contacterons bientôt.",
    footer_slogan: "Construire aujourd'hui, pour demain",
    lang_switch: "عربي"
  },
  ar: {
    company: "شركة خدمات وأشغال PB Wassim",
    nav_services: "خدماتنا",
    nav_projects: "مشاريعنا",
    nav_about: "من نحن",
    nav_contact: "اتصل بنا",
    slogan: "مشروعك، خبرتنا!",
    hero_1: "خدمات احترافية في مجال البناء",
    hero_2: "جودة عالية وفق أحدث المعايير",
    hero_3: "فريق متخصص ذو خبرة كبيرة",
    cta: "اطلب عرض سعر",
    services_title: "خدماتنا",
    s1_title: "أشغال البناء والهندسة المدنية",
    s2_title: "البناء والمحارة والتلبيس",
    s3_title: "السباكة",
    s4_title: "الأشغال العمومية",
    s5_title: "المسابح والتهيئة",
    projects_title: "مشاريعنا",
    projects_text: "سيتم قريبًا إضافة معرض أعمالنا.",
    about_title: "من نحن",
    about_text: "SSTPW شركة خدمات وأشغال مقرها صفاقس. ننجز مشاريعكم بفريق متخصص وذي خبرة، والتزامًا بأحدث المعايير.",
    contact_title: "تواصل معنا",
    address: "صفاقس – تونس",
    form_name: "اسمك",
    form_phone: "رقم هاتفك",
    form_msg: "صف مشروعك",
    form_send: "إرسال",
    form_ok: "شكرًا! سنتواصل معك قريبًا.",
    footer_slogan: "نبني اليوم من أجل الغد",
    lang_switch: "Français"
  }
};

let currentLang = "fr";

function setLanguage(lang) {
  const t = translations[lang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key]) el.placeholder = t[key];
  });

  const isAr = lang === "ar";
  document.documentElement.lang = lang;
  document.documentElement.dir = isAr ? "rtl" : "ltr";
  document.body.classList.toggle("rtl", isAr);
  document.getElementById("langBtn").textContent = t.lang_switch;
  currentLang = lang;
}

document.getElementById("langBtn").addEventListener("click", () => {
  setLanguage(currentLang === "fr" ? "ar" : "fr");
});

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const status = document.getElementById("formStatus");
  status.textContent = translations[currentLang].form_ok;
  e.target.reset();
});