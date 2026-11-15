const gallerySection = document.getElementById("projects");
const galleryElement = document.getElementById("mediaGallery");
const galleryStatus = document.getElementById("galleryStatus");
const galleryMessages = {
  fr: {
    empty: "Aucune photo ou vidéo pour le moment.",
    error: "La galerie est momentanément indisponible."
  },
  ar: {
    empty: "لا توجد صور أو مقاطع فيديو حاليًا.",
    error: "المعرض غير متاح مؤقتًا."
  }
};
let galleryState = "loading";

function updateGalleryStatus() {
  const language = document.documentElement.lang === "ar" ? "ar" : "fr";
  if (galleryState === "empty" || galleryState === "error") {
    galleryStatus.textContent = galleryMessages[language][galleryState];
    galleryStatus.hidden = false;
  } else {
    galleryStatus.hidden = true;
  }
}

function createGalleryItem(item, client) {
  const figure = document.createElement("figure");
  figure.className = "media-card";
  const publicUrl = client.storage.from("sstpw-media").getPublicUrl(item.storage_path).data.publicUrl;
  const media = item.media_type === "video" ? document.createElement("video") : document.createElement("img");

  if (item.media_type === "video") {
    media.controls = true;
    media.preload = "metadata";
    media.playsInline = true;
  } else {
    media.alt = item.label;
    media.loading = "lazy";
  }
  media.src = publicUrl;

  const caption = document.createElement("figcaption");
  caption.textContent = item.label;
  figure.append(media, caption);
  return figure;
}

async function loadGallery() {
  const client = typeof window.createSstpwSupabaseClient === "function"
    ? window.createSstpwSupabaseClient()
    : null;

  gallerySection.hidden = false;
  updateGalleryStatus();

  if (!client) {
    galleryState = "empty";
    galleryElement.replaceChildren();
    updateGalleryStatus();
    return;
  }

  try {
    const { data, error } = await client
      .from("site_media")
      .select("id, storage_path, media_type, label, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;

    galleryElement.replaceChildren();
    if (!data.length) {
      galleryState = "empty";
      updateGalleryStatus();
      return;
    }

    data.forEach(item => galleryElement.append(createGalleryItem(item, client)));
    galleryState = "ready";
    updateGalleryStatus();
  } catch (error) {
    galleryState = "error";
    updateGalleryStatus();
    console.error("Unable to load the SSTPW media gallery:", error.message);
  }
}

document.addEventListener("sstpw:languagechange", updateGalleryStatus);
loadGallery();
