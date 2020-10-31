module.exports = () => {
    const limits = {
        'x': undefined,
        'y': undefined
    };

    return {
        'scale': (p, axis, trueSize) => {
            return trueSize / (
                limits[axis].size / (p + limits[axis].offset)
            );
        },
        'setLimits': (xMin, yMin, xMax, yMax) => {
            const setLimit = (min, max) => {
                return { 'size': max - min, 'offset': 0 - min };
            };

            limits.x = setLimit(xMin, xMax);
            // reversed y-axis to get a more "mathematically normal" view.
            limits.y = setLimit(yMax, yMin);
        }
    };
}
