import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './view2.html';
import angularCharts from 'angular-chart.js';


const name = 'view2';

class View2 {
    constructor($interval, $scope) {
        'ngInject';

    }
}

// create a module
export default angular.module(name, [
    angularMeteor,
    angularCharts,
    uiRouter
]).component(name, {
    template,
    controllerAs: name,
    controller: View2
})

    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('view2', {
            url: '/Bestellung',
            template: '<view2></view2>'
        });
}