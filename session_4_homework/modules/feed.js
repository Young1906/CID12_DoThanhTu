import { Post, NewPost } from "./post.js"

class Feed  {
    $container;
    $new_post;
    $posts;
    $signoutBtn;

    // this_user;

    posts = [];

    constructor(user){
        this.this_user = user;

        this.$container = document.createElement("div");
        this.$container.classList.add("feed");
        this.$new_post = new NewPost(user);

        this.$posts = document.createElement("div");
        this.$posts.classList.add("feed__post_container");

        this.$container.addEventListener("new_post", (e) => {
            this.add_post(e.detail.content);
            console.log(e)
        })

        this.$signoutBtn  = document.createElement("button");
        this.$signoutBtn.innerText = "Sign Out";
        
        this.$signoutBtn.addEventListener("click", (e)=>{
            this.handleSignOut();
        });
    };

    render(){
        let signoutContainer = document.createElement("div");
        signoutContainer.appendChild(this.$signoutBtn);
        this.$container.appendChild(signoutContainer);
    
        this.$container.appendChild(this.$new_post.render());
        this.$container.appendChild(this.$posts);
        
        return this.$container;
    }

    add_post(content){
        this.posts.push(content);
        let uname = this.this_user.email;
        let new_post = new Post(uname, content);

        this.$posts.insertAdjacentElement("afterbegin", new_post.render());
    }

    handleSignOut(){
        let e = new CustomEvent("signout", {bubbles:true})
        this.$container.dispatchEvent(e);
    }

}

export { Feed }