const yup =require('yup'); 

const userCreateSchema = yup.object().shape ({
    name: yup.string().required().max(30).trim(),
    email: yup.string().required().email(), 
    password: yup.string().required().min(6), 
    public_id: yup.string() ,
     url: yup.string(),
     role:yup.string().default('admin'),
    
    })

    const updateProfileSchema = yup.object().shape ({
        name: yup.string().max(30).trim(),
        email: yup.string().email(), 
        password: yup.string().min(6), 
         avatar : yup.object().shape({
         url:yup.string().required(),
        public_id: yup.string()
        }),
         role:yup.string().default('admin'),
        
        })
       
        const updatePasswordSchema = yup.object().shape ({
            password: yup.string().required().min(6), 
            confirmPassword: yup.string().required().min(6), 
            })
    

    const loginSchema = yup.object().shape ({
        email: yup.string().required().email(), 
        password: yup.string().required().min(6), 
        })


   const forgotPasswordSchema = yup.object().shape ({
        email: yup.string().required().email(), 
        })

    const resetPasswordSchema = yup.object().shape ({
        password: yup.string().required().min(6), 
        confirmPassword: yup.string().required().min(6), 
        })

    


    module.exports={userCreateSchema,updateProfileSchema,loginSchema,updatePasswordSchema,forgotPasswordSchema,resetPasswordSchema }; 
    
    
