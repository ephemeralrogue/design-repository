import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { Db } from 'mongodb';
import connect from '@/lib/MongoDBUtils';

const db: Db = await connect(process.env.MONGODB_DB);
const resourcesCollection = db.collection('resources');
const tagsCollection = db.collection('tags');

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: /* GraphQL */ `
        type Resource {
            _id: String,
            name: String,
            description: String,
            URL: String,
            tags: [ Tag ],
        }

        type Tag {
            _id: String,
            name: String,
            resources: [ Resource ],
        }

        type Query {
            tag(_id: String): Tag,
            resource: [ Resource ]
        }
    `,
    resolvers: {
        Query: {
            tag: () => 'This is the `greetings` field of the root `Query` type',
            resource: () => 'This is the `description` field of the root `Query` type',
        }
    }
});

export default schema;