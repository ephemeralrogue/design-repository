import { createSchema } from 'graphql-yoga';
// import createChildLogger from '../../../lib/logger.js';

/*
const schemaLogger = createChildLogger('schema', {
	transaction: 'createSchema'
});
*/

const schema = createSchema({
	typeDefs: /* GraphQL */ `
		type Query {
			name: String,
			description: String,
			URL: String,
			tags: [String],
		}
    `,
	resolvers: {
		Query: {
			name: () => 'This is the `greetings` field of the root `Query` type',
			description: () => 'This is the `description` field of the root `Query` type',
			URL: () => 'This is the `URL` field of the root `Query` type',
			tags: () => ['tag1', 'tag2', 'tag3'],
		}
	}
}).catch(err => {
	// eslint-disable-next-line no-console
	console.error(err);
});

export default schema;