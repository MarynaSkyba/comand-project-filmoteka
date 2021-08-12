

(() => {

    const buttons = {
        openModalBtn: document.querySelector('[footer-modal-open]'),
        closeModalBtn: document.querySelector('.team-modal-close-button'),
        modal: document.querySelector('.backdrop'),
    
    };


    buttons.openModalBtn.addEventListener('click', openModal);


    function openModal() {
        buttons.modal.classList.remove('is-hidden');
        window.addEventListener('keydown', onPressEscape);
        buttons.closeModalBtn.addEventListener('click', closeModal);
        buttons.modal.addEventListener('click', backdropCloseModal);
    };


    function closeModal() {
        buttons.closeModalBtn.removeEventListener('click', closeModal);
        buttons.modal.classList.add('is-hidden');
        buttons.modal.removeEventListener('click', closeModal)
        window.removeEventListener('keydown', onPressEscape);

    };


    function onPressEscape(event) {
        if (event.code === 'Escape') {
            closeModal();
        }
    };


    function backdropCloseModal(event) {

        if (event.currentTarget === event.target) {
            closeModal();
        }
    };

})();