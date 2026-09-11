import { describe, expect, it } from "bun:test";
import { signInSchema, signUpSchema } from "./auth";

describe("Auth Zod Schemas", () => {
  describe("signUpSchema", () => {
    it("should accept valid signup input", () => {
      const validData = {
        name: "Test User",
        email: "user@example.com",
        password: "securepassword123",
      };
      const result = signUpSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const invalidData = {
        name: "Test User",
        email: "not-an-email",
        password: "securepassword123",
      };
      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Geçerli bir e-posta adresi giriniz");
      }
    });

    it("should reject short password", () => {
      const invalidData = {
        name: "Test User",
        email: "user@example.com",
        password: "123",
      };
      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Şifre en az 8 karakter olmalıdır");
      }
    });

    it("should reject short name", () => {
      const invalidData = {
        name: "A",
        email: "user@example.com",
        password: "securepassword123",
      };
      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Ad en az 2 karakter olmalıdır");
      }
    });
  });

  describe("signInSchema", () => {
    it("should accept valid signin input", () => {
      const validData = {
        email: "user@example.com",
        password: "any-password",
      };
      const result = signInSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject empty password", () => {
      const invalidData = {
        email: "user@example.com",
        password: "",
      };
      const result = signInSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
