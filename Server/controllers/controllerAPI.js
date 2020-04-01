require('dotenv').config()
const axios = require('axios')

class ControllerAPI{

    static holiday(req, res){
        const country = req.params.ISOcountry
        const year = req.params.year
 
        axios({
            method: 'GET',
            url: `https://calendarific.com/api/v2/holidays?&api_key=${process.env.API_KEY}&country=${country}&year=${year}`
        })
            .then(({ data }) => {
                res.status(200).json( data.response.holidays )
            })
            .catch(err => {
                res.status(500).json({ 
                    messege: 'Server failed to response'
                }) 
            })
    }

}

module.exports = ControllerAPI