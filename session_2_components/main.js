import { App } from "./modules/app.js";


let root = document.createElement("div");
root.classList.add("root");

let app = new App();
root.appendChild(app.render());

document.body.appendChild(root);
document.title = "Session 3 : Components"