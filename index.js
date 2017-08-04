import Vue from 'vue'
import CmdBox from './cmd-box.vue'

var instance = null

function instantiate () {
  var VueCmd = Vue.extend(CmdBox)

  instance = new VueCmd({
    el: document.createElement('div')
  })

  document.body.appendChild(instance.$el)
}

function openCmdBox (options) {
  if (!instance) {
    instantiate()
  }

  Object.keys(options).forEach(function (key) {
    instance[key] = options[key]
  })

  Vue.nextTick(instance.show)
}

function install (Vue) {
  Vue.prototype.$openCmd = function (options) {
    if (!Vue.prototype.$isServer) {
      return new Promise(function (resolve, reject) {
        openCmdBox(options)
      })
    }
  }
}

export default install

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
  if (install.installed) {
    install.installed = false
  }
}
