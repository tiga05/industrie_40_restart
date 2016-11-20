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
            getCurrentStatus(){
                var progressValue= Kafkadata.find({orderNumber:this.getReactively('currentOrderNumber')}).fetch();
                return progressValue.length;
            },
            getCurrentOrder(){
                var tempvar1=_.pluck(Kafkadata.find({},{limit:1,sort:{_id:-1}},{fields:{orderNumber:1}}).fetch(),'orderNumber');
               this.currentOrderNumber= tempvar1.toString();
                return this.currentOrderNumber;
            },
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
