import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
	// 用户名
	username: {
		type: String,
		required: true
	},
	// 邮箱
	email: {
		type: String,
		required: true
	},
	// 密码
	password: {
		type: String,
		required: true
	},
}, {
	timestamps: true
})