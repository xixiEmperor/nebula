import { Table, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

const tableHeader: { name: string, width: string }[] = [
  {
    name: "项目名称",
    width: "30%",
  },
  {
    name: "最后修改",
    width: "20%",
  },
  {
    name: "创建时间",
    width: "20%",
  },
  {
    name: "操作",
    width: "30%",
  },
]

const tableData: { name: string, lastModified: Date, created: Date }[] = [
  {
    name: "项目名称",
    lastModified: new Date(),
    created: new Date(),
  },
  {
    name: "项目名称",
    lastModified: new Date(),
    created: new Date(),
  },
]

export default function ProjectList() {
  return (
    <Table>
      <TableHead className="[&_tr]:border-0 flex">
        {tableHeader.map(item => {
          return (
            <TableHead className={`w-[${item.width}] flex justify-center items-center text-nebula-text-secondary`} key={item.name}>{item.name}</TableHead>
          )
        })}
      </TableHead>
      <TableBody className="w-full [&_tr]:border-0">
        {tableData.map((item, index) => {
          return (
            <TableRow key={index} className="flex border-0 hover:bg-transparent min-h-[60px]">
              <TableCell className="w-[30%] flex gap-[10px] justify-center items-center text-nebula-text-primary">
                <div className="bg-red-500 h-full w-[87px]"></div>
                {item.name}
              </TableCell>
              <TableCell className="w-[20%] flex justify-center items-center text-nebula-text-primary">{item.lastModified.toLocaleDateString()}</TableCell>
              <TableCell className="w-[20%] flex justify-center items-center text-nebula-text-primary">{item.created.toLocaleDateString()}</TableCell>
              <TableCell className="w-[30%] flex justify-center items-center">
                {/* button可以抽出封装为通用组件，通过传值来决定样式(表格 or 列表) */}
                <button className="bg-nebula-glow-gradient text-white text-sm px-4 py-1 rounded">编辑</button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}