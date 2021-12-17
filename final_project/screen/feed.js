import { Layout } from "./layout.js";
import { Post } from "../components/posts/post.js";
import { NewPost } from "../components/posts/new_post.js"
import { SidebarItem } from "../components/sidebar/sidebar_item.js"
import { SideBar_auth, SideBar_noauth } from "../components/sidebar/sidebar.js"

class Feed extends Layout {
    $newPost;
    user;
    posts = [];
    
    // First run check last 1 hours;
    lastUpdate = (new Date())/1000 - 3600;
    db = firebase.firestore();

    
    constructor( user ) {
        super(new SideBar_auth());
        
        this.$newPost = new NewPost(user);
        this.$panel.insertAdjacentElement("afterbegin", this.$newPost.render());

        this.$container.addEventListener("add_post", (e)=>{
            this.addPost(e)
        })

        this.$container.addEventListener("set_screen", (e)=>{
            console.log(e.detail);
        })

        this.user = user;
        document.title = "Feed"

        // setInterval(()=>{
        //     this.fetchPost()
        // }, 1000);
        
        this.fetchPost()

        setInterval(()=>{
            this.fetchPost();
        }, 60000)

        // console.log(this.lastUpdate - this.lookback)
    }

    sampleFeed(){
        // this.$postContainer
        let post = new Post("Ricatto", "This is weird shit!!");
        this.$postContainer.insertAdjacentElement(
            "afterbegin",
            post.render()
        );
    }

    fetchPost(){
        console.log("Fetching post ...");
        this.db.collection("posts")
            // .where("timestamp", ">=", this.lastUpdate)
            .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(doc.data());
                console.log(doc.id)
                if (this.posts.indexOf(doc.id)){
                    
                    let post_data = doc.data()
                    let timestamp = new Date(null);
                    timestamp.setSeconds(post_data.timestamp.seconds)

                    // console.log(po)

                    let post = new Post(
                        post_data.user,
                        post_data.content, 
                        timestamp);

                    this.$postContainer.insertAdjacentElement(
                        "afterbegin",
                        post.render());

                    this.posts.push(doc.id);
                }
                
            }).then(()=>{
                // this.lastUpdate = new Date();
                // this.lookback = 1000;
                
            }).catch((err)=>{
                console.log((err));
            });
        });
    }

    addPost(e) {
        let post = new Post(this.user, e.detail.content, new Date());
        this.$postContainer.insertAdjacentElement(
            "afterbegin",
            post.render()
        )
        post.save(this.db);

    }

}

export { Feed }