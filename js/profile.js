// 作品早見表にカーソル当てたら作品画像が見れるやつ
const works = document.querySelectorAll('#preview .preImg');
works.forEach(work => {
    work.addEventListener('mouseover', function () {
        const figure = document.querySelector('#preview figure');

        // 画像があったら消す
        if (document.querySelector('#preview figure img')) figure.removeChild(document.querySelector('#preview figure img'));

        const url = this.dataset.img

        const img = document.createElement('img');
        img.src = url;
        img.alt = 'works';
        figure.appendChild(img);

    })
});
