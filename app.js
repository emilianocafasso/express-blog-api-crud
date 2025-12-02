const express = require('express')
const app = express()
const port = 3000
const postsRouter = require('./routers/posts')
const notFound = require('./middlewares/notFound')
const errorsHandler = require('./middlewares/errorsHandler')

app.use(express.static('public'))
app.use(express.json())

app.use('/posts', postsRouter)

app.get('/', (req, res) => {
    res.send("Server")
})

app.use(errorsHandler)
app.use(notFound)

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})