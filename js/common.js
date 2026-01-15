document.addEventListener('DOMContentLoaded', () => {
    const settingsBtn = document.querySelector('.icon-btn[title="설정"]');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            alert('설정 메뉴는 준비 중입니다!'); 
        });
    }
});