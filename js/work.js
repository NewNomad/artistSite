
// 「すべて」にチェックを入れた時エリアの処理
document.querySelector('#all').addEventListener('change', e => {
    const areas = document.querySelectorAll('.area');
    if (e.target.checked) { // チェックが入っていたら、すべてのチェックを外す
        areas.forEach(area => {
            area.checked = true;
        });
    } else { // チェックが入っていなかったら、すべてのチェックをつける
        areas.forEach(area => {
            area.checked = false;
        });
    }

})

// 「すべて」にチェックを入れた時のカテゴリーの処理
document.querySelector('#allC').addEventListener('change', e => {
    const areas = document.querySelectorAll('.category');
    if (e.target.checked) { // チェックが入っていたら、すべてのチェックを外す
        areas.forEach(area => {
            area.checked = true;
        });
    } else { // チェックが入っていなかったら、すべてのチェックをつける
        areas.forEach(area => {
            area.checked = false;
        });
    }

})

// 検索ボタン
document.querySelector('#discover').addEventListener('click', e => {
    e.preventDefault();

    // いずれにもチェックが入っていなければすべてにチェックを入れる
    const areas = document.querySelectorAll('.area');
    let isCheckedArea = false;
    areas.forEach(area => {
        if (area.checked) isCheckedArea = true;
    });
    if (isCheckedArea == false) {
        areas.forEach(area => {
            area.checked = true;
        })
    }
    // カテゴリーにも同様の処理
    const categs = document.querySelectorAll('.category')
    let isCheckedCateg = false;
    categs.forEach(categ => {
        if (categ.checked) isCheckedCateg = true;
    });
    if (isCheckedCateg == false) {
        categs.forEach(categ => {
            categ.checked = true;
        })
    }


    const data = SortworkData();
    // console.log(data);
    SelectworkData(data);
    console.log(data);
})

// 検索時にエリア・カテゴリ別の検索結果の配列を返す
const SortworkData = () => {
    let result = [];
    // workData内のデータが検索フォームのチェックが入っていたらresultに入れていく
    workData.forEach(data => {

        //   エリアにチェックが入っているならば
        const areas = document.querySelectorAll('.area');
        areas.forEach(area => {

            if (data['areaR'] == area.value && area.checked) {

                //   カテゴリーでも同様のチェック
                const categories = document.querySelectorAll('.category');
                categories.forEach(category => {
                    if (data['categR'] == category.value && category.checked) {
                        result.push(data);
                    }
                })

            }
        });
    })

    return result;
}

// 削除する
const DeleteworkData = () => {
    if (document.querySelector('#results')) document.querySelector('#results').remove();
    const result = document.createElement('table');
    result.id = 'results';
    document.querySelector('#display').appendChild(result);

}

const ShowZero = () => {
    if (document.querySelector('#results')) document.querySelector('#results').remove();
    const result = document.createElement('p');
    result.id = 'results';
    result.innerHTML = '検索結果0件。条件を変えてみてください。'
    result.style.marginBottom = '100px';
    result.style.marginTop = '60px';
    result.style.textAlign = 'center';

    result.style.fontSize = '1.6rem';
    document.querySelector('#display').appendChild(result);

}

// workDataを並べる関数
const SelectworkData = (chosenData) => {

    if (chosenData.length == 0) {
        console.log('0');
        ShowZero();
        return
    }

    // 一度削除する
    DeleteworkData();


    const max = chosenData.length;
    console.log(max);
    // カウント用
    let cnt = 0;
    while (cnt < max) {

        // tr1
        const tr1 = document.createElement('tr');
        // 画像
        const imgP = document.createElement('td');
        const img = document.createElement('img');
        img.src = chosenData[cnt]['img'];
        imgP.classList.add('image')
        imgP.appendChild(img);
        imgP.rowSpan = 3;

        // タイトル
        const title = document.createElement('th');
        title.innerText = chosenData[cnt]['name'];
        title.classList.add('title');
        title.colSpan = 2;

        tr1.appendChild(imgP);
        tr1.appendChild(title);

        // tr2
        const tr2 = document.createElement('tr');
        // categ
        const categ = document.createElement('td');
        categ.classList.add('categ');
        categ.innerText = chosenData[cnt]['categR'];
        // seri
        const seri = document.createElement('td');
        seri.classList.add('seri');
        seri.innerText = chosenData[cnt]['areaR'];

        tr2.appendChild(categ);
        tr2.appendChild(seri);

        // tr3
        const tr3 = document.createElement('tr')
        const msg = document.createElement('td');
        msg.classList.add('msg');
        msg.colSpan = 2;
        msg.innerText = chosenData[cnt]['message'];
        tr3.appendChild(msg);



        // 最大まで作っていたら修了
        cnt++;
        // if (cnt >= max - 1) break;

        document.querySelector('#results').appendChild(tr1);
        document.querySelector('#results').appendChild(tr2);
        document.querySelector('#results').appendChild(tr3);
    }
}

// クイズ
$(".btn").on("click", function () {
    $(this).closest("div").css("display", "none");
    id = $(this).attr("href");
    $(id).addClass("fit").show("slow");
});