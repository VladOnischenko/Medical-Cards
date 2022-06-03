import Modal from "./modal";
import changeDropdownValue from "./changeDropdownValue";
import request from "./request";
import { loadPatients } from "./logInModal";

class VisitModal extends Modal {
    constructor(modalName) {
        super(modalName);
        this.modalName = modalName;
    }
    render({
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
    } = {}) {
        const modalTitle = document.querySelector("#exampleModalLabel");
        const modalBtn = document.querySelector(".form__submit-bnt");
        modalTitle.textContent = `${this.modalName}`;
        modalBtn.textContent = `${this.modalName}`;

        const modalBody = document.querySelector(".form__body");
        const modalDialog = document.querySelector("#exampleModal");
        const closeBtn = document.querySelector(".form__btn-close");
        const modalHTML = `<div class="dropdown form__input visit-modal" data-id="${id}">
        <button class="dropdown-toggle" type="button" 
        id="visitModalDropdownMenuDoctors" data-bs-toggle="dropdown" 
        data-bs-auto-close="true" aria-expanded="false">
            ${doctor ? doctor : "Choose a doctor"}
        </button>
        <ul class="dropdown-menu options__dropdown-menu" 
        aria-labelledby="visitModalDropdownMenuDoctors">
            <li>
                <a class="options__dropdown-item form__dropbox-item dropdown-item" href="#">Cardiologist</a>
            </li>
            <li>
                <a class="options__dropdown-item form__dropbox-item dropdown-item" href="#">Dentist</a>
            </li>
            <li>
                <a class="options__dropdown-item form__dropbox-item dropdown-item" href="#">Physician</a>
            </li>
        </ul>
    </div>
    <input
            type="text"
            name="purpose"
            class="form__input"
            placeholder="The purpose of visit"
            id="userProblem"
            value="${problem ? problem : ""}"
        />
        <textarea class="form__input" 
        placeholder="Short description"
        id="userDescription"
        rows="3">${description ? description : ""}</textarea>
        <input
            type="text"
            name="name"
            class="form__input"
            placeholder="Name, Surname"
            id="userName"
            value="${name ? name : ""}"
        />
        ${status ? this.checkVisitStatus(status) : ""}`;
        modalBody.insertAdjacentHTML("beforeend", modalHTML);

        const statusBtn = document.querySelector("#status-btn");
        const selectItemsArray = document.querySelectorAll(
            ".visit-modal .options__dropdown-item"
        );
        changeDropdownValue(selectItemsArray, true, doctor, {
            lastVisit,
            pressure,
            lastPressure,
            age,
        });
        closeBtn.addEventListener("click", this.hideModal);

        if (statusBtn) {
            statusBtn.addEventListener("click", () => {
                if (statusBtn.dataset.status === "Open") {
                    statusBtn.classList.remove("form__status-btn--green");
                    statusBtn.classList.add("form__status-btn--red");
                    statusBtn.textContent = "Status: Done";
                    statusBtn.dataset.status = "Done";
                } else {
                    statusBtn.classList.remove("form__status-btn--red");
                    statusBtn.classList.add("form__status-btn--green");
                    statusBtn.textContent = "Status: Open";
                    statusBtn.dataset.status = "Open";
                }
            });
        }
        modalDialog.addEventListener("click", (e) => {
            const item = e.target;
            try {
                if (item.id === "exampleModal") {
                    this.hideModal();
                } else if (
                    item.innerText === "Create visit" &&
                    item.localName === "button"
                ) {
                    if (this.checkInputsValue()) {
                        return;
                    }
                    this.sendRequest("POST");
                } else if (
                    item.innerText === "Edit" &&
                    item.localName === "button"
                ) {
                    if (this.checkInputsValue()) {
                        return;
                    }
                    const currentId = document.querySelector(".visit-modal");
                    this.sendRequest(
                        "PUT",
                        statusBtn.dataset.status,
                        currentId.dataset.id
                    );
                }
            } catch (error) {
                const selectDoctors = document.querySelector(
                    "#visitModalDropdownMenuDoctors"
                );
                selectDoctors.style.borderColor = "red";
            }
        });
    }
    hideModal() {
        super.hideModal();
        super.clearInputs();
        super.render();
    }
    checkVisitStatus(status) {
        if (status === "Open") {
            return `<button class="form__input form__status-btn form__status-btn--green" id="status-btn" data-status="Open">Status: Open</button>`;
        } else if (status === "Done") {
            return `<button class="form__input form__status-btn form__status-btn--red" id="status-btn" data-status="Done">Status: Done</button>`;
        }
    }
    repeatValues() {
        this.wrapper = document.body.querySelector(".modal-content");
        this.userProblem = this.wrapper.querySelector("#userProblem").value;
        this.userDescription =
            this.wrapper.querySelector("#userDescription").value;
        this.userName = this.wrapper.querySelector("#userName").value;
        this.userDoctor = document.getElementById(
            "visitModalDropdownMenuDoctors"
        ).innerText;
    }
    takeValuesInput() {
        this.repeatValues();
        if (this.userDoctor === "Dentist") {
            this.userLastVisit =
                this.wrapper.querySelector("#userLastVisit").value;
            return {
                name: this.userName,
                problem: this.userProblem,
                description: this.userDescription,
                doctor: this.userDoctor,
                status: "Open",
                lastVisit: this.userLastVisit,
            };
        } else if (this.userDoctor === "Cardiologist") {
            this.userPressure =
                this.wrapper.querySelector("#userPressure").value;
            this.userLastPressure =
                this.wrapper.querySelector("#userLastPressure").value;
            this.userAge = this.wrapper.querySelector("#userAge").value;
            return {
                name: this.userName,
                problem: this.userProblem,
                description: this.userDescription,
                doctor: this.userDoctor,
                status: "Open",
                pressure: this.userPressure,
                lastPressure: this.userLastPressure,
                age: this.userAge,
            };
        } else if (this.userDoctor === "Physician") {
            this.userAge = this.wrapper.querySelector("#userAge").value;
            return {
                name: this.userName,
                problem: this.userProblem,
                description: this.userDescription,
                doctor: this.userDoctor,
                status: "Open",
                age: this.userAge,
            };
        }
    }
    sendRequest(sendMethod, sendStatus, sendId) {
        const url = "https://ajax.test-danit.com/api/v2/cards";
        const urlPut = `https://ajax.test-danit.com/api/v2/cards/${sendId}`;
        const {
            name,
            status,
            doctor,
            problem,
            description,
            lastVisit,
            pressure,
            lastPressure,
            age,
        } = this.takeValuesInput();
        if (doctor === "Dentist") {
            request({
                url: sendMethod === "PUT" ? urlPut : url,
                data: {
                    name,
                    status: sendStatus ? sendStatus : status,
                    doctor,
                    problem,
                    description,
                    lastVisit,
                },
                options: { method: `${sendMethod}` },
            });
        }
        if (doctor === "Cardiologist") {
            request({
                url: sendMethod === "PUT" ? urlPut : url,
                data: {
                    name,
                    status: sendStatus ? sendStatus : status,
                    doctor,
                    problem,
                    description,
                    pressure,
                    lastPressure,
                    age,
                },
                options: { method: `${sendMethod}` },
            });
        }
        if (doctor === "Physician") {
            request({
                url: sendMethod === "PUT" ? urlPut : url,
                data: {
                    name,
                    status: sendStatus ? sendStatus : status,
                    doctor,
                    problem,
                    description,
                    age,
                },
                options: { method: `${sendMethod}` },
            });
        }
        const deskContainer = document.querySelector(".desk__items-container");
        deskContainer.innerHTML = "";
        this.hideModal();
        setTimeout(() => {
            loadPatients();
        }, 200);
    }
    checkInputsValue() {
        const inputs = document.querySelectorAll(".form__input");
        let flag = false;
        inputs.forEach((e) => {
            if (e.value === "" && e.id !== "status-btn") {
                e.style.borderColor = "red";
                flag = true;
            }
        });
        return flag;
    }
}
export default VisitModal;
