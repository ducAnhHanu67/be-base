import { Sequelize } from 'sequelize'
import Categories from '~/models/categories'
import ApiError from '~/utils/ApiError'
import { Op } from 'sequelize'
import { DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE } from '~/utils/constants'

const getCategories = async (page, itemsPerPage, queryFilter) => {
  try {
    if (!page) page = DEFAULT_PAGE
    if (!itemsPerPage) itemsPerPage = DEFAULT_ITEMS_PER_PAGE

    const offset = (page - 1) * itemsPerPage

    const whereClause = queryFilter ? { name: { [Op.like]: `%${queryFilter}%` } } : {}
    // console.log('queryFilter:', queryFilter)

    const { rows: data, count } = await Categories.findAndCountAll({
      where: whereClause,
      limit: parseInt(itemsPerPage, 10),
      offset: parseInt(offset, 10),
      order: [['updatedAt', 'DESC']]
    })
    return { data, count }
  } catch (error) {
    throw error
  }
}

const getCategoryById = async (categoryId) => {
  try {
    const category = await Categories.findByPk(categoryId)
    return category
  } catch (error) {
    throw error
  }
}

const create = async (reqBody) => {
  try {
    const existCategory = await Categories.findOne({
      where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), reqBody.name.toLowerCase())
    })
    if (existCategory) throw new ApiError(409, 'Danh mục đã tồn tại!')

    const createdCategory = await Categories.create(reqBody)
    return createdCategory
  } catch (error) {
    throw error
  }
}

const update = async (categoryId, reqBody) => {
  try {
    const category = await Categories.findByPk(categoryId)
    if (!category) throw new ApiError(404, 'Danh mục không tồn tại!')

    const existCategory = await Categories.findOne({
      where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), reqBody.name.toLowerCase())
    })
    if (existCategory) throw new ApiError(409, 'Danh mục đã tồn tại!')

    const updatedCategory = Categories.update(reqBody, {
      where: { id: categoryId }
    })
    return updatedCategory
  } catch (error) {
    throw error
  }
}

const deleteById = async (categoryId) => {
  try {
    const category = await Categories.findByPk(categoryId)
    if (!category) throw new ApiError(404, 'Danh mục không tồn tại!')

    const deletedCategory = Categories.destroy({
      where: { id: categoryId }
    })
    return deletedCategory
  } catch (error) {
    throw error
  }
}

export const categoryService = {
  getCategories,
  getCategoryById,
  create,
  update,
  deleteById
}
