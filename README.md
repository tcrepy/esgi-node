# TechWatch

## SETUP

first you have to install the react app : 

```
cd client
yarn install
cd ..
```

Then, you can run the project in the root directory :

```
docker-compose up
```

The docker-compose file provide 6 containers : 

- Client (The React app)
- Server (A NodeJs API)
- Mongo (Mongo database)
- Mongo-Express
- Elastic-Search
- Kibana (To access to the data in elastic)

You have to setup the mapping of posts in elastic.

Go in [Kibana](http://localhost:5601), connect yourself with user : `elastic`, password : `changeme`, and go to `dev tools`

Copy this : 

```
PUT posts
{
  "mappings": {
      "properties": {
        "title": { "type": "text" },
        "description": { "type": "text" },
        "link": { "type": "text" },
        "user": {
          "properties" : {
            "_id": { "type": "text" },
            "pseudo": { "type": "text" }
          }
        },
        "categories": {
          "properties" :{
            "_id": { "type": "text" },
            "title": { "type": "text" },
            "color": { "type": "text" }
    
          }
        },
        "created_at": {"type": "date"},
        "upvote": {"type": "integer"}
      }
  }
}
```

 and run it.

## Links

- [Application TechWatch](http://localhost:3001) : `http://localhost:3001`
- [Elastic API](http://localhost:9200) - `http://localhost:9200`
- [Kibana](http://localhost:5601) - `http://localhost:5601`
- [Node API](http://localhost:3000) : `http://localhost:3000`


## Bonus

To see data in [Kibana](http://localhost:5601) `dev tools` : `GET posts/_search`