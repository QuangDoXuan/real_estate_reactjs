import client from '../utils/client-utils';
import stringUtils from '../resources/stringUtils';
import constants from '../resources/strings';
import datacacheProvider from './datacache-provider';
import clientUtils from '../utils/client-utils';

var md5 = require('md5');
export default {

    getAll(param) {
        return new Promise((resolve, reject) => {
            let parameters = '?type=' + param.type
            clientUtils.requestApi('get', '/products' + parameters, {}).then(s => {
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
            (param.type ? '?type=' + param.type : '?type=' + 0) +
            (param.page ? '&page=' + param.page : '&page=' + 1) +
            (param.per ? '&per=' + param.per : '&per=' + - 10)
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", '/admin/products' + parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },

    search(param) {
        let parameters =
            (param.type ? '?type=' + param.type : '?type=' + 0) +
            (param.page ? '&page=' + param.page : '&page=' + 1) +
            (param.per ? '&per=' + param.per : '&per=' + - 20)
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", '/products' + parameters, {}).then(x => {
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

    filter(param){
        let parameters =

        (param.categoryId?'?categoryId='+param.categoryId:'?categoryId='+'')+
        (param.page ? '&page=' + param.page : '&page=' + 1) +
        (param.per ? '&per=' + param.per : '&per=' + 20)+
         (param.priceStart?'&from_price='+param.priceStart:'&from_price='+0)+
         (param.priceEnd?'&to_price='+param.priceEnd:'&to_price='+0)+
         (param.areaStart?'&from_area='+param.areaStart:'&from_area='+0)+
         (param.areaEnd?'&to_area='+param.areaEnd:'&to_area='+0)+
         (param.address?'&address='+param.address:'&address='+'')+
         (param.parentCategory?'&parent_category='+param.parentCategory:'&parent_category='+'')

         return new Promise((resolve,reject)=>{
             clientUtils.requestApi('get','/filter'+parameters,{}).then(x=>{
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

    deleteProduct(id){
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi('delete',"/admin/products/" + id).then(x=>{
                resolve(x)
            }).catch(e=>{
                reject(e)
            })
        })
    }


}   