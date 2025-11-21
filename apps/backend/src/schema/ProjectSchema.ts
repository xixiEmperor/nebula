import mongoose from "mongoose";

export const ProjectSchema = new mongoose.Schema({
	// 项目名称
	name: {
		type: String,
		required: true
	},
	// 项目描述
	description: {
		type: String
	},
	// 创建者
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	// 项目成员
	members: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'User'
	},
	// 项目模板
	template: {
		type: String,
		enum: ['basic-grid', 'three-column', 'kpi-dashboard', 'monitor', 'full-map', 'four-quadrant', 'waterfall'],
		required: true
	},
	// 项目状态
	// status: {
	// 	type: String,
	// 	enum: ['active', 'inactive', 'pending'],
	// 	default: 'active'
	// }
	// 项目内容
	content: {
		type: Object,
		required: true
	}
}, {
	timestamps: true
})