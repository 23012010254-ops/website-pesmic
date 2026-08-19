import { type SchemaTypeDefinition } from 'sanity'
import { paketType } from './paketType'
import { testimoniType } from './testimoniType'
import { pencapaianType } from './pencapaianType'
import { faqType } from './faqType'
import { artikelType } from './artikelType'
import { produkType } from './produkType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [paketType, testimoniType, pencapaianType, faqType, artikelType, produkType],
}
