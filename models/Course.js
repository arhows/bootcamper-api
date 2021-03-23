const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    unique: true,
    trim: true,
    maxlenght: [50, 'Description can not be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true,
  },
  weeks: {
    type: String,
    require: [true, 'Please add number of weeks'],
  },
  tuition: {
    type: Number,
    require: [true, 'Please add tuition cost'],
  },
  minimumSkill: {
    type: String,
    require: [true, 'Please add a minimu skill'],
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  scholarhipsAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
});

module.exports = mongoose.model('Course', CourseSchema);
