import express from 'express'
import * as citiesServices from '../services/citiesServices'
import { validateCountry } from '../validators/dataValidations'
import { StatusCodes } from 'http-status-codes'

const router = express.Router()

router.post('/cities', validateCountry, (req, res, next) => {
  const { country } = req.body

  citiesServices.getCitiesByCountry(country)
    .then((filteredCities) => {
      res.status(StatusCodes.ACCEPTED).json(filteredCities)
    })
    .catch(next)
})

export default router
