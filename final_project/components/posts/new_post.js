import { makeElem } from "../../utils/utils.js"

class NewPost {
    $container;
    $input;
    // $user;
    $postBtn;

    constructor(user){
        this.$container = makeElem("div", "newpost__container");
        // this.$user = makeElem("div", "newpost__user");
        // this.$user.innerText = user;

        this.$input = makeElem("textarea", "newpost__input");
        this.$input.rows = 3;
        this.$input.name = "newpost__content";

        this.$postBtn = makeElem("button", "newpost__postBtn");
        this.$postBtn.innerText = "Post";

        this.$postBtn.addEventListener("click", (e)=>{
            this.handlePostBtn();
        });
    }

    render() {
        // this.$container.appendChild(this.$user);
        this.$container.appendChild(this.$input);
        this.$container.appendChild(this.$postBtn);

        return this.$container
    };

    handlePostBtn(){
        const content = this.$input.value;

        if (content) {
            const newPost = new CustomEvent("add_post" ,{
                bubbles:true,
                detail: {
                    content: content
                }
            });
    
            this.$container.dispatchEvent(newPost);
            
            // Clear Input
            this.$input.value = "";
        }
        

    }
}

export { NewPost }