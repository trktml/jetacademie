import { describe, expect, it } from "bun:test";
import {
  anonymousSignInSchema,
  anonymousSignUpSchema,
  changePasswordSchema,
  signInSchema,
  signUpSchema,
} from "./auth";

describe("Anonymous Auth Zod Schemas", () => {
  describe("anonymousSignUpSchema", () => {
    it("should accept passwords of at least fifteen characters", () => {
      for (const password of [
        "a".repeat(15),
        "a long password phrase",
        "mot-de-passe-français",
        "a".repeat(128),
      ]) {
        expect(anonymousSignUpSchema.safeParse({ password }).success).toBe(true);
      }
    });

    it("should reject passwords shorter than fifteen characters", () => {
      const invalidData = {
        password: "a".repeat(14),
      };
      const result = anonymousSignUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Şifre en az 15 karakter olmalıdır");
      }
      expect(anonymousSignUpSchema.safeParse({ password: "a".repeat(129) }).success).toBe(false);
    });

    it("should work via signUpSchema alias", () => {
      expect(signUpSchema.safeParse({ password: "test-password-1234" }).success).toBe(true);
    });
  });

  describe("anonymousSignInSchema", () => {
    it("should accept valid username and password", () => {
      const validData = {
        username: "user1",
        password: "any-password",
      };
      const result = anonymousSignInSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject invalid username format", () => {
      const invalidData = {
        username: "invalid_name",
        password: "password123",
      };
      const result = anonymousSignInSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Geçerli bir kullanıcı adı giriniz (ör. user1)"
        );
      }
    });

    it("should reject empty username", () => {
      const invalidData = {
        username: "   ",
        password: "password123",
      };
      const result = anonymousSignInSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject empty password", () => {
      const invalidData = {
        username: "user1",
        password: "",
      };
      const result = anonymousSignInSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should work via signInSchema alias", () => {
      expect(signInSchema.safeParse({ username: "user42", password: "pwd" }).success).toBe(true);
    });
  });

  describe("changePasswordSchema", () => {
    it("should accept new passwords of at least fifteen characters", () => {
      for (const newPassword of ["a".repeat(15), "a long password phrase", "a".repeat(128)]) {
        expect(
          changePasswordSchema.safeParse({ currentPassword: "oldpassword123", newPassword }).success
        ).toBe(true);
      }
    });

    it("should reject short new password", () => {
      const invalidData = {
        currentPassword: "oldpassword123",
        newPassword: "a".repeat(14),
      };
      const result = changePasswordSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Şifre en az 15 karakter olmalıdır");
      }
    });

    it("should require the current password", () => {
      expect(changePasswordSchema.safeParse({ newPassword: "1234" }).success).toBe(false);
    });
  });
});
