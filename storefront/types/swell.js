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

export const CartPropTypes = PropTypes.shape({
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
});

/** @typedef {object} Order
 * @property {string} cart_id
 * @property {object} billing
 * @property {string} billing.method
 * @property {null} test
 * @property {object[]} items
 * @property {string} items.product_id
 * @property {number} items.quantity
 * @property {string} items.id
 * @property {number} items.price
 * @property {number} items.orig_price
 * @property {number} items.shipment_weight
 * @property {string} items.product_name
 * @property {null} items.delivery
 * @property {number} items.price_total
 * @property {number} items.discount_total
 * @property {number} items.discount_each
 * @property {number} items.tax_total
 * @property {number} items.tax_each
 * @property {number} items.quantity_total
 * @property {number} items.quantity_cancelable
 * @property {number} items.quantity_deliverable
 * @property {number} items.quantity_canceled
 * @property {number} items.quantity_delivered
 * @property {object} shipping
 * @property {string} shipping.name
 * @property {string} shipping.address1
 * @property {null} shipping.address2
 * @property {string} shipping.city
 * @property {string} shipping.zip
 * @property {string} shipping.country
 * @property {string} shipping.account_address_id
 * @property {string} shipping.first_name
 * @property {string} shipping.last_name
 * @property {null} shipment_rating
 * @property {number} shipment_discount
 * @property {null} schedule
 * @property {null} coupon_code
 * @property {null} coupon_id
 * @property {null} discounts
 * @property {null} taxes
 * @property {null} item_tax_included
 * @property {null} shipment_tax
 * @property {null} shipment_tax_included
 * @property {} promotion_ids
 * @property {string} account_id
 * @property {null} account_logged_in
 * @property {null} account_info_saved
 * @property {null} account_credit_applied
 * @property {null} account_credit_amount
 * @property {null} giftcards
 * @property {string} currency
 * @property {null} display_currency
 * @property {null} display_locale
 * @property {null} notes
 * @property {null} comments
 * @property {null} gift
 * @property {null} gift_message
 * @property {object} metadata
 * @property {string} metadata.transactionHash
 * @property {string} metadata.state
 * @property {null} date_trial_end
 * @property {number} sub_total
 * @property {number} shipment_price
 * @property {number} shipment_total
 * @property {number} item_tax
 * @property {number} tax_included_total
 * @property {number} item_discount
 * @property {number} discount_total
 * @property {number} grand_total
 * @property {number} item_quantity_returned
 * @property {number} return_item_total
 * @property {number} return_item_tax
 * @property {number} return_item_tax_included
 * @property {number} return_total
 * @property {number} payment_balance
 * @property {boolean} paid
 * @property {boolean} refunded
 * @property {number} item_quantity_delivered
 * @property {number} item_quantity_deliverable
 * @property {boolean} delivered
 * @property {number} item_quantity
 * @property {number} item_quantity_canceled
 * @property {number} item_quantity_cancelable
 * @property {number} item_quantity_returnable
 * @property {number} item_quantity_invoiced
 * @property {number} item_quantity_invoiceable
 * @property {number} item_quantity_credited
 * @property {number} item_quantity_creditable
 * @property {number} item_shipment_weight
 * @property {number} shipment_tax_included_total
 * @property {number} tax_total
 * @property {number} giftcard_total
 * @property {boolean} guest
 * @property {string} date_created
 * @property {boolean} hold
 * @property {boolean} closed
 * @property {string} status
 * @property {number} payment_total
 * @property {number} refund_total
 * @property {string} number
 * @property {string} id
 */

export const OrderPropTypes = PropTypes.shape({
  cart_id: PropTypes.string,
  billing: PropTypes.shape({
    method: PropTypes.string,
  }),
  test: PropTypes.any,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      product_id: PropTypes.string,
      quantity: PropTypes.number,
      id: PropTypes.string,
      price: PropTypes.number,
      orig_price: PropTypes.number,
      shipment_weight: PropTypes.number,
      product_name: PropTypes.string,
      delivery: PropTypes.any,
      price_total: PropTypes.number,
      discount_total: PropTypes.number,
      discount_each: PropTypes.number,
      tax_total: PropTypes.number,
      tax_each: PropTypes.number,
      quantity_total: PropTypes.number,
      quantity_cancelable: PropTypes.number,
      quantity_deliverable: PropTypes.number,
      quantity_canceled: PropTypes.number,
      quantity_delivered: PropTypes.number,
    })
  ),
  shipping: PropTypes.shape({
    name: PropTypes.string,
    address1: PropTypes.string,
    address2: PropTypes.any,
    city: PropTypes.string,
    zip: PropTypes.string,
    country: PropTypes.string,
    account_address_id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
  shipment_rating: PropTypes.any,
  shipment_discount: PropTypes.number,
  schedule: PropTypes.any,
  coupon_code: PropTypes.any,
  coupon_id: PropTypes.any,
  discounts: PropTypes.any,
  taxes: PropTypes.any,
  item_tax_included: PropTypes.any,
  shipment_tax: PropTypes.any,
  shipment_tax_included: PropTypes.any,
  promotion_ids: PropTypes.array,
  account_id: PropTypes.string,
  account_logged_in: PropTypes.any,
  account_info_saved: PropTypes.any,
  account_credit_applied: PropTypes.any,
  account_credit_amount: PropTypes.any,
  giftcards: PropTypes.any,
  currency: PropTypes.string,
  display_currency: PropTypes.any,
  display_locale: PropTypes.any,
  notes: PropTypes.any,
  comments: PropTypes.any,
  gift: PropTypes.any,
  gift_message: PropTypes.any,
  metadata: PropTypes.shape({
    transactionHash: PropTypes.string,
    state: PropTypes.string,
  }),
  date_trial_end: PropTypes.any,
  sub_total: PropTypes.number,
  shipment_price: PropTypes.number,
  shipment_total: PropTypes.number,
  item_tax: PropTypes.number,
  tax_included_total: PropTypes.number,
  item_discount: PropTypes.number,
  discount_total: PropTypes.number,
  grand_total: PropTypes.number,
  item_quantity_returned: PropTypes.number,
  return_item_total: PropTypes.number,
  return_item_tax: PropTypes.number,
  return_item_tax_included: PropTypes.number,
  return_total: PropTypes.number,
  payment_balance: PropTypes.number,
  paid: PropTypes.bool,
  refunded: PropTypes.bool,
  item_quantity_delivered: PropTypes.number,
  item_quantity_deliverable: PropTypes.number,
  delivered: PropTypes.bool,
  item_quantity: PropTypes.number,
  item_quantity_canceled: PropTypes.number,
  item_quantity_cancelable: PropTypes.number,
  item_quantity_returnable: PropTypes.number,
  item_quantity_invoiced: PropTypes.number,
  item_quantity_invoiceable: PropTypes.number,
  item_quantity_credited: PropTypes.number,
  item_quantity_creditable: PropTypes.number,
  item_shipment_weight: PropTypes.number,
  shipment_tax_included_total: PropTypes.number,
  tax_total: PropTypes.number,
  giftcard_total: PropTypes.number,
  guest: PropTypes.bool,
  date_created: PropTypes.string,
  hold: PropTypes.bool,
  closed: PropTypes.bool,
  status: PropTypes.string,
  payment_total: PropTypes.number,
  refund_total: PropTypes.number,
  number: PropTypes.string,
  id: PropTypes.string,
});
