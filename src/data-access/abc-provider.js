import client from '../utils/client-utils';
import stringUtils from '../resources/stringUtils';
import constants from '../resources/strings';
import datacacheProvider from './datacache-provider';
import clientUtils from '../utils/client-utils';

export default{

    getAll(){
        return new Promise((resolve,reject)=>{
            clientUtils.requestApi("get","http://10.0.50.111:8082/isofhcare/appointment/v1?page=0&size=10&sort=desc&properties=created").then(x=>{
                resolve(x)
            }).catch(e=>{
                reject(e)
            })
        })
    }
}