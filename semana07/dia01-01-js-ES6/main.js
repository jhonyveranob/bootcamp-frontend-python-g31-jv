/* TODO: obtener la referencia en una constante para los elementos con las clases .task__input, .task__clear y .task__list */
const taskInput = document.querySelector('.task__input')
const taskClear = document.querySelector('.task__clear')
const taskList = document.querySelector('.task__list')

let tasks = [
  {
    title: 'Estudiar javascript',
    completed: true
  },
  {
    title: 'Salir al receso a las 9:00pm',
    completed: true
  },
  {
    title: 'Realizar el reto del fin de semana',
    completed: false
  }
]

taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    console.log('agregando tarea...', event.key, event.keyCode)
  }
})

function renderTasks(tasks = []) {
  let lista = ''

  tasks.forEach((task) => {
    lista = lista + `
      <li class="flex justify-center items-center gap-4 py-1">
      <input
        type="checkbox"
      >
      <div class="w-full">  
        ${task.title}
      </div>
      <button
        class="task__clear border border-red-700 font-medium text-sm px-2 py-1 text-red-500 rounded-lg hover:text-white hover:bg-red-700 duration-300 cursor-pointer"
      >
        Borrar
      </button>
    </li>
    `
  });

  // console.log(lista)

  taskList.innerHTML = lista
}

renderTasks(tasks)