import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(@Inject('USERS_SERVICE') private usersClient: ClientProxy) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<object> {
    return this.usersClient.send('createUser', createUserDto);
  }

  @Get()
  findAll(): Observable<object> {
    return this.usersClient.send('findAllUsers', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersClient.send('findOneUser', id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersClient.send('updateUser', { id, updateUserDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersClient.send('removeUser', id);
  }
}
