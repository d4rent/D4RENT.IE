// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  try {
    // Make the login request
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    // Parse the JSON response
    const data = await response.json();

    if (!response.ok) {
      // Show backend error message if available
      alert('Login failed: ' + (data.error || response.statusText));
      return;
    }

    const { access_token, user } = data;

    if (access_token && user) {
      // Store the token and user information in localStorage
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect based on the user's role
      if (user.role === 'admin') {
        window.location.href = '/pages/seanquinnprofile.html';
      } else if (user.role === 'agent') {
        window.location.href = '/pages/agentprofileedit.html';
      } else {
        alert('Unknown role. Please contact support.');
      }
    } else {
      alert('Login failed: No token or user information received.');
    }
  } catch (err) {
    console.error('Error during login:', err);
    alert('Login failed! Please try again later.');
  } finally {
    // Clear the password field for security
    document.getElementById('password').value = '';
  }
});

// Open the registration popup
function openRegisterPopup() {
  const popup = document.getElementById('registerPopup');
  if (popup) {
    popup.style.display = 'block';
  } else {
    console.error('Register popup element not found.');
  }
}

// Close the registration popup
function closeRegisterPopup() {
  const popup = document.getElementById('registerPopup');
  if (popup) {
    popup.style.display = 'none';
  } else {
    console.error('Register popup element not found.');
  }
}