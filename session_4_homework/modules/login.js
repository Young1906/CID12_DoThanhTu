import { InputGroup } from "./input_group.js";
// import { firebase } from "./firebase.js"
class Login {
    $container;
    $form_label;
    $form;
    
    $emailInputGroup;
    $passwordInputGroup;
    
    $feedbackMsg;
    $btnLogin;

    $lnkSignup;

    
    constructor()
    {
        this.$container = document.createElement("div");
        this.$container.classList.add("form-group");
        
        this.$form_label = document.createElement("div");
        this.$form_label.classList.add("form-label");
        this.$form_label.innerText = "Login";

        this.$form = document.createElement("form");

        // Input
        this.$emailInputGroup = new InputGroup("Email", "text", "email");
        this.$passwordInputGroup = new InputGroup("Password", "password","password");
        
        // Feedback Msg
        this.$feedbackMsg = document.createElement("div");
        this.$feedbackMsg.classList.add("form__feedbackMsg");

        // Submit btn
        this.$btnLogin = document.createElement("button");
        this.$btnLogin.innerText = "Login";
        this.$btnLogin.disabled = true;

        this.$form.addEventListener("submit", (event) =>{
            this.handleSubmit(event);
        });

        this.$form.addEventListener("focusout", (event) => {
            this.handleValidation(event);
        });

        // move to signup;
        this.$lnkSignup = document.createElement("span");
        this.$lnkSignup.classList.add("form__lnkSignup")
        this.$lnkSignup.innerText = "Didn't have an account, sign-up here!"

        this.$lnkSignup.addEventListener("click", (e)=>{
            this.moveToSignup(e);
        })
    }

    render()
    {
        this.$form.appendChild(this.$emailInputGroup.render());
        this.$form.appendChild(this.$passwordInputGroup.render());

        this.$form.appendChild(this.$btnLogin)
        this.$container.appendChild(this.$form_label);
        

        this.$container.appendChild(this.$feedbackMsg);
        this.$container.appendChild(this.$form);
        this.$container.appendChild(this.$lnkSignup);
    
        return this.$container;
    };

    handleValidation(e) {
        // console.log(e.target);
        let email = this.$emailInputGroup.getInputValue();
        let password = this.$passwordInputGroup.getInputValue();
        
        this.$emailInputGroup.setErrMsg();
        this.$passwordInputGroup.setErrMsg();
                
        if ((e.target.name == "email") & !email ) {
            this.$emailInputGroup.setErrMsg("Email can't be empty.")
            this.is_valid_email = false;
        } else 
            this.is_valid_email = true
        
        if ((e.target.name == "password") & password.length < 6){
            this.$passwordInputGroup.setErrMsg("Password must have at least 6 characters");
            this.is_valid_password= false;
        } else 
            this.is_valid_password = true

        if (this.is_valid_email & this.is_valid_password)
            this.$btnLogin.disabled = false;
        else
            this.$btnLogin.disabled = true;

    }

    handleSubmit(e)
    {
        e.preventDefault();
        console.log("Handling ...");

        let email = this.$emailInputGroup.getInputValue();
        let password = this.$passwordInputGroup.getInputValue();
        
        // firebase api
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                (userCredential) => {
                    console.log("Login success");
                    this.moveToFeed(userCredential.user);

                    this.$container.classList.remove("has_error");
                    this.$feedbackMsg.classList.remove("has_error");
                    
                }
            )
            .catch((err)=>{
                this.$feedbackMsg.innerText  = err.toString();
                this.$feedbackMsg.classList.add("has_error")
                this.$container.classList.add("has_error")
                console.log(err);
            })

    };   

    moveToSignup = (e) => {
        // console.log("This ..")
        let set_screen = new CustomEvent("set_screen", {
            bubbles : true,
            detail: {
                source: "login-screen",
                target: "signup-screen"
            }
        });

        this.$container.dispatchEvent(set_screen);
    }; 

    moveToFeed(user){
        let e = new CustomEvent("set_screen", {
            bubbles: true,
            detail: {
                user: user,
                source: "login-screen",
                target: "feed-screen"
            }
        });

        this.$container.dispatchEvent(e);
    }
};

export { Login };