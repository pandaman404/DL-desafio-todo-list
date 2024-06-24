let tasks = [
  {
    id: 1,
    task: 'Completar desafío inmobiliaria',
    completed: true,
  },
  {
    id: 2,
    task: 'Completar desafío todo list',
    completed: false,
  },
  {
    id: 3,
    task: 'Completar exámen APIs',
    completed: false,
  },
];

const newTaskForm = document.getElementById('newTaskForm');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const taskList = document.getElementById('taskList');

newTaskForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let formData = Object.fromEntries(new FormData(event.target));

  if (formData.newTask.length > 0) {
    addNewTask(formData.newTask);
    renderTodoList(tasks);
  }
  newTaskForm.reset();
}

function handleCheckTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTodoList(tasks);
}

function handleDeleteTask(index) {
  tasks.splice(index, 1);
  renderTodoList(tasks);
}

function renderTasks(tasks) {
  taskList.innerHTML = '';
  for (const [index, value] of tasks.entries()) {
    const { id, task, completed } = value;
    taskList.innerHTML += `
          <div class="flex gap-5 mb-1">
          <p>${id}</p>
          <p class="flex-1">${task}</p>
          <input type="checkbox" ${
            completed ? 'checked' : ''
          } class="relative top-[2px]" onClick={handleCheckTask(${index})} />
          <button class="relative top-[1px]" onclick={handleDeleteTask(${index})}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ef4444"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
  `;
  }
}

function addNewTask(newTask) {
  const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
  tasks.push({ id, task: newTask, completed: false });
}

function renderTotalTasks(count) {
  totalTasks.innerHTML = count;
}

function renderCompletedTasks(count) {
  completedTasks.innerHTML = count;
}

function renderTodoList(tasks) {
  renderTasks(tasks);
  renderTotalTasks(tasks.length);
  renderCompletedTasks(tasks.filter((task) => task.completed).length);
}

renderTodoList(tasks);
