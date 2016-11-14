import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './lightBarriers.html';
import { Kafkadata} from '../../api/kafkadata';
import {Amqpdata} from '../../api/amqpdata';




const name = 'lightbarriers';

class LightBarriers{
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.helpers({

            getCustomerInfos(){
                var tempvar = Amqpdata.find().fetch();
                var tempvar2 = _.pluck(tempvar, "customerNumber")
                var tempvar3 = _.uniq(tempvar2, false);
                /*     for (var i=0; i<this.customerInfos.length;i++){
                 kundennummer=this.customerInfos[i].customerNumber;
                 for(var x=0;i<this.customerInfos.length;i++){

                 }
                 }*/
                return tempvar3;
            },
        })
    }

}

// create a module
export default angular.module(name, [
    angularMeteor,
]).component(name, {
    template,
    controllerAs: name,
    controller: LightBarriers
})
