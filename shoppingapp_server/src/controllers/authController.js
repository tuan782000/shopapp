/** @format */

const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const asyncHandle = require('express-async-handler');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.USERNAME_EMAIL,
        pass: process.env.PASSWORD_EMAIL
    }
});

const getJsonWebToken = async (email, id) => {
    const payload = {
        email,
        id
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '7d'
    });

    return token;
};

const handleSendMail = async val => {
    try {
        await transporter.sendMail(val);

        return 'OK';
    } catch (error) {
        return error;
    }
};

const verification = asyncHandle(async (req, res) => {
    const { id } = req.body;

    try {
        const user = await UserModel.findById(id);
        const accesstoken = await getJsonWebToken(user.email, id);

        // update lại trường isVerify trên DB lại thành true
        await UserModel.findByIdAndUpdate(id, { isVerify: true });

        res.status(200).json({
            message: 'Send verification code successfully!!!',
            data: {
                email: user.email,
                id: user._id,
                isVerify: true,
                accesstoken
            }
        });
    } catch (error) {
        res.status(401);
        throw new Error('Can not send email');
    }
});

// const register = asyncHandle(async (req, res) => {
// 	const { email, fullname, password } = req.body;

// 	const existingUser = await UserModel.findOne({ email });

// 	if (existingUser) {
// 		res.status(400);
// 		throw new Error('User has already exist!!!');
// 	}

// 	const salt = await bcrypt.genSalt(10);
// 	const hashedPassword = await bcrypt.hash(password, salt);

// 	const newUser = new UserModel({
// 		email,
// 		fullname: fullname ?? '',
// 		password: hashedPassword,
// 	});

// 	await newUser.save();

// 	const data = {
// 		from: `"Verification code" <${process.env.USERNAME_EMAIL}>`,
// 		to: email,
// 		subject: 'Verification email code',
// 		text: 'Your code to verification email',
// 		html: `<h1>${1234}</h1>`,
// 	};

// 	res.status(200).json({
// 		message: 'Register new user successfully',
// 		data: {
// 			email: newUser.email,
// 			id: newUser._id,
// 			isVerify: false,
// 			verificationCode: 1234
// 		},
// 	});
// });

const register = asyncHandle(async (req, res) => {
    // Bước 1: Lấy thông tin từ req gửi lên
    const { email, fullname, password } = req.body;

    // Bước 2: Kiểm tra email của user đó có tồn tại hay không
    const existingUser = await UserModel.findOne({ email });
    // Nếu có tồn tại, chấm dứt hàm đăng ký và trả về thông báo lỗi
    if (existingUser) {
        res.status(400);
        throw new Error('User already exists!');
    }

    //   // Bước 3: Viết hàm random 4 số và lưu nó lại trong biến numberVerifications
    //   let numberVerifications = "";
    //   const generateRandomNumbers = () => {
    //     while (numberVerifications.length < 4) {
    //       const randomNumber = Math.floor(Math.random() * 10); // Tạo số ngẫu nhiên từ 0 đến 9
    //       numberVerifications.push(randomNumber); // Thêm số vào mảng
    //     }
    //     return numberVerifications.join(""); // Trả về mảng chứa 4 số ngẫu nhiên dưới dạng chuỗi
    //     // return numberVerifications; // Trả về mảng chứa 4 số ngẫu nhiên
    //   };
    //   generateRandomNumbers(); // Gọi hàm để khởi tạo số ngẫu nhiên

    // Bước 3: Viết hàm random 4 số và lưu nó lại trong biến numberVerifications
    let numberVerifications = '';
    const generateRandomNumbers = () => {
        while (numberVerifications.length < 4) {
            const randomNumber = Math.floor(Math.random() * 10); // Tạo số ngẫu nhiên từ 0 đến 9
            numberVerifications += randomNumber; // Thêm số vào chuỗi
        }
        return numberVerifications; // Trả về chuỗi chứa 4 số ngẫu nhiên
    };
    generateRandomNumbers(); // Gọi hàm để khởi tạo số ngẫu nhiên

    // Bước 4: Mã hóa password của người dùng
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Bước 5: Cập nhật lại thông tin trước khi lưu vào server
    const newUser = new UserModel({
        email,
        fullname: fullname ?? '',
        password: hashedPassword
    });

    // Bước 6: Lưu vào DB
    await newUser.save();

    // Bước 7: Set up thông tin gửi email cho người dùng
    const data = {
        from: `"Verification code" <${process.env.USERNAME_EMAIL}>`,
        to: email,
        subject: 'Verification email code',
        text: 'Your code to verification email',
        html: `<h1>${numberVerifications}</h1>` // để thành dạng chuỗi hiển thị trong email
    };

    // Bước 8: Gửi email và xử lý kết quả
    await handleSendMail(data)
        .then(() => {
            res.status(200).json({
                message: 'Register new user successfully',
                data: {
                    email: newUser.email,
                    id: newUser._id,
                    isVerify: false,
                    verificationCode: numberVerifications
                }
            });
        })
        .catch(error => {
            res.status(401);
            throw new Error('Cannot send email');
        });
});

const login = asyncHandle(async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
        res.status(403);
        throw new Error('User not found!!!');
    }

    const isMatchPassword = await bcrypt.compare(
        password,
        existingUser.password
    );

    if (!isMatchPassword) {
        res.status(401);
        throw new Error('Email or Password is not correct!');
    }

    res.status(200).json({
        message: 'Login successfully',
        data: {
            id: existingUser.id,
            email: existingUser.email,
            accesstoken: await getJsonWebToken(email, existingUser.id),
            isVerify: true
            //   fcmTokens: existingUser.fcmTokens ?? [],
            //   photo: existingUser.photoUrl ?? "",
            //   name: existingUser.name ?? "",
        }
    });
});

const forgotPassword = asyncHandle(async (req, res) => {
    const { email } = req.body;

    const randomPassword = Math.round(100000 + Math.random() * 99000);

    const data = {
        from: `"New Password" <${process.env.USERNAME_EMAIL}>`,
        to: email,
        subject: 'Verification email code',
        text: 'Your code to verification email',
        html: `<h1>${randomPassword}</h1>`
    };

    const user = await UserModel.findOne({ email });
    if (user) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(`${randomPassword}`, salt);

        await UserModel.findByIdAndUpdate(user._id, {
            password: hashedPassword,
            isChangePassword: true
        })
            .then(() => {
                console.log('Done');
            })
            .catch(error => console.log(error));

        await handleSendMail(data)
            .then(() => {
                res.status(200).json({
                    message: 'Send email new password successfully!!!',
                    data: []
                });
            })
            .catch(error => {
                res.status(401);
                throw new Error('Can not send email');
            });
    } else {
        res.status(401);
        throw new Error('User not found!!!');
    }
});

const handleLoginWithGoogle = asyncHandle(async (req, res) => {
    try {
        const userInfo = req.body;

        const existingUser = await UserModel.findOne({ email: userInfo.email });
        let user;
        if (existingUser) {
            await UserModel.findByIdAndUpdate(existingUser.id, {
                updatedAt: Date.now()
            });
            user = { ...existingUser };
            user.accesstoken = await getJsonWebToken(
                userInfo.email,
                userInfo.id
            );

            if (user) {
                const data = {
                    accesstoken: user.accesstoken,
                    id: existingUser._id,
                    email: existingUser.email,
                    // fcmTokens: existingUser.fcmTokens,
                    photo: existingUser.photoUrl,
                    name: existingUser.name
                };

                res.status(200).json({
                    message: 'Login with google successfully!!!',
                    data
                });
            } else {
                res.sendStatus(401);
                throw new Error('Something went wrong');
            }
        } else {
            const salt = await bcrypt.genSalt(10);
            // viết hành gen ra password xong truyền vào 123456 để thay thế. Sau đó lấy password được gen ra thì gửi qua email cho người dùng

            // Hàm generate ra nhiều password có 10 ký tự
            const generatePassword = length => {
                const allowedChars =
                    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                let password = '';

                if (length < 6) {
                    return 'Password length must be at least 6 characters';
                }

                for (let i = 0; i < length; i++) {
                    const randomIndex = Math.floor(
                        Math.random() * allowedChars.length
                    );
                    password += allowedChars[randomIndex];
                }

                return password;
            };

            const randomPassword = generatePassword(10);

            // Sau đó gửi qua email cho người dùng

            const dataSendToEmail = {
                from: `"New Password" <${process.env.USERNAME_EMAIL}>`,
                to: userInfo.email,
                subject: 'Provided password',
                text: 'You have successfully logged into the app with your Google account. This is the password we provided for your Google account. You should change your password.',
                html: `<h1>${randomPassword}</h1>`
            };

            // mã hoá password đó
            const hash = await bcrypt.hash(`${randomPassword}`, salt);
            const newUser = new UserModel({
                email: userInfo.email,
                fullname: userInfo.name,
                password: hash,
                ...userInfo
            });
            await newUser.save();
            // gửi email password tới email người dùng
            await handleSendMail(dataSendToEmail);
            user = { ...newUser };
            user.accesstoken = await getJsonWebToken(
                userInfo.email,
                newUser.id
            );

            if (user) {
                res.status(200).json({
                    message: 'Login with google successfully!!!',
                    data: {
                        accesstoken: user.accesstoken,
                        id: user._id,
                        email: user.email,
                        // fcmTokens: user.fcmTokens,
                        photo: user.photoUrl,
                        name: user.name
                    }
                });
            } else {
                res.sendStatus(401);
                throw new Error('Something went wrong');
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    register,
    login,
    verification,
    forgotPassword,
    handleLoginWithGoogle
};
