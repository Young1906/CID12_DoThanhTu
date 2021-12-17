import { Layout } from "./layout.js";
import { SideBar_auth, SideBar_noauth } from "../components/sidebar/sidebar.js";
import { Login } from "../components/login/login.js";
import { Signup } from "../components/login/signup.js"
// import { SideBar_noauth } from "../components/sidebar/sidebar.js"


class Auth extends Layout {
    $signup;
    $login;

    constructor(){
        super(new SideBar_noauth);

        this.$login = new Login();
        this.$signup = new Signup();

        
        this.setScreen_login();

        this.$container.addEventListener("set_screen", (e)=>{
            // console.log(e.detail);
            this.setScreen(e);
        })
    }

    setScreen_login(){
        this.clear();
        
        this.$auth_container.insertAdjacentElement(
            "afterbegin",
            this.$login.render()
        )

        this.title = "Login";
    }

    setScreen_signup(){
        this.clear();

        this.$auth_container.insertAdjacentElement(
            "afterbegin",
            this.$signup.render()
        )
        document.title = "Signup"
    }

    setScreen(e){
        if (e.detail.target=="login_screen")
            this.setScreen_login();
        
        if (e.detail.target == "signup_screen")
            this.setScreen_signup();
    }
}

export {
    Auth
}