import { makeElem } from "../utils/utils.js";
import { Auth } from "./account.js";
import { Feed } from "./feed.js"



class App {
    $container;
    $auth;
    $feed;

    constructor(){
        this.$container = makeElem("div", "__container");

        this.$auth = new Auth();
        
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                // console.log(user);
                this.$feed = new Feed(user.email);

                this.setScreen(this.$feed);
            } else {
                this.setScreen(this.$auth);
            }
        });


        // capture logout;
        this.$container.addEventListener("set_screen", (e)=>{
            if (e.detail.target === "logout_screen"){
                firebase.auth().signOut();
            }   
        })
    }

    clear(){
        if (this.$container.childNodes.length > 0)
            this.$container.removeChild(this.$container.childNodes[0])
    }

    setScreen(screen){
        this.clear();
        this.$container.appendChild(screen.render())

    }

    render(){
        return this.$container;
    };

}

export { App }