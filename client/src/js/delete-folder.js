const elForm = document.querySelector(".create-folder-form");

elForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = e.target.querySelector("input[name='folderName']").value;
    const Folder = JSON.parse(localStorage.getItem("folder")); 

    const folderId = Folder ? Folder._id : null; 

    const folder = { name };
    console.log(folder)

    try {
        const res = await fetch(`http://localhost:4000/api/folders/${folderId}`, {
            method: "DELETE",
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