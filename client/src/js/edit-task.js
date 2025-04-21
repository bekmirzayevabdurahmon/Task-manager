const elForm = document.querySelector(".edit-task-form");

elForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = e.target.querySelector("input[name='taskName']").value;
    const description = e.target.querySelector("input[name='description']").value;
    const priority = e.target.querySelector("input[name='priority']").value;
    const status = e.target.querySelector("input[name='status']").value;
    const deadline = e.target.querySelector("input[name='deadline']").value;
    const Task = JSON.parse(localStorage.getItem("task"));
    const taskId = Task ? Task._id : null;

    if (!taskId) {
        alert("Task ID topilmadi!");
        return;
    }

    const task = { name, description, priority, status, deadline };

    console.log("Yuborilayotgan ma'lumot:", JSON.stringify(task));

    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            alert("Token topilmadi. Iltimos, qayta tizimga kiring.");
            window.location.href = "/page/login";
            return;
        }

        const res = await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(task),
        });

        console.log("So'rov javobi:", res);

        if (res.status >= 400) {
            const data = await res.json();
            alert(data.message || "Taskni tahrirlashda xato yuz berdi!");
            if (res.status === 401 || res.status === 403) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
                window.location.href = "/page/login";
            }
            return;
        }

        const data = await res.json();
        localStorage.setItem("task", JSON.stringify(data.data));

        alert("Task muvaffaqiyatli tahrirlandi!");
        window.location.href = "/page/dashboard";
    } catch (error) {
        console.error("Xato:", error);
        alert("Xato: " + error.message);
    }
});