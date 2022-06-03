import Element from "./element";


class Visit extends Element {
    constructor({
        id,
        name,
        doctor,
        description,
        problem,
        age,
        lastVisit,
        pressure,
        lastPressure,
        status = "Open",
    }) {
        super();
        this.name = name;
        this.description = description;
        this.problem = problem;
        this.age = age;
        this.lastVisit = lastVisit;
        this.pressure = pressure;
        this.lastPressure = lastPressure;
        this.doctor = doctor;
        this.status = status.toLowerCase();
        this.id = id;
        this.container = document.querySelector(".desk__items-container");
    }

    createCard() {
        this.item = this.createElement("div", ["item"]);
        this.wrapper = this.createElement("div", ["col", "remove-padding"]);
        this.item.setAttribute("data-id", this.id);
        this.item.dataset.doctor = this.doctor;
        this.item.dataset.status = this.status;
        this.item.innerHTML = `
    <div class="item__container">
        <div class="item__content">
            <h3 class="item__name">${this.name}</h3>
            <p class="item__doctor">Doctor's appointment: <span>${
                this.doctor
            }</span></p>
            <p class="item__status">Status: ${this.checkedStatus()}</p>
            <div class="content-extra">
                <p class="content-extra__problem">${
                    this.problem ? this.problem : ""
                }</p>
                <p class="content-extra__description">${
                    this.description ? this.description : ""
                }</p>
                ${this.extraContent()}
            </div>
        </div>
        <div class="item__buttons">
            <button class="button-delete" data-del="delete"></button>
            <button class="button-moreInfo" data-moreInfo="moreInfo" data-bs-toggle="modal" data-bs-target="#exampleModal">More info</button>
            <button class="button-edit" data-edit="edit" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
        </div>
    </div>
    `;
        this.wrapper.prepend(this.item);
        this.container.prepend(this.wrapper);
    }
    checkedStatus() {
        this.blockInner = "";
        if (this.status === "open") {
            this.blockInner = `<span class="status-green">Open</span>`;
            this.item.classList.remove("status-done");
        } else {
            this.blockInner = `<span class="status-red">Done</span>`;
            this.item.classList.add("status-done");
        }
        return this.blockInner;
    }
    extraContent() {
        if (this.doctor === "Dentist") {
            const dentist = new VisitDentist();
            return dentist.renderVisit(this.lastVisit);
        }
        if (this.doctor === "Cardiologist") {
            const cardiologist = new VisitCardiologist();
            return cardiologist.renderVisit(
                this.age,
                this.pressure,
                this.lastPressure
            );
        }
        if (this.doctor === "Physician") {
            const physician = new VisitPhysician();
            return physician.renderVisit(this.age);
        }
        return "";
    }
}

class VisitDentist {
    constructor() {}
    renderVisit(lastVisit) {
        return `<p class="content-extra__lastVisit">${lastVisit}</p>`;
    }
}
class VisitCardiologist {
    constructor() {}
    renderVisit(age, pressure, lastPressure) {
        return `<p class="content-extra__pressure">${pressure}</p>
              <p class="content-extra__lastPressure">${lastPressure}</p>
              <p class="content-extra__age">${age}</p>`;
    }
}
class VisitPhysician {
    constructor() {}
    renderVisit(age) {
        return `<p class="content-extra__age">${age}</p>`;
    }
}

export default Visit;
