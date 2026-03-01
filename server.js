const express = require('express')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
require('dotenv').config()
const { connectDB } = require('./src/config/db')
const authRoutes = require('./src/routes/authRoutes')
const climateRoutes = require('./src/routes/climateRoutes')
const simulationRoutes = require('./src/routes/simulationRoutes')
const ideaRoutes = require('./src/routes/ideaRoutes')
const researcherRoutes = require('./src/routes/researcherRoutes')
const { ideas } = require('./src/controllers/ideaController')
const { simulate } = require('./src/controllers/simulationController')

const app = express()
const PORT = process.env.PORT || 3000

connectDB(process.env.MONGO_URI).catch(err => console.error('Mongo connect error', err))

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 })
app.use(limiter)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'auth.html'))
})
app.get('/architecture', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'architecture.html'))
})
app.get('/backend', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'backend.html'))
})

app.use('/api/auth', authRoutes)
app.use('/api/climate', climateRoutes)
app.use('/api/simulation', simulationRoutes)
app.use('/api/ideas', ideaRoutes)
app.use('/api/researchers', researcherRoutes)

app.get('/api/ideas', ideas)
app.post('/api/simulate', simulate)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'internal server error' })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
