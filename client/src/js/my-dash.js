// dashboard.js (Axios bilan)
document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!user) {
      alert("Iltimos, avval tizimga kiring.");
      window.location.href = "/page/login";
      return;
    }
  
    document.getElementById("header-username").textContent = user.username || "Foydalanuvchi";
  
    try {
      const res = await axios.get("http://localhost:4000/api/folders", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
  
      console.log("Axios javobi:", res.data); // Javobni konsolga chiqaramiz
  
      const folders = res.data;
      localStorage.setItem("folders", JSON.stringify(folders.data));
  
      const folderList = document.getElementById("folder-list");
      folders.data.forEach((folder, index) => {
        const li = document.createElement("li");
        li.textContent = folder.name;
        li.classList.add("folder-item");
        li.dataset.index = index;
        li.addEventListener("click", () => renderTasks(folder.tasks));
        folderList.appendChild(li);
      });
  
      if (folders.data.length > 0) renderTasks(folders.data[0].tasks);
    } catch (error) {
      console.error("Axios xatosi:", error.response || error); // Xatolarni konsolga chiqaramiz
      alert("Xato: " + (error.response?.data?.message || error.message));
    }
  });
  
  // Tasklarni render qilish
  const taskList = document.getElementById("task-list");
  function renderTasks(tasks) {
    taskList.innerHTML = "";
    if (!tasks || tasks.length === 0) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="5">Tasklar topilmadi.</td>`;
      taskList.appendChild(tr);
      return;
    }
  
    tasks.forEach((task, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>#${index + 1}</td>
        <td>${task.title}</td>
        <td><span class="status ${task.completed ? "completed" : "pending"}">${
          task.completed ? "Bajarildi" : "Kutilmoqda"
        }</span></td>
        <td>${task.deadline || "N/A"}</td>
        <td><button class="action-btn">Batafsil</button></td>
      `;
      taskList.appendChild(tr);
    });
  }
  
  // Logout funksiyasi
  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("folders");
    window.location.href = "/page/login";
  }