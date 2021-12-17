import { InputGroup } from "./input_group.js";
// import { firebase } from "./firebase.js"
class Signup {
    $container;
    $form_label;
    $form;
    $displayNameInputGroup;
    $emailInputGroup;
    $passwordInputGroup;
    $passwordconfirmInputGroup;
    $feedbackMsg;
    $btnSignup;
    $lnkLogin

    is_valid_displayname = false;
    is_valid_email = false;
    is_valid_password = false;
    is_valid_password_confirm = false;

    constructor()
    {
        this.$container = document.createElement("div");
        this.$container.classList.add("form-group");
        
        this.$form_label = document.createElement("div");
        this.$form_label.classList.add("form-label");
        this.$form_label.innerText = "Signup";

        this.$form = document.createElement("form");

        // Input
        this.$displayNameInputGroup = new InputGroup("Display name", "text", "display_name");
        this.$emailInputGroup = new InputGroup("Email", "text", "email");
        this.$passwordInputGroup = new InputGroup("Password", "password","password");
        this.$passwordconfirmInputGroup = new InputGroup("Confirm Password", "password","confirm_password");

        // Feedback Msg
        this.$feedbackMsg = document.createElement("div");
        this.$feedbackMsg.classList.add("form__feedbackMsg");

        // Submit btn
        this.$btnSignup = document.createElement("button");
        this.$btnSignup.innerText = "Signup";
        this.$btnSignup.disabled = true;

        this.$form.addEventListener("submit", (event) =>{
            this.handleSubmit(event);
        });

        this.$form.addEventListener("focusout", (event) => {
            this.handleValidation(event);
        })

        // Login link
        this.$lnkLogin = document.createElement("span");
        this.$lnkLogin.innerText = "Already had an account, login here!"
        this.$lnkLogin.classList.add("form__lnkSignup")
        this.$lnkLogin.addEventListener("click", ()=>{
            this.moveToLogin();
        })
    }

    render()
    {
        this.$form.appendChild(this.$displayNameInputGroup.render());
        this.$form.appendChild(this.$emailInputGroup.render());
        this.$form.appendChild(this.$passwordInputGroup.render());
        this.$form.appendChild(this.$passwordconfirmInputGroup.render());
        this.$form.appendChild(this.$btnSignup)

        this.$container.appendChild(this.$form_label);
        this.$container.appendChild(this.$feedbackMsg);
        this.$container.appendChild(this.$form);
        this.$container.appendChild(this.$lnkLogin);
    
        return this.$container;
    };

    handleValidation(e) {
        // console.log(e.target);
        let display_name = this.$displayNameInputGroup.getInputValue();
        let email = this.$emailInputGroup.getInputValue();
        let password = this.$passwordInputGroup.getInputValue();
        let passwordconfirm = this.$passwordconfirmInputGroup.getInputValue();

        this.$displayNameInputGroup.setErrMsg();
        this.$emailInputGroup.setErrMsg();
        this.$passwordInputGroup.setErrMsg();
        this.$passwordconfirmInputGroup.setErrMsg();

        // let is_valid = true;

        if ((e.target.name == "display_name") & !display_name ) {
            this.$displayNameInputGroup.setErrMsg("Display name can't be empty.")
            this.is_valid_displayname = false;
        } else 
            this.is_valid_displayname = true

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

        if ((e.target.name == "confirm_password") & (passwordconfirm != password) ){
            this.$passwordconfirmInputGroup.setErrMsg("Password not matched.")
            this.is_valid_password_confirm = false
        } else 
            this.is_valid_password_confirm = true

        if (this.is_valid_email && this.is_valid_password && this.is_valid_password && this.is_valid_password_confirm)
            this.$btnSignup.disabled = false;
        else
            this.$btnSignup.disabled = true;




    }

    handleSubmit(e)
    {
        e.preventDefault();
        console.log("Handling ...");

        // let display_name = this.$displayNameInputGroup.getInputValue();
        let email = this.$emailInputGroup.getInputValue();
        let password = this.$passwordInputGroup.getInputValue();
        // let passwordconfirm = this.$passwordconfirmInputGroup.getInputValue();

        // firebase api
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                () => {
                    this.$feedbackMsg.innerText = "Signup successfully, please check your email."
                    this.$feedbackMsg.classList.remove("has_error")

                    firebase.auth().currentUser.sendEmailVerification();

                    this.$displayNameInputGroup.setInputValue("");
                    this.$emailInputGroup.setInputValue("");
                    this.$passwordInputGroup.setInputValue("");
                    this.$passwordconfirmInputGroup.setInputValue("");

                    this.$container.classList.remove("has_error");
                    this.$feedbackMsg.classList.remove("has_error");

                    // after signup success, move to login screen
                    setTimeout(() => {
                        this.moveToLogin();
                    }, 1000);
                    
                }
            )
            .catch((err)=>{
                this.$feedbackMsg.innerText  = err.toString();
                this.$feedbackMsg.classList.add("has_error")
                this.$container.classList.add("has_error")
                console.log(err);
            })

    };   

    moveToLogin = () => {
        let set_screen = new CustomEvent("set_screen", {
            bubbles : true,
            detail: {
                // source: "signup-screen",
                target: "login_screen"
            }
        });

        this.$container.dispatchEvent(set_screen);
    }
};

export { Signup };