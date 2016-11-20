import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './view1.html';
import angularCharts from 'angular-chart.js';
import ngTable from 'ng-table';
//import angularTable from 'angular-material-data-table';
import {Kafkadata} from '../../api/kafkadata';
import {Amqpdata} from '../../api/amqpdata';
//import angulaPromiser from 'angular-meteor-promiser';
//import {TableComponent} from './component/table.component';
import '../../api/serverMethods';

const name = 'view1';

class View1 {
    constructor($interval, $scope, $reactive) {
        'ngInject';
        this.checked = true;
        $reactive(this).attach($scope);
        this.orderNumbers;
        this.testvarbla = 5;
        this.maximum = "maximum";
        this.average = "average";
        this.aktuell = "aktuell";
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
                series: ['Series A'],
                data: [0, 3, 0, 0, 3, 0, 0, 0, 0, 0],
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
                series: ['Series A'],
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
                series: ['Series A'],
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
                series: ['Series A'],
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

                var tempvar1 = Meteor.call('getCustomerInfos', function (error, result) {
                    if (error) {
                        console.log('Methode getCustomer hat nicht funktioniert');
                    } else {
                        Session.set('customerInfos',result);
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
            getDHeataktuell(){
                var ausgabe1 = Kafkadata.find({itemName: 'DRILLING_HEAT'}, {limit: 1, sort: {_id: -1}}).fetch()
                var ausgabe2 = _.pluck(ausgabe1, 'doubleValue');
                return ausgabe2;
            },
            getMHeataktuell(){
                return _.pluck(Kafkadata.find({itemName: 'MILLING_HEAT'}, {
                    limit: 1,
                    sort: {_id: -1}
                }).fetch(), 'doubleValue');
            },
            getDSpeedaktuell(){
                return _.pluck(Kafkadata.find({itemName: 'DRILLING_SPEED'}, {
                    limit: 1,
                    sort: {_id: -1}
                }).fetch(), 'intValue');
            },
            getMSpeedaktuell(){
                return _.pluck(Kafkadata.find({itemName: 'MILLING_SPEED'}, {
                    limit: 1,
                    sort: {_id: -1}
                }).fetch(), 'intValue');
            },
            getChartDSpeedaktuell(){
                var temp2 = _.pluck(Kafkadata.find({itemName: 'DRILLING_SPEED'}, {
                    limit: 20,
                    sort: {_id: -1}
                }).fetch(), 'intValue');
                this.chartRow[0].data = temp2;
                return temp2;
            },
            getChartMSpeedaktuell(){
                var temp2 = _.pluck(Kafkadata.find({itemName: 'MILLING_SPEED'}, {
                    limit: 20,
                    sort: {_id: -1}
                }).fetch(), 'intValue');
                this.chartRow[2].data = temp2;
                return temp2;
            },
            getChartDHeataktuell(){
                var temp2 = _.pluck(Kafkadata.find({itemName: 'DRILLING_HEAT'}, {
                    limit: 20,
                    sort: {_id: -1}
                }).fetch(), 'doubleValue');
                this.chartRow[1].data = temp2;
                return temp2;
            },
            getChartMHeataktuell(){
                var temp2 = _.pluck(Kafkadata.find({itemName: 'MILLING_HEAT'}, {
                    limit: 20,
                    sort: {_id: -1}
                }).fetch(), 'doubleValue');
                this.chartRow[3].data = temp2;
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

    update() {
        for (var i = 0; i < this.cardRow.length; i++) {
            this.cardRow[i].value = Math.round((Math.random() * 10) * 10);
            var value = this.cardRow[i].value;
            switch (true) {
                case (value > 80):
                    this.cardRow[i].color = 'red';
                    break;
                case (value > 60):
                    this.cardRow[i].color = 'orange';
                    break;
                case (value > 40):
                    this.cardRow[i].color = 'yellow';
                    break;
                default:
                    this.cardRow[i].color = 'green';
                    break;
            }
        }
        for (var y = 0; y < this.chartRow.length; y++) {
            for (var z = 0; z < this.chartRow[y].data.length; z++) {
                this.chartRow[y].data[z] = this.chartRow[y].data[z + 1];
            }
            this.chartRow[y].data[z - 1] = Math.round((Math.random() * 10) * 10);
        }
    }

    changestatus(statusNeu, type) {
        var test342 = statusNeu;

        for (var i = 0; i < this.cardRow.length; i++) {
            if (this.cardRow[i].type == type) {
                this.cardRow[i].status = test342;
                //console.log(test342);
                break;
            }

        }

    }

    changeChart(type) {
        this.showCharttype = type;
        var test333 = type;
        //console.log(test333);
    }

}

//View1.$inject = ['NgTableParams'];
// create a module
export default angular.module(name, [
    angularMeteor,
    angularCharts,
    uiRouter,
    // angulaPromiser,
    //'ngTable'
    //angularTable,
    //helpers
]).component(name, {
//ngTable,
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
