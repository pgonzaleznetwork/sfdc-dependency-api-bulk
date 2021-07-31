let bulkDependency = require('../src/index');
let fs = require('fs');

/**
* @token A session id or oauth token with API access
* @url Your instance url i.e login.salesforce.com or mydomain.my.salesforce.com
* @apiVersion the version of the Salesforce API. If not specified or if it's lower than 49.0, we use 49.0 by default
*/
let connection = {
    token: '00D3h000005XLUw!AQkAQAsS8bQCgcZb5Nr05ekdB79FrNmbWL6Dsxjb5nAma1KNSDORae6fcPFnh4zpiTytVsPMpGnbca7YiZxryG49u1AfPYXf',
    url:'https://brave-raccoon-mm7crl-dev-ed.my.salesforce.com',
    apiVersion:'50.0'
};

let ids = [
    '00N3h00000DDY3gEAH',
    '00N3h00000DDY4BEAX',
    '00N3h00000DdZSIEA3',
    '00N3h00000HkU4fEAF',
    '00N3h00000IX4CdEAL',
    '00N3h00000DDY3qEAH',
    '01p3h00000FHByLAAX',
    '01p3h00000FmMpHAAV',
    '01p3h00000FmMp2AAF',
    '01p3h00000C6msBAAR',
    '00b3h000000lt5kAAA',
    '00b3h000000lt5iAAA'
];

let jobId;
let jobStatus;

async function example(){

    let result = await bulkDependency.getUsage(ids,connection);
    console.log(result);

    /*try {
        jobId = await bulkDependency.submitJob(ids,connection);
        console.log(`Job Id ${jobId}`);
    } catch (error) {
        console.error('Failed to submit bulk API job',error);
    }
    
    try {
        jobStatus = await bulkDependency.checkJobStatus(jobId,connection);
        console.log(`Job Status ${jobStatus}`)
    } catch (error) {
        console.error(`Failed to check job status for job ${jobStatus}`);
    }*/
}

example();