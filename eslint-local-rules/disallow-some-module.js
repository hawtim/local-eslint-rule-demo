const fs = require('fs');
const { parse } = require('@babel/parser');
const babelTraverse = require('@babel/traverse').default;

// cache store module names
let stores = []

function getStoreModuleNames(context) {
  const settings = context.settings || {};
  if (stores.length) return stores;
  if (settings.stores) {
    try {
      const fileContent = fs.readFileSync(settings.stores, 'utf8');
      const ast = parse(
        fileContent,
        {
          sourceType: 'module',
          plugins: ['objectRestSpread'],
          ecmaFeatures: {
            modules: true
          }
        },
      );
      babelTraverse(ast, {
        ExportNamedDeclaration(path) {
          const node = path.node;
          if (node.declaration.type === 'VariableDeclaration') {
            const declaration = node.declaration;
            if (declaration.declarations.length === 1) {
              const declarationNode = declaration.declarations[0];
              if (declarationNode.id.type === 'Identifier') {
                const properties = declarationNode.init.properties;
                properties.forEach(property => {
                  stores.push(property.key.name);
                })
              }
            }
          }
        },
        ExportDefaultDeclaration(path) {
          const node = path.node;
          if (node.declaration.type === 'ObjectExpression') {
            const properties = node.declaration.properties;
            properties.forEach(property => {
              stores.push(property.key.name);
            })
          }
        }
      });
      if (stores.length === 0) {
        console.error('No store module found. Please check your store file.');
      }
      return stores;
    } catch (error) {
      console.error('parse file error', error)
    }
  }
}

module.exports = {
  create(context) {
    // const stores = getStoreModuleNames(context);
    // console.info(stores)
    const options = context.options[0] || [];
    return {
      // if we want to disallow to invoke aModule
      'CallExpression[callee.type="Identifier"][callee.name="mapGetters"]': function (node) {
        const arg = node.arguments[0];
        if (options.includes(arg.value)) {
          context.report({
            node: node.arguments[0],
            message: `mapGetters: not allowed to use ${arg.value}`,
          });
        }
      },
      'CallExpression[callee.type="Identifier"][callee.name="mapActions"]': function (node) {
        const arg = node.arguments[0];
        const { properties } = arg;
        properties.forEach((property, index) => {
          const { value } = property.value;
          if (options.includes(value.split('/')[0])) {
            context.report({
              node: node.arguments[0].properties[index].value,
              message: `mapActions: not allowed to use ${value.split('/')[0]}`,
            });
          }
        });
      }
    };
  },
};