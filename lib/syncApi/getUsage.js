let utils = require('../utils/utils');
let {restAPI} = require('sfdc-happy-api')();

async function getUsage(ids,connection,options){
    
    let query = utils.getQuery(ids);
    let soqlQuery = {query,filterById:true,useToolingApi:true}

    let restApi = restAPI(connection,utils.logError);
    let rawResults = await restApi.query(soqlQuery);
    let simplifiedResults = utils.simplifyResults(rawResults,connection);

    let result = {
        data: simplifiedResults,
        recommendBulkApi : (simplifiedResults.length == 2000)
    }

    return result;
}

module.exports = getUsage;

