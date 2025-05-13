import type { CustomerSchema } from './rooom.contract';

export type TCustomer = typeof CustomerSchema.infer;
