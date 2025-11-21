import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { ScreenTemplate, FreeLayoutTemplate } from "@/types/template";
import type { TemplateArea, FreeLayoutArea } from "@/types/template";

interface TemplateStore {
	// 当前选择的模板
	template: ScreenTemplate | FreeLayoutTemplate | null;
	// 设置当前选择的模板
	setTemplate: (template: ScreenTemplate | FreeLayoutTemplate | null) => void;
	// 获取当前选择的模板
	getTemplate: () => ScreenTemplate | FreeLayoutTemplate | null;
	
	// ============ Area 增删改查 ============
	
	// 创建区域（自由布局）
	createArea: (area: FreeLayoutArea) => void;
	
	// 更新区域
	updateArea: (areaId: string, updates: Partial<TemplateArea> | Partial<FreeLayoutArea>) => void;
	
	// 删除区域
	deleteArea: (areaId: string) => void;
	
	// 查询区域
	getArea: (areaId: string) => TemplateArea | FreeLayoutArea | undefined;
	
	// 获取所有区域
	getAllAreas: () => (TemplateArea | FreeLayoutArea)[];
}

export const useTemplateStroe = create<TemplateStore>()(
	immer((set, get) => ({
		// 当前选择的模板
		template: null,

		// 设置当前选择的模板
		setTemplate: (template: ScreenTemplate | FreeLayoutTemplate | null) => set((state) => {
			state.template = template;
		}),

		// 获取当前选择的模板
		getTemplate: () => get().template,

		// ============ Area 增删改查实现 ============
		
		// 创建区域（主要用于自由布局）
		createArea: (area: FreeLayoutArea) => set((state) => {
			if (state.template && state.template.layoutMode === 'free') {
				(state.template as FreeLayoutTemplate).areas.push(area);
			}
		}),
		
		// 更新区域
		updateArea: (areaId: string, updates: Partial<TemplateArea> | Partial<FreeLayoutArea>) => set((state) => {
			if (state.template) {
				const areaIndex = state.template.areas.findIndex(a => a.id === areaId);
				if (areaIndex !== -1) {
					state.template.areas[areaIndex] = {
						...state.template.areas[areaIndex],
						...updates
					} as any;
				}
			}
		}),
		
		// 删除区域
		deleteArea: (areaId: string) => set((state) => {
			if (state.template) {
				state.template.areas = state.template.areas.filter(a => a.id !== areaId) as any;
			}
		}),
		
		// 查询区域
		getArea: (areaId: string) => {
			const template = get().template;
			if (template) {
				return template.areas.find(a => a.id === areaId);
			}
			return undefined;
		},
		
		// 获取所有区域
		getAllAreas: () => {
			const template = get().template;
			return template ? template.areas : [];
		},

	}))
)