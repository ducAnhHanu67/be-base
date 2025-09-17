import { Sequelize } from 'sequelize'
import ApiError from '~/utils/ApiError'
import { Op } from 'sequelize'
import { DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE } from '~/utils/constants'
import { Category, ProductBrand } from '~/models'

const getBrands = async (page, itemsPerPage, queryFilter) => {
  if (!page) page = DEFAULT_PAGE
  if (!itemsPerPage) itemsPerPage = DEFAULT_ITEMS_PER_PAGE

  const offset = (page - 1) * itemsPerPage
  const whereClause = queryFilter
    ? { name: { [Op.like]: `%${queryFilter}%` } }
    : {}

  const { rows: data, count } = await ProductBrand.findAndCountAll({
    where: whereClause,
    limit: parseInt(itemsPerPage, 10),
    offset: parseInt(offset, 10),
    order: [['updatedAt', 'DESC']],
    attributes: {
      include: [
        [Sequelize.col('category.name'), 'categoryName']
      ]
    },
    include: [
      {
        model: Category,
        as: 'category',
        attributes: []
      }
    ]
  })

  return { data, count }
}

const create = async (reqBody) => {
  try {
    const existBrand = await ProductBrand.findOne({
      where: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('name')),
        reqBody.name.toLowerCase()
      )
    })
    if (existBrand) throw new ApiError(409, 'Thương hiệu đã tồn tại!')

    const createdBrand = await ProductBrand.create(reqBody)
    return createdBrand
  } catch (error) {
    throw error
  }
}

const update = async (brandId, reqBody) => {
  try {
    const updatedBrand = await ProductBrand.update(reqBody, {
      where: { id: brandId }
    })
    return updatedBrand
  } catch (error) {
    throw error
  }
}

const deleteById = async (brandId) => {
  try {
    const deletedBrand = await ProductBrand.destroy({
      where: { id: brandId }
    })
    if (!deletedBrand) {
      throw new ApiError(409, 'Xoá thất bại!')
    }
    return deletedBrand
  } catch (error) {
    throw error
  }
}
const getBrandsByCategory = async (categoryId) => {
  const brands = await ProductBrand.findAll({
    where: { categoryId },
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name']
      }
    ],
    order: [['updatedAt', 'DESC']]
  })

  return brands
}

export const brandsService = {
  getBrands,
  create,
  update,
  deleteById,
  getBrandsByCategory
}
