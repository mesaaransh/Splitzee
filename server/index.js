const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const { newUser, verifyUser, getFriends, addRequest, addFriend } = require('./Controlers/user')
const { connector } = require('./connector')
const { verify } = require('./Controlers/verify')
const { auth } = require('./Controlers/Middlewares/auth')
const { addTrip, getTrips, deleteTrip, getTrip, addMember } = require('./Controlers/trip')
const { addExpense, delExpense } = require('./Controlers/expense')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
connector();


app.post('/verify', verify)
app.post("/login", verifyUser)
app.post("/user", newUser)


app.get("/friends", auth, getFriends)
app.get("/friends/:id", auth, addFriend)
app.post("/friends", auth, addRequest)


app.get("/trip", auth, getTrips)
app.get("/trip/:id", auth, getTrip)
app.post("/trip", auth, addTrip)
app.delete("/trip/:id", auth, deleteTrip)

app.post("/member", auth, addMember)

app.post("/expense", auth, addExpense )
app.delete("/expense/:id", auth, delExpense )


app.listen(8000, ()=>{console.log("----------AppStarted-----------");})