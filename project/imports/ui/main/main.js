import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
//import '../node_modules/angular-material/angular-material.css';
import '../../../node_modules/angular-material/angular-material.css'
import '../own.css';
import template from './main.html';
//import { name as PartiesList } from '../partiesList/partiesList';
//import { name as PartyDetails } from '../partyDetails/partyDetails';
import { name as Navigation } from '../navigation/navigation';
import {name as Toolbar} from '../toolbar/toolbar';
import {name as view1Ctrl} from '../view1/view1';
import {name as View2} from '../view2/view2';

class Main {}

const name = 'main';

// create a module
export default angular.module(name, [
    angularMeteor,
    //uiRouter,
    //PartiesList,
    //PartyDetails,
    Navigation,
    Toolbar,
    view1Ctrl,
    View2,
    ngMaterial
]).component(name, {
    template,
    controllerAs: name,
    controller: Main
})
    .config(config);
function config($mdThemingProvider ) {
    'ngInject';
    //$urlRouterProvider
   // $stateProvider
    //$locationProvider.html5Mode(true);

/*    $urlRouterProvider.otherwise('/view1');

    $stateProvider
        .state('view1', {
            url: '/',
            templateUrl: 'test.html'
        });*/

    $mdThemingProvider
        .theme('default')
        .primaryPalette('orange')
        .accentPalette('deep-orange')
        .warnPalette('red');
}