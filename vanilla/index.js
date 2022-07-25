const TASK_LIST = [
  {
    id: "task-1",
    task: "Phone screen",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-2",
    task: "Start tenant folder",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-3",
    task: "Show property",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-4",
    task: "Receive & review application",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-5",
    task: "Collect application fee",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-6",
    task: "Background, eviction, & credit check verification",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-7",
    task: "Employment verification",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-8",
    task: "Previous landlord references",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-9",
    task: "Pet screening",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-10",
    task: "Send acceptance / denial letter",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-11",
    task: "Deposit to hold received & form completed",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-12",
    task: "Schedule lease signing appointment",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-13",
    task: "Sign lease - everyone over 18 y.o.",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-14",
    task: "Sign addendums - rules & regulations, pet addendum, lead paint brochure",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-15",
    task: "Move-in condition inspection & report",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-16",
    task: "Receive security deposit, first month's rent, pet fees, etc. via certified funds",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-17",
    task: "Receive copy of renter's insurance policy",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-18",
    task: "Confirm utilities transferred to tenant",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-19",
    task: "Set up tenant account in PM software",
    completed: false,
    completionDate: "",
  },
  {
    id: "task-20",
    task: "Give keys to tenant",
    completed: false,
    completionDate: "",
  },
];

const property = document.getElementById("property");
property.value = localStorage.getItem("property");
property.addEventListener("input", () =>
  localStorage.setItem("property", property.value)
);

let tasks = [];

function renderTable() {
  loadFromStore();
  const rows = document.getElementById("rows-wrapper");
  let fragment = document.createDocumentFragment();
  tasks.forEach((e) => {
    let task = document.createElement("div");
    task.className = "table-row";
    task.innerHTML = `
    <div>
      <input id='${e.id}' type="checkbox" name="task" ${
      e.completed ? "checked" : ""
    } />
    </div>
    <div class="date">${e.completionDate}</div>
    <div>${e.task}</div>
    `;
    fragment.appendChild(task);
  });
  rows.appendChild(fragment);
}

function loadFromStore() {
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  } else {
    tasks = [...TASK_LIST];
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

renderTable();

const checkboxes = document.querySelectorAll("input[name='task']");
checkboxes.forEach((e) => {
  e.addEventListener("change", () => handleTaskChange(e));
});

function handleTaskChange(task) {
  let index = tasks.findIndex((i) => i.id == task.id);
  let dateToUpdate = document.getElementById(task.id).parentElement
    .nextElementSibling;
  if (task.checked) {
    tasks[index] = {
      ...tasks[index],
      completed: true,
      completionDate: new Date().toLocaleDateString(),
    };
    localStorage.setItem("tasks", JSON.stringify(tasks));
    dateToUpdate.textContent = tasks[index].completionDate;
  } else {
    tasks[index] = {
      ...tasks[index],
      completed: false,
      completionDate: "",
    };
    localStorage.setItem("tasks", JSON.stringify(tasks));
    dateToUpdate.textContent = "";
  }
}

const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener(
  "click",
  () => {
    if (confirm("Clear Form?")) {
      localStorage.setItem("property", "");
      localStorage.setItem("tasks", JSON.stringify(TASK_LIST));
      location.reload();
    }
  },
  false
);

const printBtn = document.getElementById("print-btn");
printBtn.addEventListener(
  "click",
  () => {
    window.print();
  },
  false
);
