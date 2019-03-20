const renderNormal = function (h, {row, editRow, showRow, rowIndex, col, colIndex, props}) {
    return <span>{showRow[col.field]}</span>
}
export default {
    name: 'column',
    props: {},
    methods: {
        renderNormal,
        renderEdit: renderNormal,
        renderHead: (h, {col}) => <span>{col.title}</span>,
    }
}