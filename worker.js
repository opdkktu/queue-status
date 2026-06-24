export async function onRequest(context) {


const url = new URL(context.request.url);


const gasURL =
"https://script.google.com/macros/s/AKfycbwNHjoocayxuLE7YfoE36R_u3M0VAvnW-qWDEF-RDXkEGZwzUjutvQeHvQHidXG_c59vQ/exec";


return fetch(
gasURL + url.search
);


}
