import pino from 'pino';

const options = {
	transport: {
		target: 'pino-pretty',
		options: {
			level: 'trace'
		}
	},
	formatters: {
		bindings: bindings => {
			return {
				pid: bindings.pid,
				host: bindings.hostname,
				node: process.version
			};
		},
		level: label => {
			return {
				level: label.toUpperCase()
			};
		}
	},
};

function initializeLogger(options) {
	try {
        
		return pino(options);
	} catch(error) {
		// eslint-disable-next-line no-console
		console.log(error, 'Error initializing logger');
	}
}

const Log = initializeLogger(options);

export default function createChildLogger(service, meta) {
	return Log.child({
		service: service,
		transaction: meta
	});
}