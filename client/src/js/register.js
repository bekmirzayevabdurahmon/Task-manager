const elForm = document.querySelector(".register-form");

elForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = e.target.querySelector("input[name='username']").value;
    const email = e.target.querySelector("input[name='email']").value;
    const password = e.target.querySelector("input[name='password']").value;
    const userData = { username, email, password };

    console.log("Yuborilaytogan ma'lumotlar", JSON.stringify(userData));
    localStorage.setItem("user", JSON.stringify(userData));

    try {
        const res = await fetch("http://localhost:4000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
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

        window.location.href = "/";
    } catch (error) {
        alert(error.message)
    }
})