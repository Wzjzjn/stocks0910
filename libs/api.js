var axios =require( 'axios')

const REACT_APP_API_HOST='http://hq.sinajs.cn/'

let Api = {
    get: '',
    post: '',
    postDraw:''
}

const instance = axios.create({
    baseURL: REACT_APP_API_HOST,
    // headers: {
    //     'X-CustomHeader': 'energy'
    // },
    responseType:"arrayBuffer",
    // withCredentials: true
});

// 审图系统请求
const instanceDraw = axios.create({
    baseURL: 'http://117.149.224.15:37780',
    headers: {
        // 'X-CustomHeader': 'energy',
        'Access-Control-Allow-Origin':'*',
    },
    changeOrigin:true,
    withCredentials: true
});

Api.get = (api, data) => instance.get(api, data)

Api.post = (api, data, config) => instance.post(`/api${api}`, data, config)
Api.postDraw = (api, data, config) => instanceDraw.post(`${api}`, data, config)
Api.postV3 = (api, data) => instance.post(`/api/v3${api}`, data)
Api.getV3 = path => instance.get(`/api/v3${path}`)
Api.postV_drawing = (api, data) => instance.post(`/EnergyMonitorService/api/EnergyMonitor${api}`, data)

//only support this project so far
// Api.projectId = cookie.load('projectId')
// Api.projectName = cookie.load('projectName')
// //保存api的区域列表
// Api.region = cookie.load('region')
// Api.regionProjects = cookie.load('regionProjects')
exports = module.exports =Api;
// exports.Api = Api;