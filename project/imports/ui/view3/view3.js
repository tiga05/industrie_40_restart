import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './view3.html';
import angularCharts from 'angular-chart.js';
import {Kafkadata} from '../../api/kafkadata';
import {Amqpdata} from '../../api/amqpdata';


const name = 'view3';

class View3 {
    constructor($interval, $scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        // Initialisierung der Diagrammvariablen; teilweilse Befüllung mit Dummy-Daten
        this.chartRow = [{name: 'Umdrehungen pro Minute', type: 'line', labels: [1, 2, 3], series: ['Drilling Speed','Milling Speed'], data: [[0],[0]],
            datasetOverride: [{yAxisID: 'y-axis-1'}, { yAxisID: 'y-axis-2' }],
            options: {
                animation: false,
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'

                        },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'right'
                        }]
                }
            }
        },{name: 'Hitzeverlauf', type: 'line', labels: [1, 2, 3,4,5,6], series: ['Drilling Heat','Milling Heat'], data: [[0],[0]],
            datasetOverride: [{yAxisID: 'y-axis-1'}, { yAxisID: 'y-axis-2' }],
            options: {
                animation: false,
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'

                        },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'right'
                        }]
                }
            }
        }];
        //
        this.helpers({
            getCustomerNumbers(){
                var tempvar=Amqpdata.find().fetch();
                var tempvar2= _.pluck(tempvar,"customerNumber");
                var tempvar3= _.uniq(tempvar2, false);
                return tempvar3;
            },
            getCustomerOrderDetails(){
                return Amqpdata.find({customerNumber: this.getReactively('choosenCustomerNumber')});
            },
            getCustomerOrderDetailsChartDsMs(){
                var tempvar1= _.pluck(Kafkadata.find({$and:[
                    {orderNumber: this.getReactively('choosenOrderNumber')},
                    {itemName:'DRILLING_SPEED'}]}).fetch(),'intValue');
                var tempvar2= _.pluck(Kafkadata.find({$and:[
                    {orderNumber: this.getReactively('choosenOrderNumber')},
                    {itemName:'MILLING_SPEED'}]}).fetch(),'intValue');
                this.chartRow[0].data[0]=tempvar1;
                this.chartRow[0].data[1]=tempvar2;
            },
            getCustomerOrderDetailsChartDhMh(){
                var tempvar1= _.pluck(Kafkadata.find({$and:[
                    {orderNumber: this.getReactively('choosenOrderNumber')},
                    {itemName:'DRILLING_HEAT'}]}).fetch(),'doubleValue');
                var tempvar2= _.pluck(Kafkadata.find({$and:[
                    {orderNumber: this.getReactively('choosenOrderNumber')},
                    {itemName:'MILLING_HEAT'}]}).fetch(),'doubleValue');
                console.log("DRILLING_HEAT"+tempvar1);
                console.log("MILLING_HEAT"+tempvar2);
    tempvar1.push(0);
                this.chartRow[1].data[0]= tempvar1;
                this.chartRow[1].data[1]=tempvar2;
            },
        });

    }
    changeChoosenOrderNumber(input){
        //console.log(input);
        this.choosenOrderNumber=input;
        //console.log(this.choosenOrderNumber);
        this.checked=true;
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
    controller: View3
})

    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('view3', {
            url: '/Kunden',
            template: '<view3></view3>'
        });
}