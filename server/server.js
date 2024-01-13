import express from 'express'
import cors from 'cors'
import todos from './todos.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.status(200).json(todos)
})

app.post('/', (req, res) => {
  const body = req.body.item
  const newItem = {
    id: todos.length + 1,
    item: body,
    checked: false
  }
  try {
    todos.push(newItem)
    res.status(201).json({ message: 'item Created' })
    res.redirect('/')
  } catch (error) {
    res.status(403).json({ message: 'error creating new item' })
  }
})

app.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const idx = todos.findIndex(item => item.id === id)
  if (idx < 0) {
    return res.status(404).json({ message: 'item not found' })
  }
  todos.splice(idx, 1)
  res.status(200).json({ message: 'item deleted' })
  res.redirect('/')
})

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))
