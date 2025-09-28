const API_BASE = "http://localhost:5000/api";

// ================= Register =================
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const res = await fetch(`${API_BASE}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (res.ok) {
          alert("✅ Registration successful!");
          window.location.href = "login.html";
        } else {
          alert("❌ " + data.message || "Registration failed");
        }
      } catch (err) {
        console.error(err);
        alert("Server error");
      }
    });
  }

  // ================= Comments (About Page) =================
  const commentForm = document.getElementById("commentForm");
  if (commentForm) {
    commentForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const text = document.getElementById("commentText").value;

      try {
        const res = await fetch(`${API_BASE}/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        const data = await res.json();
        if (res.ok) {
          document.getElementById("commentText").value = "";
          loadComments();
        } else {
          alert("❌ Failed to add comment");
        }
      } catch (err) {
        console.error(err);
      }
    });

    // Load comments
    async function loadComments() {
      try {
        const res = await fetch(`${API_BASE}/comments`);
        const comments = await res.json();
        const list = document.getElementById("commentList");
        list.innerHTML = "";
        comments.forEach((c) => {
          const li = document.createElement("li");
          li.textContent = c.text;
          list.appendChild(li);
        });
      } catch (err) {
        console.error(err);
      }
    }

    loadComments();
  }
});
 