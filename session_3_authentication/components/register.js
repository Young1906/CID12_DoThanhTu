import { InputGroup } from "./input_group.js";

class Register {
    $container;
    $title;

    $formRegister;
    $inputGroupDisplayName;
    $inputGroupEmail;
    $inputGroupPassword;
    $inputGroupConfirmPassword;

    $feedbackMessage;
    $btnSubmit;

    constructor(){
        this.$container = document.createElement("div");
        this.$container.classList.add("center", "h-screen", "flex-col")

        this.$title = document.createElement("h3");
        this.$title.innerText = "Signup";

        this.$formRegister = document.createElement("form");
        this.$formRegister.addEventListener("submit", this.handleSubmit)

        this.$inputGroupEmail = new InputGroup("email", "Email", "email");
        this.$inputGroupDisplayName = new InputGroup("text", "Display Name", "display_name");
        this.$inputGroupPassword = new InputGroup("password", "Password", "password");
        this.$inputGroupConfirmPassword = new InputGroup("password", "Confirm Password", "confirm_password");

        this.$feedbackMessage = document.createElement("div");
        
        this.$btnSubmit = document.createElement("button");
        this.$btnSubmit.type = "submit"
        this.$btnSubmit.innerText = "Register"

    }

    render(){
        this.$container.appendChild(this.$title);
        
        // form register
        this.$formRegister.appendChild(this.$inputGroupDisplayName.render());
        this.$formRegister.appendChild(this.$inputGroupEmail.render());
        this.$formRegister.appendChild(this.$inputGroupPassword.render());
        this.$formRegister.appendChild(this.$inputGroupConfirmPassword.render());
        this.$formRegister.appendChild(this.$btnSubmit);
        
        // container
            // form register
        this.$container.appendChild(this.$formRegister);
        
            //feedback msg
        this.$container.appendChild(this.$feedbackMessage);
        

        return this.$container;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log("This")

        const email = this.$inputGroupEmail.get_input_value();
        const display_name = this.$inputGroupDisplayName.get_input_value();
        const password = this.$inputGroupPassword.get_input_value();
        const confirm_password = this.$inputGroupConfirmPassword.get_input_value();

        for (let inp of [
                this.$inputGroupDisplayName, 
                this.$inputGroupEmail,
                this.$inputGroupConfirmPassword,
                this.$inputGroupPassword
            ])
            inp.setError(null);

        if (!display_name)
            this.$inputGroupDisplayName.setError("Can't be empty")
        
        if (!email)
            this.$inputGroupEmail.setError("Can't be empty")
        
        if (password.length < 6)
            this.$inputGroupPassword.setError("Password must have at least 6 characters")

        if (!(password == confirm_password))
            this.$inputGroupConfirmPassword.setError("Password not matched")

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=>{
                    this.$feedbackMessage.innerText = "Register Successfully! Please check your inbox."
                    firebase.auth().currentUser.sendEmailVerification();

                    for (let inp of [
                        this.$inputGroupDisplayName, 
                        this.$inputGroupEmail,
                        this.$inputGroupConfirmPassword,
                        this.$inputGroupPassword
                    ])
                    inp.set_input_value("");
                }
            )
            .catch((err)=>{
                this.$feedbackMessage.innerText = err.toString();
                console.log(err) 
            });

    };
};

export {
    Register
}