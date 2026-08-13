const imageInput = document.getElementById("imageInput");

const browseBtn = document.getElementById("browseBtn");

const uploadBox = document.getElementById("uploadBox");

const previewSection =
    document.getElementById("previewSection");

const previewImage =
    document.getElementById("previewImage");

const removeBtn =
    document.getElementById("removeBtn");

const generateBtn =
    document.getElementById("generateBtn");

const loading =
    document.getElementById("loading");

const resultCard =
    document.getElementById("resultCard");

const captionText =
    document.getElementById("captionText");

const copyBtn =
    document.getElementById("copyBtn");

let selectedFile = null;


/* -----------------------------
   BROWSE IMAGE
----------------------------- */

browseBtn.addEventListener("click", (event) => {

    event.stopPropagation();

    imageInput.click();

});


uploadBox.addEventListener("click", () => {

    imageInput.click();

});


/* -----------------------------
   FILE SELECT
----------------------------- */

imageInput.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (file) {

        handleFile(file);

    }

});


/* -----------------------------
   HANDLE FILE
----------------------------- */

function handleFile(file) {

    if (!file.type.startsWith("image/")) {

        alert("Please select an image file.");

        return;

    }


    if (file.size > 10 * 1024 * 1024) {

        alert("Image must be smaller than 10MB.");

        return;

    }


    selectedFile = file;


    const reader = new FileReader();


    reader.onload = function(event) {

        previewImage.src = event.target.result;

        previewSection.style.display = "block";

        generateBtn.disabled = false;

        resultCard.style.display = "none";

    };


    reader.readAsDataURL(file);

}


/* -----------------------------
   DRAG & DROP
----------------------------- */

uploadBox.addEventListener("dragover", (event) => {

    event.preventDefault();

    uploadBox.classList.add("dragover");

});


uploadBox.addEventListener("dragleave", () => {

    uploadBox.classList.remove("dragover");

});


uploadBox.addEventListener("drop", (event) => {

    event.preventDefault();

    uploadBox.classList.remove("dragover");

    const file = event.dataTransfer.files[0];

    if (file) {

        handleFile(file);

    }

});


/* -----------------------------
   REMOVE IMAGE
----------------------------- */

removeBtn.addEventListener("click", () => {

    selectedFile = null;

    imageInput.value = "";

    previewImage.src = "";

    previewSection.style.display = "none";

    generateBtn.disabled = true;

    resultCard.style.display = "none";

});


/* -----------------------------
   GENERATE CAPTION
----------------------------- */

generateBtn.addEventListener("click", async () => {

    if (!selectedFile) {

        alert("Please select an image first.");

        return;

    }


    const formData = new FormData();

    formData.append("file", selectedFile);


    generateBtn.disabled = true;

    loading.style.display = "block";

    resultCard.style.display = "none";


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/generate-caption",
            {
                method: "POST",
                body: formData
            }
        );


        if (!response.ok) {

            throw new Error(
                "Server returned an error: " +
                response.status
            );

        }


        const data = await response.json();


        captionText.textContent = data.caption;


        resultCard.style.display = "block";


        resultCard.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to connect to the backend. " +
            "Make sure FastAPI is running."
        );

    }

    finally {

        loading.style.display = "none";

        generateBtn.disabled = false;

    }

});


/* -----------------------------
   COPY CAPTION
----------------------------- */

copyBtn.addEventListener("click", async () => {

    const caption = captionText.textContent;

    if (!caption) return;


    try {

        await navigator.clipboard.writeText(caption);

        copyBtn.textContent = "✓ Copied";

        setTimeout(() => {

            copyBtn.textContent = "📋 Copy";

        }, 1500);

    }

    catch (error) {

        console.error(error);

    }

});