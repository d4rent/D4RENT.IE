document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage

  if (!token) {
    alert('You are not logged in. Redirecting to login page.');
    window.location.href = '/index'; // Redirect to login page
    return;
  }

  try {
    // Fetch user profile data
    const response = await fetch('/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile data');
    }

    const profile = await response.json();

    // Populate the form fields with user data
    document.getElementById('name').value = `${profile.first_name} ${profile.last_name}`;
    document.getElementById('email').value = profile.email;
    document.getElementById('phone').value = profile.phone || '';
    document.getElementById('address').value = profile.address || '';
  } catch (err) {
    console.error('Error fetching profile:', err);
    alert('Failed to load profile. Please try again later.');
  }
});

// Handle form submission
document.getElementById('editProfileForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) {
    alert('You are not logged in. Redirecting to login page.');
    window.location.href = '/index';
    return;
  }

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();

  // Split the name into first and last name
  const [first_name, ...last_nameParts] = name.split(' ');
  const last_name = last_nameParts.join(' ');

  try {
    // Send updated profile data to the backend
    const response = await fetch('/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ first_name, last_name, email, phone, address }),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    alert('Profile updated successfully!');
    window.location.href = '/profile'; // Redirect to the profile page
  } catch (err) {
    console.error('Error updating profile:', err);
    alert('Failed to update profile. Please try again later.');
  }
});