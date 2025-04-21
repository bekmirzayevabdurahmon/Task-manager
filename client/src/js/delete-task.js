const elForm = document.querySelector(".delete-task");

elForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const task = JSON.parse(localStorage.getItem("task"));
    const taskId = task ? task._id : null;

    if (!taskId) {
        alert("Task ID topilmadi!");
        return;
    }

    console.log("O'chirilayotgan task ID:", taskId); 

    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            alert("Token topilmadi. Iltimos, qayta tizimga kiring.");
            window.location.href = "/page/login";
            return;
        }

        const res = await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`, 
            },
        });

        console.log("So'rov javobi:", res);

        if (res.status >= 400) {
            const data = await res.json();
            alert(data.message || "Taskni o'chirishda xato yuz berdi!");
            if (res.status === 401 || res.status === 403) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
                window.location.href = "/page/login";
            }
            return;
        }

        const data = await res.json();
        console.log("Javob:", data);

        localStorage.removeItem("task");

        alert("Task muvaffaqiyatli o'chirildi!");
        window.location.href = "/page/dashboard";
    } catch (error) {
        console.error("Xato:", error);
        alert("Xato: " + error.message);
    }
});