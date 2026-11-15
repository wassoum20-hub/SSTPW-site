const adminTranslations = {
    ar: {
          brand: "إدارة الموقع",
          back_to_site: "العودة إلى الموقع",
          eyebrow: "منطقة خاصة",
          title: "إدارة الصور والفيديو",
          intro: "سجّل الدخول بحساب المدير لإضافة الوسائط إلى معرض الموقع.",
          config_missing: "يلزم إعداد Supabase أولًا: أضف رابط المشروع والمفتاح العام في supabase-config.js، ثم نفّذ supabase-setup.sql واتبع خطوات إنشاء حساب المدير.",
          setup_step1: "أنشئ مشروعًا في Supabase.",
          setup_step2: "ضع Project URL والمفتاح anon/public في supabase-config.js.",
          setup_step3: "نفّذ ملف إعداد الجداول والتخزين:",
          setup_sql: "تنزيل ملف SQL",
          setup_step4: "أنشئ حساب المدير وأضف UUID الخاص به إلى جدول site_admins كما هو موضح داخل ملف SQL.",
          setup_warning: "لا تضع مفتاح service_role في ملفات الموقع ولا ترسله لأحد.",
          email: "البريد الإلكتروني",
          password: "كلمة المرور",
          sign_in: "تسجيل الدخول",
          signed_in_as: "تم تسجيل الدخول باسم",
          sign_out: "تسجيل الخروج",
          upload_title: "إضافة صور أو فيديو",
          media_label: "وصف الصورة أو الفيديو",
          choose_files: "اختر الملفات",
          upload_limit: "الصور والفيديو MP4 أو WebM، حتى 50 ميغابايت لكل ملف.",
          upload_button: "رفع إلى الموقع",
          media_title: "الوسائط المنشورة",
          refresh: "تحديث",
          signing_in: "جارٍ تسجيل الدخول...",
          loading: "جارٍ تحميل الوسائط...",
          uploading: "جارٍ رفع الملفات...",
          upload_success: "تم رفع الملفات بنجاح.",
          login_error: "تعذر تسجيل الدخول: ",
          data_error: "تعذر تحميل الوسائط: ",
          upload_error: "تعذر رفع الملف: ",
          delete_error: "تعذر حذف الملف: ",
          delete_incomplete: "حُذف الملف من التخزين، لكن تعذر حذف سجله. احفظ المسار التالي لمراجعته: ",
          admin_only: "هذا الحساب غير مصرح له بإدارة الموقع.",
          no_media: "لا توجد صور أو مقاطع فيديو منشورة.",
          file_type: "نوع ملف غير مدعوم. استخدم JPG أو PNG أو WebP أو MP4 أو WebM.",
          file_size: "حجم الملف يتجاوز الحد الأقصى وهو 50 ميغابايت.",
          label_required: "اكتب وصفًا للصورة أو الفيديو.",
          confirm_delete: "هل تريد حذف هذا الملف من الموقع؟",
          delete: "حذف",
          setup_error: "تعذر تهيئة لوحة الإدارة: "
    },
    fr: {
          brand: "Administration du site",
          back_to_site: "Retour au site",
          eyebrow: "Espace réservé",
          title: "Gestion des photos et vidéos",
          intro: "Connectez-vous avec le compte administrateur pour ajouter des médias à la galerie.",
          config_missing: "Supabase doit être configuré : ajoutez l’URL du projet et la clé publique dans supabase-config.js, exécutez supabase-setup.sql, puis suivez les étapes de création du compte administrateur.",
          setup_step1: "Créez un projet Supabase.",
          setup_step2: "Placez l’URL du projet et la clé anon/public dans supabase-config.js.",
          setup_step3: "Exécutez le fichier de configuration des tables et du stockage :",
          setup_sql: "Télécharger le fichier SQL",
          setup_step4: "Créez le compte administrateur et ajoutez son UUID à la table site_admins comme indiqué dans le fichier SQL.",
          setup_warning: "Ne placez jamais la clé service_role dans les fichiers du site et ne la partagez pas.",
          email: "Adresse e-mail",
          password: "Mot de passe",
          sign_in: "Se connecter",
          signed_in_as: "Connecté en tant que",
          sign_out: "Se déconnecter",
          upload_title: "Ajouter des photos ou vidéos",
          media_label: "Description de la photo ou vidéo",
          choose_files: "Choisir les fichiers",
          upload_limit: "Images et vidéos MP4 ou WebM, jusqu’à 50 Mo par fichier.",
          upload_button: "Publier sur le site",
          media_title: "Médias publiés",
          refresh: "Actualiser",
          signing_in: "Connexion en cours...",
          loading: "Chargement des médias...",
          uploading: "Envoi des fichiers en cours...",
          upload_success: "Les fichiers ont été publiés.",
          login_error: "Connexion impossible : ",
          data_error: "Chargement impossible : ",
          upload_error: "Envoi impossible : ",
          delete_error: "Suppression impossible : ",
          delete_incomplete: "Le fichier est supprimé du stockage, mais son enregistrement n’a pas pu être effacé. Conservez ce chemin pour vérification : ",
          admin_only: "Ce compte n’est pas autorisé à administrer le site.",
          no_media: "Aucune photo ou vidéo publiée.",
          file_type: "Type de fichier non accepté. Utilisez JPG, PNG, WebP, MP4 ou WebM.",
          file_size: "Le fichier dépasse la limite de 50 Mo.",
          label_required: "Saisissez une description pour le média.",
          confirm_delete: "Supprimer ce média du site ?",
          delete: "Supprimer",
          setup_error: "Initialisation du panneau impossible : "
    }
};

const bucketName = "sstpw-media";
const maxFileSize = 50 * 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "video/mp4", "video/webm"]);
let adminLanguage = "ar";
let supabaseClient;

const loginForm = document.getElementById("loginForm");
const uploadForm = document.getElementById("uploadForm");
const dashboard = document.getElementById("dashboard");
const adminStatus = document.getElementById("adminStatus");
const setupNotice = document.getElementById("setupNotice");
const setupGuide = document.getElementById("setupGuide");
const adminMediaList = document.getElementById("adminMediaList");

function text(key) {
    return adminTranslations[adminLanguage][key];
}

function setStatus(message, kind) {
    adminStatus.textContent = message || "";
    adminStatus.className = `admin-status${kind ? ` is-${kind}` : ""}`;
}

function setLanguage(language) {
    adminLanguage = language;
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-admin-i18n]").forEach(element => {
          const key = element.getAttribute("data-admin-i18n");
          if (adminTranslations[language][key]) element.textContent = adminTranslations[language][key];
    });
    document.getElementById("adminLangBtn").textContent = language === "ar" ? "Français" : "العربية";
    if (!setupGuide.hidden) setupNotice.textContent = text("config_missing");
    if (adminMediaList.childElementCount === 0 && !dashboard.hidden) {
          adminMediaList.textContent = text("no_media");
    }
}

function getFileExtension(file) {
    const extensions = {
          "image/jpeg": "jpg",
          "image/png": "png",
          "image/webp": "webp",
          "video/mp4": "mp4",
          "video/webm": "webm"
    };
    return extensions[file.type];
}

function createMediaCard(item) {
    const card = document.createElement("article");
    card.className = "admin-media-card";

  const urlResult = supabaseClient.storage.from(bucketName).getPublicUrl(item.storage_path);
    const media = item.media_type === "video" ? document.createElement("video") : document.createElement("img");
    if (item.media_type === "video") {
          media.controls = true;
          media.preload = "metadata";
          media.playsInline = true;
    } else {
          media.alt = item.label;
          media.loading = "lazy";
    }
    media.src = urlResult.data.publicUrl;

  const label = document.createElement("p");
    label.textContent = item.label;
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = text("delete");
    deleteButton.addEventListener("click", () => deleteMedia(item));

  card.append(media, label, deleteButton);
    return card;
}

async function loadMedia() {
    setStatus(text("loading"));
    const { data, error } = await supabaseClient
      .from("site_media")
      .select("id, storage_path, media_type, label, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;

  adminMediaList.replaceChildren();
    if (!data.length) {
          adminMediaList.textContent = text("no_media");
          setStatus("");
          return;
    }
    data.forEach(item => adminMediaList.append(createMediaCard(item)));
    setStatus("");
}

async function deleteMedia(item) {
    if (!window.confirm(text("confirm_delete"))) return;
    setStatus(text("loading"));
    try {
          const { error: storageError } = await supabaseClient.storage.from(bucketName).remove([item.storage_path]);
          if (storageError) throw storageError;

      const { error: rowError } = await supabaseClient.from("site_media").delete().eq("id", item.id);
          if (rowError) throw new Error(`${text("delete_incomplete")}${item.storage_path} (${rowError.message})`);

      await loadMedia();
          setStatus("");
    } catch (error) {
          setStatus(`${text("delete_error")}${error.message}`, "error");
    }
}

async function requireAdmin(session) {
    const { data, error } = await supabaseClient
      .from("site_admins")
      .select("user_id")
      .eq("user_id", session.user.id)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
          const { error: signOutError } = await supabaseClient.auth.signOut();
          if (signOutError) throw new Error(`${text("admin_only")} ${signOutError.message}`);
          throw new Error(text("admin_only"));
    }

  loginForm.hidden = true;
    dashboard.hidden = false;
    document.getElementById("adminEmailLabel").textContent = session.user.email || "";
    await loadMedia();
}

async function uploadFiles(event) {
    event.preventDefault();
    const formData = new FormData(uploadForm);
    const label = String(formData.get("label") || "").trim();
    const files = Array.from(formData.getAll("files")).filter(value => value instanceof File && value.size > 0);

  if (!label) {
        setStatus(text("label_required"), "error");
        return;
  }
    if (!files.length) {
          setStatus(text("file_type"), "error");
          return;
    }
    for (const file of files) {
          if (!allowedTypes.has(file.type)) {
                  setStatus(`${file.name}: ${text("file_type")}`, "error");
                  return;
          }
          if (file.size > maxFileSize) {
                  setStatus(`${file.name}: ${text("file_size")}`, "error");
                  return;
          }
    }

  const submitButton = uploadForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    setStatus(text("uploading"));
    try {
          for (const file of files) {
                  const path = `${crypto.randomUUID()}.${getFileExtension(file)}`;
                  const { error: uploadError } = await supabaseClient.storage
                    .from(bucketName)
                    .upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
                  if (uploadError) throw uploadError;

            const { error: insertError } = await supabaseClient.from("site_media").insert({
                      storage_path: path,
                      media_type: file.type.startsWith("video/") ? "video" : "image",
                      label
            });
                  if (insertError) {
                            const { error: cleanupError } = await supabaseClient.storage.from(bucketName).remove([path]);
                            const cleanupNote = cleanupError ? `; ${cleanupError.message}` : "";
                            throw new Error(`${insertError.message}${cleanupNote}`);
                  }
          }
          uploadForm.reset();
          await loadMedia();
          setStatus(text("upload_success"), "success");
    } catch (error) {
          setStatus(`${text("upload_error")}${error.message}`, "error");
    } finally {
          submitButton.disabled = false;
    }
}

async function initializeAdmin() {
    const client = typeof window.createSstpwSupabaseClient === "function"
      ? window.createSstpwSupabaseClient()
          : null;
    if (!client) {
          setupGuide.hidden = false;
          setupNotice.textContent = text("config_missing");
          return;
    }

  supabaseClient = client;
    loginForm.hidden = false;
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) throw error;
    if (data.session) await requireAdmin(data.session);
}

document.getElementById("adminLangBtn").addEventListener("click", async () => {
    setLanguage(adminLanguage === "ar" ? "fr" : "ar");
    if (supabaseClient && !dashboard.hidden) {
          try {
                  await loadMedia();
          } catch (error) {
                  setStatus(`${text("data_error")}${error.message}`, "error");
          }
    }
});

loginForm.addEventListener("submit", async event => {
    event.preventDefault();
    const submitButton = loginForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    setStatus(text("signing_in"));
    try {
          const formData = new FormData(loginForm);
          const { data, error } = await supabaseClient.auth.signInWithPassword({
                  email: formData.get("email"),
                  password: formData.get("password")
          });
          if (error) throw error;
          await requireAdmin(data.session);
          setStatus("");
    } catch (error) {
          dashboard.hidden = true;
          loginForm.hidden = false;
          setStatus(`${text("login_error")}${error.message}`, "error");
    } finally {
          submitButton.disabled = false;
    }
});

uploadForm.addEventListener("submit", uploadFiles);

document.getElementById("signOutBtn").addEventListener("click", async () => {
    try {
          const { error } = await supabaseClient.auth.signOut();
          if (error) throw error;
          dashboard.hidden = true;
          loginForm.hidden = false;
          loginForm.reset();
          adminMediaList.replaceChildren();
          setStatus("");
    } catch (error) {
          setStatus(`${text("setup_error")}${error.message}`, "error");
    }
});

document.getElementById("refreshBtn").addEventListener("click", async () => {
    try {
          await loadMedia();
    } catch (error) {
          setStatus(`${text("data_error")}${error.message}`, "error");
    }
});

setLanguage(adminLanguage);
initializeAdmin().catch(error => {
    setStatus(`${text("setup_error")}${error.message}`, "error");
});
