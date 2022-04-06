// import {balanceInterface} from "./controller";
import {Request, Response, NextFunction } from "express";
import z, { AnyZodObject } from "zod";

//const schema = z.Schema
 export const balance = z.object({
  body: z.object({
    // accountNo: z.string({
    //   required_error: "Account number is required",
    // }),
    balance: z
      .number({
        required_error: "Balance is required",
      // }),
      // createdAt: z.string({
      //   required_error: "CreatedAt is required",
      // })
  }),
}),})

export const validate = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
};


export const transaction = z.object({
  body: z.object({
    // reference: z.string({
    //   required_error: "reference number is required",
    // }),

    senderAccountNumber: z
      .number({
        required_error: "Sender account number is required",
      }).min(10, { message: "Must be 10 or more characters long" })
      .max(10, { message: "Must be 10 or fewer characters long" }),

      amount: z.number({
        required_error: "amount is required",
      }),

      receiverAccountNumber: z
      .number({
        required_error: "Receiver account number is required",
      }).min(10, { message: "Must be 10 or more characters long" })
      .max(10, { message: "Must be 10 or fewer characters long" }),

      transferDescription: z.string({
        required_error: "Transfer description is required",
      })
  }),
});


// export const validate = (schema: AnyZodObject) =>
//   async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
//     try {
//       await schema.parseAsync({
//         body: req.body,
//         query: req.query,
//         params: req.params,
//       });
//       return next();
//     } catch (error) {
//       return res.status(400).json(error);
//     }
// };
