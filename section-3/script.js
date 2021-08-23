//"use strict";
let tasks = [];

const getPriorityName = function (priority) {
  switch (priority) {
    case '1':
      return 'High';
    case '2':
      return 'Medium';
    case '3':
      return 'Low';
    default:
      return '';
  }
};

const deleteTask = function (i) {
  if (!confirm('Are you sure ?')) return;
  tasks.splice(i, 1);
  renderTable();
};

const moveUp = function (i) {
  if (i == 0) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i - 1];
  tasks[i - 1] = oldTask;
  renderTable();
};

const moveDown = function (i) {
  if (i == tasks.length - 1) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i + 1];
  tasks[i + 1] = oldTask;
  renderTable();
};

const renderTable = function () {
  const tbody = document.querySelector('#tasks_tbody');
  tbody.innerHTML = '';
  tasks.forEach((t, i) => {
    const row = `
        <tr>
        <td>${i + 1}</td>
        <td>${t.name}</td>
        <td>${getPriorityName(t.priority)}</td>
        <td>
        ${
          i > 0
            ? `<button class="btn btn-sm btn-secondary" onclick="moveUp(${i})">Up</button>`
            : ``
        }
        ${
          i < tasks.length - 1
            ? `<button class="btn btn-sm btn-secondary" onclick="moveDown(${i})">Down</button>`
            : ``
        }
        </td>
        <td>
        <button class="btn btn-primary btn-sm" onclick="editTask(this)">Edit</button>
        <button class="btn btn-success btn-sm" style="display:none;">Save</button>
        <button class="btn btn-danger btn-sm" style="display:none;">Cancel</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${i})">Delete</button></td>
        </tr>
        `;
    tbody.insertAdjacentHTML('beforeEnd', row);
  });
};

const addTask = function () {
  const taskName = document.querySelector('#task_name').value;
  const priority = document.querySelector('#task_priority').value;
  if (taskName !== '' && priority > 0) {
    tasks.push({
      name: taskName,
      priority: priority,
    });
    renderTable();
  }
};

const editTask = function (el) {
  const parentElement = el.parentNode;
  const rowElement = parentElement.parentNode.children;

  changeNameField(rowElement[1]);
};

const changeNameField = (el) => {
  const nameField = el;
  nameField.innerHTML = `<input type="text" value=${nameField.innerHTML} />`;
};

document.querySelector('#add').addEventListener('click', addTask);
