<template>
    <div id="example">
        <x-y-scope
            ref="scope"
            limits="-40, -5, 40, 60"
            @request-data="requestData"
        >
        </x-y-scope>
    </div>
</template>

<script>
import XYScope from '../src/XYScope.vue';

var x = 2.0;
var y = 3.0;
var z = 4.0;
const sigma = 10.0;
const rho = 28.0;
const beta = 8.0 / 3.0;
const dt = 0.015;

export default {
    name: 'Example',
    components: { XYScope },
    'methods': {
        'requestData': function () {
            const newX = x + dt * (sigma * (y - x));
            const newY = y + dt * (x * (rho - z) - y);
            const newZ = z + dt * (x * y - beta * z);
            x = newX; y = newY; z = newZ;
            this.$refs.scope.pushData({ 'x': x, 'y': z });
        }
    }
};
</script>

<style>
html,
body,
#example {
    height: 100%;
    margin: 0;
}

.xyscope-canvas {
    background-color: #000;
    color: #0f0;
}
</style>