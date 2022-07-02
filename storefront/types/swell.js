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

/**
 * @typedef {object} Cart
 * @property {null} account_logged_in
 * @property {string} currency
 * @property {string} checkout_id
 * @property {number} sub_total
 * @property {number} item_discount
 * @property {number} item_tax
 * @property {number} item_quantity
 * @property {number} item_shipment_weight
 * @property {number} discount_total
 * @property {number} shipment_price
 * @property {number} shipment_total
 * @property {number} tax_total
 * @property {number} tax_included_total
 * @property {number} grand_total
 * @property {number} auth_total
 * @property {number} giftcard_total
 * @property {number} capture_total
 * @property {boolean} guest
 * @property {string} checkout_url
 * @property {string} date_created
 * @property {string} status
 * @property {string} date_abandoned
 * @property {null} discounts
 * @property {object[]} items
 * @property {string} items.product_id
 * @property {number} items.quantity
 * @property {string} items.id
 * @property {number} items.price
 * @property {number} items.shipment_weight
 * @property {number} items.price_total
 * @property {number} items.discount_total
 * @property {number} items.discount_each
 * @property {number} items.tax_total
 * @property {number} items.tax_each
 * @property {null} items.variant
 * @property {object} items.product
 * @property {string} items.product.name
 * @property {null} items.product.sku
 * @property {object[]} items.product.images
 * @property {object} items.product.images.file
 * @property {string} items.product.images.file.id
 * @property {string} items.product.images.file.date_uploaded
 * @property {number} items.product.images.file.length
 * @property {string} items.product.images.file.md5
 * @property {null} items.product.images.file.filename
 * @property {string} items.product.images.file.content_type
 * @property {null} items.product.images.file.metadata
 * @property {string} items.product.images.file.url
 * @property {number} items.product.images.file.width
 * @property {number} items.product.images.file.height
 * @property {string} items.product.images.id
 * @property {string} items.product.description
 * @property {string} items.product.slug
 * @property {object} items.product.attributes
 * @property {string} items.product.attributes.brute_quest_perex
 * @property {string} items.product.attributes.brute_price
 * @property {string} items.product.attributes.brute_initial_supply
 * @property {string} items.product.attributes.brute_rarity
 * @property {boolean} items.product.stock_tracking
 * @property {} items.product.options
 * @property {number} items.product.stock_level
 * @property {boolean} items.product.stock_purchasable
 * @property {string} items.product.id
 * @property {} promotion_ids
 * @property {number} shipment_discount
 * @property {null} taxes
 * @property {boolean} abandoned
 * @property {null} shipment_rating
 * @property {string} id
 * @property {null} coupon
 * @property {object} promotions
 * @property {number} promotions.count
 * @property {} promotions.results
 * @property {number} promotions.page
 */

export const CartPropTypes = {
  account_logged_in: PropTypes.any,
  billing: PropTypes.shape({}),
  shipping: PropTypes.shape({}),
  currency: PropTypes.string,
  checkout_id: PropTypes.string,
  sub_total: PropTypes.number,
  item_discount: PropTypes.number,
  item_tax: PropTypes.number,
  item_quantity: PropTypes.number,
  item_shipment_weight: PropTypes.number,
  discount_total: PropTypes.number,
  shipment_price: PropTypes.number,
  shipment_total: PropTypes.number,
  tax_total: PropTypes.number,
  tax_included_total: PropTypes.number,
  grand_total: PropTypes.number,
  auth_total: PropTypes.number,
  giftcard_total: PropTypes.number,
  capture_total: PropTypes.number,
  guest: PropTypes.bool,
  checkout_url: PropTypes.string,
  date_created: PropTypes.string,
  status: PropTypes.string,
  date_abandoned: PropTypes.string,
  discounts: PropTypes.any,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      product_id: PropTypes.string,
      quantity: PropTypes.number,
      id: PropTypes.string,
      price: PropTypes.number,
      shipment_weight: PropTypes.number,
      price_total: PropTypes.number,
      discount_total: PropTypes.number,
      discount_each: PropTypes.number,
      tax_total: PropTypes.number,
      tax_each: PropTypes.number,
      variant: PropTypes.any,
      product: PropTypes.shape({
        name: PropTypes.string,
        sku: PropTypes.any,
        images: PropTypes.arrayOf(
          PropTypes.shape({
            file: PropTypes.shape({
              id: PropTypes.string,
              date_uploaded: PropTypes.string,
              length: PropTypes.number,
              md5: PropTypes.string,
              filename: PropTypes.any,
              content_type: PropTypes.string,
              metadata: PropTypes.any,
              url: PropTypes.string,
              width: PropTypes.number,
              height: PropTypes.number,
            }),
            id: PropTypes.string,
          })
        ),
        description: PropTypes.string,
        slug: PropTypes.string,
        attributes: PropTypes.shape({
          brute_quest_perex: PropTypes.string,
          brute_price: PropTypes.string,
          brute_initial_supply: PropTypes.string,
          brute_rarity: PropTypes.string,
        }),
        stock_tracking: PropTypes.bool,
        options: PropTypes.array,
        stock_level: PropTypes.number,
        stock_purchasable: PropTypes.bool,
        id: PropTypes.string,
      }),
    })
  ),
  promotion_ids: PropTypes.array,
  shipment_discount: PropTypes.number,
  taxes: PropTypes.any,
  abandoned: PropTypes.bool,
  shipment_rating: PropTypes.any,
  id: PropTypes.string,
  coupon: PropTypes.any,
  promotions: PropTypes.shape({
    count: PropTypes.number,
    results: PropTypes.array,
    page: PropTypes.number,
  }),
};
