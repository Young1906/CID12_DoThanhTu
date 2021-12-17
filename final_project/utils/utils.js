import { Config } from "../../config.js";

const makeElem = (el, classname) => {
    let e = document.createElement(el);
    e.classList.add(classname);

    return e;
}

const makeIcon = (icon, classname) => {
    let i = document.createElement("span");
    i.innerText = icon;

    // Google Icon : to import from setting;
    i.classList.add(Config.icons.style);
    
    if (classname)
        i.classList.add(classname);

    return i;
}

export {
    makeElem, makeIcon
}