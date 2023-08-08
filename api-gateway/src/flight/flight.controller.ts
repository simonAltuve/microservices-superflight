import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { FlightDTO } from './dto/flight.dto';
import { Observable } from 'rxjs';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FlightMSG, PassengerMSG } from 'src/common/constants';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Flights')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/flight')
export class FlightController {

    constructor(private readonly clientProxy: ClientProxySuperFlights) { }

    private _clientProxyFlight = this.clientProxy.clientProxyFlights();
    private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();

    @Post()
    @ApiOperation({summary:'create flight'})
    create(@Body() flightDTO: FlightDTO): Observable<IFlight> {
        return this._clientProxyFlight.send(FlightMSG.CREATE, flightDTO);
    }

    @Get()
    @ApiOperation({summary:'list all flights'})
    findAll(): Observable<IPassenger[]> {
        return this._clientProxyFlight.send(FlightMSG.FIND_ALL, '');
    }

    @Get(':id')
    @ApiOperation({summary:'list flight by id'})
    findOne(@Param('id') id: string): Observable<IPassenger>{
        return this._clientProxyFlight.send(FlightMSG.FIND_ONE, id);
    }

    @Put(':id')
    @ApiOperation({summary:'update flight by id'})
    update(@Param('id') id: string, @Body() flightDTO: FlightDTO): Observable<IFlight>{
        return this._clientProxyFlight.send(FlightMSG.UPDATE, {id, flightDTO});
    }

    @Delete(':id')
    @ApiOperation({summary:'delete flight by id'})
    delete(@Param('id') id: string): Observable<any>{
        return this._clientProxyFlight.send(FlightMSG.DELETE, id);
    }

    @Post(':flightId/passenger/:passengerId')
    async addPassenger(
        @Param('flightId') flightId: string,
        @Param('passengerId') passengerId: string
    ){
        const passenger = await this._clientProxyPassenger
            .send(PassengerMSG.FIND_ONE,passengerId)
            .toPromise();
        
        if(!passenger) throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);

        return this._clientProxyFlight.send(
            FlightMSG.ADD_PASSENGER,
            {flightId, passengerId});

    }

}
