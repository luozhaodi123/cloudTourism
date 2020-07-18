// 创建一个存储search history的仓库
export const state = () => ({
    historyList: []
})

export const mutations = {
    setHistory(state, data) {
        // 往history的第一个位置添加搜索历史数据
        state.historyList.unshift(data);
    }
}