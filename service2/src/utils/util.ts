import { Request } from 'express';
import { Query, Document } from 'mongoose';

type QueryParams = Request['query'];

export class APIFeatures<T extends Document> {
  constructor(
    public query: Query<T[], T>,
    public queryString: QueryParams,
  ) {}

  filter() {
    // Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr: string = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    // Sorting
    if (this.queryString.sort) {
      const sortByParam: string = this.queryString.sort as string;
      const sortBy: string = sortByParam.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    // Fields Limiting
    if (this.queryString.fields) {
      const fieldsParam: string = this.queryString.fieldsParam as string;
      const fields: string = fieldsParam.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    // Pagination
    const pageParam: string = this.queryString.page as string;
    const page: number = parseInt(pageParam) || 1;

    const limitParam: string = this.queryString.limit as string;
    const limit: number = parseInt(limitParam) || 100;
    const skip: number = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
