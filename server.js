const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()  

  server.get('/game/:id', (req, res) => {
    const actualPage = '/game'
    const queryParams = { id: req.params.id } 
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/categories/:categoryTypeId', (req, res) => {
    const actualPage = '/categories'
    const queryParams = { categoryTypeId: req.params.categoryTypeId } 
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/gameshot/:id', (req, res) => {
    const actualPage = '/gameshot'
    const queryParams = { id: req.params.id } 
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/tag/:id', (req, res) => {
    const actualPage = '/tag'
    const queryParams = { id: req.params.id } 
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})