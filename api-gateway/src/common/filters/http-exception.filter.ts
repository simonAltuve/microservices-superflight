import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";

@Catch()
export class AllExceptionFilter implements ExceptionFilter{
    
    private readonly logger = new Logger(AllExceptionFilter.name);
    catch(exception: any, host: ArgumentsHost) {
        const contexto = host.switchToHttp();
        const response = contexto.getResponse();
        const request = contexto.getRequest();

        const status = exception instanceof HttpException? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        
        const msg = exception instanceof HttpException? exception.getResponse()
            : exception;
        
        this.logger.error(`Status: ${status} Error: ${JSON.stringify(msg)}`);

        response.status(status).json({
            timestamps: new Date().toISOString(),
            path: request.url,
            error: msg
        })
    }

}