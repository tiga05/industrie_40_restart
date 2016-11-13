import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './view2.html';
import angularCharts from 'angular-chart.js';
import {Kafkadata} from '../../api/kafkadata';
import {Amqpdata} from '../../api/amqpdata';


const name = 'view2';

class View2 {
    constructor($interval, $scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.helpers({
            getCustomerNumbers(){
                var tempvar=Amqpdata.find().fetch();
                var tempvar2= _.pluck(tempvar,"customerNumber");
                var tempvar3= _.uniq(tempvar2, false);
                return tempvar3;
                choosenCustomerNumber
            },
            getOrderNumber(){
                var tempvar = Amqpdata.find({customerNumber:this.getReactively('choosenCustomerNumber')}).fetch();
                var tempvar2= _.pluck(tempvar,"orderNumber");
                return tempvar2;
            },
/*            getOrderNumber(){
                this.tempVar = Kafkadata.find({orderNumber:this.getReactively('choosenCustomerNumber')}).fetch();
                this.distinctArray = _.pluck(this.tempVar, 'orderNumber');
                this.orderNumbers = _.uniq(this.distinctArray, false);
                return this.orderNumbers;
            },*/
            getOrderData(){
                this.orderData=Kafkadata.find({orderNumber: this.getReactively('choosenOrderNumber')});
                return  this.orderData;
            }
        });
    }
    changestatus(statusNeu,type){
        var test342=statusNeu;

        for(var i=0;i<this.cardRow.length;i++){
            if(this.cardRow[i].type==type){
                this.cardRow[i].status=test342;
                console.log(test342);
                break;
            }

        }

    }
    changeChart(type){
        this.showCharttype=type;
        var test333=type;
        console.log(test333);
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