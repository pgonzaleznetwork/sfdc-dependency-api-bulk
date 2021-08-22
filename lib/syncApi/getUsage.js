let utils = require('../utils/utils');
let format = require('../utils/fileFormats');
let {restAPI} = require('sfdc-happy-api')();

async function getUsage(ids,connection,options){
    
    let query = utils.getQuery(ids);
    let soqlQuery = {query,filterById:true,useToolingApi:true}

    let restApi = restAPI(connection,utils.logError);
    let rawResults = await restApi.query(soqlQuery);
    let simplifiedResults = utils.simplifyResults(rawResults,connection);

    simplifiedResults.sort((a,b) => (a.hasReferenceTo.name > b.hasReferenceTo.name) ? 1 : -1);

    let files = format(simplifiedResults);

    let excel = files.excel();
    let csv = files.csv();
    let datatable = files.datatable();

    let result = {
        datatable,
        excel,
        csv,
        recommendBulkApi : (simplifiedResults.length == 2000)
    }

    return result;
}

module.exports = getUsage;

