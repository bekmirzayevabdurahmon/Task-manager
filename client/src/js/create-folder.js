const elForm = document.querySelector(".create-folder-form");

elForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = e.target.querySelector("input[name='folderName']").value;
    const user = JSON.parse(localStorage.getItem("user"));  // userni localStoragedan olish

    const userId = user ? user._id : null; 

    const folder = { name, userId};
    console.log(folder)

    console.log("Yuborilayotgan ma'lumot", JSON.stringify(folder))

    try {
        const res = await fetch("http://localhost:4000/api/folders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                folder,
            })
        });

        console.log(res)

        if (res.status >= 400) {
            const data = await res.json();
            alert(data.message);
            return;
        }

        const data = await res.json();
        localStorage.setItem("folder", JSON.stringify(data.data));

        window.location.href = "page/dashboard";
    } catch (error) {
        alert(error.message)
    }
})