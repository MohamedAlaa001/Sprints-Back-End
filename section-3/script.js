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
        <button class="btn btn-success btn-sm hide" onclick="saveTask(this)">Save</button>
        <button class="btn btn-danger btn-sm hide" onclick="handleCancel()">Cancel</button>
        <button class="btn btn-danger btn-sm " onclick="deleteTask(${i})">Delete</button></td>
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

const editTask = (el) => {
  const parentElement = el.parentNode;
  const rowElement = parentElement.parentNode.children;
  document.getElementById('add').disabled = true;
  Array.from(parentElement.children).map((el) => el.classList.toggle('hide'));
  nameFieldToInput(rowElement[1]);
  priorityToSelect(rowElement[2]);
};

const saveTask = (el) => {
  const parentElement = el.parentNode;
  const rowElement = parentElement.parentNode.children;

  if (nameFieldToText(rowElement[1]).trim() === '') {
    return alert('Opps...You have to enter a valid name!');
  }

  const index = Number(rowElement[0].innerHTML) - 1;
  tasks[index] = {
    name: nameFieldToText(rowElement[1]).trim(),
    priority: priorityToText(rowElement[2]),
  };

  Array.from(parentElement.children).map((el) => el.classList.toggle('hide'));
  document.getElementById('add').disabled = false;
  renderTable();
};

const nameFieldToInput = (el) => {
  el.innerHTML = `<input type="text" value=${el.innerHTML} />`;
};

// Return the text value from the input
const nameFieldToText = (el) => el.childNodes[0].value;

const priorityToSelect = (el) => {
  const objValues = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const selectValue = objValues[`${el.innerHTML}`];

  el.innerHTML = `
  <select>
    <option value="1" ${selectValue === 1 && 'selected'}>High</option>
    <option value="2" ${selectValue === 2 && 'selected'}>Medium</option>
    <option value="3" ${selectValue === 3 && 'selected'}>Low</option>
  </select>`;
};

const priorityToText = (el) => el.childNodes[1].value;

const handleCancel = () => {
  document.getElementById('add').disabled = false;
  renderTable();
};
document.querySelector('#add').addEventListener('click', addTask);
