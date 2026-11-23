window.SSTPW_SUPABASE_CONFIG = {
  // Replace with your actual Supabase project URL and anon/public key.
  // Example: "https://xyzcompany.supabase.co"
  url: "https://ilbpxwrbaveizzndqgxs.supabase.co",
  // Example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  anonKey: "sb_publishable_Ifj6uHVG0zpw-vku8yDazA_YT-zXVPS"
};

window.createSstpwSupabaseClient = function () {
  const config = window.SSTPW_SUPABASE_CONFIG;
  if (!config || !config.url || !config.anonKey || !window.supabase) return null;

  const url = config.url.trim();
  const anonKey = config.anonKey.trim();

  if (!url || !anonKey || url.includes("YOUR_PROJECT_REF") || anonKey.includes("YOUR_")) return null;

  return window.supabase.createClient(url, anonKey);
};
