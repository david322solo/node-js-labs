const { createServer } = require('http');
const { readFileSync } = require('fs');
const { graphql, buildSchema } = require('graphql');

const config = require('./config').http;
const resolvers = require('./resolvers');
const schema = buildSchema(readFileSync('./schemas/schema.gql').toString());
const Db = require('./db/Db');

const context = new Db();


const server = createServer((request, response) => {
    let body = '';
    request.on('data', chunk => body += chunk);
    request.on('end', () => {

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');

        if (request.url === '/' && request.method === 'POST') {
            let graphqlRequest = '';
            try {
                graphqlRequest = JSON.parse(body);
                console.log(graphqlRequest);
                if (graphqlRequest.query) {
                    graphql(schema, graphqlRequest.query, resolvers, context, graphqlRequest.variables)
                        .then(result => {
                            if (result.errors) {
                                response.statusCode = 400;
                            }
                            response.end(JSON.stringify(result, null, '  '));
                        }).catch(err => {
                            response.statusCode = 500;
                            response.end(JSON.stringify({error: err}, null, '  '));
                        });
                } else {
                    response.statusCode = 400;
                    response.end();
                }
            } catch (err) {
                response.statusCode = 500;
                response.end(JSON.stringify({error: err}, null, '  '));
            }
        } else {
            response.statusCode = 404;
            response.end();
        }
    });
});

server.listen(config.port, config.host, () => {
    console.log(`Listening to http://${config.host}:${config.port}`);
});


/*
* Sample requests:
*
* Get faculties
* {
*   "query": "query { getFaculties {Faculty_Id, Faculty_Name, Pulpits {Pulpit_Id, Pulpit_Name}} }"
* }
*
* Add SUBJECT
*{
   "query": "mutation($SUBJECT: NewSubject!) { setSubject(subject: $SUBJECT) {SUBJECT, SUBJECT_NAME} }",
   "variables":
   {
     "SUBJECT":
     {
      "subject":"Идув3",
      "subjectName": "New12",
      "pulpit": "ИСиs"
     }
   }
}
*
* Delete Subject
* {
   "query": "mutation($id: String!) { delSubject(id: $id) {SUBJECT, SUBJECT_NAME} }",
   "variables": {
     "id": "Идув3     "
   }
}
*
* */
