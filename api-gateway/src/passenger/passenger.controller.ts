import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { PassengerDTO } from './dto/passenger.dto';
import { Observable } from 'rxjs';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { PassengerMSG } from 'src/common/constants';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Passengers')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/passenger')
export class PassengerController {

    constructor(private readonly clientProxy: ClientProxySuperFlights) { }

    private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();

    @Post()
    @ApiOperation({summary:'create passenger'})
    create(@Body() passengerDTO: PassengerDTO): Observable<IPassenger> {
        return this._clientProxyPassenger.send(PassengerMSG.CREATE, passengerDTO);
    }

    @Get()
    @ApiOperation({summary:'list all passengers'})
    findAll(): Observable<IPassenger[]> {
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ALL, '');
    }

    @Get(':id')
    @ApiOperation({summary:'list a passenger by id'})
    findOne(@Param('id') id: string): Observable<IPassenger> {
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, id);
    }

    @Put(':id')
    @ApiOperation({summary:'update passenger by id'})
    update(@Param('id') id: string, @Body() passengerDTO: PassengerDTO): Observable<IPassenger> {
        return this._clientProxyPassenger.send(PassengerMSG.UPDATE, { id, passengerDTO });
    }

    @Delete(':id')
    @ApiOperation({summary:'delete passenger by id'})
    delete(@Param('id') id: string): Observable<any>{
        return this._clientProxyPassenger.send(PassengerMSG.DELETE, id);
    }
}
