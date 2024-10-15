import { conformZodMessage } from "@conform-to/zod"
import * as z from "zod"

export const onboardingSchema = z.object({
  fullName: z.string().min(3).max(30),
  userName: z.string().min(3).max(30).regex(/^[a-zA-Z0-9-]+$/, {
    message: "Username must be alphanumeric and can include hyphens.",
  }),
})

//MARK: - Onboarding Schema Validator
export function onboardingSchemaValidator(options: {
  isUsernameUnique: () => Promise<boolean>;
}) {
  return z.object({
    userName: z
      .string()
      .min(3)
      .max(150)
      .regex(/^[a-zA-Z0-9-]+$/, {
        message: "Username must contain only letters,numbers,and -",
      })
      // Pipe the schema so it runs only if the email is valid
      .pipe(
        z.string().superRefine((_, ctx) => {
          // by indicating that the validation is not defined
          if (typeof options?.isUsernameUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });
            return;
          }

          // If it reaches here, then it must be validating on the server
          // Return the result as a promise so Zod knows it's async instead
          return options.isUsernameUnique().then((isUnique) => {
            if (!isUnique) {
              ctx.addIssue({
                code: "custom",
                message: "Username is already used",
              });
            }
          });
        })
      ),
    fullName: z.string().min(3).max(30),
  });
}