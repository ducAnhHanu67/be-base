import { brandsService } from '~/services/brandsService'

const getBrands = async (req, res, next) => {
  try {
    const { page, itemsPerPage, search } = req.query
    const brands = await brandsService.getBrands(page, itemsPerPage, search)
    res.status(200).json(brands)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const createdBrand = await brandsService.create(req.body)
    res.status(201).json(createdBrand)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const brandId = req.params.id
    const updatedBrand = await brandsService.update(brandId, req.body)
    res.status(200).json(updatedBrand)
  } catch (error) {
    next(error)
  }
}

const deleteById = async (req, res, next) => {
  try {
    const brandId = req.params.id
    const deletedBrand = await brandsService.deleteById(brandId)
    res.status(204).json(deletedBrand)
  } catch (error) {
    next(error)
  }
}
const getBrandsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params
    const response = await brandsService.getBrandsByCategory(categoryId)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const brandsController = {
  getBrands,
  create,
  update,
  deleteById,
  getBrandsByCategory
}
