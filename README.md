This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 使用 Prisma 进行数据库操作
- npm install prisma @prisma/client --save
- npx prisma init
- npx prisma migrate dev --name init
- npx prisma generate
- npx prisma db push
- npx prisma studio

### 使用 Zod + CONFORM 进行表单验证 
- npm install @conform-to/react @conform-to/zod --save
- npm i zod

#### 为什么使用parseWithZod
- parseWithZod 是一个封装，通常在某些框架中（如 Remix）使用，它结合了表单数据的自动解析和 Zod 的验证。在一些 UI 框架中，它可能更便捷，因为它可以直接处理表单的 formData，并且能够自动将表单数据映射到 Zod schema 的结构中。
``` ts
const validate = parseWithZod(formData,{
  schema: onboardingSchema,
})
```

### 使用 zod schema 验证 userName 是否唯一
- 在 zod schema 中，使用 .superRefine 方法来验证 userName 是否唯一
- 在 zod schema 中，使用 .pipe 方法来验证 userName 是否唯一
``` tsx zod schema
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
```

- 将action中的schema替换成 onboardingSchemaValidator，并添加 isUsernameUnique 方法（通过 prisma 查询 userName 是否唯一）

### BookingForm 使用 React-aria 和 shadcn 

### 再看一下 Calendar 的实现