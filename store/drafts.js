// 创建一个存储drafts草稿的仓库
export const state = () => ({
    drafts: []
})

export const mutations = {
    setDrafts(state, data) {
        // 往第一个位置插入数据
        state.drafts.unshift(data);
    },
    removeDrafts(state, index) {
        state.drafts.splice(index, 1);
    }
}