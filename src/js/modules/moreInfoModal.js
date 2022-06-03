import Modal from "./modal";

class MoreInfoModal extends Modal {
    constructor(
        modalName,
        {
            name,
            status,
            doctor,
            problem,
            id,
            description,
            lastVisit,
            pressure,
            lastPressure,
            age,
        }
    ) {
        super(modalName);
        this.modalName = modalName;
        this.name = name;
        this.status = status;
        this.doctor = doctor;
        this.problem = problem;
        this.id = id;
        this.description = description;
        this.lastVisit = lastVisit;
        this.pressure = pressure;
        this.lastPressure = lastPressure;
        this.age = age;
    }
    render() {
        const modalBody = document.querySelector(".form__body");
        const submitBtn = document.querySelector(".form__submit-bnt");
        const modalTitle = document.querySelector("#exampleModalLabel");
        const closeBtn = document.querySelector(".form__btn-close");
        const modalDialog = document.querySelector("#exampleModal");
        modalTitle.textContent = `${this.modalName}`;
        submitBtn.style.display = "none";
        modalBody.insertAdjacentHTML(
            "beforeend",
            `<p class="form__input">Doctor: ${this.doctor}</p>
            <p class="form__input">The purpose of visit: ${this.problem}</p>
            <p class="form__input">Short description: ${this.description}</p>
            <p class="form__input">Name: ${this.name}</p>`
        );
        if (this.doctor === "Dentist") {
            modalBody.insertAdjacentHTML(
                "beforeend",
                `<p class="form__input">Last visit date: ${this.lastVisit}</p>`
            );
        } else if (this.doctor === "Physician") {
            modalBody.insertAdjacentHTML(
                "beforeend",
                `<p class="form__input">Age: ${this.age}</p>`
            );
        } else if (this.doctor === "Cardiologist") {
            modalBody.insertAdjacentHTML(
                "beforeend",
                `<p class="form__input">Pressure: ${this.pressure}</p>
                <p class="form__input">Age: ${this.age}</p>
                <p class="form__input">Past cardiovascular diseases: ${this.lastPressure}</p>`
            );
        }
        if (this.status === "Open") {
            modalBody.insertAdjacentHTML(
                "beforeend",
                `<button class="form__input form__status-btn 
                form__status-btn--green form__status-btn--cursor-default" 
                id="status-btn" data-status="Open">Status: Open</button>`
            );
        } else if (this.status === "Done") {
            modalBody.insertAdjacentHTML(
                "beforeend",
                `<button class="form__input form__status-btn form__status-btn--red 
                form__status-btn--cursor-default" id="status-btn" 
                data-status="Done">Status: Done</button>`
            );
        }
        closeBtn.addEventListener("click", this.clearInputs);
        modalDialog.addEventListener("click", (e) => {
            if (e.target.id === "exampleModal") {
                this.clearInputs();
            }
        });
    }
    clearInputs() {
        super.clearInputs();
        const submitBtn = document.querySelector(".form__submit-bnt");
        setTimeout(function () {
            submitBtn.style.display = "";
        }, 500);
    }
}

export default MoreInfoModal;
