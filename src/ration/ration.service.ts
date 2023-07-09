import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto';
import { CreateRationDto } from './dto/create-ration.dto';
import { Ration } from './schemas';

@Injectable()
export class RationService {
  constructor(
    @InjectModel(Ration.name) private readonly rationModel: Model<Ration>,
  ) {}

  async create(rationInfo: CreateRationDto): Promise<Ration> {
    const ration = await this.rationModel.create(rationInfo);
    return ration;
  }

  async getRations({
    page,
    limit,
    query,
  }: PaginationQueryDto): Promise<Ration[]> {
    const rations = await this.rationModel.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            // {agent} //add search by agent and farmer name or phone number
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
          result: 1,
          totalPages: {
            $cond: {
              if: { $eq: ['$totalPages', null] },
              then: 1,
              else: '$totalPages',
            },
          },
          limit: { $literal: limit },
          page: { $literal: page },
        },
      },
    ]);

    return rations[0];
  }

  async getRation(id: Types.ObjectId): Promise<Ration> {
    const ration = await this.rationModel.findById(id);
    return ration;
  }

  async updateRation(id: Types.ObjectId, rationInfo: any): Promise<Ration> {
    const ration = await this.rationModel.findByIdAndUpdate(
      id,
      { ...rationInfo },
      {
        new: true,
      },
    );
    return ration;
  }
}
