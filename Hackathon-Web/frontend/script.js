const API_BASE = "http://localhost:5000/api"; // change if deployed

// Save token in localStorage
function saveToken(token) {
  localStorage.setItem("token", token);
}

// Get token
function getToken() {
  return localStorage.getItem("token");
}

// Remove token (logout)
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

function setupLogout() {
  const btn = document.getElementById("logoutBtn");
  if (btn) btn.addEventListener("click", logout);
}

// ---------------- AUTH ----------------
async function signup() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  alert(data.msg || "Signup success");

  if (res.ok) window.location.href = "login.html";
}

async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (res.ok) {
    saveToken(data.token);
    alert("Login success");
    window.location.href = "index.html";
  } else {
    alert(data.msg || "Login failed");
  }
}

// ---------------- POSTS ----------------
async function loadPosts() {
  const res = await fetch(`${API_BASE}/posts`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const data = await res.json();

  const postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = "";
  data.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `<p><b>${post.author.name}</b>: ${post.content}</p>`;
    postsDiv.appendChild(div);
  });
}

async function createPost() {
  const content = document.getElementById("postContent").value;

  const res = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ content })
  });

  const data = await res.json();
  alert(data.msg || "Post created");

  if (res.ok) {
    document.getElementById("postContent").value = "";
    loadPosts();
  }
}

async function loadUserPosts() {
  const res = await fetch(`${API_BASE}/posts/mine`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  const data = await res.json();

  const userPostsDiv = document.getElementById("userPosts");
  userPostsDiv.innerHTML = "";
  data.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `<p>${post.content}</p>`;
    userPostsDiv.appendChild(div);
  });
}
