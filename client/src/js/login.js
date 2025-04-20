const elForm = document.querySelector(".login-form");

elForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = e.target.querySelector("input[name='email']").value;
    const password = e.target.querySelector("input[name='password']").value;
    const userData = { email, password };

    console.log("Yuborilaytogan ma'lumotlar", JSON.stringify(userData));
    localStorage.setItem("user", JSON.stringify(userData));

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

        if (res.status >= 400) {
            const data = await res.json();
            alert(data.message);
            return;
        }

        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data.data));

        window.location.href = "/page/dashboard";
    } catch (error) {
        alert(error.message)
    }
})