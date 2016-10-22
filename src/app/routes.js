'use strict';

import {HomeCtrl} from './home/home.controller';
import {AboutCtrl} from './about/about.controller';

export function routerConfig($stateProvider, $urlRouterProvider) {
	'ngInject';

	$stateProvider
		.state('home', {
			url: '/',
			template: require('./home/home.html'),
			controller: HomeCtrl,
			controllerAs: 'home'
		})
		.state('about', {
			url: '/about',
			template: require('./about/about.html'),
			controller: AboutCtrl,
			controllerAs: 'about',
			title: 'about'
		});

	$urlRouterProvider.otherwise('/');
}