import { App } from "./modules/app.js"
import { Feed } from "./modules/feed.js"
let app = new App();
document.body.appendChild(app.render());