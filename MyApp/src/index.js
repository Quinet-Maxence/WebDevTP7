// Express & Body-Parser
const express = require('express')
const bodyParser = require('body-parser');

const app = express()


app.use(express.static('public'));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
})); 

const port = 8080
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
// Knex --> I have used my login. I know that it is not good to put the logins directly in the code and not in the environment variables, 
// but for this tp I told myself that it was enough. IF you want to test the code, put your PostGres logins. 
const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres', // You can change
        password : '3103', // You can change
        database : 'Maxence' // My DB Name, you can change
    }
});

function getCity(res, name) {
    knex('city').where('Name', name)
    .then(knex_response => {
        res.send(knex_response)
    });
}


 app.get('/', (req, res) => {
    res.send("Welcome in my home page")
})

/**
 * @api {get} /city/:city List cities
 * @apiGroup City Operations
 * @apiSuccess {Object[]} city City
 * @apiSuccess {Number} city.id City id
 * @apiSuccess {String} city.Name City Name
 * @apiSuccess {String} city.Country_Codes Country_Codes
 * @apiSuccess {String} city.Districts City Districts
 * @apiSuccess {Number} city.Populations_counts Populations_counts
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{ 
 *      "id":3003, 
 *      "Name":"Caen", 
 *      "Country_Codes": "FRA", 
 *      "Districts":"Basse-Normandie", 
 *      "Populations_counts:113987"
 *    }]
 * 
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
app.get('/city/:city', (req, res) => {
    getCity(res, req.params.city);
})

/**
 * @api {post} /city Insert a city
 * @apiGroup City Operations
 * @apiParam {String} name City Name
 * @apiParam {String} pop City Populations_counts
 * @apiSuccess {Object[]} result Result
 * @apiSuccess {String} result.status Status
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {    
 *          "status":"success" 
 *    }
 * 
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
 app.post('/city', async (req, res) => {
    knex('city').insert(req.body).then(answer => {
        console.log(answer);
    });
    res.send('Rows created !')
})

/**
 * @api {delete} /city Remove a city
 * @apiGroup City
 * @apiParam {Name} name City Name
 * @apiParamExample {json} Delete
 *    {
 *      "Name": "Paris",
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
app.delete('/city', (req, res) => {
    knex('city').where('Name', req.body.Name).del()
    .then(knex_response => {
        res.send({result:knex_response});
    });
})


/**
 * @api {put} /city/:name Update a city
 * @apiGroup City
 * @apiParam {Name} name City Name
 * @apiParam {Number} populations_counts City Populations_counts
 * @apiParamExample {json} Input
 *    {
 *      "Populations_counts": 100,
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */
app.put('/city/:city', (req, res) => {
    knex('city')
    .update({ Populations_counts: req.body.Populations_counts })
    .where('Name', '=', req.params.city)
    .then(knex_response => {
        if (!knex_response) res.send('Error')
        getCity(res, req.params.city);
    });
})