/**
 * Application routes with its version
 */

// Root
const appsRoot = 'appsRoot';

export const routes = {
	apps: {
		root: appsRoot,
		getById: `/${appsRoot}/:appId`,
		create: appsRoot,
		update: `/${appsRoot}/:appId`,
		delete: `/${appsRoot}/:appKey`,
	},
	health: {
		root: 'health',
	},
};
