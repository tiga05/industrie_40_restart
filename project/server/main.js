import { Meteor } from 'meteor/meteor';
import { Kafkadata } from '../imports/api/kafkadata';
import { Amqpdata} from '../imports/api/amqpdata';
Meteor.startup(() => {
    if (Kafkadata.find().count() === 0) {
  /*      const kafkadata = [{
            'name': 'Dubstep-Free Zone',
            'description': 'Fast just got faster with Nexus S.'
        }, {
            'name': 'All dubstep all the time',
            'description': 'Get it on!'
        }, {
            'name': 'Savage lounging',
            'description': 'Leisure suit required. And only fiercest manners.'
        }];

        kafkadata.forEach((party) => {
            Kafkadata.insert(party)
        });*/
        // Kafkadata.distinct();
    }
});
Meteor.methods({
        allTestData:()=>{
       var results=Kafkadata.find().count();
        console.log(results);
        return results;
    },

});
