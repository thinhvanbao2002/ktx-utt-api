module.exports = function (plop) {
  plop.setGenerator('module', {
    description: 'Auto generate module/CRUD',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Entity name:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/modules/{{name}}/{{name}}.module.ts',
        templateFile: 'plop-templates/module.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{name}}/{{name}}.controller.ts',
        templateFile: 'plop-templates/controller.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{name}}/{{name}}.service.ts',
        templateFile: 'plop-templates/service.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{name}}/dto/create-{{name}}.dto.ts',
        templateFile: 'plop-templates/createDto.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{name}}/dto/update-{{name}}.dto.ts',
        templateFile: 'plop-templates/updateDto.hbs',
      },
      {
        type: 'add',
        path: 'src/entities/{{name}}.entity.ts',
        templateFile: 'plop-templates/entity.hbs',
      },
    ],
  });
};
