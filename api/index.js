// index.js
import express from 'express'
import prisma from '../lib/prisma'

const app = express()

app.use(express.json())

app.delete(`/user/:id`, async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.json(user)
})

export default {
  path: '/api',
  handler: app
}
