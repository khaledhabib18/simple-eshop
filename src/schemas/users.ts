import { z } from "zod";
import en from "zod/v4/locales/en.js";
import { Role } from "../generated/prisma/enums";

export const SignupSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const AddressSchema = z.object({
  lineOne: z.string(),
  lineTwo: z.string().nullable(),
  pinCode: z.string().length(6),
  country: z.string(),
  city: z.string(),
  userId: z.string(),
});

export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  defaultShippingAddressId: z.string().optional(),
  defaultBillingAddressId: z.string().optional(),
});

export const ChangeRoleSchema = z.object({
  role: z.nativeEnum(Role),
});
