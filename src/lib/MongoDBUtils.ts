import {
	MongoClient,
	MongoClientOptions,
	ServerApiVersion
} from 'mongodb';
import createChildLogger from './logger.js';

const mongoLogger = createChildLogger('MongoDB');

const mongoDBURIPartial: string = `${process.env.MONGODB_PREFIX}://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/`;

const options: MongoClientOptions = {
	appName: process.env.APP_NAME,
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	},
	writeConcern: {
		w: 'majority'
	}
};

const mongoClient: MongoClient = new MongoClient(mongoDBURIPartial, options);

export default async function connect(database: string) {
	try {

		mongoLogger.info({
			transaction: 'MongoDB connect'
		},`Connecting to ${database} for the first time!`, 'info');

		await mongoClient.connect();
			
		await mongoClient.db(database).command({ ping: 1 });
		mongoLogger.info({
			transaction: 'MongoDB connect'
		}, 'Pinged your deployment. You successfully connected to MongoDB!', 'http');

	} finally {
		await mongoClient.close();
	}
};