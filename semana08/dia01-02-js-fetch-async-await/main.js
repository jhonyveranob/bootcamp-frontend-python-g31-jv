const url = 'https://jsonplaceholder.typicode.com/users'

// fetch(url)
//   .then(respuesta => respuesta.json())
//   .then(data => {
//     console.log(data)
//   })
//   .catch(error => {
//     console.log(error)
//   })

const fetchUserSinRetorno = async () => {
  const response = await fetch(url)

  const data = await response.json()

  console.log(data)
}

fetchUserSinRetorno()

const fetchUsersConRetorno = async () => {
  const response = await fetch(url)

  return await response.json()
}

fetchUsersConRetorno() // Retorna una promesa
  .then(users => console.log(users))