export default {
    name: 'input',
    props: {},
    methods: {
        edit(h, {row, editRow, col, colIndex, require, props}) {
            return <link-input value={editRow[col.field]} onInput={val => this.$set(editRow, col.field, val)}/>
        },
    }
}