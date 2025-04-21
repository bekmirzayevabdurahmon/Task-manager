const elForm = document.querySelector(".login-form");

elForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = e.target.querySelector("input[name='email']").value;
    const password = e.target.querySelector("input[name='password']").value;
    const userData = { email, password };

    console.log("Yuborilayotgan ma'lumotlar:", JSON.stringify(userData));

    try {
        const res = await fetch("http://localhost:4000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await res.json();
        console.log("Backenddan qaytgan javob:", data); // Javobni konsolda ko'rish uchun

        if (res.status >= 400) {
            alert(data.message || "Login jarayonida xato yuz berdi!"); // Xato xabarini aniq ko'rsatish
            return;
        }

        const accessToken = data.AccessToken;
        const refreshToken = data.RefreshToken;
        const user = data.data;

        if (!accessToken || !refreshToken || !user) {
            alert("Javobda kerakli ma'lumotlar topilmadi (token yoki foydalanuvchi ma'lumotlari yo'q).");
            return;
        }

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        window.location.href = "/page/dashboard";
    } catch (error) {
        alert("Xato: " + error.message);
    }
});