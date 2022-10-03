import Joi from "joi";

export const loginSchema = Joi.object().keys({
	userId: Joi.string().min(1).max(20).required(),
	userPw: Joi.string().min(1).max(40).required(),
});
