import mongoose, {
  Document,
  Query,
  CallbackWithoutResultAndOptionalError,
  Model,
} from 'mongoose';
import slugify from 'slugify';
import log from '../utils/logger.ts';

export interface ITour {
  name: string;
  slug: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  priceDiscount: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string;
  createdAt: Date;
  startDates: Date;
  secretTour: boolean;
}

export interface TourDoc extends ITour, Document {}

export interface TourModel extends Model<TourDoc> {}

const tourSchema = new mongoose.Schema<TourDoc, TourModel>(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal then 40 charaters'],
      minlength: [10, 'A tour name must have more or equal then 10 charaters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must be a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'Difficulty is either: easy, medium, hard',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1.0, 'Rating must be above 1.0'],
      max: [5.0, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (value: number) {
          return value < this.price; // this di sini digunakan ketika `new document` saja
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

tourSchema.virtual('durationWeeks').get(function (): number {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre(
  'save',
  function (next: CallbackWithoutResultAndOptionalError): void {
    this.slug = slugify(this.name, { lower: true });
    next();
  },
);

// tourSchema.pre('save', function (next) {
//   console.log('Will save document ...');
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
tourSchema.pre(
  /^find/,
  function (
    this: Query<Array<TourDoc>, TourDoc>,
    next: CallbackWithoutResultAndOptionalError,
  ): void {
    this.find({ secretTour: { $ne: true } });
    next();
  },
);

tourSchema.post(
  /^find/,
  (docs: TourDoc[], next: CallbackWithoutResultAndOptionalError): void => {
    log.info(docs);
    next();
  },
);

// AGGREATION MIDDLEWARE
tourSchema.pre(
  'aggregate',
  function (next: CallbackWithoutResultAndOptionalError): void {
    this.pipeline().unshift({
      $match: { secretTour: { $ne: true } },
    });

    // console.log(this.pipeline()); // `this` di sini akan merujuk pada agregasi saat ini
    next();
  },
);

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
