import { SidebarItem } from "./components/sidebar/sidebar_item.js"
import { Config, GOOGLE_FONT_URL } from "./config.js";
import { SideBar } from "./components/sidebar/sidebar.js";
import { Layout } from "./screen/layout.js";


// app config
// include google font
const fontLnk = document.createElement("link");
fontLnk.rel="stylesheet";
fontLnk.href = GOOGLE_FONT_URL;
document.head.insertAdjacentElement("beforeend", fontLnk);



const sidebarItem0 = new SidebarItem("Home", "home");
const sidebarItem1 = new SidebarItem("Friend", "person");
const sidebarItem2 = new SidebarItem("Setting", "settings");
const sidebarItem3 = new SidebarItem("Logout", "logout");

const items = [sidebarItem0, sidebarItem1, sidebarItem2, sidebarItem3]

const layout = new Layout(items);
document.body.appendChild(layout.render())

// // testing
// for (let i = 0; i < 100; i++)
// {
//     let div = makeElem("div", "rec");
//     document.body.appendChild(div);
// }