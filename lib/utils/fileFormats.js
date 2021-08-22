function format(metadata){

    function datatable(){

        let mtds = metadata.map(md => {
            return {...md};
        });

        source = {};

        source.columns = [
            {field: 'name', header: 'API Name'},
            {field: 'type', header: 'Metadata Type'},
            {field: 'id', header: 'Id'},
            {field: 'metadataUsedName', header: 'Uses'},
            {field:'metadataUsedNameType',header:'Metadata Type'}
        ]
        
        source.data = mtds.map(md => {

            md.metadataUsedName = md.hasReferenceTo.name;
            md.metadataUsedNameType = md.hasReferenceTo.type;

            return md;
        })

        return source;
    }
 

    function excel(){

        let mtds = metadata.map(md => {
            return {...md};
        });

        return sheetFormat(mtds,'excel');

    }

    function csv(){

        let mtds = metadata.map(md => {
            return {...md};
        });

        return sheetFormat(mtds,'csv');

    }

    function sheetFormat(metadata,format){

        let headers = ['Name','Metadata Type','Id','Uses','Metadata Type'];
    
        let dataDelimiter = (format === 'excel' ? '\t' : ',');
        let EOLDelimiter = (format === 'excel' ? '' : ',');
        let newLine = '\r\n';
    
        let file = headers.join(dataDelimiter);
        file += EOLDelimiter;
    
        file += newLine;
    
        metadata.forEach(dep => {
    
            let parts = [];
      
            parts.push(`"${dep.name}"`);
            parts.push(`"${dep.type}"`);
            parts.push(`"${dep.id}"`);
            parts.push(`"${dep.url}"`);
            parts.push(`"${dep.hasReferenceTo.name}"`);
            parts.push(`"${dep.hasReferenceTo.type}"`);
    
            let row = parts.join(dataDelimiter);
            row += EOLDelimiter;
    
            file += row + newLine;
        });
    
        if(format === 'csv'){
            file = file.substring(0,file.length-3);//remove the last comma
        }
    
        return file;
    
    }

    return {csv,excel,datatable};

}

module.exports = format;