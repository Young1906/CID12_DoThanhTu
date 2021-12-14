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

        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                // console.log(user);
                this.$feed = new Feed(user);
                this.set_screen(this.$feed);
            } else {
                "Logout"
            }
        })
    };

    render(){
        // app first screen is login
        this.$screen.appendChild(this.$login_screen.render());
        this.$container.appendChild(this.$screen);

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
    };

    set_screen(screen){
        this.clearScreen();
        this.$screen.appendChild(screen.render());
    }

    signOut(){

        firebase.auth().signOut()
            .then(()=>{
                this.user = null;        
                this.set_screen(this.$login_screen);
            })
        }
}

export { App }