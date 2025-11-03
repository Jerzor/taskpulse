import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EventsGateway {
  @OnEvent('task.created')
  handleTaskCreated(payload) {
    console.log(`Event recived: Task created ${payload}`);
  }

  @OnEvent('user.registered')
  handleUserRegistered(payload) {
    console.log(`Event recived: User registered ${payload}`);
  }
}
