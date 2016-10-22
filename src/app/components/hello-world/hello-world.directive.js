export function helloWorld() {
  'ngInject';

  let directive = {
    restrict: 'E',
    replace:true,
    template: '<h3>Hello world!</h3>'
  };

  return directive;
}