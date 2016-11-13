import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngTable from 'ng-table';
import template from './table.component.html';
//const templateUrl = require('./table.component.html');

class tableCtrl{
    constructor(NgTableParams) {
        var data = [
            { name: "Moroni", age: 50 },
            { name: "Tiancum", age: 43 },
            { name: "Jacob", age: 27 },
            { name: "Nephi", age: 29 },
            { name: "Enos", age: 34 },
            { name: "Tiancum", age: 43 },
            { name: "Jacob", age: 27 },
            { name: "Nephi", age: 29 },
            { name: "Enos", age: 34 },
            { name: "Tiancum", age: 43 },
            { name: "Jacob", age: 27 },
            { name: "Nephi", age: 29 },
            { name: "Enos", age: 34 },
            { name: "Tiancum", age: 43 },
            { name: "Jacob", age: 27 },
            { name: "Nephi", age: 29 },
            { name: "Enos", age: 34 }
        ];

        this.tableParams = new NgTableParams({}, {
            dataset: data
        });
    }
}

tableCtrl.$inject = ['NgTableParams'];

export default angular.module(name, [
    angularMeteor
]).component(name, {
    ngTable,
    template,
    controllerAs: name,
    controller: tableCtrl
})
