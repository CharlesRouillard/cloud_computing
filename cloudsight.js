var axios = require('axios');

const key = process.env.CLOUDSIGHT_API_KEY


function startPolling(token, success, fail) {
    function imageReponse() {
        axios.request({
            url: 'http://api.cloudsight.ai/image_responses/'+token,
            method: 'GET',
            headers : {
                 Authorization: 'CloudSight '+CLOUDSIGHT_API_KEY
            }
        }).then(function(response) {
            if(response.data.status == 'completed') {
                success(response.data.name);
            } else if(response.data.status == 'not completed') {
                setTimeout(imageReponse, 600);
            } else {
                fail(response.data);
            }

        }).catch(fail);
    }
    setTimeout(imageReponse, 600);
}

module.exports = function(url, success, fail) {
    if(!url) { return '' }
    
    axios.request({
        url: 'http://api.cloudsight.ai/image_requests',
        method: 'POST',
        headers : {
             Authorization: 'CloudSight '+CLOUDSIGHT_API_KEY
        },
        params:{
            'image_request[remote_image_url]' : url,
            'image_request[language]' : 'fr',
            'image_request[locale]': 'fr-FR'
        }
    }).then(function(response) {
        startPolling(response.data.token, success, fail);
    }).catch(fail)
}