export const traverse = (tree/* { node, children } */, handle) => {
    const { node, children = [] } = tree
    handle(node)
    children.forEach(child => traverse(child, handle))
}
/*test:
    const tree = {
        node: 'node_1',
        children: [
            {
                node: 'node_1_1',
                children: [
                    {
                        node: 'node_1_1'
                    }
                ]
            }
        ]
    }

    traverse(tree, console.log)
*/
