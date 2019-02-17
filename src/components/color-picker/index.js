const isOnePointZero = function (n) {
    return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
};

const isPercentage = function (n) {
    return typeof n === 'string' && n.indexOf('%') !== -1;
};


// Take input from [0, n] and return it as [0, 1]
const bound01 = function (value, max) {
    if (isOnePointZero(value)) value = '100%';

    const processPercent = isPercentage(value);
    value = Math.min(max, Math.max(0, parseFloat(value)));

    // Automatically convert percentage into number
    if (processPercent) {
        value = parseInt(value * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if ((Math.abs(value - max) < 0.000001)) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (value % max) / parseFloat(max);
};

/*
 *  hsv颜色值转rgb颜色值
 *  @author              martsforever
 *  @datetime           2019/2/16 22:43
 *  @param hue          色调，用角度度量，取值范围为0°～360°，从红色开始按逆时针方向计算，红色为0°，绿色为120°,蓝色为240°。它们的补色是：黄色为60°，青色为180°,品红为300°；
 *  @param saturation   饱和度，一种颜色，可以看成是某种光谱色与白色混合的结果。其中光谱色所占的比例愈大，颜色接近光谱色的程度就愈高，颜色的饱和度也就愈高。饱和度高，颜色则深而艳。光谱色的白光成分为0，饱和度达到最高。通常取值范围为0%～100%，值越大，颜色越饱和。
 *  @param value        明度，明度表示颜色明亮的程度，对于光源色，明度值与发光体的光亮度有关；对于物体色，此值和物体的透射比或反射比有关。通常取值范围为0%（黑）到100%（白）。
 */
const hsv2rgb = function (hue, saturation, value) {
    hue = bound01(hue, 360) * 6;
    saturation = bound01(saturation, 100);
    value = bound01(value, 100);

    const i = Math.floor(hue);
    const f = hue - i;
    const p = value * (1 - saturation);
    const q = value * (1 - f * saturation);
    const t = value * (1 - (1 - f) * saturation);
    const mod = i % 6;
    const r = [value, q, p, p, t, value][mod];
    const g = [t, value, value, q, p, p][mod];
    const b = [p, p, t, value, value, q][mod];

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
};

export {
    hsv2rgb,
}