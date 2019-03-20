export default {
    name: 'input',
    props: {},
    methods: {
        edit(h, {row, editRow, require, props}) {
            return <link-input value={editRow[field]} required={require} rules={props.rules} validOnInit={props.validOnInit}/>
        },
    }
}