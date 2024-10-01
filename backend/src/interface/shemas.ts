import Joi from "joi"; 

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
});


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
});

const  channelDetailsSchema = Joi.object({
    channelName: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(10).max(100).required(),
    category: Joi.string().required(),
    language: Joi.string().required(),
    visibility: Joi.string().required(),
});

const  channelUpdateSchema = Joi.object({
    username: Joi.string().min(3).max(30).optional(),
    description: Joi.string().min(10).max(100).optional(),
    title: Joi.string().min(3),
    avatarUrl: Joi.string().uri().optional(),
});
export { registerSchema, loginSchema,channelDetailsSchema,channelUpdateSchema }; 


