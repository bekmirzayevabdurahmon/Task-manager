const elForm = document.querySelector(".add-task-form");

elForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = e.target.querySelector("input[name='taskName'").value;
    const description = e.target.querySelector("input[name='description'").value;
    const priority = e.target.querySelector("input[name='priority'").value;
    const status = e.target.querySelector("input[name='status'").value;
    const deadline = e.target.querySelector("input[name='deadline'").value;
    const folder = JSON.parse(localStorage.getItem("folder"));

    const folderId = folder ? folder._id : null;

    const task = { name, description, priority, status, deadline, folderId };

    console.log("Yuborilayotgan ma'lumot", JSON.stringify(folder));
    
    try {
        const res = await fetch("http://localhost:4000/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                task,
            }),
        });

        console.log(res);

        if(res.status >= 400) {
            const data = await res.json();
            alert(data.message);
            return;
        }

        const data = await res.json();
        localStorage.setItem("task", JSON.stringify(data.data));

        window.location.href = "page/dashboard";
    } catch (error) {
        alert(error.message)
    }
})