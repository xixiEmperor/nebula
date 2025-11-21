## 🔧 第五章：Mongoose ODM详解

### 5.1 什么是Mongoose？

**简单理解：**

- Mongoose是MongoDB的"翻译官"
- 它让JavaScript代码更容易操作MongoDB
- 提供了数据验证、类型转换、查询构建等功能

### 5.2 安装和连接

```bash
# 安装Mongoose
npm install mongoose
```

```javascript
// config/database.js
import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    // 连接数据库
    const conn = await mongoose.connect('mongodb://localhost:27017/myapp')
  
    console.log(`MongoDB连接成功: ${conn.connection.host}`)
  } catch (error) {
    console.error('MongoDB连接失败:', error.message)
    process.exit(1) // 退出程序
  }
}

// 监听连接事件
mongoose.connection.on('connected', () => {
  console.log('Mongoose连接到MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.log('Mongoose连接错误:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose断开连接')
})

export default connectDB
```

### 5.3 Schema和Model详解

#### 创建Schema（数据结构定义）

```javascript
// models/User.js
import mongoose from 'mongoose'

// 定义用户数据结构
const userSchema = new mongoose.Schema({
  // 基本字段
  name: {
    type: String,           // 数据类型
    required: [true, '用户名是必需的'],  // 必填，自定义错误信息
    trim: true,             // 自动去除首尾空格
    minlength: [2, '用户名至少2个字符'],
    maxlength: [50, '用户名不能超过50个字符']
  },
  
  email: {
    type: String,
    required: true,
    unique: true,           // 唯一约束
    lowercase: true,        // 自动转换为小写
    validate: {             // 自定义验证
      validator: function(v) {
        return /^\w+@\w+\.\w+$/.test(v)
      },
      message: '邮箱格式不正确'
    }
  },
  
  age: {
    type: Number,
    min: [0, '年龄不能为负数'],
    max: [120, '年龄不能超过120岁'],
    validate: {
      validator: Number.isInteger,
      message: '年龄必须是整数'
    }
  },
  
  // 枚举类型
  status: {
    type: String,
    enum: {
      values: ['active', 'inactive', 'pending'],
      message: '状态必须是: active, inactive, pending 之一'
    },
    default: 'active'
  },
  
  // 数组类型
  hobbies: [{
    type: String,
    trim: true
  }],
  
  // 嵌套对象
  address: {
    city: {
      type: String,
      required: true
    },
    district: String,
    zipCode: {
      type: String,
      match: [/^\d{6}$/, '邮编必须是6位数字']
    }
  },
  
  // 引用其他文档
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'  // 引用Post模型
  }]
  
}, {
  // Schema选项
  timestamps: true,  // 自动添加createdAt和updatedAt字段
  versionKey: false  // 不添加__v字段
})

// Schema中间件（钩子函数）
userSchema.pre('save', function(next) {
  console.log('即将保存用户:', this.name)
  next()
})

userSchema.post('save', function(doc) {
  console.log('用户已保存:', doc.name)
})

// 实例方法
userSchema.methods.getFullInfo = function() {
  return `${this.name} (${this.age}岁) - ${this.email}`
}

// 静态方法
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email })
}

// 创建模型
const User = mongoose.model('User', userSchema)

export default User
```

### 5.4 模型操作详解

```javascript
// controllers/userController.js
import User from '../models/User.js'

export const userController = {
  // 创建用户
  createUser: async (req, res) => {
    try {
      // 方法1：使用构造函数
      const user = new User(req.body)
      await user.save()
    
      // 方法2：直接创建
      // const user = await User.create(req.body)
    
      res.status(201).json({
        success: true,
        message: '用户创建成功',
        data: user
      })
    } catch (error) {
      // 处理验证错误
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(e => e.message)
        return res.status(400).json({
          success: false,
          message: '数据验证失败',
          errors
        })
      }
    
      // 处理重复键错误
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: '邮箱已存在'
        })
      }
    
      res.status(500).json({
        success: false,
        message: '服务器错误',
        error: error.message
      })
    }
  },
  
  // 查询用户
  getUsers: async (req, res) => {
    try {
      const { page = 1, limit = 10, name, minAge, status } = req.query
    
      // 构建查询条件
      const query = {}
      if (name) query.name = new RegExp(name, 'i') // 不区分大小写搜索
      if (minAge) query.age = { $gte: parseInt(minAge) }
      if (status) query.status = status
    
      // 执行查询
      const users = await User
        .find(query)
        .select('-__v')  // 排除__v字段
        .sort({ createdAt: -1 })  // 按创建时间倒序
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate('posts', 'title createdAt')  // 填充关联数据
    
      // 获取总数
      const total = await User.countDocuments(query)
    
      res.json({
        success: true,
        data: users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: '查询失败',
        error: error.message
      })
    }
  },
  
  // 更新用户
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { 
          new: true,          // 返回更新后的文档
          runValidators: true // 运行验证器
        }
      )
    
      if (!user) {
        return res.status(404).json({
          success: false,
          message: '用户不存在'
        })
      }
    
      res.json({
        success: true,
        message: '用户更新成功',
        data: user
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: '更新失败',
        error: error.message
      })
    }
  },
  
  // 删除用户
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
    
      if (!user) {
        return res.status(404).json({
          success: false,
          message: '用户不存在'
        })
      }
    
      res.json({
        success: true,
        message: '用户删除成功',
        data: user
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: '删除失败',
        error: error.message
      })
    }
  }
}
```

### 5.5 Schema API详解

#### 5.5.1 Schema构造和配置

```javascript
// 创建Schema的基本语法
const userSchema = new mongoose.Schema(definition, options)

// definition - 字段定义对象
const definition = {
  name: String,
  age: Number,
  email: { type: String, required: true }
}

// options - Schema配置选项
const options = {
  timestamps: true,      // 自动添加createdAt和updatedAt
  versionKey: false,     // 不添加__v字段
  collection: 'users',   // 指定集合名称
  strict: true,          // 严格模式，只保存Schema中定义的字段
  strictQuery: true,     // 查询时也使用严格模式
  minimize: true,        // 移除空对象
  autoIndex: true,       // 自动创建索引
  autoCreate: true,      // 自动创建集合
  bufferCommands: true,  // 缓存命令直到连接建立
  capped: { size: 1024, max: 1000 } // 固定大小集合
}
```

#### 5.5.2 Schema字段类型和验证

```javascript
const userSchema = new mongoose.Schema({
  // 基本类型
  name: String,
  age: Number,
  isActive: Boolean,
  birthDate: Date,
  data: Buffer,
  mixed: mongoose.Schema.Types.Mixed,
  objectId: mongoose.Schema.Types.ObjectId,
  decimal: mongoose.Schema.Types.Decimal128,
  
  // 数组类型
  tags: [String],
  scores: [Number],
  
  // 嵌套对象
  address: {
    street: String,
    city: String,
    zipCode: String
  },
  
  // 引用类型
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // 高级字段配置
  email: {
    type: String,
    required: [true, '邮箱是必需的'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+@\w+\.\w+$/, '邮箱格式不正确'],
    validate: {
      validator: function(v) {
        return /^\w+@\w+\.\w+$/.test(v)
      },
      message: '邮箱格式不正确'
    }
  },
  
  status: {
    type: String,
    enum: {
      values: ['active', 'inactive', 'pending'],
      message: '状态必须是: {VALUE}'
    },
    default: 'active'
  },
  
  age: {
    type: Number,
    min: [0, '年龄不能为负数'],
    max: [120, '年龄不能超过120'],
    validate: {
      validator: Number.isInteger,
      message: '年龄必须是整数'
    }
  }
})
```

#### 5.5.3 Schema实例方法

```javascript
// schema.add() - 添加字段
userSchema.add({
  nickname: String,
  lastLogin: { type: Date, default: Date.now }
})

// schema.clone() - 克隆Schema
const adminSchema = userSchema.clone()
adminSchema.add({ permissions: [String] })

// schema.eachPath() - 遍历所有字段路径
userSchema.eachPath((pathname, schematype) => {
  console.log(`字段: ${pathname}, 类型: ${schematype}`)
})

// schema.get() / schema.set() - 获取/设置Schema选项
userSchema.set('autoIndex', false)
const autoIndex = userSchema.get('autoIndex')

// schema.path() - 获取字段的SchemaType
const nameType = userSchema.path('name')
const ageType = userSchema.path('age')

// schema.pathType() - 获取字段类型
userSchema.pathType('name')        // 'real'
userSchema.pathType('address.city') // 'nested'
userSchema.pathType('nonexistent') // 'adhocOrUndefined'

// schema.pick() - 选择特定字段创建新Schema
const basicSchema = userSchema.pick(['name', 'email', 'age'])

// schema.remove() - 移除字段
userSchema.remove('temporaryField')

// schema.virtual() - 创建虚拟字段
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`
})

userSchema.virtual('fullName').set(function(name) {
  const parts = name.split(' ')
  this.firstName = parts[0]
  this.lastName = parts[1]
})
```

#### 5.5.4 Schema中间件（钩子函数）

```javascript
// pre() - 前置中间件
userSchema.pre('save', function(next) {
  console.log('即将保存用户:', this.name)
  
  // 密码加密示例
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10)
  }
  
  next()
})

userSchema.pre('find', function() {
  console.log('执行查询:', this.getQuery())
})

userSchema.pre('deleteOne', { document: true }, function(next) {
  console.log('即将删除用户:', this.name)
  next()
})

// post() - 后置中间件
userSchema.post('save', function(doc) {
  console.log('用户已保存:', doc.name)
})

userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('邮箱已存在'))
  } else {
    next(error)
  }
})

userSchema.post('find', function(docs) {
  console.log('查询完成，找到', docs.length, '个用户')
})
```

#### 5.5.5 Schema静态方法和实例方法

```javascript
// 添加静态方法（Model级别的方法）
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email })
}

userSchema.statics.findActiveUsers = function() {
  return this.find({ status: 'active' })
}

userSchema.statics.createWithDefaults = function(userData) {
  const defaults = {
    status: 'active',
    createdAt: new Date()
  }
  return this.create({ ...defaults, ...userData })
}

// 添加实例方法（Document级别的方法）
userSchema.methods.getFullInfo = function() {
  return `${this.name} (${this.age}岁) - ${this.email}`
}

userSchema.methods.isAdult = function() {
  return this.age >= 18
}

userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date()
  return this.save()
}

// 添加查询助手方法
userSchema.query.byName = function(name) {
  return this.where({ name: new RegExp(name, 'i') })
}

userSchema.query.byAgeRange = function(min, max) {
  return this.where('age').gte(min).lte(max)
}

// 使用查询助手
// User.find().byName('张').byAgeRange(20, 30)
```

#### 5.5.6 Schema索引定义

```javascript
// 单字段索引
userSchema.index({ email: 1 })           // 升序索引
userSchema.index({ createdAt: -1 })      // 降序索引

// 复合索引
userSchema.index({ name: 1, age: -1 })

// 索引选项
userSchema.index(
  { email: 1 },
  { 
    unique: true,           // 唯一索引
    sparse: true,           // 稀疏索引
    background: true,       // 后台创建
    expireAfterSeconds: 3600, // TTL索引
    partialFilterExpression: { // 部分索引
      email: { $exists: true }
    }
  }
)

// 文本索引
userSchema.index({ name: 'text', bio: 'text' })

// 地理空间索引
userSchema.index({ location: '2dsphere' })

// 获取所有索引
const indexes = userSchema.indexes()
console.log('Schema索引:', indexes)
```

### 5.6 Model API详解

#### 5.6.1 创建操作API

```javascript
// Model.create() - 创建一个或多个文档
const user = await User.create({
  name: '张三',
  email: 'zhang@example.com',
  age: 25
})

// 创建多个文档
const users = await User.create([
  { name: '李四', email: 'li@example.com' },
  { name: '王五', email: 'wang@example.com' }
])

// Model.insertMany() - 批量插入
const result = await User.insertMany([
  { name: '赵六', email: 'zhao@example.com' },
  { name: '孙七', email: 'sun@example.com' }
], {
  ordered: false,     // 不按顺序插入
  rawResult: true,    // 返回详细结果
  lean: false         // 返回完整的Mongoose文档
})

// 构造函数方式创建
const user = new User({
  name: '陈八',
  email: 'chen@example.com'
})
await user.save()
```

#### 5.6.2 查询操作API

```javascript
// Model.find() - 查找多个文档
const users = await User.find()                    // 查找所有
const activeUsers = await User.find({ status: 'active' }) // 条件查询
const youngUsers = await User.find({               // 复杂查询
  age: { $gte: 18, $lt: 30 },
  status: 'active'
})

// 字段选择和排序
const result = await User
  .find({ status: 'active' })
  .select('name email -_id')    // 只返回name和email，排除_id
  .sort({ age: -1 })            // 按年龄降序
  .limit(10)                    // 限制10条
  .skip(20)                     // 跳过前20条
  .lean()                       // 返回普通JavaScript对象

// Model.findOne() - 查找单个文档
const user = await User.findOne({ email: 'zhang@example.com' })
const notFound = await User.findOne({ email: 'nonexistent@example.com' }) // 返回null

// Model.findById() - 根据ID查找
const user = await User.findById('507f1f77bcf86cd799439011')
const userWithSelect = await User.findById(userId, 'name email')

// Model.findOneAndUpdate() - 查找并更新
const updatedUser = await User.findOneAndUpdate(
  { email: 'zhang@example.com' },
  { $set: { age: 26 }, $push: { hobbies: '游泳' } },
  { 
    new: true,              // 返回更新后的文档
    runValidators: true,    // 运行验证器
    upsert: false,          // 不存在时不创建
    select: 'name email age' // 只返回指定字段
  }
)

// Model.findByIdAndUpdate() - 根据ID查找并更新
const user = await User.findByIdAndUpdate(
  userId,
  { $inc: { age: 1 } },
  { new: true, runValidators: true }
)

// Model.countDocuments() - 计算文档数量
const totalUsers = await User.countDocuments()
const activeCount = await User.countDocuments({ status: 'active' })

// Model.estimatedDocumentCount() - 估算文档数量（更快）
const estimatedCount = await User.estimatedDocumentCount()

// Model.distinct() - 获取字段的不同值
const cities = await User.distinct('address.city')
const statuses = await User.distinct('status', { age: { $gte: 18 } })

// Model.exists() - 检查文档是否存在
const exists = await User.exists({ email: 'zhang@example.com' })
// 返回 { _id: ObjectId } 或 null
```

#### 5.6.3 更新操作API

```javascript
// Model.updateOne() - 更新单个文档
const result = await User.updateOne(
  { email: 'zhang@example.com' },     // 查询条件
  { 
    $set: { age: 26, status: 'active', lastLogin: new Date() },
    $push: { hobbies: '游泳' },
    $unset: { temporaryField: 1 }
  },
  { 
    upsert: false,          // 不存在时不创建
    runValidators: true,    // 运行验证器
    strict: true            // 严格模式
  }
)
// 返回: { acknowledged: true, modifiedCount: 1, upsertedId: null, matchedCount: 1 }

// Model.updateMany() - 更新多个文档
const result = await User.updateMany(
  { age: { $lt: 25 } },
  { $set: { category: 'young' } }
)

// Model.replaceOne() - 替换整个文档
const result = await User.replaceOne(
  { email: 'zhang@example.com' },
  {
    name: '张三新',
    email: 'zhang@example.com',
    age: 27,
    status: 'active'
  }
)

// Model.findOneAndReplace() - 查找并替换
const replacedUser = await User.findOneAndReplace(
  { email: 'zhang@example.com' },
  { name: '张三', email: 'zhang@example.com', age: 30 },
  { new: true }
)
```

#### 5.6.4 删除操作API

```javascript
// Model.deleteOne() - 删除单个文档
const result = await User.deleteOne({ email: 'zhang@example.com' })
// 返回: { acknowledged: true, deletedCount: 1 }

// Model.deleteMany() - 删除多个文档
const result = await User.deleteMany({ status: 'inactive' })
const deleteAll = await User.deleteMany({}) // 删除所有文档

// Model.findOneAndDelete() - 查找并删除
const deletedUser = await User.findOneAndDelete({ email: 'zhang@example.com' })
// 返回被删除的文档，如果没找到返回null

// Model.findByIdAndDelete() - 根据ID查找并删除
const deletedUser = await User.findByIdAndDelete(userId)
```

#### 5.6.5 聚合操作API

```javascript
// Model.aggregate() - 聚合查询
const result = await User.aggregate([
  // 匹配阶段
  { $match: { status: 'active' } },
  
  // 分组阶段
  {
    $group: {
      _id: '$status',
      avgAge: { $avg: '$age' },
      count: { $sum: 1 },
      users: { $push: '$name' },
      maxAge: { $max: '$age' },
      minAge: { $min: '$age' }
    }
  },
  
  // 排序阶段
  { $sort: { avgAge: -1 } },
  
  // 限制阶段
  { $limit: 10 },
  
  // 投影阶段
  {
    $project: {
      _id: 1,
      avgAge: { $round: ['$avgAge', 2] },
      count: 1,
      ageRange: { $subtract: ['$maxAge', '$minAge'] }
    }
  }
])

// 复杂聚合示例
const userStats = await User.aggregate([
  {
    $lookup: {
      from: 'posts',
      localField: '_id',
      foreignField: 'author',
      as: 'posts'
    }
  },
  {
    $addFields: {
      postCount: { $size: '$posts' }
    }
  },
  {
    $match: {
      postCount: { $gt: 0 }
    }
  }
])

// Model.populate() - 填充引用字段
const users = await User.find().populate('posts')

// 高级填充
const users = await User.find().populate({
  path: 'posts',
  select: 'title createdAt',
  match: { published: true },
  options: { 
    sort: { createdAt: -1 },
    limit: 5 
  },
  populate: {
    path: 'comments',
    select: 'content author'
  }
})

// 多个字段填充
const users = await User.find()
  .populate('posts', 'title')
  .populate('friends', 'name email')
```

#### 5.6.6 索引操作API

```javascript
// Model.createIndexes() - 创建所有Schema中定义的索引
await User.createIndexes()

// Model.ensureIndexes() - 确保索引存在（已废弃，使用createIndexes）
await User.ensureIndexes()

// Model.listIndexes() - 列出所有索引
const indexes = await User.listIndexes()
console.log('用户模型索引:', indexes)

// Model.syncIndexes() - 同步索引（删除不在Schema中的索引）
await User.syncIndexes()

// 获取集合对象进行更多索引操作
const collection = User.collection
await collection.createIndex({ name: 1, email: 1 })
await collection.dropIndex('name_1_email_1')
```

#### 5.6.7 实用工具API

```javascript
// Model.watch() - 监听数据变化（Change Streams）
const changeStream = User.watch([
  { $match: { 'fullDocument.status': 'active' } }
])

changeStream.on('change', (change) => {
  console.log('数据变化:', change)
  switch (change.operationType) {
    case 'insert':
      console.log('新增用户:', change.fullDocument)
      break
    case 'update':
      console.log('更新用户:', change.documentKey)
      break
    case 'delete':
      console.log('删除用户:', change.documentKey)
      break
  }
})

// 停止监听
// changeStream.close()

// Model.validate() - 验证文档
const userData = {
  name: '测试用户',
  email: 'test@example.com',
  age: 25
}

try {
  const user = new User(userData)
  await user.validate()
  console.log('验证通过')
} catch (error) {
  console.log('验证失败:', error.errors)
}

// Model.hydrate() - 从普通对象创建文档实例
const plainObject = {
  _id: new mongoose.Types.ObjectId(),
  name: '水合用户',
  email: 'hydrate@example.com'
}

const user = User.hydrate(plainObject)
console.log('是否为Mongoose文档:', user instanceof mongoose.Document)

// Model.bulkWrite() - 批量写操作
const operations = [
  {
    insertOne: {
      document: { name: '批量用户1', email: 'bulk1@example.com' }
    }
  },
  {
    updateOne: {
      filter: { email: 'bulk1@example.com' },
      update: { $set: { age: 25 } }
    }
  },
  {
    deleteOne: {
      filter: { email: 'bulk1@example.com' }
    }
  }
]

const result = await User.bulkWrite(operations, {
  ordered: false,     // 不按顺序执行
  bypassDocumentValidation: false
})

// Model.translateAliases() - 转换字段别名
const aliasedData = User.translateAliases({ n: '张三' }) // 如果name有别名n
```

#### 5.6.8 查询构建器API

```javascript
// 链式查询构建
const users = await User
  .find({ status: 'active' })
  .where('age').gte(18).lt(65)
  .where('name').regex(/^张/)
  .select('name email age')
  .sort({ age: -1 })
  .limit(10)
  .skip(0)
  .lean()
  .exec()

// 查询对象方式
const query = User.find({ status: 'active' })
query.where('age').gte(25)
query.select('name email')
query.sort({ createdAt: -1 })
query.limit(20)

const result = await query.exec()

// 查询条件方法
query.where('age').gt(18)           // 大于
query.where('age').gte(18)          // 大于等于
query.where('age').lt(65)           // 小于
query.where('age').lte(65)          // 小于等于
query.where('age').ne(25)           // 不等于
query.where('name').in(['张三', '李四']) // 在数组中
query.where('name').nin(['王五'])    // 不在数组中
query.where('email').exists(true)   // 字段存在
query.where('name').regex(/^张/)     // 正则匹配

// 地理空间查询
query.where('location').near({
  center: [116.3974, 39.9093],
  maxDistance: 1000
})

// 查询选项
query.setOptions({
  lean: true,           // 返回普通对象
  populate: 'posts',    // 填充字段
  maxTimeMS: 5000,      // 查询超时时间
  hint: { name: 1 }     // 使用指定索引
})
```

#### 5.6.9 事务操作API

```javascript
// 使用事务
const session = await mongoose.startSession()

try {
  await session.withTransaction(async () => {
    // 在事务中执行多个操作
    const user = await User.create([{
      name: '事务用户1',
      email: 'trans1@example.com'
    }], { session })
    
    const post = await Post.create([{
      title: '事务文章',
      author: user[0]._id,
      content: '这是在事务中创建的文章'
    }], { session })
    
    // 更新用户的文章引用
    await User.findByIdAndUpdate(
      user[0]._id,
      { $push: { posts: post[0]._id } },
      { session }
    )
    
    // 如果这里抛出错误，所有操作都会回滚
    // throw new Error('模拟错误')
  })
  
  console.log('事务提交成功')
} catch (error) {
  console.error('事务失败，已回滚:', error.message)
} finally {
  await session.endSession()
}

// 手动控制事务
const session = await mongoose.startSession()
session.startTransaction()

try {
  await User.create([{ name: '手动事务用户' }], { session })
  await Post.create([{ title: '手动事务文章' }], { session })
  
  await session.commitTransaction()
  console.log('手动事务提交成功')
} catch (error) {
  await session.abortTransaction()
  console.error('手动事务回滚:', error.message)
} finally {
  await session.endSession()
}
```

### 5.7 Model原型方法详解

Mongoose的Model构造函数包含许多有用的原型方法，这些方法可以在模型实例上调用，提供了丰富的文档操作功能。

#### 5.7.1 基础原型属性

```javascript
// Model.prototype.constructor - 构造函数引用
const user = new User({ name: '张三' })
console.log(user.constructor === User) // true
console.log(user.constructor.modelName) // 'User'

// Model.prototype.collection - 获取底层MongoDB集合
const collection = User.prototype.collection
console.log(collection.collectionName) // 'users'

// Model.prototype.db - 获取数据库连接
const database = User.prototype.db
console.log(database.name) // 数据库名称

// Model.prototype.discriminators - 判别器映射
const discriminators = User.prototype.discriminators
console.log(discriminators) // 如果有判别器模型，会显示映射关系

// Model.prototype.schema - 获取Schema实例
const schema = User.prototype.schema
console.log(schema.paths) // 显示所有字段路径
```

#### 5.7.2 模型信息获取方法

```javascript
// Model.prototype.modelName - 获取模型名称
console.log(User.prototype.modelName) // 'User'

// 在实例中使用
const user = new User({ name: '张三' })
console.log(user.constructor.modelName) // 'User'

// Model.prototype.baseModelName - 获取基础模型名称（用于判别器）
// 如果User是基础模型，返回undefined
// 如果AdminUser继承自User，则返回'User'
console.log(User.prototype.baseModelName) // undefined

// Model.prototype.model() - 获取其他模型的引用
const Post = User.prototype.model('Post')
console.log(Post.modelName) // 'Post'

// 实际使用示例
userSchema.methods.createPost = function(postData) {
  const Post = this.model('Post') // 获取Post模型
  return Post.create({
    ...postData,
    author: this._id
  })
}
```

#### 5.7.3 文档操作原型方法

```javascript
// 创建用户实例来演示实例方法
const user = new User({
  name: '张三',
  email: 'zhang@example.com',
  age: 25,
  hobbies: ['编程', '阅读']
})

// document.save() - 保存文档
const savedUser = await user.save()
console.log('用户已保存:', savedUser._id)

// 带选项的保存
await user.save({
  validateBeforeSave: true,    // 保存前验证（默认true）
  timestamps: true,            // 更新时间戳（默认true）
  session: session            // 在事务中保存
})

// document.remove() - 删除文档（已废弃，使用deleteOne）
// await user.remove()

// document.deleteOne() - 删除文档
await user.deleteOne()

// document.validate() - 验证文档
try {
  await user.validate()
  console.log('验证通过')
} catch (error) {
  console.log('验证失败:', error.errors)
}

// 只验证特定字段
await user.validate(['name', 'email'])

// document.validateSync() - 同步验证
const validationError = user.validateSync()
if (validationError) {
  console.log('同步验证失败:', validationError.errors)
}
```

#### 5.7.4 字段操作原型方法

```javascript
// document.get() - 获取字段值
const name = user.get('name')
const age = user.get('age')
const city = user.get('address.city') // 获取嵌套字段

// document.set() - 设置字段值
user.set('age', 26)
user.set('address.city', '北京')
user.set({
  age: 27,
  status: 'active'
})

// document.unset() - 删除字段
user.unset('temporaryField')

// document.isModified() - 检查字段是否被修改
console.log(user.isModified('age'))      // true（如果age被修改）
console.log(user.isModified('name'))     // false（如果name未被修改）
console.log(user.isModified())           // true（如果任何字段被修改）

// document.isNew - 检查是否为新文档
console.log(user.isNew) // true（如果是新创建的文档）

// document.isSelected() - 检查字段是否被选择
console.log(user.isSelected('name'))     // true（如果查询时选择了name字段）

// document.modifiedPaths() - 获取所有被修改的字段路径
const modifiedPaths = user.modifiedPaths()
console.log('被修改的字段:', modifiedPaths) // ['age', 'address.city']

// document.directModifiedPaths() - 获取直接修改的字段路径
const directPaths = user.directModifiedPaths()
console.log('直接修改的字段:', directPaths)
```

#### 5.7.5 数组操作原型方法

```javascript
// 假设用户有hobbies数组字段
const user = await User.findById(userId)

// document.markModified() - 标记字段为已修改
user.hobbies.push('游泳')
user.markModified('hobbies') // 告诉Mongoose hobbies数组已被修改

// 或者使用Mongoose数组方法（自动标记为修改）
user.hobbies.push('跑步')     // Mongoose会自动检测数组变化
user.hobbies.pull('编程')     // 移除特定元素
user.hobbies.addToSet('篮球') // 添加唯一元素

// document.populated() - 检查字段是否已填充
const isPopulated = user.populated('posts')
if (isPopulated) {
  console.log('posts字段已被填充')
}

// document.populate() - 填充引用字段
await user.populate('posts')
// 或者指定选择的字段
await user.populate('posts', 'title createdAt')

// 多个字段填充
await user.populate([
  { path: 'posts', select: 'title' },
  { path: 'friends', select: 'name email' }
])

// document.depopulate() - 取消填充
user.depopulate('posts') // posts字段恢复为ObjectId引用
```

#### 5.7.6 转换和序列化原型方法

```javascript
// document.toObject() - 转换为普通JavaScript对象
const plainObject = user.toObject()
console.log(plainObject) // 普通对象，没有Mongoose方法

// 带选项的转换
const customObject = user.toObject({
  virtuals: true,          // 包含虚拟字段
  getters: true,           // 应用getter
  transform: function(doc, ret) {
    delete ret.__v         // 删除版本键
    delete ret.password    // 删除敏感信息
    return ret
  }
})

// document.toJSON() - 转换为JSON（自动调用toObject）
const jsonData = user.toJSON()
console.log(JSON.stringify(jsonData, null, 2))

// 自定义toJSON行为
userSchema.methods.toJSON = function() {
  const obj = this.toObject()
  delete obj.password      // 序列化时自动删除密码
  delete obj.__v
  return obj
}

// document.toString() - 转换为字符串
console.log(user.toString()) // 显示文档的字符串表示

// document.valueOf() - 获取原始值
console.log(user.valueOf()) // 返回文档对象本身
```

#### 5.7.7 状态检查原型方法

```javascript
// document.isDirectModified() - 检查字段是否直接修改
user.age = 26
console.log(user.isDirectModified('age')) // true

user.set('name', '李四')
console.log(user.isDirectModified('name')) // true

// document.isInit() - 检查字段是否已初始化
console.log(user.isInit('name'))    // true（字段存在且有值）
console.log(user.isInit('newField')) // false（字段不存在）

// document.isDirectSelected() - 检查字段是否直接选择
// 在查询中使用select时有用
const selectedUser = await User.findById(userId).select('name email')
console.log(selectedUser.isDirectSelected('name'))  // true
console.log(selectedUser.isDirectSelected('age'))   // false

// document.$isDefault() - 检查字段是否为默认值
console.log(user.$isDefault('status')) // true（如果status使用默认值）

// document.$isEmpty() - 检查字段是否为空
console.log(user.$isEmpty('name'))     // false（name有值）
console.log(user.$isEmpty('nickname')) // true（nickname为空或未定义）
```

#### 5.7.8 错误处理原型方法

```javascript
// document.invalidate() - 手动设置验证错误
user.invalidate('age', '年龄必须是正数', user.age)

// document.$isValid() - 检查文档是否有效
const isValid = user.$isValid()
console.log('文档是否有效:', isValid)

// document.errors - 获取验证错误
if (user.errors) {
  console.log('验证错误:', user.errors)
  Object.keys(user.errors).forEach(field => {
    console.log(`${field}: ${user.errors[field].message}`)
  })
}

// document.$getAllSubdocs() - 获取所有子文档
const subdocs = user.$getAllSubdocs()
console.log('子文档数量:', subdocs.length)
```

#### 5.7.9 高级原型方法

```javascript
// document.$clone() - 克隆文档
const clonedUser = user.$clone()
clonedUser.name = '克隆用户'
await clonedUser.save() // 保存克隆的文档

// document.$getPopulatedDocs() - 获取已填充的文档
const populatedDocs = user.$getPopulatedDocs()
console.log('已填充的文档:', populatedDocs)

// document.$inc() - 增加数值字段
user.$inc('age', 1)        // 年龄加1
user.$inc('score', -5)     // 分数减5
await user.save()

// document.$set() - 设置字段值（类似set，但更底层）
user.$set('status', 'active')
user.$set('address.city', '上海')

// document.$where - 添加$where条件（不推荐，性能差）
// 这个方法主要用于复杂的JavaScript表达式查询

// document.ownerDocument() - 获取拥有的文档（用于子文档）
// 如果当前文档是子文档，返回父文档
const owner = user.ownerDocument()
console.log('拥有者文档:', owner)

// document.parent() - 获取父文档（用于子文档）
const parent = user.parent()
console.log('父文档:', parent)
```

#### 5.7.10 实际项目中的原型方法应用

```javascript
// 用户模型中的实际应用示例
userSchema.methods.updateProfile = async function(profileData) {
  // 使用set方法批量更新字段
  this.set(profileData)
  
  // 标记更新时间
  this.set('updatedAt', new Date())
  
  // 验证数据
  await this.validate()
  
  // 保存更改
  return await this.save()
}

userSchema.methods.addHobby = function(hobby) {
  // 检查是否已存在
  if (!this.hobbies.includes(hobby)) {
    this.hobbies.push(hobby)
    this.markModified('hobbies') // 确保Mongoose检测到数组变化
  }
  return this
}

userSchema.methods.removeHobby = function(hobby) {
  this.hobbies.pull(hobby)
  return this
}

userSchema.methods.getPublicProfile = function() {
  // 使用toObject转换并删除敏感信息
  const profile = this.toObject()
  delete profile.password
  delete profile.email
  delete profile.__v
  return profile
}

userSchema.methods.isActive = function() {
  return this.status === 'active' && !this.isDeleted
}

userSchema.methods.softDelete = async function() {
  this.set({
    isDeleted: true,
    deletedAt: new Date(),
    status: 'inactive'
  })
  return await this.save()
}

// 使用示例
const user = await User.findById(userId)

// 更新用户资料
await user.updateProfile({
  name: '新名字',
  age: 26
})

// 添加爱好
user.addHobby('摄影').addHobby('旅行')
await user.save()

// 获取公开资料
const publicProfile = user.getPublicProfile()

// 软删除用户
if (user.isActive()) {
  await user.softDelete()
}
```

#### 5.7.11 Model原型方法的性能考虑

```javascript
// ✅ 高效的做法
// 批量操作而不是逐个操作
const users = await User.find({ status: 'pending' })
const bulkOps = users.map(user => ({
  updateOne: {
    filter: { _id: user._id },
    update: { $set: { status: 'active', updatedAt: new Date() } }
  }
}))
await User.bulkWrite(bulkOps)

// ❌ 低效的做法
// 逐个保存文档
const users = await User.find({ status: 'pending' })
for (const user of users) {
  user.status = 'active'
  await user.save() // 每次都会触发数据库操作
}

// ✅ 合理使用lean()查询
// 如果只需要读取数据，不需要Mongoose功能
const users = await User.find().lean() // 返回普通对象，更快

// ❌ 不必要的Mongoose开销
// 如果只是读取数据却使用完整的Mongoose文档
const users = await User.find() // 返回Mongoose文档，较慢

// ✅ 合理使用select
// 只选择需要的字段
const users = await User.find().select('name email status')

// ✅ 合理使用populate
// 只在需要时填充，并选择必要字段
const users = await User.find()
  .populate('posts', 'title createdAt')
  .limit(10)
```

#### 5.7.12 Model原型方法调试技巧

```javascript
// 调试文档状态
function debugDocument(doc) {
  console.log('=== 文档调试信息 ===')
  console.log('文档ID:', doc._id)
  console.log('是否为新文档:', doc.isNew)
  console.log('被修改的字段:', doc.modifiedPaths())
  console.log('直接修改的字段:', doc.directModifiedPaths())
  console.log('是否有验证错误:', !!doc.errors)
  
  if (doc.errors) {
    console.log('验证错误详情:', doc.errors)
  }
  
  console.log('已填充的字段:', Object.keys(doc.populated() || {}))
  console.log('==================')
}

// 使用示例
const user = await User.findById(userId)
user.age = 26
user.name = '新名字'

debugDocument(user) // 查看文档状态

try {
  await user.save()
  console.log('保存成功')
} catch (error) {
  console.error('保存失败:', error.message)
  debugDocument(user) // 查看失败后的状态
}
```

通过这些Model原型方法，你可以更灵活地操作Mongoose文档，实现复杂的业务逻辑。记住要根据实际需求选择合适的方法，并注意性能影响。

---

## 🔗 第六章：与NestJS集成

### 6.1 NestJS项目结构

```
my-nestjs-app/
├── src/
│   ├── config/
│   │   └── database.config.ts    # 数据库配置
│   ├── schemas/
│   │   ├── user.schema.ts        # 用户Schema
│   │   └── post.schema.ts        # 文章Schema
│   ├── modules/
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.module.ts
│   │   │   └── dto/
│   │   │       ├── create-user.dto.ts
│   │   │       └── update-user.dto.ts
│   │   └── posts/
│   │       ├── posts.controller.ts
│   │       ├── posts.service.ts
│   │       └── posts.module.ts
│   ├── common/
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/
│   │   └── interceptors/
│   ├── app.module.ts
│   └── main.ts
├── package.json
└── nest-cli.json
```

### 6.2 安装依赖

```bash
# 创建NestJS项目
npm i -g @nestjs/cli
nest new my-nestjs-app

# 安装MongoDB相关依赖
npm install @nestjs/mongoose mongoose
npm install --save-dev @types/mongoose

# 安装其他常用依赖
npm install @nestjs/config class-validator class-transformer
npm install @nestjs/swagger swagger-ui-express
npm install bcrypt
npm install --save-dev @types/bcrypt
```

### 6.3 数据库配置

```typescript
// src/config/database.config.ts
import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions } from '@nestjs/mongoose'

export const getDatabaseConfig = (
  configService: ConfigService,
): MongooseModuleOptions => ({
  uri: configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/nestjs-app',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  bufferCommands: false,
  bufferMaxEntries: 0,
})
```

### 6.4 用户Schema定义

```typescript
// src/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Transform } from 'class-transformer'

export type UserDocument = User & Document

@Schema({ 
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id
      delete ret.password
      return ret
    }
  }
})
export class User {
  @Transform(({ value }) => value.toString())
  _id: Types.ObjectId

  @Prop({ 
    required: [true, '用户名是必需的'],
    trim: true,
    minlength: [2, '用户名至少2个字符'],
    maxlength: [50, '用户名不能超过50个字符']
  })
  name: string

  @Prop({
    required: [true, '邮箱是必需的'],
    unique: true,
    lowercase: true,
    match: [/^\w+@\w+\.\w+$/, '邮箱格式不正确']
  })
  email: string

  @Prop({
    required: [true, '密码是必需的'],
    minlength: [6, '密码至少6个字符'],
    select: false
  })
  password: string

  @Prop({
    min: [0, '年龄不能为负数'],
    max: [120, '年龄不能超过120岁']
  })
  age?: number

  @Prop({
    enum: ['active', 'inactive', 'pending'],
    default: 'active'
  })
  status: string

  @Prop([String])
  hobbies?: string[]

  @Prop({
    type: {
      city: { type: String, required: true },
      district: String,
      zipCode: { type: String, match: /^\d{6}$/ }
    }
  })
  address?: {
    city: string
    district?: string
    zipCode?: string
  }

  @Prop([{ type: Types.ObjectId, ref: 'Post' }])
  posts?: Types.ObjectId[]

  createdAt?: Date
  updatedAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)

// 添加索引
UserSchema.index({ email: 1 }, { unique: true })
UserSchema.index({ name: 1, status: 1 })

// 添加中间件
UserSchema.pre('save', function(next) {
  console.log('即将保存用户:', this.name)
  next()
})
```

### 6.5 DTO定义

```typescript
// src/modules/users/dto/create-user.dto.ts
import { IsEmail, IsString, IsOptional, IsNumber, IsArray, IsEnum, ValidateNested, Min, Max, MinLength, MaxLength } from 'class-validator'
import { Type, Transform } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

class AddressDto {
  @ApiProperty({ description: '城市' })
  @IsString()
  city: string

  @ApiPropertyOptional({ description: '区域' })
  @IsOptional()
  @IsString()
  district?: string

  @ApiPropertyOptional({ description: '邮编', pattern: '^\\d{6}$' })
  @IsOptional()
  @IsString()
  zipCode?: string
}

export class CreateUserDto {
  @ApiProperty({ description: '用户名', minLength: 2, maxLength: 50 })
  @IsString()
  @MinLength(2, { message: '用户名至少2个字符' })
  @MaxLength(50, { message: '用户名不能超过50个字符' })
  @Transform(({ value }) => value?.trim())
  name: string

  @ApiProperty({ description: '邮箱地址' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  @Transform(({ value }) => value?.toLowerCase())
  email: string

  @ApiProperty({ description: '密码', minLength: 6 })
  @IsString()
  @MinLength(6, { message: '密码至少6个字符' })
  password: string

  @ApiPropertyOptional({ description: '年龄', minimum: 0, maximum: 120 })
  @IsOptional()
  @IsNumber({}, { message: '年龄必须是数字' })
  @Min(0, { message: '年龄不能为负数' })
  @Max(120, { message: '年龄不能超过120岁' })
  age?: number

  @ApiPropertyOptional({ description: '状态', enum: ['active', 'inactive', 'pending'] })
  @IsOptional()
  @IsEnum(['active', 'inactive', 'pending'], { message: '状态必须是: active, inactive, pending 之一' })
  status?: string

  @ApiPropertyOptional({ description: '爱好列表', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hobbies?: string[]

  @ApiPropertyOptional({ description: '地址信息', type: AddressDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto
}
```

### 6.6 Service层实现

```typescript
// src/modules/users/users.service.ts
import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { User, UserDocument } from '../../schemas/user.schema'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // 检查邮箱是否已存在
      const existingUser = await this.userModel.findOne({ email: createUserDto.email })
      if (existingUser) {
        throw new ConflictException('邮箱已存在')
      }

      // 加密密码
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds)

      // 创建用户
      const createdUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword
      })

      const savedUser = await createdUser.save()
      return savedUser.toJSON()
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('邮箱已存在')
      }
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map((e: any) => e.message)
        throw new BadRequestException(errors)
      }
      throw error
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    const [users, total] = await Promise.all([
      this.userModel
        .find()
        .select('-password')
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip((page - 1) * limit)
        .populate('posts', 'title createdAt')
        .exec(),
      this.userModel.countDocuments()
    ])

    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }

  async findOne(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('无效的用户ID')
    }

    const user = await this.userModel
      .findById(id)
      .select('-password')
      .populate('posts', 'title createdAt published')
      .exec()

    if (!user) {
      throw new NotFoundException('用户不存在')
    }

    return user.toJSON()
  }

  async update(id: string, updateData: Partial<CreateUserDto>): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('无效的用户ID')
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
      })
      .select('-password')
      .exec()

    if (!updatedUser) {
      throw new NotFoundException('用户不存在')
    }

    return updatedUser.toJSON()
  }

  async remove(id: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('无效的用户ID')
    }

    const deletedUser = await this.userModel.findByIdAndDelete(id).exec()

    if (!deletedUser) {
      throw new NotFoundException('用户不存在')
    }

    return { message: '用户删除成功' }
  }
}
```

### 6.7 Controller层实现

```typescript
// src/modules/users/users.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiQuery
} from '@nestjs/swagger'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'

@ApiTags('用户管理')
@Controller('users')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '创建用户' })
  @ApiResponse({ status: 201, description: '用户创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 409, description: '邮箱已存在' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)
    return {
      success: true,
      message: '用户创建成功',
      data: user
    }
  }

  @Get()
  @ApiOperation({ summary: '获取用户列表' })
  @ApiQuery({ name: 'page', required: false, description: '页码' })
  @ApiQuery({ name: 'limit', required: false, description: '每页数量' })
  @ApiResponse({ status: 200, description: '获取成功' })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    const result = await this.usersService.findAll(page, limit)
    return {
      success: true,
      message: '获取用户列表成功',
      ...result
    }
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个用户' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id)
    return {
      success: true,
      message: '获取用户信息成功',
      data: user
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async update(@Param('id') id: string, @Body() updateData: Partial<CreateUserDto>) {
    const user = await this.usersService.update(id, updateData)
    return {
      success: true,
      message: '用户信息更新成功',
      data: user
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '删除用户' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({ status: 204, description: '删除成功' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
```

### 6.8 Module配置

```typescript
// src/modules/users/users.module.ts
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User, UserSchema } from '../../schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
```

### 6.9 应用主模块

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './modules/users/users.module'
import { getDatabaseConfig } from './config/database.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService]
    }),
    
    UsersModule
  ]
})
export class AppModule {}
```

### 6.10 应用启动文件

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 全局验证管道
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))

  // 全局前缀
  app.setGlobalPrefix('api/v1')

  // Swagger文档配置
  const config = new DocumentBuilder()
    .setTitle('NestJS MongoDB API')
    .setDescription('基于NestJS和MongoDB的RESTful API')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  // 启用CORS
  app.enableCors()

  const port = process.env.PORT || 3000
  await app.listen(port)
  
  console.log(`🚀 应用运行在: http://localhost:${port}`)
  console.log(`📚 API文档: http://localhost:${port}/api/docs`)
}

bootstrap()
```

---

## 🎯 第七章：NestJS实践练习

### 练习1：用户管理系统（NestJS版）

基于上面的代码示例，创建一个完整的用户管理API：

**功能要求：**
- 用户注册和登录（JWT认证）
- 用户信息CRUD操作
- 数据验证和转换
- 全局异常处理
- Swagger API文档

**实现步骤：**
1. 创建用户Schema和DTO
2. 实现Service层业务逻辑
3. 创建Controller层API接口
4. 配置Module和依赖注入
5. 添加认证和授权功能

### 练习2：博客系统（NestJS版）

扩展用户系统，添加文章管理功能：

**新增功能：**
- 文章的增删改查
- 用户与文章的关联关系
- 文章分类和标签
- 评论功能
- 文章搜索和分页

**技术要点：**
```typescript
// 文章Schema示例
@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true, maxlength: 200 })
  title: string

  @Prop({ required: true })
  content: string

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId

  @Prop([String])
  tags: string[]

  @Prop({ default: false })
  published: boolean

  @Prop({ default: 0 })
  views: number
}
```

### 练习3：电商系统（NestJS版）

创建一个简单的电商后台管理系统：

**核心模块：**
- 商品管理模块（Products）
- 订单管理模块（Orders）
- 用户管理模块（Users）
- 库存管理模块（Inventory）

**高级功能：**
- 商品分类和规格
- 购物车功能
- 订单状态管理
- 库存预警
- 数据统计和报表

**技术实现：**
```typescript
// 商品Schema
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, min: 0 })
  price: number

  @Prop({ required: true, min: 0 })
  stock: number

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Types.ObjectId

  @Prop([String])
  images: string[]

  @Prop({ default: true })
  isActive: boolean
}

// 订单Schema
@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  customer: Types.ObjectId

  @Prop([{
    product: { type: Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, min: 1 },
    price: { type: Number, min: 0 }
  }])
  items: Array<{
    product: Types.ObjectId
    quantity: number
    price: number
  }>

  @Prop({ required: true, min: 0 })
  totalAmount: number

  @Prop({ 
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  })
  status: string
}
```

### 练习4：NestJS高级特性应用

**装饰器和守卫：**
```typescript
// 自定义角色守卫
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    
    if (!requiredRoles) {
      return true
    }
    
    const { user } = context.switchToHttp().getRequest()
    return requiredRoles.some((role) => user.roles?.includes(role))
  }
}

// 使用示例
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Admin)
@Delete(':id')
async deleteUser(@Param('id') id: string) {
  return this.usersService.remove(id)
}
```

**拦截器应用：**
```typescript
// 日志拦截器
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const method = request.method
    const url = request.url
    const now = Date.now()

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse()
        const delay = Date.now() - now
        console.log(`${method} ${url} ${response.statusCode} - ${delay}ms`)
      })
    )
  }
}
```

**管道验证：**
```typescript
// 自定义验证管道
@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, Types.ObjectId> {
  transform(value: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('无效的ObjectId格式')
    }
    return new Types.ObjectId(value)
  }
}
```

---

## 📚 学习资源

### 官方文档

- [MongoDB官方文档](https://docs.mongodb.com/)
- [Mongoose官方文档](https://mongoosejs.com/docs/)
- [NestJS官方文档](https://docs.nestjs.com/)
- [NestJS Mongoose集成](https://docs.nestjs.com/techniques/mongodb)

### NestJS相关资源

- [NestJS中文文档](https://docs.nestjs.cn/)
- [NestJS GitHub仓库](https://github.com/nestjs/nest)
- [NestJS示例项目](https://github.com/nestjs/nest/tree/master/sample)
- [NestJS Awesome列表](https://github.com/juliandavidmr/awesome-nestjs)

### 推荐工具

- **MongoDB Compass**：可视化数据库管理工具
- **Studio 3T**：专业的MongoDB IDE
- **VS Code插件**：
  - MongoDB for VS Code
  - NestJS Files
  - TypeScript Importer
- **Postman/Insomnia**：API测试工具
- **Swagger UI**：API文档工具（NestJS内置支持）

### 学习视频和教程

- [NestJS官方YouTube频道](https://www.youtube.com/nestjs)
- [MongoDB University](https://university.mongodb.com/)
- [NestJS + MongoDB实战教程](https://www.bilibili.com/video/BV1aV4y1x7kw/)

### 实用库推荐

```bash
# NestJS核心依赖
npm install @nestjs/core @nestjs/common @nestjs/platform-express

# MongoDB集成
npm install @nestjs/mongoose mongoose

# 配置管理
npm install @nestjs/config

# 验证和转换
npm install class-validator class-transformer

# API文档
npm install @nestjs/swagger swagger-ui-express

# 认证相关
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt

# 测试工具
npm install --save-dev @nestjs/testing supertest

# 开发工具
npm install --save-dev @types/node @types/mongoose @types/bcrypt
```

---

## ❓ 常见问题解答

### Q1: 什么时候使用MongoDB？

**A:** 当你的数据结构复杂、变化频繁，或者需要存储嵌套对象和数组时。

### Q2: MongoDB vs MySQL 选择？

**A:**

- **MongoDB**：适合快速开发、数据结构灵活的项目
- **MySQL**：适合数据关系复杂、需要强一致性的项目

### Q3: 为什么选择NestJS而不是Express？

**A:**

- **NestJS优势**：
  - TypeScript原生支持
  - 装饰器和依赖注入
  - 模块化架构
  - 内置验证和文档生成
  - 更好的可测试性和可维护性

- **Express优势**：
  - 更轻量级
  - 学习曲线较平缓
  - 生态系统更成熟

### Q4: 如何优化MongoDB性能？

**A:**

- 创建适当的索引
- 避免深度嵌套
- 合理使用分页
- 监控查询性能
- 在NestJS中使用lean()查询优化

### Q5: NestJS中如何处理MongoDB连接？

**A:**

```typescript
// 推荐使用异步配置
MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URI'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
  inject: [ConfigService],
})
```

### Q6: 索引是否越多越好？

**A:** 不是！索引会增加写入成本和存储空间。建议每个集合不超过10个索引，只为频繁查询的字段创建索引。

### Q7: NestJS中如何实现数据验证？

**A:**

```typescript
// 使用class-validator装饰器
export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string

  @IsEmail()
  email: string

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(120)
  age?: number
}
```

### Q8: 什么时候需要复合索引？

**A:** 当你的查询涉及多个字段时，复合索引可以显著提高性能。记住ESR规则：等值查询字段在前，排序字段在中间，范围查询字段在后。

### Q9: NestJS中如何处理异常？

**A:**

```typescript
// 使用内置异常类
throw new NotFoundException('用户不存在')
throw new BadRequestException('无效的用户ID')
throw new ConflictException('邮箱已存在')

// 或创建全局异常过滤器
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    // 处理异常逻辑
  }
}
```

### Q10: 如何在NestJS中实现文件上传？

**A:**

```typescript
@Post('upload')
@UseInterceptors(FileInterceptor('file'))
async uploadFile(@UploadedFile() file: Express.Multer.File) {
  // 处理文件上传
}
```

这份指南涵盖了MongoDB与NestJS集成的核心概念和实际应用，建议你边学边练，每个章节都要动手实践！

## 🚀 快速开始

1. **创建NestJS项目**
   ```bash
   npm i -g @nestjs/cli
   nest new my-mongodb-app
   ```

2. **安装MongoDB依赖**
   ```bash
   npm install @nestjs/mongoose mongoose
   npm install @nestjs/config class-validator class-transformer
   ```

3. **配置数据库连接**
   ```typescript
   // app.module.ts
   MongooseModule.forRoot('mongodb://localhost:27017/myapp')
   ```

4. **创建Schema和DTO**
   ```bash
   nest g resource users
   ```

5. **启动应用**
   ```bash
   npm run start:dev
   ```

6. **访问API文档**
   ```
   http://localhost:3000/api/docs
   ```

现在你就可以开始构建基于NestJS和MongoDB的现代化Web应用了！