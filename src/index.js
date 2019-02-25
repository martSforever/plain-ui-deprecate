import DomPortal from 'vue-dom-portal';

import 'src/styles/index.scss'

import $utils from './utils/utils'
import $dom from './utils/dom'
import $storage from './utils/storage'
import $validate from './utils/validate'
import {$dialog} from './components/dialog/index'
import {$message} from "./components/message";
import {$notice} from "./components/notice";

import ColumnComponents from './components/table-columns'
import icon from './components/icon/pl-icon'
import scroll from './components/scroll/pl-scroll'
import box from './components/box/pl-box'
import button from './components/button/pl-button'
import buttonGroup from './components/button/pl-button-group'
import input from './components/input/pl-input'
import radio from './components/radio/pl-radio'
import radioGroup from './components/radio/pl-radio-group'
import number from './components/number/pl-number'
import toggle from './components/toggle/pl-toggle'
import loading from './components/loading/pl-loading'
import popover from './components/popper/pl-popover'
import dialog from './components/dialog/pl-dialog'
import list from './components/list/pl-list'
import item from './components/list/pl-item'
import select from './components/select/pl-select'
import selectText from './components/select/pl-select-text'
import collapseTransition from './components/collapse/pl-collapse-transition'
import collapse from './components/collapse/pl-collapse'
import collapseGroup from './components/collapse/pl-collapse-group'
import card from './components/card/pl-card'
import cardHeader from './components/card/pl-card-header'
import cardContent from './components/card/pl-card-content'
import tooltip from './directives/tooltip'
import carousel from './components/carousel/pl-carousel'
import badge from './components/badge/pl-badge'
import mavon from './components/mavon/pl-mavon'
import doc from './components/doc/pl-doc'
import baseTable from './components/table/pl-base-table'
import tag from './components/tag/pl-tag'
import step from './components/step/pl-step'
import stepItem from './components/step/pl-step-item'
import slider from './components/slider/pl-slider'
import rate from './components/rate/pl-rate'
import progress from './components/progress/pl-progress'
import pageBar from './components/page-bar/pl-page-bar'
import tree from './components/tree/pl-tree'
import colorPicker from './components/color-picker/pl-color-picker'
import cascade from './components/cascade/pl-cascade'
import tab from './components/tab/pl-tab'
import tabs from './components/tab/pl-tabs'
import tabHeader from './components/tab/pl-tab-header'
import navigatorTab from './components/navigator-tab/pl-navigator-tab'
import navigatorPage from './components/navigator-page/pl-navigator-page'
import page from './components/navigator-page/pl-page'
import content from './components/navigator-page/pl-content'
import header from './components/navigator-page/pl-header'
import backButton from './components/navigator-page/pl-back-button'
import time from './components/time/pl-time'
import scrollOption from './components/scroll-option/pl-scroll-option'

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
    badge,
    mavon,
    doc,
    baseTable,
    tag,
    step,
    stepItem,
    slider,
    rate,
    progress,
    pageBar,
    tree,
    colorPicker,
    cascade,
    tab,
    tabs,
    tabHeader,
    navigatorTab,
    navigatorPage,
    page,
    content,
    header,
    backButton,
    time,
    scrollOption,

    ...ColumnComponents,
}

const TYPE = {
    white: {icon: 'pl-info-circle-fill', color: 'white'},
    black: {icon: 'pl-info-circle-fill', color: 'black'},
    info: {icon: 'pl-info-circle-fill', color: 'primary'},
    warn: {icon: 'pl-alert', color: 'warn'},
    success: {icon: 'pl-checked-circle-fill', color: 'success'},
    error: {icon: 'pl-close-circle-fill', color: 'error'},
    help: {icon: 'pl-help-circle-fill', color: 'info'},
}

const PlainUI = {
    $utils,
    $dom,
    $storage,
    $validate,
    $message,
    TYPE,
    zIndex: null,
    transitionTime: 150,
    _pageRegistry: null,
    async pageRegistry(path) {
        if (!this._pageRegistry) {
            return Promise.reject('plain ui need pageRegistry function when installed.')
        } else {
            return await this._pageRegistry(path)
        }
    },
    install(Vue, {
        prefix = 'lv',
        iconfont,
        zIndex = 2000,
        pageRegistry = null,
    } = {}) {
        this.zIndex = zIndex
        this._pageRegistry = pageRegistry
        Vue.use(DomPortal)
        PlainUI.nextTick = () => new Promise((rs) => Vue.prototype.$nextTick(() => rs()))
        Vue.prototype.$plain = PlainUI
        Vue.prototype.$message = $message
        Vue.prototype.$notice = $notice
        Vue.prototype.$dialog = $dialog
        Object.keys(components).forEach(key => Vue.component(`${prefix}-${$utils.getKebabCase(key)}`, components[key]))
        Vue.directive(`${prefix}-tooltip`, tooltip)
        $utils.addScript('https://at.alicdn.com/t/font_948159_6xq4ra6umej.js')
        !!iconfont && $utils.addScript(iconfont)
    },
}

window.PlainUI = PlainUI;

export default PlainUI

export {
    TYPE,
}