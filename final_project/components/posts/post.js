import { makeElem } from "../../utils/utils.js";

class Post {
    $container;
    $user;
    $timestamp;
    $content;

    user;
    content;
    timestamp;
    
    //comment : implement later
    constructor(user, content, timestamp){
        this.user = user;
        this.timestamp = timestamp;
        this.content = content;

        this.$container = makeElem("div", "post__container");
        this.$user = makeElem("div", "post__user");
        this.$user.innerText = user;
        this.$content = makeElem("div", "post__content");
        this.$content.innerText = content;

        this.$timestamp = makeElem("div", "post__timestamp");
        this.$timestamp.innerText = this.timestamp.toLocaleString();
    }

    render(){
        this.$container.appendChild(this.$user);
        this.$container.appendChild(this.$timestamp);
        this.$container.appendChild(this.$content);

        return this.$container;
    }

    save(db){
        db.collection("posts").add({
            user: this.user,
            content: this.content,
            timestamp: this.timestamp
        }).then(()=>{
            console.log("Post save success.")
        }).catch((err)=>{
            console.log(err);
        })
    }


}

export { Post }