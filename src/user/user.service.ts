import { PrismaService } from '../prisma/prisma.service.js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
      },
      select: { id: true, email: true, createdAt: true },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, createdAt: true },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, createdAt: true },
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }
}
