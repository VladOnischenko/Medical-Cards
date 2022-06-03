import Modal from "./modal";
import Handler from "./handler";
import Visit from "./visit";
import request from "./request";
import enableSearch from "./search";
import VisitModal from "./visitModal";

async function loadPatients() {
    const response = await request({
        url: "https://ajax.test-danit.com/api/v2/cards",
    });
    const data = await response.json();
    console.log(data);
    data.forEach(
        ({
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
        }) => {
            const user = new Visit({
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
            });
            user.createCard();
        }
    );
}

function checkAccess() {
    const logInName = document.getElementById("log-in__name");
    const logInPassword = document.getElementById("log-in__password");
    let flag = false;
    const accessGranted = [{ name: "Kate", password: "kate2002" }];

    accessGranted.forEach((e) => {
        const { name: accessName, password: accessPassword } = e;
        if (
            accessName.toLocaleLowerCase() ===
                logInName.value.toLocaleLowerCase() &&
            accessPassword === logInPassword.value
        ) {
            flag = true;
            return;
        } else {
            logInName.style.borderColor = "red";
            logInPassword.style.borderColor = "red";
        }
    });
    return flag;
}

function callModal() {
    const visitBtn = document.getElementById("create-visit-btn");
    const basicModal = new Modal();
    const visitModal = new VisitModal("Create visit");
    basicModal.render();
    visitBtn.addEventListener("click", () => {
        visitModal.render();
    });
}

class LogInModal extends Modal {
    render() {
        const modalBody = document.querySelector(".form__body");
        const closeBtn = document.querySelector(".form__btn-close");
        const modalDialog = document.querySelector("#exampleModal");
        const logInInputs = `<input
        type="text"
        name="name"
        class="form__input"
        placeholder="Enter your name"
        id="log-in__name"
    />
    <input
        type="password"
        name="password"
        class="form__input"
        placeholder="Enter your password"
        id="log-in__password"
    />
    <label class="form__checkbox-text">
        <input
            type="checkbox"
            name="checkbox"
            class="form__checkbox"
        />
        Remember me
    </label>`;

        modalBody.insertAdjacentHTML("afterbegin", logInInputs);
        closeBtn.addEventListener("click", this.clearInputs);

        modalDialog.addEventListener("click", (e) => {
            if (e.target.id === "exampleModal") {
                this.clearInputs();
            }
        });
    }
    getLogIn() {
        const formSubmitBtn = document.querySelector(".form__submit-bnt");
        formSubmitBtn.addEventListener("click", () => {
            if (!checkAccess()) {
                return;
            }
            const logInCheckbox = document.querySelector(".form__checkbox");
            super.hideModal();
            logInBtn.insertAdjacentHTML("afterend", createVisitBtn);
            logInBtn.remove();

            if (logInCheckbox.checked) {
                localStorage.setItem("rememberMe", "true");
            }
            loadPatients();
            const handler = new Handler();
            enableSearch();
            callModal();
        });
    }
    hideModal() {
        super.hideModal();
    }
    clearInputs() {
        super.clearInputs();
        const checkbox = document.querySelector(".form__checkbox-text");
        setTimeout(function () {
            checkbox.remove();
        }, 500);
    }
}
window.addEventListener("load", () => {
    if (localStorage.getItem("rememberMe")) {
        logInBtn.insertAdjacentHTML("afterend", createVisitBtn);
        logInBtn.remove();
        loadPatients();
        const handler = new Handler();
        enableSearch();
        callModal();
        return;
    }
    const modal = new Modal("Log In");
    modal.render();
    const logInModal = new LogInModal();
    logInModal.getLogIn();
    logInBtn.addEventListener("click", () => {
        logInModal.render();
    });
});

const createVisitBtn = `<button id="create-visit-btn"
    class="header__button" data-bs-toggle="modal" 
    data-bs-target="#exampleModal"
    >Create Visit</button>`;
const logInBtn = document.getElementById("log-in-btn");

export {LogInModal, loadPatients};
