async function load_model() {
    const model = await tf.loadLayersModel('http://localhost:8000/jsmodel/jsmodel/model.json');
    const inputs = tf.randomNormal([1, 128]);
    let a = model.predict(inputs).squeeze();
    a = tf.image.resizeBilinear(tf.expandDims(a, axis=0), [300, 300]);
    // prediction.then((a) => {
        console.log();
        let b = Uint8ClampedArray.from(a, x=>x);
        console.log(b);
        const canvas = document.querySelector("#canvas");
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(100, 100);
        let c = tf.browser.toPixels(a, canvas);
        c.then((e)=>{
            console.log(e);
        })

        for (let i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i + 0] = 190;  // R value
            imageData.data[i + 1] = 0;    // G value
            imageData.data[i + 2] = 210;  // B value
            imageData.data[i + 3] = 255;  // A value
        }
        imageData.data = b;
        console.log(imageData.data);

        ctx.putImageData(imageData, 20, 20);
    // });
}

load_model();