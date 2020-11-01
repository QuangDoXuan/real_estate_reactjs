import client from '../utils/client-utils';
import stringUtils from '../resources/stringUtils';
import constants from '../resources/strings';
import datacacheProvider from './datacache-provider';
import clientUtils from '../utils/client-utils';

var md5 = require('md5');
export default {

    getByPage(param) {
        let parameters =
            (param.pagesize ? '?pagesize=' + param.pagesize : '?pagesize=' + 10) +
            (param.pagenumber ? '&pagenumber=' + param.pagenumber : '&pagenumber=' + - 0)
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.product_category.getByPage + parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },

    getAll() {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.product_category.getAll ,{}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },

    createNew(param){
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi('post',constants.api.product_category.create,param).then(x=>{
                resolve(x)
            }).catch(e=>{
                reject(e)
            })
        })
    },

    getById(id){
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi('get',constants.api.product_category.getById+"?ProductCategoryId=" + id,{}).then(x=>{
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
            clientUtils.requestApi('delete',constants.api.product_category.delete+"?ProductCategoryId="+id).then(x=>{
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