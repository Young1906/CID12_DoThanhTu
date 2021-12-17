import { SidebarItem } from "./sidebar_item.js";
import { makeElem, makeIcon } from "../../utils/utils.js"

class SideBar{
    $container;
    $btnFold;
    state = 1; // 1 = expand, 0 = colapse;
    items = [];
    
    constructor(sidebar_items=[]){
        this.$container = makeElem("div", "sidebar__container");
        // this.$btnFold = makeElem("button", "sidebar__foldBtn");

        // Collapse sidebar
        // this.$btnFold = new SidebarItem("", "close").render();
        const btn_container = makeElem("div", "btn__container");
        const btnFold = makeIcon("close", "sidebar__foldBtn");
        btn_container.appendChild(btnFold);

        this.$btnFold = btn_container;
        this.$container.appendChild(this.$btnFold);


        // Sidebar Item
        for (let item of sidebar_items) {
            this.$container.appendChild(item.render());
            this.items.push(item);
        }

        // Action on foldBtn;
        this.$btnFold.addEventListener("click", (e)=>{
            this.handleClick(e);
        })
    }

    handleClick(){
        // get the button
        const btn = this.$container.querySelector(".sidebar__foldBtn");

        if (this.state == 1) {
            this.$container.classList.add("sidebar__collapsed");
            btn.innerText="menu";
        }
        else {
            this.$container.classList.remove("sidebar__collapsed")
            btn.innerText="close";
        } 
            
        
        this.state = 1 - this.state;
    }

    render(){
        return this.$container;
    }
}

export { 
    SideBar
};