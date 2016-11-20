import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import '../../../node_modules/angular-material/angular-material.css'
import '../own.css';
import template from './main.html';
import {name as Navigation} from '../navigation/navigation';
import {name as Toolbar} from '../toolbar/toolbar';
import {name as View1} from '../view1/view1';
import {name as View3} from '../view3/view3';

class Main {
}

const name = 'main';

export default angular.module(name, [
    angularMeteor,
    uiRouter,
    Navigation,
    Toolbar,
    View1,
    View3,
    ngMaterial
]).component(name, {
    template,
    controllerAs: name,
    controller: Main
})
    .config(config);
function config($mdThemingProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider.otherwise('/Allgemein');

    $mdThemingProvider
        .theme('default')
        .primaryPalette('orange')
        .accentPalette('deep-orange')
        .warnPalette('red');
}