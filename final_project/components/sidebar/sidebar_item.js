import { makeElem, makeIcon } from "../../utils/utils.js";
import { Config } from "../../config.js";

class SidebarItem {
    $container;
    $text;
    $icon;

    handle;

    constructor(text, icon) {
        this.$container = makeElem("div", "sidebarItem__container");
        this.$text = makeElem("span", "sidebarItem__text");
        this.$text.innerText = text;
        this.$icon = makeIcon(icon, "sidebarItem__icon");

    }

    render(){
        this.$container.appendChild(this.$icon);
        this.$container.appendChild(this.$text);
        return this.$container;
    }
}

export { SidebarItem }