import Joi from "joi";

export const depositFundsParamsSchema = Joi.object({
    amount: Joi.number().required(),
})