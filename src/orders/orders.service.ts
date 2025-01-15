import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { customerName, items } = createOrderDto;

      const order = this.orderRepository.create({ customerName, totalPrice: 0 });
      const savedOrder = await queryRunner.manager.save(order);

      let totalPrice = 0;

      for (const item of items) {
        const orderItem = this.orderItemRepository.create({
          ...item,
          order: savedOrder,
        });
        await queryRunner.manager.save(orderItem);

        totalPrice += item.price * item.quantity;
      }

      savedOrder.totalPrice = totalPrice;
      await queryRunner.manager.save(savedOrder);

      await queryRunner.commitTransaction();

      return savedOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['items'] });
  }
}
