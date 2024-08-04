"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieParser = require("cookie-parser");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const compression = require("compression");
const app_module_1 = require("./app.module");
const allExceptions_filter_1 = require("./filters/allExceptions.filter");
const configService = new config_1.ConfigService();
async function bootstrap() {
    const [FRONTEND_PATH, API_PORT, ORIGIN, SWAGGER_TITLE, SWAGGER_DESCRIPTION, SWAGGER_VERSION,] = [
        configService.get('FRONTEND_PATH'),
        configService.get('API_PORT'),
        configService.get('ORIGIN'),
        configService.get('SWAGGER_TITLE'),
        configService.get('SWAGGER_DESCRIPTION'),
        configService.get('SWAGGER_VERSION'),
    ];
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose'],
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle(SWAGGER_TITLE)
        .setDescription(SWAGGER_DESCRIPTION)
        .setVersion(SWAGGER_VERSION)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors({
        origin: [ORIGIN, FRONTEND_PATH],
        methods: ['GET', 'POST', 'PUT', 'UPDATE', 'PATCH', 'DELETE'],
        credentials: true,
    });
    app.use(cookieParser());
    app.use(compression({
        level: 6,
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.useGlobalFilters(new allExceptions_filter_1.AllExceptionsFilter());
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    await app.listen(API_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map