import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
  basePath: '/admin',
  projectId: 'wchs5gss',
  dataset: 'production',
  title: 'PESMIC Admin',
  schema,
  plugins: [
    structureTool(),
  ],
})
