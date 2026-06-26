//get express validator
export const {body,validationsresult}= require ("express-validator");
//validate the cleaned username
[
body("Username")
.trim()
.toLowerCase()
.escape(),

body("Username")
.notEmpty()
.withMessage("Username cannot be empty")
.isAlphanumeric()
.withMessage("Username must only be text")
.isLength({min: 4,max: 20}),

body("email")
.trim()
.isEmail()
.notEmpty(),

body("password")
.trim()
.notEmpty()
]