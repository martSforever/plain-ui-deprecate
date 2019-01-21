import $utils from '../utils/utils'
import Tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const DEFAULT_OPTION = {
    arrow: false,
    placement: 'bottom',
    trigger: 'mouseenter',
    theme: 'dark'
};

export default function (el, {value}) {
    !!el.lv_tippy && el.lv_tippy.destroyAll();
    if ($utils.typeOf(value) === 'object') {
        const {content, arrow = false, placement = 'bottom', trigger = 'mouseenter', theme = 'dark', tooltip = false} = value
        !!content && tooltip && (el.lv_tippy = Tippy(el, {content, arrow, placement, trigger, theme}))
    }
    else if ($utils.typeOf(value) === 'string') {
        const content = value
        !!content && (el.lv_tippy = Tippy(el, {content, ...DEFAULT_OPTION}))
    }
}
