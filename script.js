let selectedFile;
let addedText = "";

document.getElementById('imageUpload').addEventListener('change', (event) => {
  selectedFile = event.target.files[0];
  let reader = new FileReader();
  reader.onload = function(event) {
    let img = document.getElementById('uploadedImage');
    img.src = event.target.result;
  }
  reader.readAsDataURL(selectedFile);
});

function addText() {
  addedText = document.getElementById('textInput').value;

  // Hide the original image
  let uploadedImage = document.getElementById('uploadedImage');
  uploadedImage.style.display = "none";

  // Set the added text on the image
  let addedTextElement = document.getElementById('addedText');
  addedTextElement.innerText = addedText;

  // Call the previewText function to display the preview
  previewText();
}

function previewText() {
  let img = document.getElementById('uploadedImage');
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0);
  const textSize = canvas.width * 0.05; // Adjust the percentage as needed
  ctx.font = textSize + "px Arial";
  ctx.fillStyle = "white"; // You can adjust the text color for the preview
  const textX = canvas.width * 0.7; // Adjust the x-position percentage as needed
  const textY = canvas.height * 0.9; // Adjust the y-position percentage as needed
  ctx.fillText(addedText, textX, textY); // Adjust the position of the text for the preview
  let previewImg = document.getElementById('previewImage');
  previewImg.src = canvas.toDataURL('image/png');
}

function downloadImage() {
  let canvas = document.createElement('canvas');
  let img = document.getElementById('uploadedImage');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  let context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);
  let textSize = canvas.width * 0.05; // Adjust the percentage as needed
  context.font = textSize + "px Arial";
  context.fillStyle = "white"; // You can adjust the text color for the downloaded image
  let textX = canvas.width * 0.7; // Adjust the x-position percentage as needed
  let textY = canvas.height * 0.9; // Adjust the y-position percentage as needed
  context.fillText(addedText, textX, textY); // Adjust the position of the text for the downloaded image

  // Access the file name
  let fileName = selectedFile.name;
  let fileExtension = fileName.split('.').pop(); // Get the file extension

  // Download the image with the modified file name
  let link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = `${fileName.split('.')[0]}-watermark.${fileExtension}`;
  link.click();
}

