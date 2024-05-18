import { PaymentStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getOnePaymentStatus = async (
  status: string
) => {
  return (await prisma.paymentStatus.findFirst({
    where: {
      paymentStatusName: status,
    }
  })) as PaymentStatus;
};
