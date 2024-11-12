const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
    reviewerName: { type: String, required: true },
    reviewerEmail: { type: String, required: true },
});

const MetaSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    barcode: { type: String, required: true },
    qrCode: { type: String, required: true },
});

const DimensionsSchema = new mongoose.Schema({
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    depth: { type: Number, required: true },
});

const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    tags: { type: [String], required: true },
    sku: { type: String, required: true },
    weight: { type: Number, required: true },
    dimensions: DimensionsSchema,
    warrantyInformation: { type: String, required: true },
    shippingInformation: { type: String, required: true },
    availabilityStatus: { type: String, required: true },
    reviews: [ReviewSchema],
    returnPolicy: { type: String, required: true },
    minimumOrderQuantity: { type: Number, required: true },
    meta: MetaSchema,
    images: { type: [String], required: true },
    thumbnail: { type: String, required: true },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
