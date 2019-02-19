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
    !!el.p_tippy && el.p_tippy.destroyAll();
    if ($utils.typeOf(value) === 'object') {
        const {content, arrow = false, placement = 'bottom', trigger = 'mouseenter', theme = 'dark', tooltip = true} = value
        // console.log(content,tooltip)
        !!content && tooltip && (el.p_tippy = Tippy(el, {content, arrow, placement, trigger, theme}))
    }
    else if ($utils.typeOf(value) === 'string') {
        const content = value
        !!content && (el.p_tippy = Tippy(el, {content, ...DEFAULT_OPTION}))
    }
}
