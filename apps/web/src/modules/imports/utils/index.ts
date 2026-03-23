import { ImportLeadRow } from '../types';
import { csvRowSchema } from '../validations/imports.schema';

/**
 * Super basic CSV Parser (For Demo purposes, actual prod may use PapaParse)
 */
export const parseCsvText = (text: string): ImportLeadRow[] => {
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  
  // Mapping logic header name to keys. (Assume standard format for this scaffold)
  return lines.slice(1).map((line, index) => {
    const cols = line.split(',').map(c => c.trim());
    const obj: any = {
      id: `row-${Date.now()}-${index}`,
      customerName: cols[0] || '',
      phoneNumber: cols[1] || '',
      source: cols[2] || '',
      interestProduct: cols[3] || '',
      groupTag: cols[4] || ''
    };

    // Auto validate Zod rule on local row
    const result = csvRowSchema.safeParse(obj);
    if (!result.success) {
      obj.isValid = false;
      obj.errors = result.error.errors.map(e => e.message);
    } else {
      obj.isValid = true;
    }

    return obj as ImportLeadRow;
  });
};
