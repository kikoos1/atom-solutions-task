import Joi from "joi";

export const simParamsSchema = Joi.object({
    count: Joi.number().required(),
    bet: Joi.number().required()
})