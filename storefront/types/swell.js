import PropTypes from "prop-types";

/**
 * @typedef {object} Product
 * @property {string} id
 * @property {object} content
 * @property {object[]} content.product_benefits
 * @property {string} content.product_benefits.icon
 * @property {string} content.product_benefits.text
 * @property {boolean} content.enable_quantity
 * @property {number} content.max_quantity
 * @property {number} content.up_sell_cols
 * @property {string} currency
 * @property {string} description
 * @property {boolean} bundle
 * @property {object[]} images
 * @property {string} images.id
 * @property {object} images.file
 * @property {number} images.file.height
 * @property {string} images.file.md5
 * @property {string} images.file.url
 * @property {number} images.file.width
 * @property {string} name
 * @property {object[]} options
 * @property {string} options.id
 * @property {object[]} options.values
 * @property {string} options.values.id
 * @property {string} options.values.name
 * @property {null|number} options.values.price
 * @property {null} options.values.shipment_weight
 * @property {null} options.values.description
 * @property {string} options.name
 * @property {boolean} options.active
 * @property {string} options.input_type
 * @property {boolean} options.variant
 * @property {null} options.description
 * @property {boolean} options.required
 * @property {string} options.attribute_id
 * @property {number} price
 * @property {string} sku
 * @property {string} slug
 * @property {null} stock_status
 * @property {boolean} stock_tracking
 * @property {boolean} stock_purchasable
 * @property {object} attributes
 * @property {object} attributes.brand
 * @property {string} attributes.brand.name
 * @property {string} attributes.brand.type
 * @property {boolean} attributes.brand.visible
 * @property {boolean} attributes.brand.filterable
 * @property {string} attributes.brand.id
 * @property {string} attributes.brand.value
 * @property {} tags
 * @property {null} meta_title
 * @property {string} meta_description
 * @property {object} variants
 * @property {number} variants.count
 * @property {object[]} variants.results
 * @property {string} variants.results.id
 * @property {string} variants.results.currency
 * @property {object[]} variants.results.images
 * @property {string} variants.results.images.id
 * @property {object} variants.results.images.file
 * @property {number} variants.results.images.file.height
 * @property {string} variants.results.images.file.md5
 * @property {string} variants.results.images.file.url
 * @property {number} variants.results.images.file.width
 * @property {string} variants.results.name
 * @property {string[]} variants.results.option_value_ids
 * @property {number} variants.results.price
 * @property {string} variants.results.sku
 * @property {null} variants.results.stock_status
 * @property {number} variants.page
 * @property {boolean} sale
 */

export default {};

export const ProductPropTypes = PropTypes.shape({
  id: PropTypes.string,
  content: PropTypes.shape({
    product_benefits: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        text: PropTypes.string,
      })
    ),
    enable_quantity: PropTypes.bool,
    max_quantity: PropTypes.number,
    up_sell_cols: PropTypes.number,
  }),
  currency: PropTypes.string,
  description: PropTypes.string,
  bundle: PropTypes.bool,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      file: PropTypes.shape({
        height: PropTypes.number,
        md5: PropTypes.string,
        url: PropTypes.string,
        width: PropTypes.number,
      }),
    })
  ),
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      values: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          price: PropTypes.any,
          shipment_weight: PropTypes.any,
          description: PropTypes.any,
        })
      ),
      name: PropTypes.string,
      active: PropTypes.bool,
      input_type: PropTypes.string,
      variant: PropTypes.bool,
      description: PropTypes.any,
      required: PropTypes.bool,
      attribute_id: PropTypes.string,
    })
  ),
  price: PropTypes.number,
  sku: PropTypes.string,
  slug: PropTypes.string,
  stock_status: PropTypes.any,
  stock_tracking: PropTypes.bool,
  stock_purchasable: PropTypes.bool,
  attributes: PropTypes.shape({
    brand: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      visible: PropTypes.bool,
      filterable: PropTypes.bool,
      id: PropTypes.string,
      value: PropTypes.string,
    }),
  }),
  tags: PropTypes.array,
  meta_title: PropTypes.any,
  meta_description: PropTypes.string,
  variants: PropTypes.shape({
    count: PropTypes.number,
    results: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        currency: PropTypes.string,
        images: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            file: PropTypes.shape({
              height: PropTypes.number,
              md5: PropTypes.string,
              url: PropTypes.string,
              width: PropTypes.number,
            }),
          })
        ),
        name: PropTypes.string,
        option_value_ids: PropTypes.arrayOf(PropTypes.string),
        price: PropTypes.number,
        sku: PropTypes.string,
        stock_status: PropTypes.any,
      })
    ),
    page: PropTypes.number,
  }),
  sale: PropTypes.bool,
});
