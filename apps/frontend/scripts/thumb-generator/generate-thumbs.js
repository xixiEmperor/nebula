import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import { allKindsOfCharts } from "../../src/config/charts_index.ts";

// 获取当前文件的目录路径（ES 模块方式）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 文件的基础输出路径
const baseOutdir = path.join(__dirname, "../../src/assets/thumbs");

// 截图生成函数
const generateThumb = async () => {
	if(!fs.existsSync(baseOutdir)) {
		fs.mkdirSync(baseOutdir);
	}

	// 创建一个浏览器实例，使用系统已安装的 Chrome
	const browser = await puppeteer.launch({
		headless: true,
		executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Windows 系统 Chrome 默认路径
	});
	// 创建一个页面实例
	const page = await browser.newPage();

	for(const charts of allKindsOfCharts) {
		// 找到装有当前类型的所有图表的数组
		const currentKind = charts.charts;
		console.log("开始生成", charts.type, "的缩略图, 共", currentKind.length, "个")
		// 遍历所有图表
		for(const chart of currentKind) {
			// 定义一个输出目录
			const outdir = path.join(baseOutdir, charts.type);
			if(!fs.existsSync(outdir)) {
				fs.mkdirSync(outdir);
			}
			console.log("正在打开预览页面...")
			// 打开预览页面
			await page.goto("file://" + path.join(__dirname, "preview.html"));
			// 等待 ECharts 库加载完成
			await page.waitForFunction(() => typeof window.echarts !== 'undefined');
			console.log("ECharts 库加载完成...")
			// 初始化echarts实例
			await page.evaluate((chartOptions) => {
				window.renderChart(chartOptions);
			}, chart.options);
			console.log("echarts实例初始化完成...")
			// 等待图表渲染完成
			await new Promise(resolve => setTimeout(resolve, 1000));
			console.log("图表渲染完成...")
			// 截图
			console.log(`正在截图, 第${currentKind.indexOf(chart) + 1}个图表...`)
			await page.screenshot({ path:`${outdir}/${chart.id}.png` });
			console.log("截图完成√")
		}
		console.log("--------------------------------")
		console.log("完成", charts.type, "的缩略图, 共", currentKind.length, "个")
		console.log("--------------------------------")
	}

	console.log("所有缩略图生成完成√, 准备关闭浏览器...")
	await browser.close();
}

generateThumb();