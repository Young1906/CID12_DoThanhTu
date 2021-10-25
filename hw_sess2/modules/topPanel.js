class TopPanel {
    html;

    constructor(){

        this.html = document.createElement("div");
        this.html.classList.add("top_panel");

        // Handle click
        this.html.addEventListener(this.HandleClick);
    }

    HandleClick = (event) => {
        console.log("This");
    }


}