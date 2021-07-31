let fetch = require('node-fetch');

async function submitJob(ids,connection){

    let {token,url,apiVersion} = connection;

    let fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: getRequestBody(ids)
    }

    let endpoint = `${url}/services/data/v${apiVersion}/tooling/jobs/query`;

    console.log(endpoint);


    let response = await fetch(endpoint,fetchOptions);
    let json = await response.json();

    console.log(json);

    return json.id;

}

function getRequestBody(ids){

    let requestBody = {
        operation: 'query',
        query: getQuery(ids)
    }

    console.log(JSON.stringify(requestBody))

    return JSON.stringify(requestBody);

}

function getQuery(ids){

    let filterIds = '';

    ids.forEach(id =>{
        filterIds += "'"+id+"',"
    })

    //remove the first and last ' (and the last comma) as these are included in the query string 
    filterIds = filterIds.substring(1,ids.length-2);


    let query = `SELECT MetadataComponentId, MetadataComponentName,MetadataComponentType,MetadataComponentNamespace, RefMetadataComponentName, RefMetadataComponentType, RefMetadataComponentId,
    RefMetadataComponentNamespace 
    FROM MetadataComponentDependency 
    WHERE RefMetadataComponentId  IN ('${ids}')`;

    return query;
}



module.exports = submitJob;