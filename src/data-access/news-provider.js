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
            (param.per ? '&per=' + param.per : '&per=' + 10)
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", '/admin/posts/'+ parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },

    getAll(param) {
        let parameters =
        (param.page ? '?page=' + param.page : '?page=' + 1) +
        (param.per ? '&per=' + param.per : '&per=' + 10)
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", '/posts' + parameters ,{}).then(x => {
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
            clientUtils.requestApi('delete','/admin/posts/' + id).then(x=>{
                resolve(x)
            }).catch(e=>{
                reject(e)
            })
        })
    }


}   