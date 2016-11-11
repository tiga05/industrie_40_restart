import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './navigation.html';



const name = 'navigation';

class Navigation{
    constructor($mdSidenav) {
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
    controller: Navigation
})
