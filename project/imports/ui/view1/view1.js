import angular from 'angular';
import angularMeteor from 'angular-meteor';
//import uiRouter from 'angular-ui-router';
import template from './view1.html';
import angularCharts from 'angular-chart.js';
import {Kafkadata} from '../../api/kafkadata';
const name = 'view1';



class View1{
    constructor($interval, $scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
       // this.orderNumbers;
        this.choosenOrderNumber="";
        this.helpers({
            getOrderNumber(){
                this.tempVar=Kafkadata.find().fetch();
                this.distinctArray= _.pluck(this.tempVar, 'orderNumber');
                this.orderNumbers=_.uniq( this.distinctArray, false);
                return this.orderNumbers;
            },

            kafkadata() {
                this.test=Kafkadata.find({itemName:this.test2});
                return this.test;
                // this.blabla=JSON.parse(Kafkadata.find({itemName:'DRILLING'}));
            },
            getOrderDetails(){
              return Kafkadata.find({"orderNumber":this.getReactively('choosenOrderNumber')});
            }
        });


        this.cardRow = [
            {name: 'Drilling Heat', color: 'white', value: 0},
            {name: 'Drilling Speed', color: 'white', value: 0},
            {name: 'Milling Heat', color: 'white', value: 0},
            {name: 'Milling Speed', color: 'white', value: 0}
        ];
        this.type = ['bar', 'line', 'pie', 'doughnut', 'radar'];
        this.chartRow = [
            {
                name: 'Chart1',
                type: 'bar',
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
                name: 'Chart2',
                type: 'line',
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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


        $interval(() => this.update(), 1000);
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
}

// create a module
export default angular.module(name, [
    angularMeteor,
    angularCharts,
   // uiRouter
]).component(name, {
    template,
    controllerAs: name,
    controller:View1
})

/*
function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('view1', {
            url: '/view1',
            template: template
        });
}
*/