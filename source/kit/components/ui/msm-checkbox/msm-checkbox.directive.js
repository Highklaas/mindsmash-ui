/*
 * Based on: https://github.com/sebastianha/angular-bootstrap-checkbox
 *   commit: 7e531169ab680f5ac9209040ecbb89fd55ac619e
 */

(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name components.ui.msmCheckbox
   * @restrict 'E'
   * @scope
   *
   * @description Renders a Bootstrap checkbox.
   */
  angular
    .module('msm.components.ui')
    .directive('msmCheckbox', msmCheckbox);

  function msmCheckbox() {
    return {
      scope: {},
      require: "ngModel",
      restrict: "E",
      replace: "true",
      template: "<button type=\"button\" class=\"msm-checkbox btn btn-default\" ng-class=\"{'checked': checked===true}\">" +
        "<i class=\"zmdi zmdi-hc-fw\" ng-class=\"{'zmdi-check': checked===true}\"></i>" +
        "</button>",
      link: function(scope, elem, attrs, ctrl) {
        var trueValue = true;
        var falseValue = false;

        // If defined set true value
        if(attrs.ngTrueValue !== undefined) {
          trueValue = attrs.ngTrueValue;
        }
        // If defined set false value
        if(attrs.ngFalseValue !== undefined) {
          falseValue = attrs.ngFalseValue;
        }

        // Check if name attribute is set and if so add it to the DOM element
        if(scope.name !== undefined) {
          elem.name = scope.name;
        }

        // Update element when model changes
        scope.$watch(function() {
          if(ctrl.$modelValue === trueValue || ctrl.$modelValue === true) {
            ctrl.$setViewValue(trueValue);
          } else {
            ctrl.$setViewValue(falseValue);
          }
          return ctrl.$modelValue;
        }, function(newVal, oldVal) {
          scope.checked = ctrl.$modelValue === trueValue;
        }, true);

        // On click swap value and trigger onChange function
        elem.bind("click", function() {
          scope.$apply(function() {
            if(ctrl.$modelValue === falseValue) {
              ctrl.$setViewValue(trueValue);
            } else {
              ctrl.$setViewValue(falseValue);
            }
          });
        });
      }
    }
  }

})();