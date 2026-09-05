const express = require('express')
const router = require("./route.js")
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static('public'))

app.use("/api/v1", router)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`)
})