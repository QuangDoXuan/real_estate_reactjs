import constants from '../resources/strings';
import clientUtils from '../utils/client-utils';

export default {
    getAll(param) {
        let parameters =
            (param.page ? '?page=' + param.page : '?page=' + 1) +
            (param.per ? '&per=' + param.per : '&per=' + - 10)
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", "/projects/" + parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },
    getByPage(param) {
        let parameters =
            (param.page ? '?page=' + param.page : '?page=' + 1) +
            (param.per ? '&per=' + param.per : '&per=' + - 10)
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", "/admin/projects/" + parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },
    getByPaging(param) {
        let parameters =
            (param.page ? '?page=' + param.page : '?page=' + 1) +
            (param.per ? '&per=' + param.per : '&per=' + - 10)
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", "/projects/" + parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },
    delete(id){
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi('delete',"/admin/projects/" + id).then(x=>{
                resolve(x)
            }).catch(e=>{
                reject(e)
            })
        })
    },
    getAllProduct(id, param) {
        let parameters =
        (param.page ? '?page=' + param.page : '?page=' + 1) +
        (param.per ? '&per=' + param.per : '&per=' + - 10)
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", "/getbyproject/"+ id + parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },
    show(id) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", "/projects/"+ id, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    }
}
