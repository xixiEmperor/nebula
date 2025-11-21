# MongoDB 详细学习指南 - 新手版

## 🎯 学习目标

通过本指南，你将掌握：

- MongoDB基础概念和工作原理
- 安装和配置MongoDB环境
- 基本的数据库操作（CRUD）
- **索引的创建和优化策略**
- Mongoose ODM的使用
- 与NestJS集成的完整流程

---

## 📚 第一章：MongoDB基础概念

### 1.1 什么是MongoDB？

**简单理解：**

- MongoDB是一个**文档数据库**（想象成一个超级智能的文件柜）
- 它存储的不是表格，而是**类似JSON的文档**
- 非常适合存储复杂的、结构灵活的数据

**与传统数据库的对比：**

```javascript
// 传统SQL数据库（如MySQL）
// 用户表
| id | name | age | email |
|----|------|-----|-------|
| 1  | 张三 | 25  | zhang@example.com |
| 2  | 李四 | 30  | li@example.com |

// MongoDB文档数据库
// 用户集合
{
  _id: ObjectId("..."),
  name: "张三",
  age: 25,
  email: "zhang@example.com",
  hobbies: ["读书", "游泳"],  // 可以存储数组
  address: {                 // 可以存储嵌套对象
    city: "北京",
    district: "朝阳区"
  }
}
```

### 1.2 核心概念详解

#### 📄 文档 (Document)

```javascript
// 一个文档就是一个JSON对象
const user = {
  _id: ObjectId("507f1f77bcf86cd799439011"), // MongoDB自动生成的唯一ID
  name: "张三",
  age: 25,
  email: "zhangsan@example.com",
  createdAt: new Date(),
  tags: ["学生", "程序员"],
  profile: {
    bio: "热爱编程的学生",
    avatar: "https://example.com/avatar.jpg"
  }
}

// 关键特点：
// 1. 每个文档都有唯一的_id
// 2. 字段可以是各种数据类型
// 3. 结构可以很灵活
```

#### 📂 集合 (Collection)

```javascript
// 集合就是文档的容器，类似数组
const users = [
  { name: "张三", age: 25 },
  { name: "李四", age: 30, city: "上海" }, // 注意：结构可以不同
  { name: "王五", age: 28, hobbies: ["篮球"] }
]

// 特点：
// 1. 同一集合中的文档结构可以不同
// 2. 集合名通常用复数形式（users, posts, products）
// 3. 集合在第一次插入文档时自动创建
```

#### 🗄️ 数据库 (Database)

```javascript
// 数据库包含多个集合
const myApp = {
  users: [
    { name: "张三", age: 25 },
    { name: "李四", age: 30 }
  ],
  posts: [
    { title: "我的第一篇博客", author: "张三" },
    { title: "MongoDB学习笔记", author: "李四" }
  ],
  products: [
    { name: "笔记本电脑", price: 5999 },
    { name: "鼠标", price: 99 }
  ]
}
```

---

## 🛠️ 第二章：安装和环境配置

### 2.1 安装选项

#### 选项1：本地安装MongoDB（推荐学习使用）

```bash
# Windows用户：
# 1. 访问 https://www.mongodb.com/try/download/community
# 2. 下载MongoDB Community Server
# 3. 运行安装程序，选择Complete安装
# 4. 勾选"Install MongoDB as a Service"

# 验证安装
mongod --version
mongo --version
```

#### 选项2：MongoDB Atlas云数据库（推荐生产使用）

```javascript
// 优点：
// 1. 免费500MB存储空间
// 2. 无需本地安装
// 3. 自动备份和监控
// 4. 全球部署

// 注册步骤：
// 1. 访问 https://www.mongodb.com/atlas
// 2. 注册账号
// 3. 创建免费集群
// 4. 获取连接字符串
```

### 2.2 连接数据库

#### 本地连接

```javascript
// 连接字符串格式
const localConnectionString = "mongodb://localhost:27017/myapp"

// 解释：
// mongodb:// - 协议
// localhost - 主机地址
// 27017 - 默认端口
// myapp - 数据库名称
```

#### Atlas云连接

```javascript
// Atlas连接字符串示例
const atlasConnectionString = "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myapp"

// 注意：
// 1. username和password需要替换为实际值
// 2. 需要在Atlas中设置IP白名单
// 3. 创建数据库用户
```

---

## 📝 第三章：基本操作详解

### 3.1 使用MongoDB Shell

```bash
# 启动MongoDB Shell
mongo

# 或者连接到特定数据库
mongo mongodb://localhost:27017/myapp
```

#### 数据库操作

```javascript
// 查看所有数据库
show dbs

// 切换到指定数据库（不存在会自动创建）
use myapp

// 查看当前数据库
db

// 查看当前数据库的所有集合
show collections

// 删除当前数据库
db.dropDatabase()
```

### 3.2 CRUD操作详解

#### 📝 创建文档 (Create)

```javascript
// 插入单个文档
db.users.insertOne({
  name: "张三",
  age: 25,
  email: "zhangsan@example.com",
  createdAt: new Date()
})

// 插入多个文档
db.users.insertMany([
  { name: "李四", age: 30, email: "lisi@example.com" },
  { name: "王五", age: 28, email: "wangwu@example.com" },
  { name: "赵六", age: 35, email: "zhaoliu@example.com" }
])

// 实际返回结果
{
  "acknowledged": true,
  "insertedId": ObjectId("507f1f77bcf86cd799439011")
}
```

#### 🔍 查询文档 (Read)

```javascript
// 查询所有文档
db.users.find()

// 查询特定条件的文档
db.users.find({ name: "张三" })

// 查询年龄大于25的用户
db.users.find({ age: { $gt: 25 } })

// 查询多个条件（AND）
db.users.find({ 
  age: { $gte: 25 }, 
  name: "张三" 
})

// 查询多个条件（OR）
db.users.find({
  $or: [
    { age: { $lt: 25 } },
    { name: "张三" }
  ]
})

// 只返回特定字段
db.users.find({}, { name: 1, email: 1, _id: 0 })

// 排序和限制
db.users.find().sort({ age: -1 }).limit(5)

// 分页查询
db.users.find().skip(10).limit(5)
```

#### ✏️ 更新文档 (Update)

```javascript
// 更新单个文档
db.users.updateOne(
  { name: "张三" },  // 查询条件
  { 
    $set: { 
      age: 26,
      email: "zhangsan_new@example.com"
    }
  }
)

// 更新多个文档
db.users.updateMany(
  { age: { $lt: 30 } },
  { $set: { category: "young" } }
)

// 如果不存在则创建（upsert）
db.users.updateOne(
  { name: "新用户" },
  { 
    $set: { 
      name: "新用户",
      age: 22,
      email: "new@example.com"
    }
  },
  { upsert: true }
)

// 数组操作
db.users.updateOne(
  { name: "张三" },
  { $push: { hobbies: "游泳" } }  // 添加到数组
)

db.users.updateOne(
  { name: "张三" },
  { $pull: { hobbies: "游泳" } }  // 从数组中移除
)
```

#### 🗑️ 删除文档 (Delete)

```javascript
// 删除单个文档
db.users.deleteOne({ name: "张三" })

// 删除多个文档
db.users.deleteMany({ age: { $lt: 18 } })

// 删除所有文档（保留集合）
db.users.deleteMany({})

// 删除整个集合
db.users.drop()
```

---

## 🔧 第四章：MongoDB操作符详解

### 4.1 什么是MongoDB操作符？

**简单理解：**

- MongoDB操作符是以`$`开头的特殊关键字
- 它们用来构建复杂的查询、更新和聚合条件
- 就像SQL中的WHERE、AND、OR等关键字一样重要

**基本语法：**

```javascript
// 操作符的基本格式
{
  字段名: { $操作符: 值 }
}

// 例如：
{ age: { $gt: 25 } }        // 年龄大于25
{ name: { $regex: "张" } }   // 姓名包含"张"
```

### 4.2 逻辑操作符

#### 🔍 $and - 逻辑与（所有条件都必须满足）

```javascript
// 基本语法
{
  $and: [
    { 条件1 },
    { 条件2 },
    { 条件3 }
  ]
}

// 实际示例
db.users.find({
  $and: [
    { age: { $gte: 18 } },      // 年龄 >= 18
    { status: 'active' },       // 状态是active
    { email: { $exists: true } } // 有邮箱字段
  ]
})

// 简化写法（当字段不重复时）
db.users.find({
  age: { $gte: 18 },
  status: 'active',
  email: { $exists: true }
})

// 复杂条件组合
db.tasks.find({
  $and: [
    { priority: { $in: ['高', '中'] } },
    { completed: false },
    { 
      $or: [
        { dueDate: { $gte: new Date() } },
        { dueDate: { $exists: false } }
      ]
    }
  ]
})
```

#### 🔍 $or - 逻辑或（任一条件满足即可）

```javascript
// 基本语法
{
  $or: [
    { 条件1 },
    { 条件2 }
  ]
}

// 搜索功能示例
const search = '学习';
db.tasks.find({
  $or: [
    { title: { $regex: search, $options: 'i' } },        // 标题包含"学习"
    { description: { $regex: search, $options: 'i' } }   // 或描述包含"学习"
  ]
})

// 多字段搜索
db.users.find({
  $or: [
    { name: { $regex: 'zhang', $options: 'i' } },
    { email: { $regex: 'zhang', $options: 'i' } },
    { phone: { $regex: 'zhang' } }
  ]
})

// 与AND组合使用
db.tasks.find({
  status: 'active',              // 必须是活跃状态
  $or: [                        // 并且满足以下任一条件
    { priority: '高' },
    { dueDate: { $lt: new Date() } }
  ]
})
```

#### 🔍 $not - 逻辑非（条件不满足）

```javascript
// 基本语法
{ 字段: { $not: { 操作符: 值 } } }

// 实际示例
db.users.find({
  age: { $not: { $lt: 18 } }     // 年龄不小于18（即 >= 18）
})

// 等价写法
db.users.find({
  age: { $gte: 18 }
})

// 复杂的非条件
db.tasks.find({
  title: { $not: { $regex: /测试/, $options: 'i' } }  // 标题不包含"测试"
})

// 与其他操作符组合
db.products.find({
  price: { $not: { $in: [99, 199, 299] } }  // 价格不在指定数组中
})
```

#### 🔍 $nor - 逻辑非或（所有条件都不满足）

```javascript
// 基本语法
{
  $nor: [
    { 条件1 },
    { 条件2 }
  ]
}

// 实际示例
db.users.find({
  $nor: [
    { status: 'deleted' },       // 状态不是deleted
    { isActive: false },         // 并且isActive不是false
    { email: { $exists: false } } // 并且email字段存在
  ]
})

// 等价的复杂写法
db.users.find({
  $and: [
    { status: { $ne: 'deleted' } },
    { isActive: { $ne: false } },
    { email: { $exists: true } }
  ]
})
```

### 4.3 比较操作符

#### 🔍 基本比较操作符

```javascript
// $eq - 等于（通常省略）
db.users.find({ age: { $eq: 25 } })     // age === 25
db.users.find({ age: 25 })              // 简写形式

// $ne - 不等于
db.users.find({ status: { $ne: 'deleted' } })   // status !== 'deleted'

// $gt - 大于
db.products.find({ price: { $gt: 100 } })       // price > 100

// $gte - 大于等于
db.users.find({ age: { $gte: 18 } })            // age >= 18

// $lt - 小于
db.scores.find({ value: { $lt: 60 } })          // value < 60

// $lte - 小于等于
db.scores.find({ value: { $lte: 100 } })        // value <= 100

// 范围查询组合
db.users.find({
  age: {
    $gte: 18,      // 年龄 >= 18
    $lt: 65        // 并且 < 65
  }
})

// 日期范围查询
const startDate = new Date('2024-01-01');
const endDate = new Date('2024-12-31');

db.tasks.find({
  createdAt: {
    $gte: startDate,
    $lte: endDate
  }
})
```

#### 🔍 $in - 在数组中

```javascript
// 基本语法
{ 字段: { $in: [值1, 值2, 值3] } }

// 实际示例
db.tasks.find({
  priority: { $in: ['高', '中'] }    // priority是'高'或'中'
})

// 多种数据类型
db.users.find({
  age: { $in: [25, 30, 35] }        // 年龄是25、30或35
})

// ID数组查询
const userIds = [
  ObjectId("507f1f77bcf86cd799439011"),
  ObjectId("507f1f77bcf86cd799439012")
];

db.users.find({
  _id: { $in: userIds }
})

// 字符串数组
db.posts.find({
  tags: { $in: ['javascript', 'mongodb', 'nodejs'] }
})
```

#### 🔍 $nin - 不在数组中

```javascript
// 基本语法
{ 字段: { $nin: [值1, 值2, 值3] } }

// 实际示例
db.users.find({
  status: { $nin: ['deleted', 'archived', 'banned'] }  // 状态不是这些值
})

// 排除特定用户
const excludeIds = [
  ObjectId("507f1f77bcf86cd799439011"),
  ObjectId("507f1f77bcf86cd799439012")
];

db.users.find({
  _id: { $nin: excludeIds }
})
```

### 4.4 字符串操作符

#### 🔍 $regex - 正则表达式匹配

```javascript
// 基本语法
{
  字段: {
    $regex: 正则表达式,
    $options: 选项
  }
}

// 模糊搜索示例
const search = '学习';
db.tasks.find({
  title: {
    $regex: search,      // 包含"学习"
    $options: 'i'        // 忽略大小写
  }
})

// 正则表达式字面量
db.users.find({
  name: { $regex: /^张/ }         // 姓张的用户
})

// 复杂正则模式
db.users.find({
  email: {
    $regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'  // 邮箱格式验证
  }
})

// $options 选项详解
// 'i' - 忽略大小写
// 'm' - 多行模式
// 's' - 单行模式（.匹配换行符）
// 'x' - 忽略空格和注释

db.posts.find({
  content: {
    $regex: 'mongodb.*教程',
    $options: 'ims'      // 组合多个选项
  }
})

// 实际项目中的搜索功能
function searchTasks(keyword) {
  return db.tasks.find({
    $or: [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } }
    ]
  });
}
```

#### 🔍 $text - 全文搜索

```javascript
// 首先创建文本索引
db.posts.createIndex({ 
  title: 'text', 
  content: 'text' 
})

// 基本文本搜索
db.posts.find({
  $text: {
    $search: "MongoDB 教程"      // 搜索包含"MongoDB"或"教程"的文档
  }
})

// 精确短语搜索
db.posts.find({
  $text: {
    $search: "\"MongoDB 教程\""   // 搜索包含精确短语"MongoDB 教程"的文档
  }
})

// 排除词搜索
db.posts.find({
  $text: {
    $search: "MongoDB -入门"      // 包含"MongoDB"但不包含"入门"
  }
})

// 文本搜索评分
db.posts.find(
  { $text: { $search: "MongoDB" } },
  { score: { $meta: "textScore" } }    // 添加相关性评分
).sort({ score: { $meta: "textScore" } })  // 按相关性排序

// 设置语言
db.posts.find({
  $text: {
    $search: "数据库",
    $language: "zh"              // 指定中文
  }
})
```

### 4.5 数组操作符

#### 🔍 $all - 数组包含所有指定元素

```javascript
// 基本语法
{ 字段: { $all: [元素1, 元素2] } }

// 实际示例
db.users.find({
  hobbies: { $all: ['编程', '游泳'] }    // hobbies数组同时包含'编程'和'游泳'
})

// 与多个标签相关的文章
db.posts.find({
  tags: { $all: ['javascript', 'mongodb', 'tutorial'] }
})

// 顺序无关
db.products.find({
  features: { $all: ['防水', '蓝牙', '快充'] }  // 顺序不重要
})
```

#### 🔍 $elemMatch - 数组元素匹配条件

```javascript
// 基本语法
{
  数组字段: {
    $elemMatch: { 条件 }
  }
}

// 嵌套对象数组查询
db.students.find({
  grades: {
    $elemMatch: {
      subject: 'math',
      score: { $gte: 80 }
    }
  }
})

// 复杂的数组元素查询
db.orders.find({
  items: {
    $elemMatch: {
      name: 'iPhone',
      quantity: { $gt: 1 },
      price: { $lt: 8000 }
    }
  }
})

// 多个条件的元素匹配
db.users.find({
  addresses: {
    $elemMatch: {
      type: 'home',
      city: '北京',
      isDefault: true
    }
  }
})
```

#### 🔍 $size - 数组长度

```javascript
// 基本语法
{ 数组字段: { $size: 数量 } }

// 实际示例
db.users.find({
  hobbies: { $size: 3 }          // hobbies数组有3个元素
})

// 查找没有标签的文章
db.posts.find({
  tags: { $size: 0 }
})

// 查找有评论的文章
db.posts.find({
  comments: { $not: { $size: 0 } }
})

// 注意：$size不支持范围查询，如需范围查询需要额外字段
// 推荐做法：添加数组长度字段
db.posts.find({
  commentCount: { $gte: 5, $lte: 20 }
})
```

### 4.6 存在性操作符

#### 🔍 $exists - 字段是否存在

```javascript
// 基本语法
{ 字段: { $exists: true/false } }

// 查找有邮箱的用户
db.users.find({
  email: { $exists: true }
})

// 查找没有电话的用户
db.users.find({
  phone: { $exists: false }
})

// 与其他条件组合
db.users.find({
  email: { $exists: true },
  phone: { $exists: false },
  age: { $gte: 18 }
})

// 嵌套字段存在性检查
db.users.find({
  'address.zipCode': { $exists: true }
})
```

#### 🔍 $type - 字段类型检查

```javascript
// 基本语法
{ 字段: { $type: 类型 } }

// BSON类型编号或名称
db.users.find({
  age: { $type: 'number' }        // 或 { $type: 1 }
})

db.users.find({
  name: { $type: 'string' }       // 或 { $type: 2 }
})

// 常用BSON类型
// 1 - 'double'
// 2 - 'string'
// 3 - 'object'
// 4 - 'array'
// 5 - 'binData'
// 7 - 'objectId'
// 8 - 'bool'
// 9 - 'date'
// 10 - 'null'
// 11 - 'regex'
// 13 - 'javascript'
// 16 - 'int'
// 18 - 'long'
// 19 - 'decimal'

// 查找特定类型的字段
db.products.find({
  price: { $type: ['number', 'decimal'] }  // 价格是数字或小数类型
})

// 数据清理：查找类型不匹配的数据
db.users.find({
  age: { $type: 'string' }        // 年龄字段是字符串（可能是数据错误）
})
```

### 4.7 更新操作符

#### 🔍 $set - 设置字段值

```javascript
// 基本语法
{
  $set: {
    字段1: 新值1,
    字段2: 新值2
  }
}

// 更新用户信息
db.users.updateOne(
  { email: 'zhang@example.com' },
  {
    $set: {
      age: 26,
      status: 'active',
      lastLogin: new Date()
    }
  }
)

// 更新嵌套字段
db.users.updateOne(
  { _id: userId },
  {
    $set: {
      'address.city': '上海',
      'address.zipCode': '200000'
    }
  }
)

// 条件更新
db.users.updateMany(
  { age: { $lt: 30 } },
  { $set: { category: 'young' } }
)
```

#### 🔍 $unset - 删除字段

```javascript
// 基本语法
{
  $unset: {
    字段1: "",
    字段2: 1     // 值可以是任意的，都会被忽略
  }
}

// 删除临时字段
db.users.updateMany(
  {},
  {
    $unset: {
      temporaryField: "",
      debugInfo: 1
    }
  }
)

// 删除嵌套字段
db.users.updateOne(
  { _id: userId },
  {
    $unset: {
      'profile.tempData': ""
    }
  }
)
```

#### 🔍 $inc - 增加数值

```javascript
// 基本语法
{
  $inc: {
    数值字段: 增加量
  }
}

// 年龄加1
db.users.updateOne(
  { _id: userId },
  { $inc: { age: 1 } }
)

// 减少库存
db.products.updateOne(
  { _id: productId },
  { $inc: { stock: -1 } }
)

// 多个字段同时增加
db.posts.updateOne(
  { _id: postId },
  {
    $inc: {
      views: 1,
      likes: 1,
      'stats.totalInteractions': 1
    }
  }
)
```

#### 🔍 $push - 向数组添加元素

```javascript
// 基本语法
{
  $push: {
    数组字段: 新元素
  }
}

// 添加爱好
db.users.updateOne(
  { _id: userId },
  { $push: { hobbies: '阅读' } }
)

// 添加多个元素
db.users.updateOne(
  { _id: userId },
  {
    $push: {
      hobbies: { $each: ['游泳', '跑步'] }
    }
  }
)

// 限制数组大小
db.posts.updateOne(
  { _id: postId },
  {
    $push: {
      comments: {
        $each: [newComment],
        $slice: -10              // 只保留最后10个评论
      }
    }
  }
)

// 排序插入
db.scores.updateOne(
  { _id: userId },
  {
    $push: {
      grades: {
        $each: [85, 92],
        $sort: -1                // 按降序排列
      }
    }
  }
)
```

#### 🔍 $pull - 从数组移除元素

```javascript
// 基本语法
{
  $pull: {
    数组字段: 要移除的值
  }
}

// 移除特定爱好
db.users.updateOne(
  { _id: userId },
  { $pull: { hobbies: '游泳' } }
)

// 条件移除
db.users.updateOne(
  { _id: userId },
  {
    $pull: {
      scores: { $lt: 60 }        // 移除所有小于60的分数
    }
  }
)

// 移除嵌套对象
db.posts.updateOne(
  { _id: postId },
  {
    $pull: {
      comments: { author: 'spam_user' }  // 移除特定用户的评论
    }
  }
)
```

#### 🔍 $addToSet - 向数组添加唯一元素

```javascript
// 基本语法
{
  $addToSet: {
    数组字段: 新元素
  }
}

// 添加标签（避免重复）
db.posts.updateOne(
  { _id: postId },
  { $addToSet: { tags: 'mongodb' } }
)

// 添加多个唯一元素
db.posts.updateOne(
  { _id: postId },
  {
    $addToSet: {
      tags: { $each: ['javascript', 'nodejs', 'mongodb'] }
    }
  }
)

// 用户关注（避免重复关注）
db.users.updateOne(
  { _id: userId },
  { $addToSet: { following: targetUserId } }
)
```

### 4.8 聚合操作符

#### 🔍 $match - 聚合筛选

```javascript
// 基本语法
{
  $match: {
    查询条件
  }
}

// 聚合管道中的筛选
db.users.aggregate([
  { $match: { age: { $gte: 18 } } },     // 只处理成年用户
  { $group: { _id: '$city', count: { $sum: 1 } } }
])

// 复杂筛选条件
db.orders.aggregate([
  {
    $match: {
      orderDate: {
        $gte: new Date('2024-01-01'),
        $lt: new Date('2024-12-31')
      },
      status: 'completed',
      total: { $gt: 100 }
    }
  }
])
```

#### 🔍 $group - 聚合分组

```javascript
// 基本语法
{
  $group: {
    _id: 分组字段,
    聚合字段1: { $聚合操作: 表达式 },
    聚合字段2: { $聚合操作: 表达式 }
  }
}

// 按城市分组统计用户
db.users.aggregate([
  {
    $group: {
      _id: '$city',                    // 按城市分组
      userCount: { $sum: 1 },          // 统计用户数量
      avgAge: { $avg: '$age' },        // 平均年龄
      maxAge: { $max: '$age' },        // 最大年龄
      minAge: { $min: '$age' },        // 最小年龄
      userNames: { $push: '$name' }    // 收集用户名
    }
  }
])

// 项目中的任务统计示例
db.tasks.aggregate([
  { $match: { owner: userId } },       // 筛选特定用户的任务
  {
    $group: {
      _id: null,                       // 不分组，统计全部
      totalTasks: { $sum: 1 },
      completedTasks: {
        $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] }
      },
      pendingTasks: {
        $sum: { $cond: [{ $eq: ['$completed', false] }, 1, 0] }
      },
      highPriorityTasks: {
        $sum: { $cond: [{ $eq: ['$priority', '高'] }, 1, 0] }
      }
    }
  }
])
```

#### 🔍 $sum - 求和

```javascript
// 计算总数
{ totalCount: { $sum: 1 } }

// 计算字段总和
{ totalRevenue: { $sum: '$amount' } }

// 条件求和
{
  completedTasks: {
    $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] }
  }
}
```

#### 🔍 $avg - 平均值

```javascript
// 计算平均年龄
{ avgAge: { $avg: '$age' } }

// 计算平均分数
{ avgScore: { $avg: '$score' } }
```

#### 🔍 $max / $min - 最大值/最小值

```javascript
// 最大年龄
{ maxAge: { $max: '$age' } }

// 最小价格
{ minPrice: { $min: '$price' } }

// 最新日期
{ latestDate: { $max: '$createdAt' } }
```

#### 🔍 $cond - 条件表达式

```javascript
// 基本语法
{
  $cond: [条件, 真值, 假值]
}

// 条件统计
{
  $sum: {
    $cond: [
      { $eq: ['$status', 'active'] },  // 如果状态是active
      1,                               // 则计数为1
      0                                // 否则为0
    ]
  }
}

// 复杂条件
{
  category: {
    $cond: [
      { $gte: ['$age', 18] },          // 如果年龄>=18
      'adult',                         // 则分类为成人
      'minor'                          // 否则为未成年
    ]
  }
}

// 嵌套条件
{
  level: {
    $cond: [
      { $gte: ['$score', 90] },
      'A',
      {
        $cond: [
          { $gte: ['$score', 80] },
          'B',
          'C'
        ]
      }
    ]
  }
}
```

### 4.9 项目实际应用示例

#### 🎯 搜索功能实现

```javascript
// 完整的任务搜索功能
function searchTasks(searchParams) {
  const {
    keyword,           // 关键词搜索
    priority,          // 优先级筛选
    completed,         // 完成状态
    category,          // 分类
    dateRange,         // 日期范围
    owner             // 任务所有者
  } = searchParams;
  
  const query = {};
  
  // 1. 关键词搜索（使用$or + $regex）
  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } }
    ];
  }
  
  // 2. 精确匹配筛选
  if (priority) {
    query.priority = priority;
  }
  
  if (typeof completed === 'boolean') {
    query.completed = completed;
  }
  
  if (category) {
    query.category = category;
  }
  
  if (owner) {
    query.owner = owner;
  }
  
  // 3. 日期范围筛选（使用$gte和$lte）
  if (dateRange && dateRange.start && dateRange.end) {
    query.createdAt = {
      $gte: new Date(dateRange.start),
      $lte: new Date(dateRange.end)
    };
  }
  
  return db.tasks.find(query);
}

// 使用示例
const results = await searchTasks({
  keyword: '学习',
  priority: '高',
  completed: false,
  dateRange: {
    start: '2024-01-01',
    end: '2024-12-31'
  }
});
```

#### 🎯 用户统计分析

```javascript
// 复杂的用户行为分析
db.users.aggregate([
  // 1. 筛选活跃用户
  {
    $match: {
      status: 'active',
      lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }
  },
  
  // 2. 关联用户的任务数据
  {
    $lookup: {
      from: 'tasks',
      localField: '_id',
      foreignField: 'owner',
      as: 'tasks'
    }
  },
  
  // 3. 添加计算字段
  {
    $addFields: {
      taskCount: { $size: '$tasks' },
      completedTaskCount: {
        $size: {
          $filter: {
            input: '$tasks',
            cond: { $eq: ['$$this.completed', true] }
          }
        }
      }
    }
  },
  
  // 4. 按任务完成情况分组
  {
    $group: {
      _id: {
        $cond: [
          { $gte: ['$completedTaskCount', 10] },
          'high_performer',
          {
            $cond: [
              { $gte: ['$completedTaskCount', 5] },
              'medium_performer',
              'low_performer'
            ]
          }
        ]
      },
      userCount: { $sum: 1 },
      avgTaskCount: { $avg: '$taskCount' },
      avgCompletionRate: {
        $avg: {
          $cond: [
            { $eq: ['$taskCount', 0] },
            0,
            { $divide: ['$completedTaskCount', '$taskCount'] }
          ]
        }
      }
    }
  },
  
  // 5. 排序结果
  { $sort: { avgCompletionRate: -1 } }
]);
```

#### 🎯 批量数据处理

```javascript
// 批量更新任务状态
async function batchUpdateTasks(taskIds, updates) {
  return await db.tasks.updateMany(
    { 
      _id: { $in: taskIds },           // 使用$in操作符批量匹配
      owner: updates.userId            // 确保只能更新自己的任务
    },
    {
      $set: {
        completed: updates.completed,
        updatedAt: new Date()
      },
      $push: {
        statusHistory: {               // 记录状态变更历史
          status: updates.completed ? 'completed' : 'pending',
          changedAt: new Date(),
          changedBy: updates.userId
        }
      }
    }
  );
}

// 清理过期数据
async function cleanupExpiredData() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  
  // 删除过期的临时数据
  await db.tempData.deleteMany({
    createdAt: { $lt: thirtyDaysAgo }
  });
  
  // 归档旧的任务
  await db.tasks.updateMany(
    {
      completed: true,
      completedAt: { $lt: thirtyDaysAgo }
    },
    {
      $set: { archived: true }
    }
  );
}
```

### 4.10 操作符性能优化建议

#### 🚀 查询优化技巧

```javascript
// ✅ 好的做法：使用索引友好的操作符
// 创建复合索引
db.tasks.createIndex({ owner: 1, completed: 1, priority: 1 });

// 查询时按索引顺序排列条件
db.tasks.find({
  owner: userId,        // 索引的第一个字段
  completed: false,     // 索引的第二个字段
  priority: '高'        // 索引的第三个字段
});

// ❌ 避免的做法：不使用索引的查询
db.tasks.find({
  $where: "this.title.length > 10"  // 很慢，不能使用索引
});

// ✅ 改进的做法：添加计算字段
db.tasks.find({
  titleLength: { $gt: 10 }  // 快，可以使用索引
});
```

#### 🚀 聚合优化

```javascript
// ✅ 好的做法：早期筛选数据
db.orders.aggregate([
  { $match: { status: 'completed' } },    // 先筛选，减少后续处理的数据量
  { $group: { _id: '$customerId', total: { $sum: '$amount' } } }
]);

// ❌ 避免的做法：晚期筛选
db.orders.aggregate([
  { $group: { _id: '$customerId', total: { $sum: '$amount' } } },
  { $match: { total: { $gt: 1000 } } }     // 处理完所有数据后再筛选
]);

// ✅ 使用索引提示
db.tasks.aggregate([
  { $match: { owner: userId } }
], { hint: { owner: 1 } });               // 强制使用owner索引
```

### 4.11 操作符记忆口诀

```javascript
// 🎯 操作符分类记忆法

// 逻辑类 - "与或非或非"
$and, $or, $not, $nor

// 比较类 - "等不等大小包含"
$eq, $ne, $gt, $gte, $lt, $lte, $in, $nin

// 存在类 - "存在类型"
$exists, $type

// 字符类 - "正则文本"
$regex, $text

// 数组类 - "全部匹配大小"
$all, $elemMatch, $size

// 更新类 - "设删增推拉加"
$set, $unset, $inc, $push, $pull, $addToSet

// 聚合类 - "匹配分组求和平均最值条件"
$match, $group, $sum, $avg, $max, $min, $cond
```

### 4.12 常见错误和解决方案

#### ❌ 常见错误1：操作符拼写错误

```javascript
// 错误
db.users.find({ age: { $great: 18 } });  // $great应该是$gte

// 正确
db.users.find({ age: { $gte: 18 } });
```

#### ❌ 常见错误2：$regex选项使用错误

```javascript
// 错误
db.users.find({ name: { $regex: /张三/i, $options: 'i' } });  // 重复指定i选项

// 正确
db.users.find({ name: { $regex: '张三', $options: 'i' } });
// 或
db.users.find({ name: { $regex: /张三/i } });
```

#### ❌ 常见错误3：$or和$and的误用

```javascript
// 错误：不必要的$and
db.users.find({
  $and: [
    { age: { $gte: 18 } },
    { status: 'active' }
  ]
});

// 正确：简化写法
db.users.find({
  age: { $gte: 18 },
  status: 'active'
});
```

---

## 🚀 第五章：索引详解

### 5.1 什么是索引？

**简单理解：**

- 索引就像书的目录，帮助快速找到内容
- 没有索引时，MongoDB需要扫描整个集合（全表扫描）
- 有了索引，可以直接定位到匹配的文档

**形象比喻：**

```javascript
// 没有索引 - 像在没有目录的书中找内容
// 需要从第1页翻到最后一页

// 有索引 - 像查看书的目录
// 直接跳转到对应页码
```

### 5.2 索引的工作原理

```javascript
// 假设有100万个用户文档
const users = [
  { _id: 1, name: "张三", email: "zhang@example.com", age: 25 },
  { _id: 2, name: "李四", email: "li@example.com", age: 30 },
  // ... 100万条数据
]

// 没有索引的查询
db.users.find({ email: "zhang@example.com" })
// MongoDB需要检查所有100万条记录 - 很慢！

// 有email索引的查询
db.users.createIndex({ email: 1 })
db.users.find({ email: "zhang@example.com" })
// MongoDB直接定位到匹配记录 - 很快！
```

### 5.3 索引类型详解

#### 🔍 单字段索引

```javascript
// 创建单字段索引
db.users.createIndex({ name: 1 })    // 升序索引
db.users.createIndex({ age: -1 })    // 降序索引

// 查看索引
db.users.getIndexes()

// 删除索引
db.users.dropIndex({ name: 1 })
db.users.dropIndex("name_1")  // 使用索引名称删除
```

#### 🔍 复合索引

```javascript
// 创建复合索引（多字段组合）
db.users.createIndex({ name: 1, age: -1 })

// 复合索引的查询优化
db.users.find({ name: "张三", age: 25 })     // 完全匹配 - 最快
db.users.find({ name: "张三" })              // 前缀匹配 - 快
db.users.find({ age: 25 })                  // 后缀匹配 - 慢（不能使用索引）

// 复合索引的顺序很重要！
// 索引：{ name: 1, age: -1, city: 1 }
// 可以优化的查询：
// - { name: "张三" }
// - { name: "张三", age: 25 }
// - { name: "张三", age: 25, city: "北京" }
// 不能优化的查询：
// - { age: 25 }
// - { city: "北京" }
// - { age: 25, city: "北京" }
```

#### 🔍 多键索引（数组索引）

```javascript
// 对数组字段创建索引
db.users.createIndex({ hobbies: 1 })

// 示例数据
db.users.insertOne({
  name: "张三",
  hobbies: ["读书", "游泳", "编程"]
})

// 可以快速查询包含特定爱好的用户
db.users.find({ hobbies: "编程" })  // 快速查找
```

#### 🔍 文本索引

```javascript
// 创建文本索引（用于全文搜索）
db.posts.createIndex({ 
  title: "text", 
  content: "text" 
})

// 全文搜索
db.posts.find({ $text: { $search: "MongoDB 教程" } })

// 文本搜索评分
db.posts.find(
  { $text: { $search: "MongoDB" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })
```

#### 🔍 地理空间索引

```javascript
// 2dsphere索引 - 用于地理位置查询
db.places.createIndex({ location: "2dsphere" })

// 示例数据
db.places.insertOne({
  name: "天安门",
  location: {
    type: "Point",
    coordinates: [116.3974, 39.9093]  // [经度, 纬度]
  }
})

// 查找附近的地点
db.places.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [116.4074, 39.9042]
      },
      $maxDistance: 1000  // 1000米内
    }
  }
})
```

#### 🔍 稀疏索引

```javascript
// 稀疏索引 - 只对存在该字段的文档创建索引
db.users.createIndex({ phone: 1 }, { sparse: true })

// 适用场景：可选字段
// 有些用户有电话号码，有些没有
// 稀疏索引只为有电话号码的用户创建索引条目
```

#### 🔍 唯一索引

```javascript
// 唯一索引 - 确保字段值的唯一性
db.users.createIndex({ email: 1 }, { unique: true })

// 尝试插入重复邮箱会失败
db.users.insertOne({ name: "张三", email: "zhang@example.com" })
db.users.insertOne({ name: "李四", email: "zhang@example.com" })  // 错误！
```

#### 🔍 部分索引

```javascript
// 部分索引 - 只对满足条件的文档创建索引
db.users.createIndex(
  { age: 1 },
  { 
    partialFilterExpression: { 
      age: { $gte: 18 } 
    } 
  }
)

// 只为年龄>=18的用户创建索引
// 节省存储空间和维护成本
```

#### 🔍 TTL索引（生存时间索引）

```javascript
// TTL索引 - 自动删除过期文档
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }  // 1小时后自动删除
)

// 适用场景：
// - 用户会话
// - 临时数据
// - 日志文件
```

### 5.4 索引性能分析

#### 查询计划分析

```javascript
// 使用explain()分析查询性能
db.users.find({ name: "张三" }).explain("executionStats")

// 返回结果解读：
{
  "executionStats": {
    "totalDocsExamined": 100000,    // 扫描的文档数
    "totalDocsReturned": 1,         // 返回的文档数
    "executionTimeMillis": 150,     // 执行时间（毫秒）
    "winningPlan": {
      "stage": "COLLSCAN"           // COLLSCAN = 全集合扫描（慢）
                                    // IXSCAN = 索引扫描（快）
    }
  }
}

// 创建索引后再次分析
db.users.createIndex({ name: 1 })
db.users.find({ name: "张三" }).explain("executionStats")

// 优化后的结果：
{
  "executionStats": {
    "totalDocsExamined": 1,         // 只扫描1个文档
    "totalDocsReturned": 1,
    "executionTimeMillis": 2,       // 执行时间大幅减少
    "winningPlan": {
      "stage": "IXSCAN"             // 使用索引扫描
    }
  }
}
```

#### 索引使用统计

```javascript
// 查看索引使用统计
db.users.aggregate([
  { $indexStats: {} }
])

// 结果显示每个索引的使用次数
// 可以识别未使用的索引并删除
```

### 5.5 索引优化策略

#### 🎯 索引设计原则

```javascript
// 1. ESR规则：Equality, Sort, Range
// 查询：{ status: "active", createdAt: { $gte: date } }
// 排序：{ score: -1 }
// 最优索引：{ status: 1, score: -1, createdAt: 1 }

// 2. 选择性原则 - 高选择性字段优先
// email（唯一） > name（重复少） > age（重复多） > gender（重复很多）

// 3. 查询频率原则 - 频繁查询的字段优先建索引
```

#### 🎯 索引维护

```javascript
// 重建索引（压缩和优化）
db.users.reIndex()

// 后台重建索引（不阻塞数据库操作）
db.users.createIndex({ name: 1 }, { background: true })

// 查看索引大小
db.users.stats().indexSizes

// 删除未使用的索引
db.users.dropIndex("unusedIndex")
```

#### 🎯 常见索引陷阱

```javascript
// ❌ 错误：过多的索引
// 每个索引都会增加写入成本
// 建议：每个集合不超过10个索引

// ❌ 错误：不必要的复合索引
db.users.createIndex({ name: 1 })
db.users.createIndex({ name: 1, age: 1 })  // 冗余！

// ✅ 正确：合理的索引策略
db.users.createIndex({ name: 1, age: 1 })  // 一个复合索引即可

// ❌ 错误：索引顺序不当
// 查询：{ age: 25, name: "张三" }
db.users.createIndex({ name: 1, age: 1 })  // 效率低

// ✅ 正确：根据查询模式调整顺序
db.users.createIndex({ age: 1, name: 1 })  // 效率高
```

### 5.6 Mongoose中的索引

```javascript
// 在Schema中定义索引
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true  // 简单索引
  },
  
  email: {
    type: String,
    unique: true  // 唯一索引
  },
  
  age: {
    type: Number,
    index: { sparse: true }  // 稀疏索引
  },
  
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600  // TTL索引，1小时后过期
  }
})

// 复合索引
userSchema.index({ name: 1, age: -1 })

// 文本索引
userSchema.index({ name: 'text', bio: 'text' })

// 地理空间索引
userSchema.index({ location: '2dsphere' })

// 条件索引
userSchema.index(
  { email: 1 },
  { 
    partialFilterExpression: { 
      email: { $exists: true } 
    } 
  }
)

// 确保索引创建
userSchema.set('autoIndex', true)  // 开发环境
// userSchema.set('autoIndex', false)  // 生产环境
```

### 5.7 索引监控和调优

```javascript
// 监控慢查询
db.setProfilingLevel(2, { slowms: 100 })  // 记录超过100ms的查询

// 查看慢查询日志
db.system.profile.find().sort({ ts: -1 }).limit(5)

// 分析查询性能
const explainResult = db.users.find({ name: "张三" }).explain("executionStats")

// 性能指标解读
if (explainResult.executionStats.totalDocsExamined > explainResult.executionStats.totalDocsReturned * 10) {
  console.log("查询效率低，考虑添加索引")
}

// 索引命中率监控
const stats = db.users.stats()
const indexHitRatio = stats.indexSize / stats.size
console.log(`索引命中率: ${indexHitRatio * 100}%`)
```

---
