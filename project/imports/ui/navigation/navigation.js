import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './navigation.html';
import ngProgressBar from 'angular-svg-round-progressbar';
import {Kafkadata} from '../../api/kafkadata';

const name = 'navigation';

class Navigation{
    constructor($mdSidenav,$scope,$reactive) {
        'ngInject';
        this.sidenav = $mdSidenav;
        this.current = 2;
        $reactive(this).attach($scope);
        this.helpers({
            getCurrentOrder(){
                this.currentOrderNumber = Kafkadata.findOne({}, {sort: {timeStamp: -1}})
            },
            getCurrentStatus(){
                // return Kafkadata.findOne({orderNumber:this.currentOrderNumber},{sort:{timeStamp:-1}})
               var tempvar= Kafkadata.find({orderNumber:this.getReactively('currentOrderNumber.orderNumber')});
                for(var i=0;i<tempvar.length;i++){
                    switch(tempvar[i].itemName){
                        case "L1": this.current=1;
                            break;
                        case "L2":this.current=2 ;
                            break;
                        case "L3":this.current=3 ;
                            break;
                        case "L4":this.current=4;
                            break;
                        case "L5":this.current=5;
                            break;
                    }
                }
return tempvar;
         /*       this.current= Kafkadata.findOne({
                    $or: [
                        {itemName: ["L1"]},
                        {itemName: ["L2"]},
                        {itemName: ["L3"]},
                        {itemName: ["L4"]},
                        {itemName: ["L5"]},
                    ],
                }, {
                    sort: {timeStamp: -1}

                });*/
            }
        });
    }

    toggleLeft(){
        this.sidenav('left').toggle();
    }
    close(){
        this.sidenav('left').close();
    }


}

// create a module
export default angular.module(name, [
    ngProgressBar,
    angularMeteor
]).component(name, {
    template,
    controllerAs: name,
    controller: Navigation
})
