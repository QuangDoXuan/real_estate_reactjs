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
            clientUtils.requestApi("get", constants.api.product.getByPage + parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
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

    getAll() {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.product.getAll ,{}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
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
            clientUtils.requestApi('delete',constants.api.product.delete+"?ProductId="+id).then(x=>{
                resolve(x)
            }).catch(e=>{
                reject(e)
            })
        })
    }


}   