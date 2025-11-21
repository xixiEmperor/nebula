# 模块

1. 模块只会在模块之间进行导出和导入，不要在其他任何地方使用模块
2. imports是对modules进行操作
3. exports负责导出供其他模块使用的providers
4. 一个模块中所有的service和provider可以进行依赖注入的有：
	- 当前module中的所有providers
	- imports的模块中exports的providers
	- @Global声明的全局providers

## imports

## providers

三种提供者：

1. 类提供者
   格式：
   {
   provide: 类名,
   useClass: 具体提供的类
   }
2. 值提供者
   {
   provide: 字符串，
   useValue：一个对象
   }
3. 工厂提供者
   {
   provide: 一个类名,
   useFactory: 一个工厂函数,
   inject(可选)：注入的实例

   // 注入的实例在解析后会成为工厂函数的参数，参数和其对应的实例两者顺序需要严格对应，实例的解析结果为实例的工厂函数的返回值
   // 注入实例的格式应该与实例的provide一致
   }

上述三种提供者，类提供者也可以称为标准提供者，其他自定义提供者的最佳实践为，单独在一个文件中定义这个提供者，然后在有需要的模块进行导入

## controllers

## exports

# 依赖注入
1. 依赖注入只能在类的构造函数中进行
