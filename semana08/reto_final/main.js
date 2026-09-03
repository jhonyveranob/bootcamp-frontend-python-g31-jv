const API_URL = 'https://apibox.vercel.app/mxoRxINQFH2Bgl6chvTe5lEleNBWWHbV/api/dragonball'

const cargarPersonajes = async () => {
  document.querySelector('#loading').classList.toggle('hidden')
  const respuesta = await fetch(API_URL)
  const data = await respuesta.json()
  document.querySelector('#loading').classList.toggle('hidden')
  renderPersonajes(data)
}

const renderPersonajes = (personajes = []) => {
  const lista = document.querySelector('#lista')
  lista.innerHTML = ''

  const contador = document.querySelector('#contador')
  contador.textContent = personajes.length

  const vacio = document.querySelector('#vacio')
  if (personajes.length === 0) {
    vacio.classList.remove('hidden')
  } else {
    vacio.classList.add('hidden')
  }

  personajes.forEach(personaje => {
    const li = document.createElement('li')
    li.className = 'flex items-center gap-4 bg-white border border-neutral-200 rounded-xl px-4 py-3 hover:border-neutral-300 transition-colors'
    li.innerHTML = `
      <div class="shrink-0 w-14 h-14 rounded-lg border border-neutral-200 flex items-center justify-center bg-neutral-50 overflow-hidden">
        <img src="${personaje.image}" alt="${personaje.name}" class="w-full h-full object-cover" />
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium truncate">${personaje.name}</p>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-[11px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">${personaje.race}</span>
          ${personaje.gender ? `<span class="text-xs text-neutral-400">${personaje.gender}</span>` : ''}
        </div>
      </div>
      <div class="flex items-center gap-3 shrink-0">
        <button data-action="editar" data-id="${personaje.id}" data-personaje='${JSON.stringify(personaje).replace(/'/g, "&apos;")}' class="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
          Editar
        </button>
        <button data-action="eliminar" data-id="${personaje.id}" class="text-xs text-neutral-400 hover:text-red-500 transition-colors">
          Eliminar
        </button>
      </div>
    `
    lista.appendChild(li)
  })
}

const form = document.querySelector('#form')
const cancelBtn = document.querySelector('#cancelBtn')
const submitBtn = document.querySelector('#submitBtn')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  
  // 01 - Extraer los datos del formulario
  const personajeForm = document.forms['form']
  const id = personajeForm.personajeId.value
  const name = personajeForm.nombre.value
  const image = personajeForm.imagen.value
  const race = personajeForm.raza.value
  const gender = personajeForm.genero.value

  const nuevoPersonaje = {
    name,
    image,
    race,
    gender
  }

  const esEdicion = Boolean(id)
  const url = esEdicion ? `${API_URL}/${id}` : API_URL
  const metodo = esEdicion ? 'PUT' : 'POST'

  const opciones = {
    method: metodo,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoPersonaje)
  }

  try {
    const response = await fetch(url, opciones)
    if (!response.ok) {
      throw new Error('Tuvimos problemas para guardar el personaje.')
    }
    console.log('El personaje se guardó correctamente.')

    resetFormulario()
    cargarPersonajes()
  } catch(error) {
    console.log(error)
  }
})

const lista = document.querySelector('#lista')
lista.addEventListener('click', async (event) => {
  if (event.target.tagName === 'BUTTON') {
    const { action, id, personaje } = event.target.dataset

    if (action === 'eliminar') {
      const confirmado = confirm('¿Eliminar a este personaje de la lista? Esta acción no se puede deshacer.')
      if (!confirmado) {
        return
      }
      const opciones = {
        method: 'DELETE'
      }
      await fetch(`${API_URL}/${id}`, opciones)
      cargarPersonajes()
    }

    if (action === 'editar') {
      const data = JSON.parse(personaje)
      form.personajeId.value = data.id
      form.nombre.value = data.name || ''
      form.imagen.value = data.image || ''
      form.raza.value = data.race || ''
      form.genero.value = data.gender || ''

      submitBtn.textContent = 'Actualizar'
      cancelBtn.classList.remove('hidden')
    }
  }
})

cancelBtn.addEventListener('click', () => {
  resetFormulario()
})

const resetFormulario = () => {
  form.reset()
  form.personajeId.value = ''
  submitBtn.textContent = '+ Agregar Personaje'
  cancelBtn.classList.add('hidden')
}

cargarPersonajes()