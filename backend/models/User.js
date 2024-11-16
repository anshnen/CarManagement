const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Simple regex for email validation
        },
        message: 'Invalid email format',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // Exclude password by default in queries
    },
  },
  { timestamps: true }
);

// Pre-save hook for password hashing
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(12); // Higher salt rounds for added security
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Custom JSON transformation
UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id; // Replace `_id` with `id` for readability
    delete ret._id;
    delete ret.__v;
    delete ret.password; // Ensure password is never exposed
    return ret;
  },
});

// Static method to find user by email
UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email }).select('+password'); // Include password explicitly
};

module.exports = mongoose.model('User', UserSchema);

