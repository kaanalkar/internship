import { Controller, Get, Post, Body, Param, Delete, Put, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/user.entity';
import { LogService } from './log.service';
import { CreateUserDto } from './user/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class AppController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly logService: LogService,
  ) {}

  @Get()
  getAllUsers() {
    return this.userRepository.find();
  }

  @Get('id/:id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userRepository.findOne({ where: { id: parseInt(id) } });
    if (user) return user;
    return { message: 'User not found.' };
  }

  @Get('job/:job')
  async getUserByJob(@Param('job') job: string) {
    const users = await this.userRepository.find({ where: { job } });
    if (users.length > 0) return users;
    return { message: 'User not found by job.' };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() body: Partial<User>) {
    const newUser = this.userRepository.create(body);
    const saved = await this.userRepository.save(newUser);
    return {
      message: 'New user created.',
      user: saved,
    };
  }

  @Delete('id/:id')
  async deleteUserById(@Param('id') id: string) {
    const user = await this.userRepository.findOne({ where: { id: parseInt(id) } });
    if (!user) return { message: 'User not found.' };

    await this.userRepository.delete(user.id);
    return {
      message: 'User deleted.',
      deletedUser: user,
    };
  }

  @Put('id/:id')
  async updateUserById(@Param('id') id: string, @Body() body: Partial<User>) {
    const user = await this.userRepository.findOne({ where: { id: parseInt(id) } });
    if (!user) return { message: 'User not found.' };

    const updatedUser = Object.assign(user, body);
    const saved = await this.userRepository.save(updatedUser);
    return {
      message: 'User updated.',
      updatedUser: saved,
    };
  }
}