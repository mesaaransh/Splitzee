const express = require('express')
const cors = require('cors')
const { newUser, verifyUser, getFriends, addRequest, addFriend } = require('./Controlers/user')
const { connector } = require('./connector')
const { verify } = require('./Controlers/verify')
const { auth } = require('./Controlers/Middlewares/auth')
const { addTrip, getTrips, deleteTrip, getTrip, addMember } = require('./Controlers/trip')
const { addExpense, delExpense } = require('./Controlers/expense')
const { addActivity, getActivities } = require('./Controlers/activity')

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config()

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


app.get("/activity", auth, getActivities)
app.post("/activity", auth, addActivity)


app.listen( process.env.PORT || 8000, ()=>{console.log("----------AppStarted-----------");})