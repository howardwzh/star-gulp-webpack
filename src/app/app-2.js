import './app-2.scss';

import './vendors';

import {routerConfig} from './routes';

angular.module('app', ['ui.router'])
	.config(routerConfig);