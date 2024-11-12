
const date = new Date();

const formattedDate = date.getFullYear() + '-' +
    String(date.getMonth() + 1).padStart(2, '0') + '-' +
    String(date.getDate()).padStart(2, '0') + ' ' +
    String(date.getHours()).padStart(2, '0') + ':' +
    String(date.getMinutes()).padStart(2, '0') + ':' +
    String(date.getSeconds()).padStart(2, '0');

    
function SuccessResponse(statusCode, message, data,status=true) {
    return{metadata:{status:status, statusCode:statusCode,msg:message,timeStamp:formattedDate}, data:data||''}
}

function ErrorResponse(statusCode, message, error ,status=false){
    return{metadata:{status:status, statusCode:statusCode,msg:message,timeStamp:formattedDate},error:error||''}
}

module.exports = {SuccessResponse,ErrorResponse}