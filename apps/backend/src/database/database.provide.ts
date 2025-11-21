import mongoose from "mongoose";

export const databaseProvider = {
	provide: 'DATABASE_CONNECTION',
	useFactory: async () : Promise<typeof mongoose> => {
		const connection = await mongoose.connect('mongodb://localhost:27017/nebula-nest')
		console.log('MongoDB连接成功')
		return connection
	}
}