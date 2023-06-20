const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


exports.lookUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Email and Password must not be empty', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')


    if (!user) {
        return next(new ErrorHandler('Email does not exist', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Password is wrong!', 401));
    }

    if(user.role === "look"){
        return next(new ErrorHandler("Your account has been locked. Please contact the admin!"))
    }
    next()
})