import { SideBar } from "../components/sidebar/sidebar.js"
import { makeElem } from "../utils/utils.js";
import { Topbar } from "../components/topbar/topbar.js";
import { NewPost } from "../components/posts/new_post.js";
import { Post } from "../components/posts/post.js"

class Layout {
    $container;
    $sidebar;
    $main_panel;
    $auth_container;
    $panel;

    // New post
    $newPost;
    $postContainer;

    constructor(sidebar){
        this.$container = makeElem("div", "app__container");
        this.$sidebar = sidebar;
        this.$main_panel = makeElem("div", "app__mainPanel");

        this.$auth_container = makeElem("div", "app__authContainer");
        this.$panel = makeElem("div", "app__panel");

        // this.$newPost = new NewPost();
        this.$postContainer = makeElem("div", "app__postContainer");
    };

    render(){
        // this.$panel.appendChild(this.$newPost.render());
        this.$panel.appendChild(this.$postContainer);

        // this.$main_panel.appendChild(this.$topbar.render());
        this.$main_panel.appendChild(this.$auth_container);
        this.$main_panel.appendChild(this.$panel);

        this.$container.appendChild(this.$sidebar.render())
        this.$container.appendChild(this.$main_panel);

        return this.$container;
    };

    clear(){
        if (this.$auth_container.childNodes.length > 0) {
            this.$auth_container.removeChild(this.$auth_container.childNodes[0])
        }
        }
};

export { Layout };