import { z } from 'zod';

export const createBookingSchema = z.object({
  body: z.object({
    checkinDate: z.string({
      required_error: "checkin date is required"
    }),
    checkoutDate: z.string({
      required_error: "chekout date is required"
    }),
    numAdults: z.number({
      required_error: "num of adults is required"
    }),
    numChildren: z.number({
      required_error: "num of children is required"
    }),
    bookingAmount: z.number({
      required_error: "booking amount is required"
    }),
  }),
});

const params = {
  params: z.object({
    bookingId: z.number({
      required_error: 'Booking id is required'
    }),
  }),
}

export const getBookingSchema = z.object({
  ...params,
});

export const updateBookingSchema = z.object({
  ...params,
  body: z.object({
    checkinDate: z.string({
      required_error: "checkin date is required"
    }).date(),
    checkoutDate: z.string({
      required_error: "chekout date is required"
    }).date(),
    numAdults: z.number({
      required_error: "num of adults is required"
    }),
    numChildren: z.number({
      required_error: "num of children is required"
    }),
    bookingAmount: z.number({
      required_error: "booking amount is required"
    }),
  }).partial(),
});

export const deleteBookingSchema = z.object({
  ...params,
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>['body'];
export type GetBookingInput = z.infer<typeof getBookingSchema>['params'];
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;
export type DeleteBookingInput = z.infer<typeof deleteBookingSchema>['params'];
