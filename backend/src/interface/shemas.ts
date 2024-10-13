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

const channelDetailsSchema = Joi.object({
    channelName: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(10).max(100).required(),
    category: Joi.string().required(),
    language: Joi.string().required(),
    visibility: Joi.string().required(),
});

const channelUpdateSchema = Joi.object({
    description: Joi.string().min(10).max(100).optional(),
    title: Joi.string().min(3).max(30).optional(),
    avatarUrl: Joi.string().uri().optional(),
});

const passwordUpdateShema = Joi.object({
    password: Joi.string().min(6).max(30).required(),
    newPassword: Joi.string().min(6).max(30).required(),
});

const updateUserSchema = Joi.object({
    username: Joi.string().min(3).max(30),
    email: Joi.string().email()
});

const channelShema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(10).max(100).required(),
    avatarUrl: Joi.string().uri().required()
})

const useridShema = Joi.object({
    userfollow: Joi.string().required()
})

const commentShema = Joi.object({
    content: Joi.string().min(1).max(1000).required(),
    channel: Joi.string().required()
})

const commentUpdateShema = Joi.object({
    content: Joi.string().min(1).max(1000).required(),
 
})

export { channelShema, registerSchema, loginSchema, channelDetailsSchema, channelUpdateSchema, passwordUpdateShema, updateUserSchema, useridShema
    , commentShema, commentUpdateShema
 };


