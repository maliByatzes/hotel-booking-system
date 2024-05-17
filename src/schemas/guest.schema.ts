import { z } from 'zod';

// TODO: implement a custom validator for `phoneNumber` field

export const createGuestSchema = z.object({
  firstName: z.string({
    required_error: 'first name is required'
  }).max(101, { message: 'first name must be less than 101 characters' }),
  lastName: z.string({
    required_error: 'last name is required'
  }).max(101, { message: 'last name must be less than 101 characters' }),
  emailAddress: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string()
    .max(21, { message: 'phone nunber must be less than 21 characters' }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must be less than 32 characters" }),
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passowrds do not match",
  path: ["passwordConfirm"]
});

export const loginGuestSchema = z.object({
  emailAddress: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Invalid password"),
});

export type CreateGuestInput = Omit<
  z.infer<typeof createGuestSchema>,
  'passwordConfirm'
>;

export type LoginGuestInput = z.infer<typeof loginGuestSchema>;
