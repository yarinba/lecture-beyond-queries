import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: ['apps/be/schema.gql', 'apps/fe/schema.gql'],
  generates: {
    'apps/fe': {
      documents: ['apps/**/*.graphql', 'libs/**/*.graphql'],
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: '~@demo/types',
        extension: '.generated.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {},
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
      config: {},
    },
    'libs/types/src/types.generated.ts': {
      plugins: ['typescript'],
      config: {},
    },
  },
  watch: ['apps/fe/src/**/*.graphql'],
};

export default config;
