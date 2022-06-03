function changeDropdownValue(
    selectItemsArray,
    isOpenModal = false,
    editModalDoctor = false,
    data = {}
) {
    if (editModalDoctor) {
        renderDoctorInputs(editModalDoctor, data);
    }
    for (let item of selectItemsArray) {
        item.addEventListener("click", (event) => {
            const ariaLabelledBy =
                item.parentElement.parentElement.getAttribute(
                    "aria-labelledby"
                );
            const eventTarget = event.target.innerText;
            const targetButton = document.querySelector(`#${ariaLabelledBy}`);
            targetButton.innerText = eventTarget;
            if (isOpenModal) {
                const inputs = document.querySelectorAll(".form__input");
                const selectDoctors = document.querySelector(
                    "#visitModalDropdownMenuDoctors"
                );
                selectDoctors.style.borderColor = "";
                inputs.forEach((e) => {
                    e.style.borderColor = "";
                });
                renderDoctorInputs(item.textContent);
            }
        });
    }
}

function renderDoctorInputs(
    doctor,
    { lastVisit, pressure, lastPressure, age } = {}
) {
    const inputToRemove = document.querySelectorAll(".inserted-field");
    if (inputToRemove) {
        inputToRemove.forEach((e) => {
            e.remove();
        });
    }
    const modalBody = document.querySelector(".modal-body");
    if (doctor === "Dentist") {
        modalBody.insertAdjacentHTML(
            "beforeend",
            `<input type="text"
            name="last visit date"
            class="form__input inserted-field" id="userLastVisit"
            placeholder="Last visit date" value="${
                lastVisit ? lastVisit : ""
            }">`
        );
    } else if (doctor === "Cardiologist") {
        modalBody.insertAdjacentHTML(
            "beforeend",
            `<input type="text"
            name="pressure"
            class="form__input inserted-field" id="userPressure"
            placeholder="Pressure" value="${pressure ? pressure : ""}">

            <input type="text"
            name="age"
            class="form__input inserted-field" id="userAge"
            placeholder="Age" value="${age ? age : ""}">

            <textarea class="form__input inserted-field" 
            placeholder="Past cardiovascular diseases"
            id="userLastPressure"
            rows="3">${lastPressure ? lastPressure : ""}</textarea>`
        );
    } else if (doctor === "Physician") {
        modalBody.insertAdjacentHTML(
            "beforeend",
            `<input type="text"
            name="age"
            class="form__input inserted-field" id="userAge"
            placeholder="Age" value="${age ? age : ""}">`
        );
    }
}

const selectItemsArray = document.querySelectorAll(
    ".options__input-container .options__dropdown-item"
);
changeDropdownValue(selectItemsArray);
export default changeDropdownValue;
