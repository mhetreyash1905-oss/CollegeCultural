import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAuditLog extends Document {
  adminId: mongoose.Types.ObjectId;
  adminName: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'REVOKE';
  entityType: string;
  entityId?: string;
  details?: string;
  createdAt: Date;
}

const AuditLogSchema: Schema = new Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminUser',
      required: true,
    },
    adminName: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      enum: ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'REVOKE'],
      required: true,
    },
    entityType: {
      type: String,
      required: true,
    },
    entityId: {
      type: String,
    },
    details: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Logs are immutable, no need for updatedAt
  }
);

// Index for faster queries on logs
AuditLogSchema.index({ createdAt: -1 });
AuditLogSchema.index({ adminId: 1 });

export const AuditLog: Model<IAuditLog> =
  mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
