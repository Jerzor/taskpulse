import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service.js';
import { CreateTaskDto } from './dto/createTask.dto.js';
import { UpdateTaskDto } from './dto/updateTask.dto.js';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  // TODO - temporary until JWT Guard
  private readonly userId = '6004d6a8-9aa9-4c87-8032-874254d0709a';

  @Post()
  async create(@Body() taskDto: CreateTaskDto) {
    return this.taskService.create(this.userId, taskDto);
  }

  @Get()
  async findAll() {
    return this.taskService.findAllByUserId(this.userId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() taskDto: UpdateTaskDto) {
    return this.taskService.update(id, taskDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
