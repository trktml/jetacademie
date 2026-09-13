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
    it("should accept valid password of at least 6 characters", () => {
      const validData = {
        password: "secret",
      };
      const result = anonymousSignUpSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject password shorter than 6 characters", () => {
      const invalidData = {
        password: "12345",
      };
      const result = anonymousSignUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Şifre en az 6 karakter olmalıdır");
      }
    });

    it("should work via signUpSchema alias", () => {
      expect(signUpSchema.safeParse({ password: "mypassword" }).success).toBe(true);
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
    it("should accept valid new password", () => {
      const validData = {
        newPassword: "newpassword123",
      };
      const result = changePasswordSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject short new password", () => {
      const invalidData = {
        newPassword: "123",
      };
      const result = changePasswordSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Yeni şifre en az 6 karakter olmalıdır");
      }
    });
  });
});
