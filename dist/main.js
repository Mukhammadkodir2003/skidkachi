"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    try {
        const PORT = process.env.PORT ?? 3030;
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.use(cookieParser());
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.setGlobalPrefix("api");
        app.enableCors({
            origin: (origin, callback) => {
                const allowedOrigins = [
                    "http://localhost:8000",
                    "http://localhost:3000",
                    "https://skidkachi.uz",
                    "https://api.skidkachi.uz",
                    "https://skidkach.vercel.app",
                ];
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                }
                else {
                    callback(new common_1.BadRequestException("Not allowed by CORS"));
                }
            },
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            credentials: true,
        });
        const config = new swagger_1.DocumentBuilder()
            .addBearerAuth({
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "Enter your Bearer token",
        }, "authorization")
            .setTitle("Skidkachi project")
            .setDescription("Skidkachi project")
            .setVersion("1.0")
            .addTag("")
            .build();
        const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup("api", app, documentFactory);
        await app.listen(PORT, () => {
            console.log(`Server started at: http://localhost${PORT}`);
        });
    }
    catch (err) {
        console.log(err);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map