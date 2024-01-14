loadItems()

const button = document.querySelector('button')
const input = document.querySelector('input')


button.addEventListener('click', createItem)


async function loadItems() {
    const response = await fetch('http://localhost:3000')
    const data = await response.json()
    const ul = document.querySelector('ul')
    data.map( element => {
            const li = document.createElement('li')
            console.log(element.id)
            const textnode = document.createTextNode(element.item)
            li.appendChild(textnode) 
            ul.appendChild(li)
            li.addEventListener('click', () => deleteItem(element.id))
            li.setAttribute('id', element.id)            
        })
    }

async function createItem() {
    const request = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"item": input.value})
    })
    input.value = ""
    const response = await fetch('http://localhost:3000/')
    const data = await response.json()
    addItem(data[data.length-1].id)
}

async function addItem(id) {
    const response = await fetch(`http://localhost:3000/${id}`)
    const data = await response.json()
    const ul = document.querySelector('ul')
    const li = document.createElement('li')
    const textnode = document.createTextNode(data.item)
    li.appendChild(textnode)
    li.addEventListener('click', () => deleteItem(id))
    ul.appendChild(li)

}

async function deleteItem(id) {
    const liToDelete = document.getElementById(String(id))
    liToDelete.remove()
    const request = await fetch(`http://localhost:3000/${id}`, {
        method: 'DELETE'
    })
}


