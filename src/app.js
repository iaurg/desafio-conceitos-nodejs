const express = require('express')
const cors = require('cors')

const { uuid, isUuid } = require('uuidv4')

const app = express()

app.use(express.json())
app.use(cors())

function validateId (request, response, next) {
  const { id } = request.params

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid ID' })
  }

  return next()
}

const repositories = []

app.use('/repositories/:id', validateId)

app.get('/repositories', (request, response) => {
  return response.status(200).json(repositories)
})

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body
  const repository = {
    id: uuid(),
    title,
    url: `https://github.com/${url}`,
    techs,
    likes: 0
  }
  repositories.push(repository)
  return response.status(200).json(repository)
})

app.put('/repositories/:id', (request, response) => {
  // TODO

  const { id } = request.params

  const { title, url, techs } = request.body

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: 'Repository not found' })
  }

  repositories[repositoryIndex] = { ...repositories[repositoryIndex], title, url, techs }

  return response.status(200).json(repositories[repositoryIndex])
})

app.delete('/repositories/:id', (request, response) => {
  // TODO
})

app.post('/repositories/:id/like', (request, response) => {
  // TODO
})

module.exports = app
