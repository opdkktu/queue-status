export default {
async fetch(request, env){
const url = new URL(request.url);
// Clinic GAS mapping
const CLINICS = {
  "ayer-hitam":
  "https://script.google.com/macros/s/AKfycbwNHjoocayxuLE7YfoE36R_u3M0VAvnW-qWDEF-RDXkEGZwzUjutvQeHvQHidXG_c59vQ/exec",
  "jitra":
  "https://script.google.com/macros/s/JITRA_GAS_URL_HERE/exec",
  "pokok-sena":
  "https://script.google.com/macros/s/POKOK_SENA_GAS_URL_HERE/exec"
};

// check if request is API
if(url.pathname.startsWith("/api/")){
  // get clinic name after /api/
  const clinicID =
  url.pathname.replace("/api/","");
  const gasURL =
  CLINICS[clinicID];
  // unknown clinic
  if(!gasURL){
    return new Response(
      "Clinic not found",
      {
        status:404
      }
    );
  }
  // forward to GAS
  return fetch(
    gasURL + url.search
  );
}
// normal website loading
return env.ASSETS.fetch(request);
}}
