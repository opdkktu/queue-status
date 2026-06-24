export default {

async fetch(request, env){

const url = new URL(request.url);


// Hide GAS URL here
if(url.pathname === "/api/ayer-hitam"){


const GAS_URL =
"https://script.google.com/macros/s/AKfycbwNHjoocayxuLE7YfoE36R_u3M0VAvnW-qWDEF-RDXkEGZwzUjutvQeHvQHidXG_c59vQ/exec";


return fetch(
GAS_URL + url.search
);


}


// everything else = your website
return env.ASSETS.fetch(request);


}

}
