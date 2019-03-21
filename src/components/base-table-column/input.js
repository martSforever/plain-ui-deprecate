import {InputMixin} from "../../mixin/component-mixin";

export default {
    name: 'input',
    mixins: [InputMixin],
    props: {},
    methods: {
        edit(h, {row, editRow, col, colIndex, require, props}) {
            return <link-input value={editRow[col.field]}
                               onInput={val => this.$set(editRow, col.field, val)}
                               {...{props: this.inputBinding}}
                               color={this.inputBinding.boxColor}
            />
        },
    },
    mounted() {
        console.log(this.inputBinding)
    },
}