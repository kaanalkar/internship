import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { LogService } from 'src/common/services/log.service';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UpdateUserDto } from './user/dto/update-user.dto';
import { IdParamDto } from './user/dto/id.param.dto';
import { JobParamDto } from './user/dto/job.param.dto';
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
  async getUserById(@Param() { id }: IdParamDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) return user;
    return { message: 'User not found.' };
  }

  @Get('job/:job')
  async getUserByJob(@Param() { job }: JobParamDto) {
    const users = await this.userRepository.find({ where: { job } });
    if (users.length > 0) return users;
    return { message: 'User not found by job.' };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() dto: CreateUserDto) {
    const newUser = this.userRepository.create(dto);
    const saved = await this.userRepository.save(newUser);
    return {
      message: 'New user created.',
      user: saved,
    };
  }

  @Delete('id/:id')
  async deleteUserById(@Param() { id }: IdParamDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return { message: 'User not found.' };

    await this.userRepository.delete(user.id);
    return {
      message: 'User deleted.',
      deletedUser: user,
    };
  }

  @Put('id/:id')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiBody({ type: UpdateUserDto })
  async updateUserById(@Param() { id }: IdParamDto, @Body() dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return { message: 'User not found.' };

    const updatedUser = Object.assign(user, dto);
    const saved = await this.userRepository.save(updatedUser);
    return {
      message: 'User updated.',
      updatedUser: saved,
    };
  }
}
