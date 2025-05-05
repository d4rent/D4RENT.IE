// Handle form submission (optional if using the default form action)
document.getElementById('propertyForm').addEventListener('submit', (event) => {
  const form = event.target;

  // Validate that at least one image is uploaded
  const images = document.getElementById('images').files;
  if (images.length === 0) {
    event.preventDefault(); // Prevent form submission
    alert('Please upload at least one image.');
    return;
  }

  // Log form data (for debugging)
  console.log('Form submitted:', new FormData(form));
});

// Optional: Preview uploaded images
document.getElementById('images').addEventListener('change', (event) => {
  const imageContainer = document.createElement('div');
  imageContainer.id = 'imagePreview';
  imageContainer.innerHTML = ''; // Clear previous previews

  Array.from(event.target.files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.width = '100px';
      img.style.margin = '5px';
      imageContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  });

  document.querySelector('.upload-property').appendChild(imageContainer);
});

// Add the status change event listener
document.getElementById('status').addEventListener('change', (event) => {
  const status = event.target.value;
  const priceField = document.getElementById('priceField');
  const priceInput = document.getElementById('price');

  if (status === 'price') {
    // Show the price input field and make it required
    priceField.style.display = 'block';
    priceInput.setAttribute('required', 'required');
  } else {
    // Hide the price input field and remove the required attribute
    priceField.style.display = 'none';
    priceInput.removeAttribute('required');
  }
});