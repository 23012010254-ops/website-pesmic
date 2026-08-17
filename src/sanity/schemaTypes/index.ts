import { type SchemaTypeDefinition } from 'sanity'
import { paketType } from './paketType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [paketType],
}
