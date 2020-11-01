import constants from '../resources/strings';
import clientUtils from '../utils/client-utils';

export default {
    getAll() {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi('get', constants.api.project.all).then(s => {
                resolve(s);
            }).catch(e => {
                reject(e);
            })
        });
    },
}
