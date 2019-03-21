import {InputMixin} from "../../mixin/component-mixin";

export default {
    name: 'input',
    mixins: [InputMixin],
    computed: {
        prop() {
            return this.inputBinding
        },
    },
    methods: {
        edit(h, {row, editRow, col, colIndex, require, prop}) {
            return <link-input value={editRow[col.field]}
                               onInput={val => this.$set(editRow, col.field, val)}
                               {...{props: this.inputBinding}}
                               color={this.inputBinding.boxColor}
            />
        },
    },
}