// plugins/i18n.js
export default {
    install: (app, options) => {
        app.config.globalProperties.$translate = key => {
            return key.split('.').reduce((o, i) => {
                if (o) return o[i]
            }, i18n)
        }

        app.provide('i18n', options)

        app.directive('my-directive', {
            mounted(el, binding, vnode, oldVnode) {
                // some logic ...
            }
            // ...
        })

        app.mixin({
            created() {
                // some logic ...
            }
            // ...
        })
    }
}
