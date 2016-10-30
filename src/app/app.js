import './vendors';

import {routerConfig} from './routes';
import {helloWorld} from './components/hello-world/hello-world.directive';

angular.module('app', ['ui.router'])
	.config(routerConfig)
	.directive('helloWorld', helloWorld)
	.run(function($rootScope) {
		$rootScope.$on('$stateChangeSuccess', function(event, toState) {
			if (toState.name === 'about') {
				require.ensure([], function() {
					require('../libraries/my-cookie-plugins.js');
				});
			}
		});
	});