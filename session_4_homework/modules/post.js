import { InputGroup } from "./input_group.js"

class Post {
    $container;
    $uname;
    $content;
    
    // implement later
    $commentBtn;

    constructor(uname, text){
        this.$container = document.createElement("div");
        this.$container.classList.add("feed__post");

        this.$uname = document.createElement("div");
        this.$uname.classList.add("post__uname");
        this.$uname.innerText = uname;
        
        this.$content = document.createElement("div");
        this.$content.innerText = text;
        this.$content.classList.add("post__content");
    }

    render(){
        this.$container.appendChild(this.$uname);
        this.$container.appendChild(this.$content);
        return this.$container;
    }

}

class NewPost{
    $container;
    $input_container;
    $input;
    $postBtn;

    constructor(user){
        this.$container = document.createElement("div");
        this.$container.classList.add("newPost__container");

        this.$input_container = document.createElement("div");
        this.$input_container.classList.add("newPost_input");
        this.$input = new InputGroup(`Post as (${user.email})`, "textarea", "new_post");

        this.$postBtn = document.createElement("button");
        this.$postBtn.innerText = "Post"
        // this.$postBtn.classList.add()

        this.$postBtn.addEventListener("click", ()=>{
            this.newPost()
        })
    }

    render(){
        this.$input_container.appendChild(this.$input.render())
        this.$container.appendChild(this.$input_container);
        this.$container.appendChild(this.$postBtn);

        return this.$container
    }

    newPost(){
        let content = this.$input.getInputValue();
        console.log(content);
        let e = new CustomEvent("new_post", {
            bubbles:true,
            detail:{
                content: content
            }
        });
        console.log(e);
        this.$container.dispatchEvent(e);
        this.$input.setInputValue("");
    }
}

export {Post, NewPost}