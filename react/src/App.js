import React, { useEffect, useState } from "react";
import "./App.css";

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

function Row({ task, handleTaskChange }) {
  return (
    <div className="table-row">
      <div>
        <input
          id={task.id}
          type="checkbox"
          name="task"
          onChange={() => handleTaskChange(task)}
          checked={task.completed}
        />
      </div>
      <div>{task.completionDate}</div>
      <div>{task.task}</div>
    </div>
  );
}

function App() {
  const [property, setProperty] = useState(() => {
    return localStorage.getItem("property") || "";
  });
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [...TASK_LIST];
  });

  useEffect(() => {
    localStorage.setItem("property", property);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [property, tasks]);

  function handleClearStorage() {
    if (window.confirm("Clear Form?")) {
      setProperty("");
      setTasks([...TASK_LIST]);
    }
  }

  function handleTaskChange(task) {
    let updatedTasks = [...tasks];
    const index = tasks.findIndex((i) => i.id === task.id);
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !task.completed,
      completionDate: !task.completed ? new Date().toLocaleDateString() : "",
    };
    setTasks(updatedTasks);
  }

  return (
    <>
      <header>
        <div className="toolbar-wrapper">
          <div>
            <label htmlFor="property">Property Name: </label>
            <input
              value={property}
              onChange={(e) => setProperty(e.target.value)}
            />
          </div>
          <div className="toolbar-buttons-wrapper">
            <div
              className="toolbar-button"
              onClick={() => handleClearStorage()}
            >
              Reset
            </div>
            <div className="toolbar-button" onClick={() => window.print()}>
              Print
            </div>
          </div>
        </div>
        <h1>New Tenant Checklist</h1>
      </header>
      <div className="content-wrapper">
        <div className="table-wrapper">
          <div className="table-header">
            <div>Completed</div>
            <div>Date</div>
            <div>Task</div>
          </div>
          <div id="rows-wrapper">
            {tasks.map((task) => (
              <Row
                key={task.id}
                task={task}
                handleTaskChange={handleTaskChange}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
