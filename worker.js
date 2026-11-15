// Clinic -> Google Apps Script web-app URL.
// Empty string = clinic is listed in the app but its GAS is not deployed yet.
const CLINICS = {
  "ayer-hitam": "https://script.google.com/macros/s/AKfycbwNHjoocayxuLE7YfoE36R_u3M0VAvnW-qWDEF-RDXkEGZwzUjutvQeHvQHidXG_c59vQ/exec",
  "mahang":     "https://script.google.com/macros/s/AKfycbzmyiAkN3dkHkgfU38uBRFbVH9qbnkCQ_oEteqF5wmvZViR1ixTpmXsbD3PneEJCNgY/exec",
  "kodiang":    "",
  "jitra":      "",
  "karangan":   "",
  "kangar":     ""
};

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return json({ status: "error", message: "Method not allowed" }, 405);
      }

      const clinicID = decodeURIComponent(url.pathname.slice(5))
        .replace(/\/+$/, "")
        .toLowerCase();
      const gasURL = CLINICS[clinicID];

      if (gasURL === undefined) {
        return json({ status: "error", message: "Klinik tidak dijumpai" }, 404);
      }
      if (!gasURL) {
        return json({ status: "error", message: "Klinik ini belum diaktifkan" }, 503);
      }

      try {
        const upstream = await fetch(gasURL + url.search, { redirect: "follow" });
        return new Response(await upstream.text(), {
          status: upstream.status,
          headers: {
            "content-type":
              upstream.headers.get("content-type") || "application/json; charset=utf-8",
            "cache-control": "no-store"
          }
        });
      } catch (e) {
        return json({ status: "error", message: "Pelayan klinik tidak dapat dihubungi" }, 502);
      }
    }

    // Static site (index.html, manifest, icons, OneSignal worker, tutorial media)
    return env.ASSETS.fetch(request);
  }
};
