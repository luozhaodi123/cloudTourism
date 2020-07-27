// 创建一个存储drafts草稿的仓库
export const state = () => ({
    drafts: []
})

export const mutations = {
    // 往第一个位置插入数据
    setDrafts(state, data) {
        state.drafts.unshift(data);
    },
    // 移除对应的数据
    removeDrafts(state, index) {
        state.drafts.splice(index, 1);
    }
}