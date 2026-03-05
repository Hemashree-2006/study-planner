let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
                ${task.subject} - ${task.deadline} - ${task.time} - ${task.priority}
            </span>
            <button onclick="toggleComplete(${index})">
                ${task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

document.getElementById("taskForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const subject = document.getElementById("subject").value;
    const deadline = document.getElementById("deadline").value;
    const time = document.getElementById("taskTime").value;
    const priority = document.getElementById("priority").value;

    tasks.push({
        subject,
        deadline,
        time,
        priority,
        completed: false
    });

    saveTasks();
    renderTasks();
    this.reset();
});

renderTasks();
// Dark Mode Toggle
const toggleBtn = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

toggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});
setInterval(function () {

    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM

    tasks.forEach(function (task) {

        if (task.time === currentTime && !task.completed) {

            alert("⏰ Time to study: " + task.subject);

            let audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
            audio.play();

        }

    });

}, 60000); // checks every 1 minute