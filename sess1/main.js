import { App } from "./modules/app.js"

const root = document.createElement("div");
root.classList.add("root")

let app = new App();
root.appendChild(app.container);

document.body.append(root);