var angular = require('angular');
var uiRouter = require('angular-ui-router');

import {routerConfig} from './routes';
import {helloWorld} from './components/hello-world/hello-world.directive';

angular.module('app',[uiRouter])
	.config(routerConfig)
	.directive('helloWorld', helloWorld);