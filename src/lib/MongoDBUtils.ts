import {
    Db,
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

export default async function connect(database: string) {
	try {

        const mongoClient: MongoClient = new MongoClient(mongoDBURIPartial, options);

		await mongoClient.connect();

        const db: Db = mongoClient.db(database);
			
		await mongoClient.db(database).command({ ping: 1 });

		mongoLogger.debug({
			transaction: 'MongoDB connect'
		}, `Pinged your MongoDB deployment. Successfully connected to ${database}`, 'http');

        return db;

	} catch(error) {

        mongoLogger.error({
            transaction: 'MongoDB connect'
        }, 'Failed to connect to MongoDB!', 'http');
		
	}
};