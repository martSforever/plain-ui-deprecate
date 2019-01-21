import DomPortal from 'vue-dom-portal';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import 'src/styles/index.scss'

import $utils from './utils/utils'
import $dom from './utils/dom'
import $storage from './utils/storage'
import $validate from './utils/validate'
import {$dialog} from './components/dialog/index'
import {$message} from "./components/message";
import {$notice} from "./components/notice";

import ColumnComponents from './components/table-columns'
import icon from './components/icon/lv-icon'
import scroll from './components/scroll/lv-scroll'
import box from './components/box/lv-box'
import button from './components/button/lv-button'
import buttonGroup from './components/button/lv-button-group'
import input from './components/input/lv-input'
import radio from './components/radio/lv-radio'
import radioGroup from './components/radio/lv-radio-group'
import number from './components/number/lv-number'
import toggle from './components/toggle/lv-toggle'
import loading from './components/loading/lv-loading'
import popover from './components/popper/lv-popover'
import dialog from './components/dialog/lv-dialog'
import list from './components/list/lv-list'
import item from './components/list/lv-item'
import select from './components/select/lv-select'
import selectText from './components/select/lv-select-text'
import collapseTransition from './components/collapse/lv-collapse-transition'
import collapse from './components/collapse/lv-collapse'
import collapseGroup from './components/collapse/lv-collapse-group'
import card from './components/card/lv-card'
import cardHeader from './components/card/lv-card-header'
import cardContent from './components/card/lv-card-content'
import tooltip from './directives/tooltip'
import carousel from './components/carousel/lv-carousel'
import navigator from './components/navigator/lv-navigator'
import badge from './components/badge/lv-badge'
import mavon from './components/mavon/lv-mavon'
import doc from './components/lv-doc/lv-doc'
import baseTable from './components/table/lv-base-table'
import tag from './components/tag/lv-tag'
import step from './components/step/lv-step'
import stepItem from './components/step/lv-step-item'
import slider from './components/slider/lv-slider'

const components = {
    icon,
    scroll,
    box,
    button,
    buttonGroup,
    input,
    radio,
    radioGroup,
    number,
    toggle,
    loading,
    popover,
    dialog,
    list,
    item,
    select,
    selectText,
    collapseTransition,
    collapse,
    collapseGroup,
    card,
    cardHeader,
    cardContent,
    carousel,
    navigator,
    badge,
    mavon,
    doc,
    baseTable,
    tag,
    step,
    stepItem,
    slider,

    ...ColumnComponents,
}

const TYPE = {
    info: {icon: 'lv-info-circle-fill', color: 'primary'},
    warn: {icon: 'lv-alert', color: 'warn'},
    success: {icon: 'lv-checked-circle-fill', color: 'success'},
    error: {icon: 'lv-close-circle-fill', color: 'error'},
    help: {icon: 'lv-help-circle-fill', color: 'info'},
}

const PlainUI = {
    $utils,
    $dom,
    $storage,
    $validate,
    $message,
    TYPE,
    install(Vue, {prefix = 'lv', iconfont} = {}) {
        Vue.use(DomPortal)
        Vue.use(mavonEditor)
        Vue.prototype.$plain = PlainUI
        Vue.prototype.$message = $message
        Vue.prototype.$notice = $notice
        Vue.prototype.$dialog = $dialog
        Object.keys(components).forEach(key => Vue.component(`${prefix}-${$utils.getKebabCase(key)}`, components[key]))
        Vue.directive(`${prefix}-tooltip`, tooltip)
        $utils.addScript('https://at.alicdn.com/t/font_948159_o5ksim3qo1m.js')
        !!iconfont && $utils.addScript(iconfont)
    },
}

window.PlainUI = PlainUI;

export default PlainUI

export {
    TYPE,
}