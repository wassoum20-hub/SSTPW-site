const translations = {
  fr: {
    company: "Société de Service et Travaux PB Wassim",
    nav_label: "Navigation principale",
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
    form_send: "Continuer sur WhatsApp",
    whatsapp_name: "Nom",
    whatsapp_phone: "Téléphone",
    whatsapp_project: "Projet",
    whatsapp_ready: "WhatsApp s’est ouvert avec votre demande. Vérifiez le message puis appuyez sur Envoyer.",
    whatsapp_blocked: "L’ouverture de WhatsApp a été bloquée. Ouvrez-le avec ce lien :",
    whatsapp_link: "Ouvrir WhatsApp",
    footer_slogan: "Construire aujourd'hui, pour demain",
    lang_switch: "عربي"
  },
  ar: {
    company: "شركة خدمات وأشغال PB Wassim",
    nav_label: "التنقل الرئيسي",
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
    form_send: "متابعة عبر واتساب",
    whatsapp_name: "الاسم",
    whatsapp_phone: "رقم الهاتف",
    whatsapp_project: "المشروع",
    whatsapp_ready: "تم فتح واتساب مع تفاصيل طلبك. راجع الرسالة واضغط على إرسال.",
    whatsapp_blocked: "تم حظر فتح واتساب. افتحه من هذا الرابط:",
    whatsapp_link: "فتح واتساب",
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
  document.querySelectorAll("[data-i18n-aria-label]").forEach(el => {
    const key = el.getAttribute("data-i18n-aria-label");
    if (t[key]) el.setAttribute("aria-label", t[key]);
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
  const form = e.currentTarget;
  const formData = new FormData(form);
  const t = translations[currentLang];
  const message = [
    `${t.whatsapp_name}: ${formData.get("name")}`,
    `${t.whatsapp_phone}: ${formData.get("phone")}`,
    `${t.whatsapp_project}: ${formData.get("message")}`
  ].join("\n");
  const whatsappUrl = `https://wa.me/21698975759?text=${encodeURIComponent(message)}`;
  const status = document.getElementById("formStatus");
  const whatsappWindow = window.open(whatsappUrl, "_blank");

  if (whatsappWindow) {
    whatsappWindow.opener = null;
    status.textContent = t.whatsapp_ready;
  } else {
    status.replaceChildren(document.createTextNode(`${t.whatsapp_blocked} `));
    const link = document.createElement("a");
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = t.whatsapp_link;
    status.append(link);
  }

  form.reset();
});