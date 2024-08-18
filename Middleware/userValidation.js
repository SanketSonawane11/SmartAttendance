const z = require('zod');

const userValidation = z.object({
    firstName: z.string().min(3).max(40).trim(),
    lastName: z.string().min(3).max(40).trim(),
    email: z.string().email(),
    password: z.string().min(8).max(40).trim(),
    phone: z.number().max(10),
    department: z.string(),
    gender: z.enum(['male', 'female', 'others']),
    branch: z.string().max(40).trim(),
    idNumber: z.number(),
    workingFloor: z.number().min(1).max(100),
    faceData: z.any()
        .refine(img => img !== undefined, "Face data required!")
        .refine(img => img.mimetype.starteWith('image/'), 'Only Image file allowrd'),
    workingHour: z.number().max(20),
});

module.exports = userValidation;