import { App } from "./modules/app.js"

// Mounting app to HTML
const app = new App("excel_sheet");
document.getElementById("app").appendChild(app.div);

