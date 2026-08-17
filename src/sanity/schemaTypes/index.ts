import { type SchemaTypeDefinition } from 'sanity'
import { paketType } from './paketType'
import { testimoniType } from './testimoniType'
import { pencapaianType } from './pencapaianType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [paketType, testimoniType, pencapaianType],
}
