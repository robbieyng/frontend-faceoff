<template>
  <header>
    <div class="toolbar-wrapper">
      <div>
        <label for="property">Property Name: </label>
        <input id="property" v-model="property" />
      </div>
      <div class="toolbar-buttons-wrapper">
        <div @click="clearData" id="reset-btn" class="toolbar-button">Reset</div>
        <div @click="print" id="print-btn" class="toolbar-button">Print</div>
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
        <div class="table-row" v-for="(task, taskIndex) in tasks" :key="task.id">
          <div>
            <input
              type="checkbox"
              v-model="task.completed"
              @change="handleTaskChange(taskIndex)"
            />
          </div>
          <div>{{task.completionDate}}</div>
          <div>{{task.task}}</div>
          </div>
        </div>
    </div>
</template>

<script>
import {TASK_LIST} from './constants.js'

export default {
  name: 'App',
  data() {
    return {
      property: localStorage.getItem('property') || '',
      tasks: JSON.parse(localStorage.getItem('tasks')) || [...TASK_LIST]
    }
  },
  watch: {
    property: {
      handler(newProperty) {
      localStorage.setItem('property', newProperty)
      }
    },
    tasks: {
      handler(newTasks) {
        localStorage.setItem("tasks", JSON.stringify(newTasks));
      },
      deep: true
    }
  },
  methods: {
    print() {
      window.print();
    },
    clearData() {
      if (window.confirm('Clear Form?')) {
        this.property = '';
        this.tasks = [...TASK_LIST];
      }
    },
    handleTaskChange(index) {
      let updatedTasks = [...this.tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completionDate: updatedTasks[index].completed ? new Date().toLocaleDateString() : '',
    };
    this.tasks = updatedTasks;
    }
  }
}
</script>

<style>
:root {
  --light-gray: #e9ebed;
  --dark-gray: #24292f;
}

body {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  background-color: var(--light-gray);
  color: var(--dark-gray);
  display: flex;
  flex-direction: column;
}

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

header>h1 {
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

@media (min-width:600px) {
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

.table-row>div {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  padding: 5px;
}

.table-row>div:nth-child(3) {
  justify-content: left;
}
</style>
