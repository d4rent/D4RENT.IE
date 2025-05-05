// Slideshow functionality
let slideIndex = 0;
function showSlides() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => (slide.style.display = "none")); // Hide all slides

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1; // Reset to the first slide
  }

  slides[slideIndex - 1].style.display = "block"; // Show the current slide
  setTimeout(showSlides, 5000); // Change slide every 5 seconds
}

// Initialize the slideshow on page load
document.addEventListener("DOMContentLoaded", showSlides);

// Dropdown toggle functionality
function toggleDropdown(step) {
  const dropdown = document.getElementById(`dropdown-${step}`);
  const isVisible = dropdown.style.display === "block";

  // Hide all dropdowns
  const allDropdowns = document.querySelectorAll(".dropdown-section");
  allDropdowns.forEach((section) => (section.style.display = "none"));

  // Toggle the clicked dropdown
  if (!isVisible) {
    dropdown.style.display = "block";
  }
}

// Map initialization
let map, geocoder, marker;

function initMap() {
  const mapOptions = {
    center: { lat: 53.334028, lng: -6.253549 }, // Default center (Dublin 4)
    zoom: 14,
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  geocoder = new google.maps.Geocoder(); // Initialize the geocoder

  // Geocode the address for The Waterloo
  const address = "The Waterloo, Baggot Street Upper, Dublin, Ireland";
  geocodeAddress(address);
}

// Function to geocode an address and place a marker
function geocodeAddress(address) {
  geocoder.geocode({ address: address }, function (results, status) {
    if (status === "OK") {
      // Center the map on the geocoded location
      map.setCenter(results[0].geometry.location);

      // Add a marker for the location
      marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        title: "D4RENT.IE",
      });

      // Optional: Zoom in on the location
      map.setZoom(16);
    } else {
      console.error("Geocode was not successful for the following reason: " + status);
      alert("Failed to load the map. Please try again later.");
    }
  });
}