import { z } from "zod";

export const anonymousSignUpSchema = z.object({
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

export const anonymousSignInSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Kullanıcı adı zorunludur")
    .regex(/^user\d+$/i, "Geçerli bir kullanıcı adı giriniz (ör. user1)"),
  password: z.string().min(1, "Şifre zorunludur"),
});

export const changePasswordSchema = z.object({
  newPassword: z.string().min(6, "Yeni şifre en az 6 karakter olmalıdır"),
});

export type AnonymousSignUpInput = z.infer<typeof anonymousSignUpSchema>;
export type AnonymousSignInInput = z.infer<typeof anonymousSignInSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

// Aliases for compatibility
export const signUpSchema = anonymousSignUpSchema;
export const signInSchema = anonymousSignInSchema;
export type SignUpInput = AnonymousSignUpInput;
export type SignInInput = AnonymousSignInInput;
