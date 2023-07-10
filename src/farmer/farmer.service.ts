import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/paginated-query.dto';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { Farmer } from './schemas/farmer.schema';

@Injectable()
export class FarmerService {
  constructor(
    @InjectModel(Farmer.name) private readonly farmerModel: Model<Farmer>,
  ) {}

  async create(farmerInfo: CreateFarmerDto, id: string): Promise<Farmer> {
    const farmer = await this.farmerModel.findOne({ phone: farmerInfo.phone });
    if (farmer) throw new ConflictException('Phone number is already in use');

    const newFarmer = await this.farmerModel.create({
      ...farmerInfo,
      createdBy: id,
    });
    return newFarmer;
  }

  async getFarmers({
    page,
    limit,
    query,
  }: PaginationQueryDto): Promise<Farmer[]> {
    console.log('query', query);

    const farmers = await this.farmerModel.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { phone: { $regex: query, $options: 'i' } },
            { address: { $regex: query, $options: 'i' } },
            { zip: { $regex: query, $options: 'i' } },
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
          results: 1,
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

    return farmers[0];
  }

  async getFarmer(id: Types.ObjectId): Promise<Farmer> {
    const farmer = await this.farmerModel.findById(id);
    if (!farmer) throw new NotFoundException("Farmer doesn't exist");

    return farmer;
  }

  async updateFarmer(
    id: Types.ObjectId,
    farmerInfo: Partial<CreateFarmerDto>,
  ): Promise<Farmer> {
    const farmer = await this.farmerModel.findById(id);
    if (!farmer) throw new NotFoundException("Farmer doesn't exist");

    const updatedFarmer = await this.farmerModel.findByIdAndUpdate(
      id,
      farmerInfo,
      { new: true },
    );
    return updatedFarmer;
  }

  async deleteFarmer(id: Types.ObjectId): Promise<Farmer> {
    const farmer = await this.farmerModel.findById(id);
    if (!farmer) throw new NotFoundException("Farmer doesn't exist");

    const deletedFarmer = await this.farmerModel.findByIdAndDelete(id);
    return deletedFarmer;
  }
}
