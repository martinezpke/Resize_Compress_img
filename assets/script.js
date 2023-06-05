const uploadBox = document.querySelector(".upload__img"),
previewImg = uploadBox.querySelector("img"),
fileInput = uploadBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input");

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
}

fileInput.addEventListener("change", loadFile);

uploadBox.addEventListener("click", () => fileInput.click());
