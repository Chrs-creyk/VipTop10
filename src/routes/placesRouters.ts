import express from 'express'
import * as placesServices from '../services/placesServices'
import { StatusCodes } from 'http-status-codes'
import { validateCategory, validateCity } from '../validators/dataValidations'

const router = express.Router()

router.get('/places/recomms', (_req, res, next) => {
  placesServices.getRecommsPlaces()
    .then((places) => {
      res.json(places)
    })
    .catch(next)
})

router.post('/places', validateCity, validateCategory, (req, res, next) => {
  const { city } = req.body
  const { category } = req.body

  placesServices.getPlacesByCityAndCategory(city, category)
    .then((categoryFilteredPlaces) => {
      res.status(StatusCodes.ACCEPTED).json(categoryFilteredPlaces)
    })
    .catch(next)
})

router.get('/places/:id', (req, res, next) => {
  const id = req.params.id

  placesServices.getPlaceById(id)
    .then((place) => {
      res.json(place)
    })
    .catch(next)
})

router.get('/places/category/:categoryid', (req, res, next) => {
  const id = req.params.categoryid

  placesServices.getPlacesByCategory(id)
    .then((places) => {
      res.json(places)
    })
    .catch(next)
})

export default router
