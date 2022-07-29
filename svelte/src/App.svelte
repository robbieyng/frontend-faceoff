<script>
  import { TASK_LIST } from "./constants";

  let property = localStorage.getItem("property") || "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [...TASK_LIST];

  function handleTaskChange(index) {
    let updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,
      completionDate: !updatedTasks[index].completed
        ? new Date().toLocaleDateString()
        : "",
    };
    tasks = updatedTasks;
  }
  // reactive declaration - like watch in Vue
  $: {
    localStorage.setItem("property", property);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  function handlePrint() {
    window.print();
  }
  function handleReset() {
    if (window.confirm("Clear Form?")) {
      property = "";
      tasks = [...TASK_LIST];
    }
  }
</script>

<header>
  <div class="toolbar-wrapper">
    <div>
      <label for="property">Property Name: </label>
      <input id="property" bind:value={property} />
    </div>
    <div class="toolbar-buttons-wrapper">
      <div class="toolbar-button" on:click={handleReset}>Reset</div>
      <div class="toolbar-button" on:click={handlePrint}>Print</div>
    </div>
  </div>
  <h1>New Tenant Checklist</h1>
</header>
<div class="content-wrapper">
  <div class="table-wrapper">
    <div class="table-header">
      <div>Completed</div>
      <div>Date</div>
      <div>Task</div>
    </div>
    {#each tasks as task, i}
      <div class="table-row">
        <div>
          <input
            type="checkbox"
            checked={task.completed}
            on:click={() => handleTaskChange(i)}
          />
        </div>
        <div>{task.completionDate}</div>
        <div>{task.task}</div>
      </div>
    {/each}
  </div>
</div>

<style>
  .toolbar-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .toolbar-buttons-wrapper {
    display: flex;
  }

  @media print {
    .toolbar-buttons-wrapper {
      display: none;
    }
  }

  .toolbar-button {
    padding: 5px;
    background-color: #fff;
    border: #fff solid 1px;
    border-radius: 2px;
    cursor: pointer;
    box-shadow: 1px 2px var(--dark-gray);
  }

  .toolbar-button:hover {
    background-color: var(--light-gray);
    border: var(--dark-gray) solid 1px;
    box-shadow: none;
  }

  .toolbar-button:first-child {
    margin-right: 5px;
  }

  header > h1 {
    text-align: center;
    margin-top: 0;
    font-weight: normal;
  }

  .content-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .table-wrapper {
    max-width: 90%;
  }

  @media (min-width: 600px) {
    .table-wrapper {
      max-width: 50%;
    }
  }

  .table-header {
    display: grid;
    grid-template-columns: 1fr 2fr 4fr;
    gap: 5px;
    text-align: center;
    margin-bottom: 5px;
  }

  .table-row {
    display: grid;
    grid-template-columns: 1fr 2fr 4fr;
    gap: 5px;
    min-height: 40px;
    margin-bottom: 5px;
  }

  .table-row > div {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    padding: 5px;
  }

  .table-row > div:nth-child(3) {
    justify-content: left;
  }
</style>
