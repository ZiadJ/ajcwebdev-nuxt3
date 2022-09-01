// index.js
import express from 'express'
import prisma from '../../lib/prisma'

const app = express()

app.use(express.json())

/** 
* logic for our api will go here
*/
export default {
  path: '/api',
  handler: app
}
