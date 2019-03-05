import $utils from '../utils/utils'
import Tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const DEFAULT_OPTION = {
    arrow: false,
    placement: 'bottom',
    trigger: 'mouseenter',
    theme: 'dark',
    boundary: 'window',
};

export default function (el, {value}) {
    !!el.pl_tippy && el.pl_tippy.destroyAll();
    if ($utils.typeOf(value) === 'object') {
        const {content, arrow = false, placement = 'bottom', trigger = 'mouseenter', theme = 'dark', boundary = 'window', disabled = false} = value
        !!content && !disabled && (el.pl_tippy = Tippy(el, {content, arrow, placement, trigger, theme, boundary}))
    }
    else if ($utils.typeOf(value) === 'string') {
        const content = value
        !!content && (el.pl_tippy = Tippy(el, {content, ...DEFAULT_OPTION}))
    }
}
