class Modal {
    constructor(modalName) {
        this.modalName = modalName;
    }
    render() {
        const modalDiv = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <!-- Modal -->
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content form">
                <div class="modal-header form__header">
                    <div class="form__green-box"></div>
                    <h5 class="modal-title" id="exampleModalLabel">
                        ${this.modalName}
                    </h5>
                    <button type="button" class="btn-close form__btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body form__body"></div>
                <div class="modal-footer form__footer">
                    <button type="submit" class="btn btn-lg form__submit-bnt">
                        ${this.modalName}
                    </button>
                </div>
            </div>
        </div>
    </div>`;
        document.body.insertAdjacentHTML("afterbegin", modalDiv);

        const closeBtn = document.querySelector(".form__btn-close");
        closeBtn.addEventListener("click", this.clearInputs);
    }
    hideModal() {
        const modalForm = document.getElementById("exampleModal");
        const modalBg = document.querySelector(".modal-backdrop");

        modalForm.classList.remove("show");
        setTimeout(function () {
            modalForm.remove();
        }, 500);

        document.body.classList.remove("modal-open");
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        if (modalBg) {
            modalBg.remove();
        }
    }
    clearInputs() {
        setTimeout(function () {
            const inputs = document.querySelectorAll(".form__input");
            inputs.forEach((e) => e.remove());
        }, 500);
    }
}
export default Modal;
