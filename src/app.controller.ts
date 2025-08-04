import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

@Controller('users')
export class AppController {
  private users = [
    { id: 1, name: 'Sezai', job: 'Doctor' },
    { id: 2, name: 'Ahmet', job: 'Engineer' },
    { id: 3, name: 'Leyla', job: 'Chef' },
    { id: 4, name: 'Hasan', job: 'Doctor' },
    { id: 5, name: 'Songül', job: 'Engineer' },
    { id: 6, name: 'Aydın', job: 'Architect' },
  ];

  @Get()
  getAllUsers() {
    return this.users;
  }

  @Get('id/:id')
  getUserById(@Param('id') id: string) {
    const users = this.getAllUsers();
    const user = users.find(u => u.id === parseInt(id));
    if(user){
      return user;
    }
    else{
      return {message: "User not found."};
    }
  } 

  @Get('job/:job')
  getUserByJob(@Param('job') job: string){
    const users = this.getAllUsers();
    const filtered = users.filter(u => u.job.toLowerCase() === job.toLowerCase());
    if(filtered.length > 0){
      return filtered;
    }
    else{
      return {message: "User not found by job."};
    }
  }

  @Post()
  createUser(@Body() body: any) {
    const newId = this.users.length + 1;
    const newUser = { id: newId, ...body };
    this.users.push(newUser);

    return {
      message: 'New user created.',
      user: newUser,
    };
  }

  @Delete('id/:id')
  deleteUserById(@Param('id') id: string){
    const index = this.users.findIndex((u) => u.id === parseInt(id));
    if(index === -1){
      return {message: "User not found."}
    }
    const deleted = this.users.splice(index,1);
    return{
      message: "User deleted.",
      deletedUser: deleted[0],
    };
  }

  @Put('id/:id')
  updateUserbyId(@Param('id') id: string, @Body() body: any) {
    const user = this.users.find((u) => u.id === parseInt(id));

    if (!user) {
      return { message: 'User not found.'};
    }

    if (body.name) {
      user.name = body.name;
    }
    if (body.job) {
      user.job = body.job;
    }

    return {
      message: 'User updated.',
      updatedUser: user,
    };
  }
}