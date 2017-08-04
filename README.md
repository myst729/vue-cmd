# vue-cmd

> A Vue plugin that looks like Spotlight, Alfred, or Slack.

## Installation

```bash
# use yarn
yarn add vue-cmd

# use npm
npm install --save vue-cmd
```

## Usage

```js
/* main.js */
import Vue from 'vue'
import Cmd from 'vue-cmd'     // <== import it
import App from './App.vue'

Vue.use(Cmd)                  // <== and use

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
```

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <!-- Invoke the handler, that’s it! -->
    <button @click="$openCmd(options)">Click to bring it up.</button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        options: {
          data: [
            { text: 'example.com',  status: 'safe',    type: 'html',    link: '#/example'  },
            { text: 'sample.com',   status: 'warning', type: 'html',    link: '#/sample'   },
            { text: 'vuejs.org',    status: 'safe',    type: 'vue',     link: '#/vuejs'    },
            { text: 'facebook.com', status: 'danger',  type: 'react',   link: '#/facebook' },
            { text: 'google.com',   status: 'warning', type: 'angular', link: '#/google'   },
            { text: 'apple.com',    status: 'safe',    type: 'html',    link: '#/apple'    }
          ],
          commands: ['status', 'type'],
          render (h, params) => (
            <a class="item" href={params.link}>
              <span class={`item-status--${params.status}`}></span>
              <span>{params.text}</span>
              <span class="item-type">{params.type}</span>
            </a>
          )
        }
      }
    }
  }
</script>
```
