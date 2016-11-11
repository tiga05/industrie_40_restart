import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './toolbar.html';


const name = 'toolbar';

class Toolbar{
    constructor( $scope, $mdSidenav, $log) {
        'ngInject';
        this.sidenav=$mdSidenav;
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
    angularMeteor
]).component(name, {
    template,
    controllerAs: name,
    controller:Toolbar
})


