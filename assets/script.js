const uploadBox = document.querySelector(".upload__img"),
    previewImg = uploadBox.querySelector("img"),
    fileInput = uploadBox.querySelector("input"),
    widthInput = document.querySelector(".width input"),
    heightInput = document.querySelector(".height input"),
    ratioInput = document.querySelector(".ratio input"),
    qualityInput = document.querySelector(".quality input"),
    btnDownLoad = document.querySelector(".btn__Download");

let ogImageRatios;

const loadFile = (event) => {
    const file = event.target.files[0]
    if (!file) return;
    previewImg.src = URL.createObjectURL(file)
    previewImg.addEventListener("load", () => {
        document.querySelector(".container__wrapper").classList.add("active");
    })
    console.log(file)
    widthInput.value = previewImg.naturalWidth;
    heightInput.value = previewImg.naturalHeight;
    ogImageRatios = previewImg.naturalWidth / previewImg.naturalHeight;
}

widthInput.addEventListener("keyup", () => {
    const height = ratioInput.checked ? widthInput.value / ogImageRatios : heightInput.value;
    heightInput.value = Math.floor(height);
})

heightInput.addEventListener("keyup", () => {
    const width = ratioInput.checked ? heightInput.value * ogImageRatios : widthInput.value;
    widthInput.value = Math.floor(width);
});

/* 

    La función `downLoad()` es una función que parece estar diseñada para descargar una imagen generada a partir de un elemento `<canvas>` en el navegador. A continuación se detalla el flujo de la función:

    1. Se crea un elemento `<canvas>` y un elemento `<a>` (un enlace) utilizando el método `document.createElement()`. 
    Estos elementos serán utilizados para generar y descargar la imagen respectivamente.

    2. Se obtiene el contexto 2D del elemento `<canvas>` mediante `canvas.getContext("2d")`. 
    Esto permitirá realizar operaciones de dibujo en el lienzo del canvas.

    3. Se establecen las dimensiones del canvas utilizando los valores de ancho y alto extraídos de los elementos 
    de entrada `widthInput` y `heightInput` respectivamente.

    4. Se define la variable `imgQuality` que se asignará dependiendo de si el checkbox `qualityInput` está marcado o no. Si está marcado, `
    imgQuality` será igual a 0.5, de lo contrario será igual a 1.0. Esta variable determinará la calidad de la imagen generada.

    5. Se utiliza el método `drawImage()` del contexto del canvas (`img`) para dibujar la imagen de previsualización 
    (`previewImg`) en el canvas, con las dimensiones especificadas.

    6. Se establece el atributo `href` del elemento `<a>` (`a.href`) 
    con la imagen generada a partir del contenido del canvas utilizando `canvas.toDataURL()`. 
    La función `toDataURL()` devuelve una representación en formato de cadena base64 de la imagen en el canvas, 
    y se especifica que la imagen se debe codificar en formato "image/jpeg" con la calidad determinada por `imgQuality`.

    7. Se establece el atributo `download` del elemento `<a>` (`a.download`) con el valor de `new Date().getTime()`. 
    Esto le da un nombre único a la imagen descargada basado en la marca de tiempo actual.

    8. Se utiliza el método `click()` en el elemento `<a>` (`a.click()`) 
    para activar el evento de clic en el enlace y desencadenar la descarga de la imagen.

    En resumen, la función `downLoad()` crea un canvas, dibuja una imagen en él, 
    genera un enlace de descarga con la imagen en formato base64 y la descarga al hacer clic en ese enlace.
*/


function downLoad() {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const img = canvas.getContext("2d");

    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    const imgQuality = qualityInput.checked ? 0.5 : 1.0;

    img.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

    a.href = canvas.toDataURL("image/jpeg", imgQuality);
    a.download = new Date().getTime();
    a.click();
}


btnDownLoad.addEventListener("click", () => downLoad());
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());
