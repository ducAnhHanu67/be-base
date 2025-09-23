import { Sequelize, Op } from 'sequelize'
import sequelize from '~/config/mySQL'
import path from 'path'
import fs from 'fs'
import { ProductBrand, Product, ProductImage, BookGenre, Category, Review, FlashSale } from '~/models'
import ProductHighlight from '~/models/ProductHighlight'
import { UploadImageProvider } from '~/providers/UploadImageProvider'
import ApiError from '~/utils/ApiError'
import { DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE } from '~/utils/constants'

const getProducts = async (page, itemsPerPage, queryFilter) => {

  try {
    if (!page) page = DEFAULT_PAGE
    if (!itemsPerPage) itemsPerPage = DEFAULT_ITEMS_PER_PAGE

    const offset = (page - 1) * itemsPerPage
    const whereClause = queryFilter
      ? { name: { [Op.like]: `%${queryFilter}%` } }
      : {}

    const { rows: data, count } = await Product.findAndCountAll({
      where: whereClause,
      limit: parseInt(itemsPerPage, 10),
      offset: parseInt(offset, 10),
      order: [['updatedAt', 'DESC']],

      attributes: [
        'id',
        'name',
        'price',
        'discount',
        'stock',
        'description',
        'coverImageUrl',
        'dimension',
        'categoryId',
        'brandId',
        'createdAt',
        'updatedAt'
      ],

      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        },
        {
          model: ProductBrand,
          as: 'brand',
          attributes: ['id', 'name']
        },
        {
          model: ProductImage,
          as: 'productImages',
          required: false
        },
        {
          model: ProductHighlight,
          as: 'highlights',
          required: false,
          attributes: ['id', 'key', 'value']
        }
      ]
    })

    return { data, count }
  } catch (error) {
    throw error
  }
}

const getProductSuggest = async (keyword) => {
  try {
    const products = await Product.findAll({
      where: { name: { [Op.like]: `%${keyword}%` } },
      attributes: ['id', 'name', 'price', 'coverImageUrl'],
      limit: 8
    })
    return products
  } catch (err) {
    throw err
  }
}
const getProductsByCategory = async (categoryId, limit = 10) => {
  try {
    const products = await Product.findAll({
      where: { categoryId: parseInt(categoryId, 10) },
      order: [['updatedAt', 'DESC']],
      limit: parseInt(limit, 10), // thêm dòng này để giới hạn số record
      attributes: [
        'id', 'name', 'price', 'discount', 'stock',
        'description', 'coverImageUrl', 'dimension',
        'categoryId', 'createdAt', 'updatedAt'
      ],
      include: [
        { model: Category, as: 'category', attributes: ['id', 'name'] },
        { model: ProductImage, as: 'productImages', required: false }
      ]
    });

    return products;
  } catch (error) {
    throw error;
  }
};


const getFlashSaleProducts = async () => {
  try {
    const now = new Date();

    const flashSaleProducts = await FlashSale.findAll({
      where: {
        startTime: { [Op.lte]: now },
        endTime: { [Op.gte]: now }
      },
      attributes: ['id', 'flashPrice', 'startTime', 'endTime'],
      include: [
        {
          model: Product,
          as: 'product',
          attributes: [
            'id',
            'name',
            'price',
            'discount',
            'stock',
            'description',
            'coverImageUrl',
            'dimension',
            'categoryId',
            'brandId', // ✅ thêm brandId
            'createdAt',
            'updatedAt'
          ],
          include: [
            { model: Category, as: 'category', attributes: ['id', 'name'] },
            { model: ProductBrand, as: 'brand', attributes: ['id', 'name'] },
            { model: ProductImage, as: 'productImages', required: false }
          ]
        }
      ],
      order: [['startTime', 'ASC']]
    });

    return flashSaleProducts;
  } catch (error) {
    console.error('🔥 Error in getFlashSaleProducts:', error);
    throw error;
  }
};



const getProductById = async (productId) => {
  try {
    const product = await Product.findOne({
      where: { id: productId },
      attributes: [
        'id',
        'name',
        'price',
        'discount',
        'stock',
        'description',
        'coverImageUrl',
        'dimension',
        'categoryId',
        'brandId',
        'createdAt',
        'updatedAt'
      ],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        },
        {
          model: ProductBrand,
          as: 'brand',
          attributes: ['id', 'name']
        },
        {
          model: ProductImage,
          as: 'productImages',
          required: false
        },
        {
          model: Review,
          as: 'reviews',
          required: false,
          attributes: []
        },
        {
          model: ProductHighlight,
          as: 'highlights',
          required: false,
          attributes: ['id', 'key', 'value']
        }
      ],
      raw: false
    })

    return product
  } catch (error) {
    throw error
  }
}
const decodeString = (str) => {
  return Buffer.from(str, 'latin1').toString('utf8')
}


const create = async (reqBody, productFile, galleryFiles = []) => {
  try {
    const existProduct = await Product.findOne({
      attributes: ['name'],
      where: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('name')),
        reqBody.name.toLowerCase()
      ),
      raw: true
    })
    if (existProduct) throw new ApiError(409, 'Sản phẩm đã tồn tại!')

    const uploadResult = await UploadImageProvider.uploadImage(
      productFile.buffer,
      'coverImages',
      productFile.originalname
    )
    const uploadedGallery = []
    for (const file of galleryFiles) {
      const res = await UploadImageProvider.uploadImage(
        file.buffer,
        'productImages',
        file.originalname
      )
      uploadedGallery.push({ imageUrl: res.fileUrl })
    }

    const product = await sequelize.transaction(async (t) => {
      const include = [
        { model: ProductImage, as: 'productImages' },
        { model: ProductHighlight, as: 'highlights' }

      ]
      const highlightEntries = reqBody.highlights
        ? Object.entries(reqBody.highlights).map(([key, value]) => ({
          key: decodeString(key),
          value: value
        }))
        : []
      const data = {
        categoryId: reqBody.categoryId,
        name: reqBody.name,
        price: reqBody.price,
        discount: reqBody.discount,
        stock: reqBody.stock,
        description: reqBody.description,
        coverImageUrl: uploadResult.fileUrl,
        dimension: reqBody.dimension,
        brandId: reqBody.brandId,
        productImages: uploadedGallery
      }

      // Tạo sản phẩm chính
      const newProduct = await Product.create(data, { include, transaction: t })

      if (highlightEntries.length > 0) {
        await ProductHighlight.bulkCreate(
          highlightEntries.map((h) => ({
            productId: newProduct.id,
            key: h.key,
            value: h.value
          })),
          { transaction: t }
        )
      }

      // Nếu có flash sale thì thêm record vào bảng flashsales
      if (reqBody.flashSale) {
        await FlashSale.create(
          {
            productId: newProduct.id,
            flashPrice: reqBody.flashSale.flashPrice,
            startTime: reqBody.flashSale.startTime,
            endTime: reqBody.flashSale.endTime
          },
          { transaction: t }
        )
      }

      return newProduct
    })

    return product
  } catch (error) {
    throw error
  }
}


const update = async (productId, reqBody, productFile) => {
  try {
    // 1. Kiểm tra product cũ
    const oldProduct = await Product.findByPk(productId)
    if (!oldProduct) throw new ApiError(404, 'Không tìm thấy sản phẩm!')

    // 2. Xử lý coverImageUrl
    let coverImageUrl = oldProduct.coverImageUrl
    if (productFile) {
      const uploadResult = await UploadImageProvider.uploadImage(
        productFile.buffer,
        'coverImages',
        productFile.originalname
      )
      coverImageUrl = uploadResult.fileUrl
    }
    // 3. Update product (chỉ còn brandId, không còn type/bookDetail/stationeryDetail)
    await Product.update(
      {
        categoryId: reqBody.categoryId,
        brandId: reqBody.brandId,
        name: reqBody.name,
        price: reqBody.price,
        discount: reqBody.discount,
        stock: reqBody.stock,
        description: reqBody.description,
        coverImageUrl,
        dimension: reqBody.dimension
      },
      {
        where: { id: productId }
      }
    )

    // 4. Trả về product đã update kèm include
    return await Product.findByPk(productId, {
      include: [
        { model: ProductImage, as: 'productImages' },
        { model: Category, as: 'category', attributes: ['id', 'name'] },
        { model: ProductBrand, as: 'brand', attributes: ['id', 'name'] }
      ]
    })
  } catch (err) {
    throw err
  }
}


const deleteById = async (productId) => {
  // 1. Lấy trước sản phẩm (để biết có tồn tại & nếu cần, trả về dữ liệu cũ)
  const product = await Product.findByPk(productId)
  if (!product) {
    throw new ApiError(404, 'Không tìm thấy sản phẩm!')
  }

  await sequelize.transaction(async (t) => {
    await ProductImage.destroy({
      where: { productId },
      transaction: t
    })

    // Cuối cùng xóa record chính
    const count = await Product.destroy({
      where: { id: productId },
      transaction: t
    })

    if (count === 0) {
      // Trong trường hợp hiếm, nếu không xóa được
      throw new ApiError(500, 'Xóa sản phẩm thất bại!')
    }
  })
  // 6. Xóa file ảnh vật lý trong thư mục public/images/coverImages
  deleteFileIfExists(product.coverImageUrl)

  if (product.productImages && product.productImages.length > 0) {
    for (const img of product.productImages) {
      deleteFileIfExists(img.imageUrl)
    }
  }
  // 3. Trả về dữ liệu cũ (nếu cần)
  return product
}
function deleteFileIfExists(fileUrl) {
  if (!fileUrl) return

  const relativePath = fileUrl.replace(/^https?:\/\/[^/]+\//, '')

  const filePath = path.join(__dirname, '../../public', relativePath)

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('⚠️ Không thể xóa file:', filePath, err.message)
    } else {
      console.log('✅ Đã xóa file:', filePath)
    }
  })
}


const getCategories = async () => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'name'],
      order: [
        // nếu name = 'Sách' thì trả 0 (lên đầu), còn lại 1
        // prettier-ignore
        [Sequelize.literal('CASE WHEN name = \'Sách\' THEN 0 ELSE 1 END'), 'ASC'],
        ['name', 'ASC']
      ]
    })
    return categories
  } catch (error) {
    throw error
  }
}

const getBookGenres = async () => {
  try {
    const bookGenres = await BookGenre.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']]
    })
    return bookGenres
  } catch (error) {
    throw error
  }
}

const searchAndFilterProducts = async (filters) => {
  try {
    const {
      page = DEFAULT_PAGE,
      itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
      search,
      brandId,        // ✅ thay type/bookGenreId bằng brandId
      categoryId,
      minPrice,
      maxPrice
    } = filters

    const offset = (page - 1) * itemsPerPage

    // Build where clause cho Product
    const whereClause = {}

    // Search theo tên sản phẩm
    if (search) {
      whereClause.name = { [Op.like]: `%${search}%` }
    }

    // Filter theo brandId
    if (brandId) {
      whereClause.brandId = brandId
    }

    // Filter theo categoryId
    if (categoryId) {
      whereClause.categoryId = categoryId
    }

    // Filter theo isTrend
    if (filters.isTrend !== undefined) {
      const trendRaw = filters.isTrend
      const isTrendBool =
        trendRaw === '1' || trendRaw === 1 || trendRaw === true || trendRaw === 'true'
      whereClause.isTrend = isTrendBool
    }

    // Filter theo giá sau discount
    const hasMinPrice =
      minPrice !== undefined && minPrice !== null && minPrice !== '' && !isNaN(minPrice)
    const hasMaxPrice =
      maxPrice !== undefined && maxPrice !== null && maxPrice !== '' && !isNaN(maxPrice)

    if (hasMinPrice || hasMaxPrice) {
      const finalPriceFormula = 'price * (100 - discount) / 100'

      if (hasMinPrice && hasMaxPrice) {
        whereClause[Op.and] = [
          Sequelize.literal(`${finalPriceFormula} >= ${parseFloat(minPrice)}`),
          Sequelize.literal(`${finalPriceFormula} <= ${parseFloat(maxPrice)}`)
        ]
      } else if (hasMinPrice) {
        whereClause[Op.and] = [
          Sequelize.literal(`${finalPriceFormula} >= ${parseFloat(minPrice)}`)
        ]
      } else if (hasMaxPrice) {
        whereClause[Op.and] = [
          Sequelize.literal(`${finalPriceFormula} <= ${parseFloat(maxPrice)}`)
        ]
      }
    }

    // Build include array
    const includeArray = [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name']
      },
      {
        model: ProductBrand,
        as: 'brand',
        attributes: ['id', 'name']
      },
      {
        model: ProductImage,
        as: 'productImages',
        required: false
      }
    ]

    const { rows: data, count } = await Product.findAndCountAll({
      where: whereClause,
      limit: parseInt(itemsPerPage, 10),
      offset: parseInt(offset, 10),
      order: [['updatedAt', 'DESC']],
      attributes: [
        'id',
        'name',
        'price',
        'discount',
        'stock',
        'description',
        'coverImageUrl',
        'dimension',
        'categoryId',
        'brandId',
        'createdAt',
        'updatedAt'
      ],
      include: includeArray,
      distinct: true
    })

    return { data, count }
  } catch (error) {
    throw error
  }
}


const getTopTrendingProducts = async () => {
  try {
    const products = await Product.findAll({
      limit: 8,
      attributes: [
        'id',
        'name',
        'price',
        'discount',
        'stock',
        'description',
        'coverImageUrl',
        'dimension',
        'type',
        'categoryId',
        'createdAt',
        'updatedAt',
        [
          Sequelize.literal(`(
            SELECT COALESCE(SUM(oi.quantity), 0)
            FROM order_items AS oi
            WHERE oi.product_id = Product.id
          )`),
          'soldQuantity'
        ]
      ],
      order: [[Sequelize.literal('soldQuantity'), 'DESC']],
      include: [
        {
          model: Category,
          as: 'category',
          required: false,
          attributes: ['id', 'name']
        },
        {
          model: ProductImage,
          as: 'productImages',
          required: false
        }
      ]
    })

    return products
  } catch (error) {
    console.error('🔥 Error in getTopTrendingProducts:', error)
    throw error
  }
}




export const productService = {
  create,
  getProducts,
  getProductById,
  update,
  deleteById,
  getCategories,
  getBookGenres,
  searchAndFilterProducts,
  getTopTrendingProducts,
  getFlashSaleProducts,
  getProductsByCategory,
  getProductSuggest
}
