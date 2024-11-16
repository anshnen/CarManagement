const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Schema definition
const CarSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true, 
      index: true // Index for faster queries 
    },
    title: { 
      type: String, 
      required: true, 
      maxlength: 100, // Limit the title length
    },
    description: { 
      type: String, 
      required: true, 
      maxlength: 500, // Limit the description length
    },
    images: { 
      type: [String], 
      validate: {
        validator: function (images) {
          return images.every(url => /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url));
        },
        message: 'Each image must be a valid URL',
      },
    },
    tags: { 
      type: [String], 
      default: [], 
    },
    deleted: { 
      type: Boolean, 
      default: false, // For soft delete functionality 
    },
  },
  { timestamps: true }
);

// Pagination plugin
CarSchema.plugin(mongoosePaginate);

// Transform JSON output
CarSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id; // Replace `_id` with `id`
    delete ret._id; 
    delete ret.__v; 
    return ret;
  },
});

// Add a static method to find non-deleted cars
CarSchema.statics.findActive = function (filter) {
  return this.find({ ...filter, deleted: false });
};

module.exports = mongoose.model('Car', CarSchema);
