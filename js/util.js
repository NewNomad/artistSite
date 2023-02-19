// ハンバーガーメニューのオンオフ表示(ほぼ自作)
const Hmenu = (event) => {
    const close = document.querySelector('#nav_close');
    const content = document.querySelector('#content');
    if (event.target.checked) {
        //    チェックが付いたらハンバーガーメニュー表示     
        close.classList.add('active');
        content.classList.add('active');

    } else {
        // ハンバーガーメニュー消す
        close.classList.remove('active');
        content.classList.remove('active');
    }
}
document.querySelector('#nav_menu').addEventListener('change', (e) => {
    Hmenu(e);
})

document.querySelector('#nav_close').addEventListener('click', (e) => {
    document.querySelector('#nav_menu input').checked = false;
    Hmenu(e);
})
