function getQuery(ids){

    let filterIds = '';

    ids.forEach(id =>{
        filterIds += "'"+id+"',"
    })

    //remove the first and last ' (and the last comma) as these are included in the query string 
    filterIds = filterIds.substring(1,filterIds.length-2);

    let query = `SELECT MetadataComponentId, MetadataComponentName,MetadataComponentType,MetadataComponentNamespace, RefMetadataComponentName, RefMetadataComponentType, RefMetadataComponentId,
    RefMetadataComponentNamespace 
    FROM MetadataComponentDependency 
    WHERE RefMetadataComponentId  IN ('${filterIds}')`;
    
    return query;
}

function logError(error){
    console.log('sfdc-dependency-api-bulk error',error);
}

function simplifyResults(rawResults,connection){

    let callers = rawResults.records.map(caller => {

        let simplified = {
            
            name:caller.MetadataComponentName,
            type:caller.MetadataComponentType,
            id:caller.MetadataComponentId,
            url:`${connection.url}/${caller.MetadataComponentId}`,  
            hasReferenceTo:{
                name:caller.RefMetadataComponentName,
                type:caller.RefMetadataComponentType,
                id:caller.RefMetadataComponentId,
                url:`${connection.url}/${caller.RefMetadataComponentId}`
            }     
        }

        return simplified;          
    });

    return callers;
}

module.exports = {getQuery,logError,simplifyResults}