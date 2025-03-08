document.addEventListener("DOMContentLoaded", function () {
  // =============================
  // YouTube API Integration Code
  // =============================
  const API_KEY = "YOUR_YOUTUBE_API_KEY"; // Replace with your actual API key
  const searchInput = document.querySelector(".search-bar input");
  const searchBtn = document.querySelector(".search-bar button");

  // Create and append a container for video results
  const videoContainer = document.createElement("div");
  videoContainer.id = "videoContainer";
  const heroContainer = document.querySelector(".hero .container");
  if (heroContainer) {
    heroContainer.appendChild(videoContainer);
  } else {
    console.error("Hero container not found!");
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", function () {
      const query = searchInput.value.trim();
      if (query) {
        fetchVideos(query);
      }
    });
  }

  async function fetchVideos(query) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(query)}&key=${API_KEY}`
      );
      const data = await response.json();
      console.log("YouTube API response:", data);
      displayVideos(data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  function displayVideos(videos) {
    videoContainer.innerHTML = ""; // Clear previous results
    videos.forEach(video => {
      const videoId = video.id.videoId;
      const title = video.snippet.title;
      const thumbnail = video.snippet.thumbnails.medium.url;

      const videoElement = `
        <div class="video-card">
          <img src="${thumbnail}" alt="${title}" onclick="playVideo('${videoId}')">
          <p>${title}</p>
        </div>
      `;
      videoContainer.innerHTML += videoElement;
    });
  }

  window.playVideo = function(videoId) { // Exposed for onclick in HTML
    videoContainer.innerHTML = `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" 
      frameborder="0" allowfullscreen></iframe>
    `;
  };

  // ============================
  // Dark Mode Toggle Functionality
  // ============================
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      console.log("Dark mode toggled!");
    });
  } else {
    console.error("Dark mode toggle button not found!");
  }

  // ===============================
  // 3D Background Animation (Three.js)
  // ===============================
  function init3DBackground() {
    const canvas = document.getElementById('bgAnimation');
    if (!canvas) return; // Skip if canvas is not present
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Example: Rotating wireframe cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xff9500, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
  init3DBackground();

  // ============================
  // Quiz Section Functionality
  // ============================
  const quizQuestion = document.getElementById("quiz-question");
  const quizOptions = document.querySelectorAll(".quiz-option");
  const quizSubmit = document.getElementById("quiz-submit");
  const quizFeedback = document.getElementById("quiz-feedback");
  let selectedOption = "";

  if (quizOptions.length > 0) {
    quizOptions.forEach(option => {
      option.addEventListener("click", function() {
        // Remove 'selected' class from all options
        quizOptions.forEach(opt => opt.classList.remove("selected"));
        // Mark clicked option as selected
        this.classList.add("selected");
        selectedOption = this.textContent.trim();
      });
    });
  }

  // --- Ask AI Feature ---
  const askBtn = document.getElementById("askBtn");
  const doubtInput = document.getElementById("doubtInput");
  const doubtResponse = document.getElementById("doubtResponse");


  // ============================
  // Login Page Dynamic Settings
  // ============================
  // Check for login page container (assumes login page has an element with ID "grad1")
  const grad1 = document.getElementById("grad1");
  if (grad1) {
    // Fade-in effect for the login page container
    grad1.style.opacity = 0;
    setTimeout(() => {
      grad1.style.transition = "opacity 1s ease-in-out";
      grad1.style.opacity = 1;
    }, 100);

    // Attach form validation to login form if present
    const loginForm = grad1.querySelector("form");
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        if (!validateForm()) {
          e.preventDefault();
        }
      });
    }
  }

  function validateForm() {
    var fullname = document.getElementById("txtfullname");
    var username = document.getElementById("txtusername");
    var email = document.getElementById("txtmail");
    var phone = document.getElementById("txtnum");
    var password = document.getElementById("txtpassword");
    var confirmPassword = document.getElementById("txtconfirmpassword");
    var gender = document.querySelector('input[name="gender"]:checked');

    if (fullname && fullname.value.trim() === "") {
      alert("Please enter your Full Name.");
      fullname.focus();
      return false;
    }
    if (username && username.value.trim() === "") {
      alert("Please enter your Username.");
      username.focus();
      return false;
    }
    if (email && (email.value.trim() === "" || !email.value.includes("@"))) {
      alert("Please enter a valid Email.");
      email.focus();
      return false;
    }
    if (phone && (phone.value.trim() === "" || isNaN(phone.value) || phone.value.length < 10)) {
      alert("Please enter a valid Phone Number.");
      phone.focus();
      return false;
    }
    if (password && password.value.trim() === "") {
      alert("Please enter a Password.");
      password.focus();
      return false;
    }
    if (confirmPassword && (confirmPassword.value.trim() === "" || password.value !== confirmPassword.value)) {
      alert("Passwords do not match.");
      confirmPassword.focus();
      return false;
    }
    if (!gender) {
      alert("Please select your Gender.");
      return false;
    }
    alert("Form Submitted Successfully!");
    return true;
  }
});
