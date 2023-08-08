import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserDTO } from './dto/user.dto';
import { Observable } from 'rxjs';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserMSG } from 'src/common/constants';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/user')
export class UserController {

    constructor(private readonly clientProxy: ClientProxySuperFlights){}

    private _clientProxyUser = this.clientProxy.clientProxyUsers();

    @Post()
    @ApiOperation({summary:'create user'})
    create(@Body() userDTO: UserDTO): Observable<IUser>{
        return this._clientProxyUser.send(UserMSG.CREATE, userDTO);
    }

    @Get()
    @ApiOperation({summary:'list all users'})
    findAll(): Observable<IUser[]>{
        return this._clientProxyUser.send(UserMSG.FIND_ALL,'');
    }

    @Get(':id')
    @ApiOperation({summary:'list a user by id'})
    findOne(@Param('id') id: string): Observable<IUser>{
        return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
    }

    @Put(':id')
    @ApiOperation({summary:'update user by id'})
    update(@Param('id') id: string, @Body() userDTO: UserDTO): Observable<IUser>{
        return this._clientProxyUser.send(UserMSG.UPDATE, { id, userDTO });
    }

    @Delete(':id')
    @ApiOperation({summary:'delete user by id'})
    delete(@Param('id') id:string): Observable<any>{
        return this._clientProxyUser.send(UserMSG.DELETE,id);
    }
}
