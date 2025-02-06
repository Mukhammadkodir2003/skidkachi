import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  try {
    const PORT = process.env.PORT ?? 3030;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");

    const config = new DocumentBuilder()
      .setTitle("Skidkachi project")
      .setDescription("Skidkachi project")
      .setVersion("1.0")
      .addTag("")
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, documentFactory);

    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
