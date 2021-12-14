import { Login } from "./login.js";
import { Signup } from "./signup.js";
import { Feed } from "./feed.js"


class App {
    $container;
    // $navbar;
    $screen;
    $login_screen;
    $signup_screen;
    $feed;

    user;
    // is_login;

    // $signoutBtn

    constructor(){
        this.$container = document.createElement("div");
        this.$container.classList.add("app__container");
        
        this.$screen = document.createElement("div");
        this.$login_screen = new Login();
        this.$signup_screen = new Signup();
        // this.$feed = new Feed(user);


        // listenning event from child;
        this.$screen.addEventListener("set_screen", (e)=> {
            this.handle_set_screen(e);
        })

        this.$screen.addEventListener("signout", (e)=>{
            this.signOut();
        })
        
        // this.$signoutBtn = document.createElement("button");
        // this.$signoutBtn.innerText = "SignOut";
    }

    

    render(){
        // app first screen is login
        this.$screen.appendChild(this.$login_screen.render());
        // this.$screen.appendChild(this.$feed.render());
        // document.title = "Login";
        this.$container.appendChild(this.$screen);
        // this.$container.appendChild(this.$signoutBtn);

        return this.$container;
    }

    clearScreen(){
        this.$screen.removeChild(this.$screen.childNodes[0]);
    }

    handle_set_screen(e){
        // console.log(e);
        if (e.detail.target == "signup-screen"){
            this.clearScreen();
            this.$screen.appendChild(this.$signup_screen.render());
            document.title = "Sign Up"
        };

        if (e.detail.target == "login-screen"){
            this.clearScreen();
            this.$screen.appendChild(this.$login_screen.render());
            document.title = "Login"
        }

        if (e.detail.target == "feed-screen") {
            this.clearScreen();
            this.user = e.detail.user;

            this.$feed = new Feed(this.user);
            this.$screen.appendChild(this.$feed.render());
            document.title = "Feed";
        }
            
    };

    signOut(){
        this.user = null;
        this.clearScreen();
        this.$screen.appendChild(this.$login_screen.render());
    }


    

}

export { App }