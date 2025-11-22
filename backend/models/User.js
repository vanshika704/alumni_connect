import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    role: { 
      type: String, 
      enum: ['student', 'alumni', 'admin'], 
      default: 'student' 
    },

    // STUDENT ONLY
    rollNumber: {
      type: String,
      required: function () {
        return this.role === 'student';
      }
    },

    studentIdCardUrl: {
      type: String,
      required: false, // OCR image
    },

    // ALUMNI ONLY
    graduationYear: {
      type: Number,
      required: function () {
        return this.role === 'alumni';
      }
    },

    currentCompany: {
      type: String,
      required: false,
    },

    workEmail: {
      type: String,
      required: false,
    },

    // ALUMNI ONLY — OR if work email missing
    idCardUrl: {
      type: String,
      required: false,
    },

    // VERIFICATION STATUS
    isVerified: { 
      type: Boolean, 
      default: false 
    },

  },
  { timestamps: true }
);

// 🔐 Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔐 Compare passwords during login
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
