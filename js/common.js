const DialogManager = {
    prevFocusedElement: null,

    /**
     * @param {HTMLElement} dialog - Dialog element to open
     */
    open: function(dialog) {
        if (!dialog) return;

        this.prevFocusedElement = document.activeElement;

        dialog.classList.add('open');

        setTimeout(() => {
            const focusableElements = this.getFocusableElements(dialog);
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            } else {
                dialog.setAttribute('tabindex', '-1');
                dialog.focus();
            }
        }, 50);

        dialog.addEventListener('keydown', this.handleTrapFocus);
        dialog.dispatchEvent(new CustomEvent('dialog-opened'));
    },

    /**
     * @param {HTMLElement} dialog - Dialog element to close
     */
    close: function(dialog) {
        if (!dialog) return;

        dialog.classList.remove('open');

        dialog.removeEventListener('keydown', this.handleTrapFocus);
        if (this.prevFocusedElement) {
            this.prevFocusedElement.focus();
            this.prevFocusedElement = null;
        }
        dialog.dispatchEvent(new CustomEvent('dialog-closed'));
    },

    /**
     * @param {HTMLElement} dialog - Dialog element to return internal focusable elements
     */
    getFocusableElements: function(dialog) {
        return dialog.querySelectorAll(
            'button:not([tabindex="-1"]):not([disabled]), ' +
            '[href]:not([tabindex="-1"]), ' +
            'input:not([tabindex="-1"]):not([disabled]), ' +
            'select:not([tabindex="-1"]):not([disabled]), ' +
            'textarea:not([tabindex="-1"]):not([disabled]), ' +
            '[tabindex]:not([tabindex="-1"]):not([disabled])'
        );
    },

    handleTrapFocus: function(event) {
        let key = event.key || (event.keyCode !== undefined ? String.fromCharCode(event.keyCode) : '');
        if (key !== 'Tab') return;

        const dialog = event.currentTarget;
        const focusableElements = DialogManager.getFocusableElements(dialog);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (focusableElements.length === 0) {
            event.preventDefault();
            return;
        }

        if (event.shiftKey) {  // Shift + Tab
            if (document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            }
        } 
        else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
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

/**
 * @param {string} message - Message text to display
 * @param {number|null} duration - Duration the message is shown (in milliseconds, default is null)
 */
function showToast(message, duration = null) {
    let toast = document.querySelector('.toast-msg');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-msg';
        document.body.appendChild(toast);
    }

    toast.textContent = message;

    if (toast.hideTimeout) {
        clearTimeout(toast.hideTimeout);
        toast.hideTimeout = null;
    }

    if (duration && duration > 0) {
        toast.hideTimeout = setTimeout(() => {
            toast.textContent = '';
        }, duration);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    DialogManager.init();

    const settingsBtn = document.querySelector('.icon-btn[title="설정"]');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', (event) => {
            event.preventDefault();
            showToast('설정 메뉴는 준비 중입니다.', 1500)
        });
    }
});