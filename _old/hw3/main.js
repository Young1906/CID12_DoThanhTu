class App {
  mountPoint;
  html;

  constructor(mountPoint_id){
    this.mountPoint = document.getElementById(mountPoint_id);
    
    // Initalizing component of this class
    let div = document.createElement("div");
    div.classList.add("app");

    console.log("This");

    this.html = div;
  }


  init = () => {
    this.mountPoint.appendChild(this.html);
    console.log("App mounted!")
  }
}


const app = new App("app_container")
// start the app
app.init()
