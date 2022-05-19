import { Form } from "./Form.js"
import { Letters } from "./Letters.js"
/* ----- ^^import functions^^ ----- */

/* ----- collect HTML from modules ----- */
export const PenPalSociety = () => {
    return `
        <div>
        <h1 class="header">Pen Pal Society</h1>
        ${Form()}
        ${Letters()}
        </div>`    
}