import './vendors';

import {routerConfig} from './routes';
import {helloWorld} from './components/hello-world/hello-world.directive';

angular.module('app', ['ui.router'])
	.config(routerConfig)
	.directive('helloWorld', helloWorld);