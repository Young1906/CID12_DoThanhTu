import { SideBar } from "../components/sidebar/sidebar.js"
import { makeElem } from "../utils/utils.js";
// import { SidebarItem } from "../components/sidebar/sidebar_item";

class Layout {
    $container;
    $sidebar;
    $main_panel;
    $topbar;
    $panel;
    

    constructor(sidebar_items=[]){
        this.$container = makeElem("div", "app__container");
        this.$sidebar = new SideBar(sidebar_items);
        this.$main_panel = makeElem("div", "app__mainPanel");
        this.$topbar = makeElem("div", "app__topbar");
        this.$panel = makeElem("div", "app__panel");
    };

    render(){
        this.$main_panel.appendChild(this.$topbar);
        this.$main_panel.appendChild(this.$panel);

        this.$container.appendChild(this.$sidebar.render())
        this.$container.appendChild(this.$main_panel);

        return this.$container;
    };
};

export { Layout };