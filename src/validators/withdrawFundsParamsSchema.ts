import Joi from "joi";

export const withdrawFundsParamsSchema = Joi.object({
    amount: Joi.number().required(),
})