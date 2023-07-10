import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { PaginationQueryDto } from 'src/common/dto';
import { CreateSellDto } from './dto/create-sell.dto';
import { Sell } from './schemas';

@Injectable()
export class SellService {
  constructor(
    @InjectModel(Sell.name) private readonly sellModel: Model<Sell>,
  ) {}

  async create(
    sellInfo: CreateSellDto,
    customerId: Types.ObjectId,
  ): Promise<Sell> {
    return await this.sellModel.create({
      ...sellInfo,
      customer: customerId,
      bookedAt: new Date(),
    });
  }

  async getSell(
    id: Types.ObjectId,
    customer_id: Types.ObjectId,
  ): Promise<Sell> {
    return await this.sellModel
      .findOne({ _id: id, customer: customer_id })
      .select('-__v')
      .populate({
        path: 'customer',
        select: '-__v -password -oauth -emailVerified -createdAt -updatedAt',
      });
  }

  async getSells(
    customer_id: Types.ObjectId,
    { limit, query, page }: PaginationQueryDto,
  ): Promise<Sell[]> {
    const sells = await this.sellModel.aggregate([
      {
        $match: {
          $and: [
            { customer: customer_id },
            {
              $or: [
                { name: { $regex: query, $options: 'i' } },
                { phone: { $regex: query, $options: 'i' } },
                { address: { $regex: query, $options: 'i' } },
                { zip: { $regex: query, $options: 'i' } },
              ],
            },
          ],
        },
      },
      {
        // remove __v from the result
        $project: {
          __v: 0,
        },
      },
      {
        $facet: {
          results: [
            { $skip: (page - 1) * limit },
            { $limit: limit },
            { $sort: { createdAt: -1 } },
          ],
          count: [{ $count: 'count' }],
        },
      },
      {
        $project: {
          count: { $arrayElemAt: ['$count.count', 0] },
          results: 1,
        },
      },
      {
        $addFields: {
          totalPages: {
            $ceil: {
              $divide: ['$count', limit],
            },
          },
        },
      },
      {
        $project: {
          total: '$count',
          totalPages: {
            $cond: {
              if: { $eq: ['$totalPages', null] },
              then: 1,
              else: '$totalPages',
            },
          },
          results: 1,
          limit: { $literal: limit },
          page: { $literal: page },
        },
      },
    ]);
    return sells[0];
  }

  //   async updateSell(id: string, sellInfo: CreateSellDto): Promise<Sell> {
  //     return await this.sellModel.findByIdAndUpdate(
  //       id,
  //       { ...sellInfo },
  //       {
  //         new: true,
  //       },
  //     );
  //   }
}
