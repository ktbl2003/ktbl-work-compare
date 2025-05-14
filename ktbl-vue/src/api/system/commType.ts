import request from '@/utils/request'

const COMM_TYPE_BASE_URL = '/api/v1/commType'

const CommTypeAPI = {
    /**
     * 获取通用分类树列表
     * @param params 查询参数
     */

    // return request<any, DeptVO[]>({
    //     url: `${DEPT_BASE_URL}`,
    //     method: "get",
    //     params: queryParams,
    //   });

    getList(queryParams?: any) {
        return request<any, CommonType[]>({
            url: `${COMM_TYPE_BASE_URL}/list`,
            method: "get",
            params: queryParams,
        });

        // return request.get<{ list: CommonType[] }>(`${COMM_TYPE_BASE_URL}/list`, {
        //     params: queryParams // 统一使用params传递查询参数
        // })
    },

    /**
     * 创建分类节点
     * @param data 创建参数
     */
    create(data: CommonType) {
        return request({
            url: COMM_TYPE_BASE_URL,
            method: 'post',
            data: data // POST/PUT请求统一使用data传递主体数据
        })
    },

    /**
     * 更新分类节点
     * @param data 更新参数
     */
    update(data: CommonType) {
        return request({
            url: `${COMM_TYPE_BASE_URL}/${data.id}`,
            method: 'put',
            data: data // 保持与config.ts一致的data传递方式
        })
    },

    /**
     * 删除分类节点
     * @param id 节点ID
     */
    delete(id: string) {
        return request({
            url: `${COMM_TYPE_BASE_URL}/${id}`,
            method: 'delete'
        })
    },

    /**
     * 拖拽节点排序
     * @param data 拖拽参数 {id: 当前节点ID, newPid: 新父节点ID}
     */
    drag(params: { id: string; newId: string }) {
        return request({
            url: `${COMM_TYPE_BASE_URL}/drag`,
            method: 'post',
            params: params // 保持与config.ts一致的params传递方式
        })
    }
}

export default CommTypeAPI

/** 通用分类类型 */
export interface CommonType {
    id: string
    pid: string
    code: string
    name: string
    dispCode?: string
    type: string
    status: string
    treePath: string
    levelCode:string
    children: CommonType[]
}