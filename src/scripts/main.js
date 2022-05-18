import { fetchAuthors, fetchLetters, fetchRecipients, fetchTopics } from "./dataAccess.js"
import { PenPalSociety } from "./PenPalSociety.js"
/* ---------- ^^Import functions^^ ---------- */

/* ---------- query selector ---------- */
const mainContainer = document.querySelector('#container')

/* ---------- render function ---------- */
const render = () => {
    fetchAuthors().then(() => fetchRecipients())
    .then(() => fetchTopics())
    .then(() => fetchLetters())
    .then(() => mainContainer.innerHTML = PenPalSociety())
}

/* ---------- render HTML ---------- */
render()

/* ---------- event listener (state changed) ---------- */
mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

