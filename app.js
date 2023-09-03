

const express = require('express')
const app = express()
const port = 3000
require('./db/mongoose')
app.use(express.json())
const userRouter =require('./routers/user')
app.use(userRouter)
app.listen(port,()=>{
    console.log('all done ')
})

