import type { CustomerSchema } from './customer.contract';

export type TCustomer = typeof CustomerSchema.infer;
