import { Form } from "./form.js"

class App {
    $container;

    constructor() {
        this.$container = document.createElement("div");
        this.$container.classList.add("app_container");

        let signup_form_data = [
            {
                label: "First Name",
                id: "first_name"
            },

            {
                label: "Last name",
                id: "last_name"
            },

            {
                label: "Password",
                id: "password"
            }
        ]

        let form = new Form("Signup", signup_form_data);
        this.$container.appendChild(form.$container);
    }

    render = () => {
        return this.$container;
    }
}

export { App }