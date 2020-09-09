```ts
interface Props: {
    draggable: boolean,
    selectable: boolean,
    disabled: boolean,
    filter: function,
    onDrag*: function,
    onSelect: function,
    onCheck: function,
    title: string,
    isLeaf: boolean,
}
```
