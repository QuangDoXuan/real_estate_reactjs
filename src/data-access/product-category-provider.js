import client from '../utils/client-utils';
import stringUtils from '../resources/stringUtils';
import constants from '../resources/strings';
import datacacheProvider from './datacache-provider';
import clientUtils from '../utils/client-utils';

var md5 = require('md5');
export default {

    getByPage(param) {
        let parameters =
            (param.page ? '?page=' + param.page : '?page=' + 1) +
            (param.per ? '&per=' + param.per : '&per=' + - 10)
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", "/admin/categories/" + parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },

    getAll(param) {
        let parameters =
        (param.page ? '?page=' + param.page : '?page=' + 1) +
        (param.per ? '&per=' + param.per : '&per=' + - 10)
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", "/admin/categories/" + parameters,{}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },

    createNew(param){
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi('post','/admin/categories', param).then(x=>{
                resolve(x)
            }).catch(e=>{
                reject(e)
            })
        })
    },

    update(id, param){
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi('put','/admin/categories/' + id, param).then(x=>{
                resolve(x)
            }).catch(e=>{
                reject(e)
            })
        })
    },

    getById(id){
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi('get',"/product_categories/" + id,{}).then(x=>{
                resolve(x)
            }).catch(e=>{
                reject(e)
            })
        })
    },

    searchByName(name){
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi('get',constants.api.product_category.searchByName+"?ProductCategoryName="+name).then(res=>{
                resolve(res)
            }).catch(e=>{
                reject(e)
            })
        })
    }
    ,
    deleteProductCategory(id){
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi('delete',"/admin/categories/"+id).then(x=>{
                resolve(x)
            }).catch(e=>{
                reject(e)
            })
        })
    }
    ,
    getByParent(id){
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi('get',constants.api.product_category.getByParent+"?parentProductCategoryId="+id).then(x=>{
                resolve(x)
            }).catch(e=>{
                reject(e)
            })
        })
    }

}   