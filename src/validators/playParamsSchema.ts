import Joi from "joi";

export const playParamsSchema = Joi.object({
    bet: Joi.number().required()
})