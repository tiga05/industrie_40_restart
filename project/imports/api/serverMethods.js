import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {Kafkadata} from '../api/kafkadata';
import {Amqpdata} from '../api/amqpdata';

export function testFunction(){
   return Kafkadata.find({
       "itemname": "MILLING_HEAT"
   }, {
       "orderNumber": 1
   })
}
Meteor.methods({
    //testFunction
});

