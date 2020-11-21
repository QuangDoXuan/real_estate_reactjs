import client from '../utils/client-utils';
import stringUtils from '../resources/stringUtils';
import constants from '../resources/strings';
import datacacheProvider from './datacache-provider';
import clientUtils from '../utils/client-utils';

var md5 = require('md5');
export default {

    getAll() {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi('get', '/companies', {}).then(s => {
                resolve(s);
            }).catch(e => {
                reject(e);
            })
        });
    },

    getById(id) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi('get', constants.api.product.detail + id, {}).then(s => {
                resolve(s);
            }).catch(e => {
                reject(e);
            })
        });
    },

    getByPage(param) {
        let parameters =
            (param.page ? '?page=' + param.page : '?page=' + 1) +
            (param.per ? '&per=' + param.per : '&per=' + 10)
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", '/admin/companies' + parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },

    searchByLocation(param) {
        let parameters = `?south=${param.south || null}&north=${param.north || null}&west=${param.west||null }&east=${param.east || null}`
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi('get','/maps' + parameters,{}).then(res=>{
                resolve(res)
            }).catch(e=>{
                reject(e)
            })
        })
    },

    search(param){
        let parameters =
        (param.ProductCategoryId?'?ProductCategoryId='+param.ProductCategoryId:'?ProductCategoryId='+'')+
         (param.ProductPriceStart?'&ProductPriceStart='+param.ProductPriceStart:'&ProductPriceStart='+0)+
         (param.ProductPriceEnd?'&ProductPriceEnd='+param.ProductPriceEnd:'&ProductPriceEnd='+0)+
         (param.ProductAreaStart?'&ProductAreaStart='+param.ProductAreaStart:'&ProductAreaStart='+0)+
         (param.ProductAreaEnd?'&ProductAreaEnd='+param.ProductAreaEnd:'&ProductAreaEnd='+0)+
         (param.ProductAddress?'&ProductAddress='+param.ProductAddress:'&ProductAddress='+'')+
         (param.ParentProductCategoryId?'&ParentProductCategoryId='+param.ParentProductCategoryId:'&ParentProductCategoryId='+'')

         return new Promise((resolve,reject)=>{
             clientUtils.requestApi('get',constants.api.product.search+parameters,{}).then(x=>{
                 resolve(x)
             }).catch(e=>{
                 reject(e)
             })
         })
    },

    searchByName(name){
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi('get',constants.api.product.searchByName+'?ProductName='+name,{}).then(res=>{
                resolve(res)
            }).catch(e=>{
                reject(e)
            })
        })
    },

    createNew(param){
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi('post',constants.api.product.create,param).then(x=>{
                resolve(x)
            }).catch(e=>{
                reject(e)
            })
        })
    },

    delete(id){
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi('delete',"/admin/companies/" + id).then(x=>{
                resolve(x)
            }).catch(e=>{
                reject(e)
            })
        })
    },
    getAllProject(id){
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi('get',"/getbycompany/" + id).then(x=>{
                resolve(x)
            }).catch(e=>{
                reject(e)
            })
        })
    }
}
