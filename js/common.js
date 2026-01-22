const DialogManager = {
    /**
     * @param {HTMLElement} dialog - Dialog element to open
     */
    open: function(dialog) {
        if (!dialog) return;
        dialog.classList.add('open');
        dialog.dispatchEvent(new CustomEvent('dialog-opened'));
    },

    /**
     * @param {HTMLElement} dialog - Dialog element to close
     */
    close: function(dialog) {
        if (!dialog) return;
        dialog.classList.remove('open');
        dialog.dispatchEvent(new CustomEvent('dialog-closed'));
    },

    init: function() {
        document.addEventListener('click', (event) => {
            const closeBtn = event.target.closest('[data-dialog-close]');
            if (closeBtn) {
                const dialog = closeBtn.closest('.dialog-overlay');
                this.close(dialog);
            }
            if (event.target.classList.contains('dialog-overlay')) {
                this.close(event.target);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                const openedDialog = document.querySelector('.dialog-overlay.open');
                if (openedDialog) {
                    this.close(openedDialog);
                }
            }
        });
    }
};


document.addEventListener('DOMContentLoaded', () => {
    DialogManager.init();

    const settingsBtn = document.querySelector('.icon-btn[title="설정"]');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            alert('설정 메뉴는 준비 중입니다!'); 
        });
    }
});