import styles from "./App.module.css";
import { TASK_LIST } from "./constants";
import { For, createSignal, createEffect } from "solid-js";

function App() {
  const [property, setProperty] = createSignal(
    localStorage.getItem("property") || ""
  );
  const [tasks, setTasks] = createSignal(
    JSON.parse(localStorage.getItem("tasks")) || [...TASK_LIST]
  );

  createEffect(() => {
    localStorage.setItem("property", property());
    localStorage.setItem("tasks", JSON.stringify(tasks()));
  });

  function handleClearStorage() {
    if (window.confirm("Clear Form?")) {
      setProperty("");
      setTasks([...TASK_LIST]);
    }
  }

  function handleTaskChange(task) {
    let updatedTasks = [...tasks()];
    const index = tasks().findIndex((i) => i.id === task.id);
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
        <div class={styles.toolbarWrapper}>
          <div>
            <label for="property">Property Name: </label>
            <input
              id="property"
              value={property()}
              onChange={(e) => setProperty(e.target.value)}
            />
          </div>
          <div class={styles.toolbarButtonsWrapper}>
            <div
              class={styles.toolbarButton}
              onClick={() => handleClearStorage()}
            >
              Reset
            </div>
            <div class={styles.toolbarButton} onClick={() => window.print()}>
              Print
            </div>
          </div>
        </div>
        <h1>New Tenant Checklist</h1>
      </header>
      <div class={styles.contentWrapper}>
        <div class={styles.tableWrapper}>
          <div class={styles.tableHeader}>
            <div>Completed</div>
            <div>Date</div>
            <div>Task</div>
          </div>
          <For each={tasks()}>
            {(task) => {
              return (
                <div class={styles.tableRow}>
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
            }}
          </For>
        </div>
      </div>
    </>
  );
}

export default App;
