import { SidebarItem } from "./sidebar_item.js";
import { makeElem, makeIcon } from "../../utils/utils.js"

class SideBar{
    $container;
    $btnFold;
    state = 1; // 1 = expand, 0 = colapse;
    items = [];
    
    constructor(){
        this.$container = makeElem("div", "sidebar__container");
        // this.$btnFold = makeElem("button", "sidebar__foldBtn");

        // Collapse sidebar
        const btn_container = makeElem("div", "btn__container");
        const btnFold = makeIcon("close", "sidebar__foldBtn");
        btn_container.appendChild(btnFold);

        this.$btnFold = btn_container;
        this.$container.appendChild(this.$btnFold);

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

    // handleNavClick(e){};

    render(){

        return this.$container;
    }
}


class SideBar_auth extends SideBar {
    $sidebar_feed;
    $sidebar_friend; 
    $sidebar_setting;
    $sidebar_logout;

    constructor(){
        const sidebar_feed = new SidebarItem("Feed", "forum");
        const sidebar_friend = new SidebarItem("Friend", "person");
        const sidebar_setting = new SidebarItem("Setting", "settings");
        const sidebar_logout = new SidebarItem("Logout", "logout");

        super([
            sidebar_feed,
            sidebar_friend,
            sidebar_setting,
            sidebar_logout
        ]);

        this.$sidebar_feed = sidebar_feed.render();
        this.$sidebar_friend = sidebar_friend.render();
        this.$sidebar_setting = sidebar_setting.render();
        this.$sidebar_logout = sidebar_logout.render();

        this.$sidebar_feed.addEventListener("click", (e)=>{
            this.handleNavClick("feed_screen")
            // this.$sidebar_feed.classList.add("active")
        });

        this.$sidebar_friend.addEventListener("click", (e)=>{
            this.handleNavClick("friend_screen")
        })

        this.$sidebar_setting.addEventListener("click", (e)=>{
            this.handleNavClick("setting_screen")
        })

        this.$sidebar_logout.addEventListener("click", (e)=>{
            this.handleNavClick("logout_screen")
        })
    }

    handleNavClick(screenname){
        const event = new CustomEvent("set_screen", {
            bubbles:true,
            detail:{target:screenname}
        });

        this.$container.dispatchEvent(event);
    }

    render(){
        this.$container.appendChild(this.$sidebar_feed);
        this.$container.appendChild(this.$sidebar_friend);
        this.$container.appendChild(this.$sidebar_setting);
        this.$container.appendChild(this.$sidebar_logout);

        return this.$container;
    }

}


class SideBar_noauth extends SideBar {

    $sidebar_signup;
    $sidebar_login;

    constructor(){
        const sidebar_signup = new SidebarItem("Signup", "add");
        const sidebar_login = new SidebarItem("Login", "login");
        
        super([
            sidebar_signup,
            sidebar_login,
        ]);

        this.$sidebar_signup = sidebar_signup.render();
        this.$sidebar_login = sidebar_login.render();
        
        this.$sidebar_signup.addEventListener("click", (e)=>{
            this.handleNavClick("signup_screen")
            // this.$sidebar_feed.classList.add("active")
        });

        this.$sidebar_login.addEventListener("click", (e)=>{
            this.handleNavClick("login_screen")
        })

    }

    handleNavClick(screenname){
        const event = new CustomEvent("set_screen", {
            bubbles:true,
            detail:{target:screenname}
        });

        this.$container.dispatchEvent(event);
    }

    render(){
        this.$container.appendChild(this.$sidebar_signup);
        this.$container.appendChild(this.$sidebar_login);
        // this.$container.appendChild(this.$sidebar_setting);
        // this.$container.appendChild(this.$sidebar_logout);

        return this.$container;
    }

}

export { 
    SideBar,
    SideBar_auth,
    SideBar_noauth
};