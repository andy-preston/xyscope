<template>
    <div class="xyscope">
        <canvas
            ref="canvas"
            class="xyscope-canvas"
            @request-data="$emit('request-data')"
        >
        </canvas>
    </div>
</template>

<script>
import { Scope } from './scope.js';
const scope = Scope();

export default {
    'props': {
        /**
         * @member {string} limits "xMin, yMin, xMax, yMax"
         */
        'limits': {
            'type': String,
            'required': true,
            'validator': scope.validateLimits
        }
    },
    'watch': {
        'limits': {
            'immediate': true,
            // eslint-disable-next-line no-unused-vars
            'handler': (val, oldVal) => {
                scope.setLimits(val);
            }
        }
    },
    'mounted': function () {
        scope.start(this.$refs.canvas);
    },
    'methods': {
        /**
         * Push data is a method rather than a watcher on a property because
         * two consecutive data items could well be the same as each other
         * at which point the watcher won't be triggered.
         * When the parent receives a 'request-data' event it should respond
         * by passing data to this method.
         *
         * @function pushData
         * @param {object} data the x,y pair (``{'x': 23, 'y': 42}``)
         */
        'pushData': scope.pushData,

        /**
         * @function rescale force the scope to rescale itself
         */
        'rescale': scope.rescale
    }
}
</script>

<style>
.xyscope {
    display: flex;
    flex-direction: row;
    height: 100%;
}

.xyscope-canvas {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
}
</style>
