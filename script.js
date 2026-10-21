const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const formMessage = document.getElementById("form-message");
const submitBtn = document.getElementById("submit");
const toggleBtn = document.getElementById("toggle-password");
const eyeOn = document.getElementById("eye-on");
const eyeOff = document.getElementById("eye-off");

// Mostrar / ocultar senha
toggleBtn.addEventListener("click", () => {
  const show = passwordInput.type === "password";
  passwordInput.type = show ? "text" : "password";
  eyeOn.hidden = !show;
  eyeOff.hidden = show;
  toggleBtn.setAttribute("aria-label", show ? "Ocultar senha" : "Mostrar senha");
});

function setError(input, errorEl, message) {
  input.closest(".field").classList.toggle("invalid", Boolean(message));
  errorEl.textContent = message;
}

function validate() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  let valid = true;

  if (!email) {
    setError(emailInput, emailError, "Digite seu e-mail.");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError(emailInput, emailError, "Digite um e-mail válido.");
    valid = false;
  } else {
    setError(emailInput, emailError, "");
  }

  if (!password) {
    setError(passwordInput, passwordError, "Digite sua senha.");
    valid = false;
  } else if (password.length < 6) {
    setError(passwordInput, passwordError, "A senha deve ter pelo menos 6 caracteres.");
    valid = false;
  } else {
    setError(passwordInput, passwordError, "");
  }

  return valid;
}

emailInput.addEventListener("input", () => setError(emailInput, emailError, ""));
passwordInput.addEventListener("input", () => setError(passwordInput, passwordError, ""));

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  formMessage.textContent = "";
  formMessage.className = "form-message";

  if (!validate()) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Entrando...";

  try {
    // TROQUE pela chamada real ao seu backend, por exemplo:
    // const res = await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email: emailInput.value.trim(), password: passwordInput.value }),
    // });
    // if (!res.ok) throw new Error("E-mail ou senha inválidos.");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulação

    formMessage.textContent = "Login realizado com sucesso!";
    formMessage.classList.add("success-text");
  } catch (err) {
    formMessage.textContent = err.message || "Algo deu errado. Tente novamente.";
    formMessage.classList.add("error-text");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Entrar";
  }
});

// Efeito de iluminação que segue o mouse
(() => {
  const card = document.querySelector(".card");
  const lit = document.querySelectorAll(".field, .btn-social, .btn-primary");
  const root = document.documentElement;
  let raf = null;

  document.addEventListener("mousemove", (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      root.style.setProperty("--px", e.clientX + "px");
      root.style.setProperty("--py", e.clientY + "px");

      const c = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - c.left + "px");
      card.style.setProperty("--my", e.clientY - c.top + "px");

      lit.forEach((el) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", e.clientX - r.left + "px");
        el.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  });
})();
