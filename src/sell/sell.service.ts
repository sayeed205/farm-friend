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

  async getSell(id: Types.ObjectId): Promise<Sell> {
    return await this.sellModel.findById(id); // todo)) get only current user's sells
  }

  async getSells(
    customer_id: Types.ObjectId,
    { limit, query, page }: PaginationQueryDto,
  ): Promise<Sell[]> {
    return await this.sellModel.aggregate([
      {
        $match: {
          $and: [
            { customer_id: customer_id },
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
          count: 1,
          totalPages: 1,
          results: 1,
        },
      },
      {
        $unwind: {
          path: '$results',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'customers',
          localField: 'customer_id',
          foreignField: '_id',
          as: 'customer',
        },
      },
    ]);
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
