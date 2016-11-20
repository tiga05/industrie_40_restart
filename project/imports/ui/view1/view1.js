import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './view1.html';
import angularCharts from 'angular-chart.js';
import {Kafkadata} from '../../api/kafkadata';
import {Amqpdata} from '../../api/amqpdata';

const name = 'view1';

class View1 {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.showCharttype = 'ds';

        this.cardRow = [
            {name: 'Drilling Speed', color: 'white', value: 0, status: 'aktuell', type: 'ds'},
            {name: 'Drilling Heat', color: 'white', value: 0, status: 'aktuell', type: 'dh'},
            {name: 'Milling Speed', color: 'white', value: 0, status: 'aktuell', type: 'ms'},
            {name: 'Milling Heat', color: 'white', value: 0, status: 'aktuell', type: 'mh'}
        ];
        this.type = ['bar', 'line', 'pie', 'doughnut', 'radar'];
        this.chartRow = [
            {
                name: 'Drilling Speed',
                ctype: 'ds',
                type: 'line',
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                series: ['Drilling Speed'],
                data: [[0]],
                datasetOverride: [{yAxisID: 'y-axis-1'}],
                options: {
                    animation: false,
                    scales: {
                        yAxes: [
                            {
                                id: 'y-axis-1',
                                type: 'linear',
                                display: true,
                                position: 'left'

                            }]
                    }
                }
            },
            {
                name: 'Drilling Heat',
                ctype: 'dh',
                type: 'line',
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                series: ['Drilling Heat'],
                data: [[0]],
                datasetOverride: [{yAxisID: 'y-axis-1'}],
                options: {
                    animation: false,
                    scales: {
                        yAxes: [
                            {
                                id: 'y-axis-1',
                                type: 'linear',
                                display: true,
                                position: 'left'

                            }]
                    }
                }
            },
            {
                name: 'Milling Speed',
                ctype: 'ms',
                type: 'line',
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                series: ['Milling Speed'],
                data: [[0]],
                datasetOverride: [{yAxisID: 'y-axis-1'}],
                options: {
                    animation: false,
                    scales: {
                        yAxes: [
                            {
                                id: 'y-axis-1',
                                type: 'linear',
                                display: true,
                                position: 'left'

                            }]
                    }
                }
            },
            {
                name: 'Milling Heat',
                ctype: 'mh',
                type: 'line',
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                series: ['Milling Heat'],
                data: [[0]],
                datasetOverride: [{yAxisID: 'y-axis-1'}],
                options: {
                    animation: false,
                    scales: {
                        yAxes: [
                            {
                                id: 'y-axis-1',
                                type: 'linear',
                                display: true,
                                position: 'left'

                            }]
                    }
                }
            }

        ];

        this.helpers({
            getCustomerInfos(){
                Meteor.call('getCustomerInfos', function (error, result) {
                    if (error) {
                        console.log('Methode getCustomer hat nicht funktioniert');
                    } else {
                        Session.set('customerInfos', result);
                    }
                });
                return Session.get('customerInfos');
            },

            getCustomerNumbers(){
                return Amqpdata.find().fetch();
            },
            getOrderDetails(){
                return Kafkadata.find({"orderNumber": this.getReactively('choosenOrderNumber')});
            },
            getDHeatMaximum(){
                return _.pluck(Kafkadata.find({itemName: 'DRILLING_HEAT'}, {
                    limit: 1,
                    sort: {doubleValue: -1}
                }).fetch(), 'doubleValue');
            },
            getMHeatMaximum(){
                return _.pluck(Kafkadata.find({itemName: 'MILLING_HEAT'}, {
                    limit: 1,
                    sort: {doubleValue: -1}
                }).fetch(), 'doubleValue');
            },
            getDSpeedMaximum(){
                return _.pluck(Kafkadata.find({itemName: 'DRILLING_SPEED'}, {
                    limit: 1,
                    sort: {intValue: -1}
                }).fetch(), 'intValue');
            },
            getMSpeedMaximum(){
                return _.pluck(Kafkadata.find({itemName: 'MILLING_SPEED'}, {
                    limit: 1,
                    sort: {intValue: -1}
                }).fetch(), 'intValue');
            },
            getDHeatAverage(){
                return _.pluck(Kafkadata.find({itemName: 'DRILLING_HEAT'}, {
                    limit: 1,
                    sort: {intValue: -1}
                }).fetch(), 'doubleValue');
            },
            getMHeatAverage(){
                return _.pluck(Kafkadata.find({itemName: 'DRILLING_HEAT'}, {
                    limit: 1,
                    sort: {intValue: -1}
                }).fetch(), 'doubleValue');
            },
            getDSpeedAverage(){
                return _.pluck(Kafkadata.find({itemName: 'DRILLING_SPEED'}, {
                    limit: 1,
                    sort: {doubleValue: -1}
                }).fetch(), 'intValue');
            },
            getMSpeedAverage(){
                return _.pluck(Kafkadata.find({itemName: 'MILLING_SPEED'}, {
                    limit: 1,
                    sort: {doubleValue: -1}
                }).fetch(), 'intValue');
            },
            getDHeatAktuell(){
                return _.pluck(Kafkadata.find({itemName: 'DRILLING_HEAT'}, {
                    limit: 1,
                    sort: {_id: -1}
                }).fetch(), 'doubleValue');
            },
            getMHeatAktuell(){
                return _.pluck(Kafkadata.find({itemName: 'MILLING_HEAT'}, {
                    limit: 1,
                    sort: {_id: -1}
                }).fetch(), 'doubleValue');
            },
            getDSpeedAktuell(){
                return _.pluck(Kafkadata.find({itemName: 'DRILLING_SPEED'}, {
                    limit: 1,
                    sort: {_id: -1}
                }).fetch(), 'intValue');
            },
            getMSpeedAktuell(){
                return _.pluck(Kafkadata.find({itemName: 'MILLING_SPEED'}, {
                    limit: 1,
                    sort: {_id: -1}
                }).fetch(), 'intValue');
            },
            getChartDSpeedAktuell(){
                var temp2 = _.pluck(Kafkadata.find({itemName: 'DRILLING_SPEED'}, {
                    limit: 20,
                    sort: {_id: -1}
                }).fetch(), 'intValue');
                this.chartRow[0].data[0] = temp2;
                return temp2;
            },
            getChartMSpeedAktuell(){
                var temp2 = _.pluck(Kafkadata.find({itemName: 'MILLING_SPEED'}, {
                    limit: 20,
                    sort: {_id: -1}
                }).fetch(), 'intValue');
                this.chartRow[2].data[0] = temp2;
                return temp2;
            },
            getChartDHeatAktuell(){
                var temp2 = _.pluck(Kafkadata.find({itemName: 'DRILLING_HEAT'}, {
                    limit: 20,
                    sort: {_id: -1}
                }).fetch(), 'doubleValue');
                this.chartRow[1].data[0] = temp2;
                return temp2;
            },
            getChartMHeatAktuell(){
                var temp2 = _.pluck(Kafkadata.find({itemName: 'MILLING_HEAT'}, {
                    limit: 20,
                    sort: {_id: -1}
                }).fetch(), 'doubleValue');
                this.chartRow[3].data[0] = temp2;
                return temp2;
            },
            getCurrentOrder2(){
                var tempvar1 = _.pluck(Kafkadata.find({}, {
                    limit: 1,
                    sort: {_id: -1}
                }, {fields: {orderNumber: 1}}).fetch(), 'orderNumber');
                return tempvar1.toString();
            },
        });
    }

    changeStatus(statusNeu, type) {
        var test342 = statusNeu;

        for (var i = 0; i < this.cardRow.length; i++) {
            if (this.cardRow[i].type == type) {
                this.cardRow[i].status = test342;
                break;
            }

        }

    }

    changeChart(type) {
        this.showCharttype = type;
    }

}

export default angular.module(name, [
    angularMeteor,
    angularCharts,
    uiRouter,
]).component(name, {
    template,
    controllerAs: name,
    controller: View1
})

    .config(config)
    .filter('roundup', function () {
        return function (input) {
            if (isNaN(input)) return input;
            return Math.round(input * 10) / 10;
        }
    })

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('view1', {
            url: '/Allgemein',
            template: '<view1></view1>'
        });
}
