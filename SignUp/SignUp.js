// SignUp.js

document.addEventListener('DOMContentLoaded', function() {
    const guestBtn = document.getElementById('guestBtn');
    const ownerBtn = document.getElementById('ownerBtn');
    const roleLabel = document.getElementById('signup-role-label');
    const ownerFields = document.querySelectorAll('.owner-only');
    const signupForm = document.getElementById('signupForm');
    const termsCheckbox = document.getElementById('terms');
    const signupBtn = document.getElementById('signupBtn');
    const confirmPassword = document.getElementById('confirmPassword');
    const passwordRow = document.getElementById('password-row');
    const googleSignupBtn = document.getElementById('googleSignupBtn');

    function setRole(role) {
        if (role === 'Guest') {
            guestBtn.classList.add('active');
            ownerBtn.classList.remove('active');
            roleLabel.textContent = 'as Guest';
            roleLabel.style.fontSize = '1.75rem';
            roleLabel.style.fontWeight = '500';
            ownerFields.forEach(f => f.style.display = 'none');
            passwordRow.classList.add('form-row-stacked');
        } else {
            guestBtn.classList.remove('active');
            ownerBtn.classList.add('active');
            roleLabel.textContent = 'as Owner';
            roleLabel.style.fontSize = '1.75rem';
            roleLabel.style.fontWeight = '500';
            ownerFields.forEach(f => f.style.display = 'block');
            passwordRow.classList.remove('form-row-stacked');
        }
    }

    guestBtn.addEventListener('click', function() {
        setRole('Guest');
    });
    ownerBtn.addEventListener('click', function() {
        setRole('Owner');
    });

    // Enable Sign Up button only if terms are checked
    termsCheckbox.addEventListener('change', function() {
        signupBtn.disabled = !termsCheckbox.checked;
    });

    // Prevent form submission for demo
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Sign Up form submitted!');
    });

    // Google Sign Up functionality
    const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: "439859914693-jk0ep8cece1m5ib4enk3616ckgtb4a0p.apps.googleusercontent.com", // Replace with your actual Client ID
        scope: "email profile openid",
        callback: (tokenResponse) => {
            const jwt = tokenResponse.access_token;

            // ✅ Get user info from Google
            fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
            })
            .then(res => res.json())
            .then(user => {
                console.log("✅ Google User Info:", user);
                const role = guestBtn.classList.contains('active') ? 'guest' : 'owner';

                // ✅ Auto-fill signup form
                document.getElementById('fullName').value = user.name;
                document.getElementById('email').value = user.email;

                // ✅ Store in localStorage (simulate user registration)
                let signedUpUsers = JSON.parse(localStorage.getItem("signedUpUsers")) || [];
                const alreadyExists = signedUpUsers.some(u => u.email === user.email);

                    if (!alreadyExists) {
                        signedUpUsers.push({ email: user.email, role: role });
                        localStorage.setItem("signedUpUsers", JSON.stringify(signedUpUsers));
                        alert(`Signed up successfully as ${role.toUpperCase()}: ${user.name}`);
                    } else {
                        alert("This Google account is already signed up.");
                    }

                // ✅ Redirect to Sign-In page after delay (1.5 seconds for UX)
                setTimeout(() => {
                    window.location.href = "../Login/login.html"; // 🔁 Replace with your actual Sign-In page path
                }, 1500);
        
            })
            .catch(err => {
                console.error("❌ Error fetching user info:", err);
                alert("Failed to get Google user data.");
            });
        }
    });
    
    document.getElementById("googleSignupBtn").addEventListener("click", () => {
        tokenClient.requestAccessToken(); // ✅ This opens the real sign-in popup
    });
});

function showTopAlert(message, type = "success", duration = 3000) {
    const alert = document.getElementById('top-alert');
    alert.textContent = message;
    alert.className = 'top-alert' + (type === 'error' ? ' error' : '');
    alert.style.display = 'block';
    alert.style.opacity = '1';
    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => {
        alert.style.display = 'none';
        }, 400);
    }, duration);
}

// Example usage for login error:
function handleLoginError() {
  // Remove any previous alerts/warnings inside the login card
    const oldWarning = document.querySelector('.login-form .warning');
    if (oldWarning) oldWarning.remove();
    // Show top error alert
    showTopAlert('Invalid credentials. Please try again.', 'error', 3000);
}

window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const scrolled = window.pageYOffset;
    hero.style.backgroundPosition = 'center ' + (scrolled * 0.4) + 'px';
});

// Animate hero-left on page load
window.addEventListener('DOMContentLoaded', function() {
    var heroLeft = document.querySelector('.hero-left');
    if (heroLeft) {
        setTimeout(function() {
            heroLeft.classList.add('animated');
        }, 200);
    }

    // Animate social icons when in view
    var icons = document.querySelectorAll('.social-icons a');
    var iconsAnimated = false;
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !iconsAnimated) {
                icons.forEach(function(icon, i) {
                    setTimeout(function() {
                        icon.classList.add('animated');
                    }, i * 200);
                });
                iconsAnimated = true;
            }
        });
    }, { threshold: 0.3 });

    if (icons.length) {
        observer.observe(icons[0].parentElement); // observe the .social-icons container
    }
});