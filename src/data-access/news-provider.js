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
            clientUtils.requestApi("get", constants.api.news.getByPage + parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },

    getAll() {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.news.getAll ,{}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },

    createNew(param){
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi('post',constants.api.news.create,param).then(x=>{
                resolve(x)
            }).catch(e=>{
                reject(e)
            })
        })
    },

    deleteNew(id){
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi('delete',constants.api.news.delete+"?NewId="+id).then(x=>{
                resolve(x)
            }).catch(e=>{
                reject(e)
            })
        })
    }


}   