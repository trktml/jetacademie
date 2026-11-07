import { z } from "zod";

export const MIN_PASSWORD_LENGTH = 15;
export const MAX_PASSWORD_LENGTH = 128;

const passwordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, `Şifre en az ${MIN_PASSWORD_LENGTH} karakter olmalıdır`)
  .max(MAX_PASSWORD_LENGTH);

export const anonymousSignUpSchema = z.object({
  password: passwordSchema,
});

export const anonymousSignInSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Kullanıcı adı zorunludur")
    .max(32, "Kullanıcı adı çok uzun")
    .regex(/^user\d+$/i, "Geçerli bir kullanıcı adı giriniz (ör. user1)"),
  password: z.string().min(1, "Şifre zorunludur").max(128),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Mevcut şifre zorunludur").max(128),
  newPassword: passwordSchema,
});

export const deleteAccountSchema = z.object({
  password: z.string().min(1, "Şifre zorunludur").max(128),
});

export type AnonymousSignUpInput = z.infer<typeof anonymousSignUpSchema>;
export type AnonymousSignInInput = z.infer<typeof anonymousSignInSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

// Aliases for compatibility
export const signUpSchema = anonymousSignUpSchema;
export const signInSchema = anonymousSignInSchema;
export type SignUpInput = AnonymousSignUpInput;
export type SignInInput = AnonymousSignInInput;
