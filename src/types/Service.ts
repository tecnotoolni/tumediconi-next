import Status from "./Status";

export interface Service {
    id: number;
    doctorID: number;
    name: string;
    description?: string;
    basePrice: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    removedAt?: Date;
    status: Status;
}

/*

  id           Int              @id @default(autoincrement())
  doctorID     Int
  name         String
  description  String?
  basePrice    Decimal
  isActive     Boolean           @default(true)
  createdAt       DateTime? @default(now())
  updatedAt       DateTime?
  removedAt       DateTime?
  status       GenericStatus
  doctor       Doctor            @relation(fields: [doctorID], references: [id])
  variants     ServiceVariant[]
  orders       ServiceOrder[]

  */