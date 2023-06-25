const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The product name must not be empty'],
        trim: true,
        maxLength: [100, 'The product name must be less than 100 character']
    },
    best_seller:{
        type: Number,
        maxLength: [1],
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Price must not be empty'],
        maxLength: [7, 'Price must be less than 7 character'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Description must not be empty'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    size: {
        type: String,
        required: [true, 'Please select a size for this product'],
        enum: {
            values: [
                'S',
                'M',
                'L',
                'XL',
                'XXL'
            ],
            message: 'Please select the correct size for the product'
        }
    },
    color: {
        type: String,
        required: [true, 'Please select a color for this product'],
        enum: {
            values: [
                'Black',
                'White',
                'Pastel',
                'Yellow',
                'Pink',
                'Orange',
                'Blue',
                'Pastel',
                'Purples',
                'Reds',
                'Burnt oranges',
                'Browns',
                'Darker greens',
                'Royal blue',
                'Emerald green',
                'Hot pink',
                'Sea blue'
            ],
            message: 'Please select the correct color for the product'
        }
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select a category for this product'],
        enum: {
            values: [
                'Secondhand',
                'New Clothing',
                'Man',
                'Woman',
                'Unisex',
                'Dress',
                "T-Shirt",
                'Somi',
                'Pant',
                'Gifts',
                'Voucher',
                'Delivery'
            ],
            message: 'Please select the correct category for the product'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter the seller of the product']
    },
    stock: {
        type: Number,
        required: [true, 'Stock must not be empty'],
        maxLength: [5, 'Stock must be less than 5 character'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);