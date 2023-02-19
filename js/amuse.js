let faceapi;
let video;
let width = 640;
let height = 480;
let ctx;
let img;

// ficeapiのオプション設定
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}

// メイン処理
async function make() {
    img_leye = new Image();
    img_leye.src = './images/lefteye.png';

    img_reye = new Image();
    img_reye.src = './images/righteye.png';

    img_mouth = new Image();
    img_mouth.src = './images/mouth.png';

    img_nose = new Image();
    img_nose.src = './images/head.png';

    video = await getVideo();
    let canvas = createCanvas(width, height);
    ctx = canvas.getContext('2d');
    // faceapiモデルのオブジェクト生成
    faceapi = await ml5.faceApi(video, detection_options, modelReady)
}

// DOMの読み込み
window.addEventListener('DOMContentLoaded', function () {
    make();
});

// faceapiモデルの読み込み
function modelReady() {
    console.log('ready!')
    faceapi.detect(gotResults)
}

// faceAPI呼び出し関数
function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // 自分の映像の情報を取得
    let detections = result;

    // 描画キャンパスを初期化
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(video, 0, 0, width, height);

    // 自分の映像に描画する処理
    if (detections) {
        if (detections.length > 0) {
            drawLandmarks(detections)
        }
    }
    // faceapiの再呼び出し
    faceapi.detect(gotResults)
}

const eyeCheck = document.querySelector('#eye');
const noseCheck = document.querySelector('#nose');
const mouthCheck = document.querySelector('#mouth');

// faceapiで取得した目の位置を特定する処理
function drawLandmarks(detections) {
    for (let i = 0; i < detections.length; i++) {
        const leftEye = detections[i].parts.leftEye;
        const rightEye = detections[i].parts.rightEye;
        const size = Math.abs(leftEye[0].x - rightEye[0].x) * 1;

        if (noseCheck.checked) {
            const nose = detections[i].parts.nose;
            ctx.drawImage(img_nose, nose[0].x - 10 - size * 2, nose[0].y - 25 - size * 1.7, -size * 4.6, size * 4.6);

        }

        if (mouthCheck.checked) {

            const mouth = detections[i].parts.mouth;
            ctx.drawImage(img_mouth, mouth[0].x - 10 - size * 1.7, mouth[0].y - 25 - size * 2.7, size * 4.5, size * 4.5);
        }
        if (eyeCheck.checked) {

            // 目に画像を描画
            ctx.drawImage(img_reye, leftEye[0].x - 10 - size * 1.4, leftEye[0].y - 25, size * 5, size * 5);
            ctx.drawImage(img_leye, rightEye[0].x - 10, rightEye[0].y - 25, size, size);
        }

    }
}

// Helper Functions
async function getVideo() {
    // 要素の取得、設定の作成など
    const videoElement = document.createElement('video');
    // const videoElement = document.querySelector('video');

    videoElement.setAttribute("style", "display: none;");
    videoElement.width = width;
    videoElement.height = height;
    const show = document.querySelector('#video');
    show.appendChild(videoElement);
    // Webカメラのキャプチャを作成
    const capture = await navigator.mediaDevices.getUserMedia({ video: true })
    videoElement.srcObject = capture;
    videoElement.play();
    return videoElement
}
// キャンパスの作成
function createCanvas(w, h) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const show = document.querySelector('#video');

    show.appendChild(canvas);
    return canvas;
}