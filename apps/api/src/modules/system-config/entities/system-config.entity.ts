export class SystemConfigEntity {
  id: string; // Identifier unique single row record in db (e.g. 'GLOBAL')
  configKey: string;
  configValue: string; // JSON string payload map options parameters
  updatedAt: Date;
  updatedBy: string;
}
