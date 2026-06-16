import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://127.0.0.1:4200/graphql',
  generates: {
    './generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
}

export default config
