<template>
    <ul class="columns" :style="{ backgroundColor: bgColor }">
        <li 
            class="column" 
            v-for="item in list" :key="item.id" 
            @click="$emit('select', item.id)"
            :class="select === item.id ? 'active' : ''"
            :style="{width: `${100 / list.length}%`}"
        >
        <slot :data="item">
            <component 
                :is="theme.replace(/^[a-z]/, c => c.toUpperCase())" 
                :title="item.title" 
                :href="item.href" 
                :color="color"
                :bgColor="bgColor"
                :separator="separator" 
            />
        </slot>
        </li>
    </ul>
</template>


<script>
import mock from './mock'

export default {
    components: {
        Link: () => import('@/components/Link')
    },

    props: {
        list: {
            type: Array,
            default: () => mock//[]
        },
        select: {
            type: String,
            default: ''
        },
        theme: {
            type: String,
            default: 'link'
        },
        color: {
            type: String,
            default: 'inherit'
        },
        bgColor: {
            type: String,
            default: 'transparent'
        },
        separator: {
            type: Boolean,
            default: false
        }
    },
};
</script>


<style lang="less" scoped>
.columns {
    width: 100%;
    background-color: pink;
    
    .column {
        display: inline-block;
    }

    .active > :last-child::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
        width: 100px;
        height: 2px;
        background-color: currentColor;
    }
}
</style>