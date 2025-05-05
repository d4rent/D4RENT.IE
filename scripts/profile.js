// Fetch and display the user's profile
async function fetchProfile() {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage

  if (!token) {
    alert('You are not logged in. Please log in first.');
    window.location.href = 'login.html'; // Redirect to login page if no token is found
    return;
  }

  try {
    // Fetch the profile data
    const response = await fetch('/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      handleErrorResponse(response);
      return;
    }

    const data = await response.json();
    console.log('Profile data:', data);

    // Check the user's role and populate the page accordingly
    if (data.role === 'admin') {
      console.log('Admin profile loaded');
      populateProfile(data);
      populateProperties(data.properties); // Admin-specific properties
    } else if (data.role === 'agent') {
      console.log('Agent profile loaded');
      populateProfile(data);
      populateAgentProperties(data.properties); // Agent-specific properties
    } else {
      alert('Unknown role. Please contact support.');
    }
  } catch (err) {
    console.error('Error fetching profile:', err);
    alert('Failed to load profile. Please try again later.');
  }
}

// Function to populate agent-specific properties
function populateAgentProperties(properties) {
  const propertiesContainer = document.getElementById('properties');
  propertiesContainer.innerHTML = ''; // Clear existing properties

  if (properties && properties.length > 0) {
    properties.forEach((property) => {
      const propertyElement = document.createElement('div');
      propertyElement.className = 'property';
      propertyElement.innerHTML = `
        <h3>${property.title || 'No Title'}</h3>
        <p>Location: ${property.location || 'Unknown'}</p>
        <p>Commission: ${property.commission || 0}%</p>
        <p>Status: ${property.status || 'N/A'}</p>
      `;
      propertiesContainer.appendChild(propertyElement);
    });
  } else {
    propertiesContainer.innerHTML = '<p>No properties found for this agent.</p>';
  }
}

// Function to populate admin-specific properties
function populateProperties(properties) {
  const propertiesContainer = document.getElementById('properties');
  propertiesContainer.innerHTML = ''; // Clear existing properties

  if (properties && properties.length > 0) {
    properties.forEach((property) => {
      const propertyElement = document.createElement('div');
      propertyElement.className = 'property';
      propertyElement.innerHTML = `
        <h3>${property.title || 'No Title'}</h3>
        <p>Location: ${property.location || 'Unknown'}</p>
        <p>Commission: ${property.commission || 0}%</p>
        <p>Status: ${property.status || 'N/A'}</p>
      `;
      propertiesContainer.appendChild(propertyElement);
    });
  } else {
    propertiesContainer.innerHTML = '<p>No properties found for this admin.</p>';
  }
}

// Function to populate the profile (shared by both admin and agent)
function populateProfile(data) {
  document.getElementById('profileName').textContent = `${data.first_name || ''} ${data.last_name || ''}`;
  document.getElementById('profileEmail').textContent = data.email || 'No Email';
  document.getElementById('profileRole').textContent = data.role || 'Unknown Role';
}

// Handle error responses
function handleErrorResponse(response) {
  if (response.status === 401) {
    alert('Unauthorized. Please log in again.');
    localStorage.removeItem('token'); // Clear invalid token
    window.location.href = 'login.html'; // Redirect to login page
  } else if (response.status === 404) {
    alert('Profile not found.');
  } else {
    alert('An error occurred. Please try again later.');
  }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchProfile);