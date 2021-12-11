import { InputGroup } from "./input_group.js";
// import { firebase } from "./firebase.js"
class Register {
    $container;
    $form_label;
    $form;
    $displayNameInputGroup;
    $emailInputGroup;
    $passwordInputGroup;
    $passwordconfirmInputGroup;
    $feedbackMsg;
    $btnSignup;

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

        this.$form.addEventListener("submit", (event) =>{
            this.handleSubmit(event);
        });

        this.$form.addEventListener("change", (event) => {
            this.handleValidation(event);
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
        this.$container.appendChild(this.$form);

        this.$container.appendChild(this.$feedbackMsg);
    
        return this.$container;
    };

    handleValidation(e) {
        // console.log(e.target);
        let display_name = this.$displayNameInputGroup.getInputValue();
        let email = this.$emailInputGroup.getInputValue();
        let password = this.$passwordInputGroup.getInputValue();
        let passwordconfirm = this.$passwordconfirmInputGroup.getInputValue();

        let is_valid = true;

        if ((e.target.name == "display_name") & !display_name ) {
            this.$displayNameInputGroup.setErrMsg("Display name can't be empty.")
            is_valid = false;
        }

        if ((e.target.name == "email") & !email ) {
            this.$emailInputGroup.setErrMsg("Email can't be empty.")
            is_valid = false;
        }
        
        if ((e.target.name == "password") & password.length < 6){
            this.$passwordInputGroup.setErrMsg("Password must have at least 6 characters");
            is_valid = false;
        }

        if ((e.target.name == "confirm_password") & (passwordconfirm != password) ){
            this.$passwordconfirmInputGroup.setErrMsg("Password not matched.")
            is_valid = false
        }

        if (!is_valid)
            this.$btnSignup.disabled = true;
        else
            this.$btnSignup.disabled = false;




    }

    handleSubmit(e)
    {
        e.preventDefault();
        console.log("Handling ...");

        let display_name = this.$displayNameInputGroup.getInputValue();
        let email = this.$emailInputGroup.getInputValue();
        let password = this.$passwordInputGroup.getInputValue();
        let passwordconfirm = this.$passwordconfirmInputGroup.getInputValue();

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
                    
                }
            )
            .catch((err)=>{
                this.$feedbackMsg.innerText  = err.toString();
                this.$feedbackMsg.classList.add("has_error")
                console.log(err);
            })

    };   
};

export { Register };