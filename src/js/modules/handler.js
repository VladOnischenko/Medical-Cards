import Element from "./element";
import Modal from "./modal";
import request from "./request";
import VisitModal from "./visitModal";
import MoreInfoModal from "./moreInfoModal";

class Handler extends Element {
    constructor() {
        super();
        this.container = document.querySelector(".desk__items-container");
        this.handlerButtons();
    }
    handlerButtons() {
        this.container.addEventListener("click", (event) => {
            event.preventDefault();
            this.item = event.target;
            if (this.item.tagName !== "BUTTON") return;
            this.itemId = this.item.closest(".item").dataset.id;
            this.deleteItem();
            this.moreInfoBtn();
            this.editBtn();
        });
    }
    values() {
        this.wrapper = this.item.closest(".item__container");
        this.name = this.wrapper.querySelector(".item__name").innerText;
        this.doctor =
            this.wrapper.querySelector(".item__doctor span").innerText;
        this.status =
            this.wrapper.querySelector(".item__status span").innerText;
        this.description = this.wrapper.querySelector(
            ".content-extra__description"
        ).innerText;
        this.problem = this.wrapper.querySelector(
            ".content-extra__problem"
        ).innerText;
    }
    currentDoctorValues() {
        if (this.doctor === "Dentist") {
            this.lastVisit = this.wrapper.querySelector(
                ".content-extra__lastVisit"
            ).innerText;
            return {
                id: this.itemId,
                status: this.status,
                name: this.name,
                doctor: this.doctor,
                problem: this.problem,
                description: this.description,
                lastVisit: this.lastVisit,
            };
        }
        if (this.doctor === "Cardiologist") {
            this.pressure = this.wrapper.querySelector(
                ".content-extra__pressure"
            ).innerText;
            this.lastPressure = this.wrapper.querySelector(
                ".content-extra__lastPressure"
            ).innerText;
            this.age = this.wrapper.querySelector(
                ".content-extra__age"
            ).innerText;
            return {
                id: this.itemId,
                name: this.name,
                doctor: this.doctor,
                status: this.status,
                problem: this.problem,
                description: this.description,
                pressure: this.pressure,
                lastPressure: this.lastPressure,
                age: this.age,
            };
        }
        if (this.doctor === "Physician") {
            this.age = this.wrapper.querySelector(
                ".content-extra__age"
            ).innerText;
            return {
                id: this.itemId,
                status: this.status,
                name: this.name,
                doctor: this.doctor,
                problem: this.problem,
                description: this.description,
                age: this.age,
            };
        }
    }
    deleteItem() {
        if (!this.item.dataset.del) return;
        request({
            url: `https://ajax.test-danit.com/api/v2/cards/${this.itemId}`,
            options: { method: "DELETE" },
        });
        this.item.closest(".col").remove();
    }
    moreInfoBtn() {
        if (!this.item.dataset.moreinfo) return;
        this.values();
        const values = this.currentDoctorValues();
        const moreInfoModal = new MoreInfoModal("More Info", values);
        moreInfoModal.render();
    }
    editBtn() {
        if (!this.item.dataset.edit) return;
        const editModal = new VisitModal("Edit");
        this.values();
        const {
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
        } = this.currentDoctorValues();
        editModal.render({
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
    }
}

export default Handler;
