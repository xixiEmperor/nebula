import { UserSchema } from "../../schema/UserSchema";


export const UserSchemaProvide = {
	provide: 'User_Model',
	useFactory: (mongoose) => mongoose.model('User_Model', UserSchema),
	inject: ['DATABASE_CONNECTION']
}