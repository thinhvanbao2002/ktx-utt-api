import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { API_USER_BEARER_AUTH } from '../common/constant';

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('###')
    .setDescription(
      `### REST

Routes is following REST standard (Richardson level 3)

<details><summary>Detailed specification</summary>
<p>

</p>
</details>`,
    )
    .addBearerAuth(
      {
        type: 'http',
        name: API_USER_BEARER_AUTH,
        description: 'Token for user access',
        bearerFormat: 'JWT',
        scheme: 'bearer',
        in: 'header',
      },
      API_USER_BEARER_AUTH,
    );
  // .addBearerAuth(
  //   {
  //     type: 'http',
  //     name: 'adminToken',
  //     description: 'Token for admin access',
  //     bearerFormat: 'JWT',
  //     scheme: 'bearer',
  //     in: 'header',
  //   },
  //   'adminToken',
  // );

  if (process.env.API_VERSION) {
    documentBuilder.setVersion(process.env.API_VERSION);
  }

  const documentPath = 'docs';
  documentBuilder.setExternalDoc('Collection', '/spec.json');
  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup(documentPath, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      displayRequestDuration: true,
      showExtensions: true,
      tryItOutEnabled: true,
      filter: true,
      showRequestDuration: true,
      requestSnippetsEnabled: true,
      deepLinking: true,
      tagsSorter: (a: string, b: string) => {
        if (a === 'default') {
          return -1;
        }

        if (b === 'default') {
          return 1;
        }

        return a.localeCompare(b);
      },
    },
  });
  const baseUrl = process.env.API_BASE_URL
    ? process.env.API_BASE_URL
    : `http://localhost:${process.env.API_PORT}`;
  console.info(`Documentation: ${baseUrl}/${documentPath}`);
}
