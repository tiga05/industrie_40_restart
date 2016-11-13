import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Kafkadata} from '../api/kafkadata';
import {Amqpdata} from '../api/amqpdata';

export function allMethods() {
    this.helpers({

        getCustomerNumbers(){
            return Amqpdata.find().fetch();
        },
        getOrderNumber(){
            this.tempVar = Kafkadata.find().fetch();
            this.distinctArray = _.pluck(this.tempVar, 'orderNumber');
            this.orderNumbers = _.uniq(this.distinctArray, false);
            return this.orderNumbers;
        },

        kafkadata() {
            this.test = Kafkadata.find({itemName: this.test2});
            return this.test;
            // this.blabla=JSON.parse(Kafkadata.find({itemName:'DRILLING'}));
        },
        getOrderDetails(){
            return Kafkadata.find({"orderNumber": this.getReactively('choosenOrderNumber')});
        }
    });

}
Meteor.methods({
    allMethods
});

