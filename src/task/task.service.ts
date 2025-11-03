import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTaskDto } from './dto/createTask.dto.js';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UpdateTaskDto } from './dto/updateTask.dto.js';

@Injectable()
export class TaskService {
  constructor(
    private prismaService: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(userId: string, taskDto: CreateTaskDto) {
    const userExists = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) throw new NotFoundException('User not found');

    const task = await this.prismaService.task.create({
      data: {
        ...taskDto,
        userId,
      },
    });

    this.eventEmitter.emit('task.created', task);

    return task;
  }

  async findAllByUserId(userId: string) {
    return this.prismaService.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const task = await this.prismaService.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);

    return task;
  }

  async update(id: string, taskDto: UpdateTaskDto) {
    return this.prismaService.task.update({
      where: { id },
      data: taskDto,
    });
  }

  async delete(id: string) {
    return this.prismaService.task.delete({ where: { id } });
  }
}
