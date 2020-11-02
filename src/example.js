/* global Vue */

require('../src/vue-xyscope');

(() => {
    var x = 2.0;
    var y = 3.0;
    var z = 4.0;

    const sigma = 10.0;
    const rho = 28.0;
    const beta = 8.0 / 3.0;
    const dt = 0.015;

    var vm = new Vue({
        'el': '#example',
        'methods': {
            /**
             * @function requestData respond to a request-data event
             */
            'requestData': () => {
                const newX = x + dt * (sigma * (y - x));
                const newY = y + dt * (x * (rho - z) - y);
                const newZ = z + dt * (x * y - beta * z);
                x = newX; y = newY; z = newZ;
                vm.$refs.scope.pushData({ 'x': x, 'y': z });
            }
        }
    });

})();
