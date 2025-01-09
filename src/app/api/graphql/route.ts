// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { createSchema, createYoga } from 'graphql-yoga';
// import schema from '../../schemas/schema.js';
// import createChildLogger from '../../../../lib/logger.js';

/*
const graphQLLogger = createChildLogger({
	module: 'graphql',
	service: 'api-graphql-route'
});
*/
 
interface NextContext {
	params: Promise<Record<string, string>>
}
 
const { handleRequest } = createYoga<NextContext>({
	schema: createSchema({
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
	}),
 
	// While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
	graphqlEndpoint: '/api/graphql',
 
	// Yoga needs to know how to create a valid Next response
	fetchAPI: { Response }
});
 
export {
	handleRequest as GET,
	handleRequest as POST,
	handleRequest as OPTIONS
};