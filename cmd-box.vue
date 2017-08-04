<template>
  <transition name="cmdbox-fade">
    <div class="cmdbox__wrapper" tabindex="-1" v-show="visible" @click.self="hide">
      <div class="cmdbox__panel">
        <input class="cmdbox__keyword" type="text" v-model="keyword" ref="keyword">
        <ul class="cmdbox__result">
          <cmd-item v-for="(item, index) in matches" :key="index" :data="item" :render="render"></cmd-item>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
  import CmdItem from './cmd-item.js'

  export default {
    name: 'CmdBox',

    components: {
      CmdItem
    },

    props: {
      data: {
        type: Array,
        default: () => []
      },
      commands: {
        type: Array,
        default: () => []
      },
      render: {
        type: Function,
        default: () => ''
      }
    },

    data () {
      return {
        keyword: '',
        visible: false,
        bodyOverflow: null
      }
    },

    computed: {
      matches () {
        let keyword = this.keyword.trim()
        if (keyword.length === 0) {
          return [...this.data]
        }
        if (keyword[0] === '>') {
          let val = keyword.slice(1).trim()
          return this.data.filter(item => {
            return this.commands.some(cmd => item[cmd] === val)
          })
        }
        return this.data.filter(item => item.text.indexOf(keyword) > -1)
      }
    },

    methods: {
      show () {
        if (this.visible) {
          return
        }

        setTimeout(() => {
          this.bodyOverflow = document.body.style.overflow
          document.body.style.overflow = 'hidden'
          this.$refs.keyword.focus()
        }, 200)

        this.keyword = ''
        this.visible = true
      },

      hide () {
        if (!this.visible) {
          return
        }

        setTimeout(() => {
          if (this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow
          }
          this.bodyOverflow = null
        }, 200)

        this.visible = false
      }
    }
  }
</script>

<style>
  .cmdbox-fade-enter-active,
  .cmdbox-fade-leave-active {
    transition: opacity .3s ease;
  }

  .cmdbox-fade-enter,
  .cmdbox-fade-leave-active {
    opacity: 0;
  }

  .cmdbox__wrapper {
    background-color: rgba(0, 0, 0, .3);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 5000;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
  }

  .cmdbox__wrapper *,
  .cmdbox__wrapper *:before,
  .cmdbox__wrapper *:after {
    box-sizing: border-box;
  }

  .cmdbox__panel {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px 0 #999;
    display: flex;
    font-family: sans-serif;
    flex-direction: column;
    height: 360px;
    width: 500px;
    padding: 20px;
  }

  .cmdbox__keyword {
    background-color: #fff;
    border: 1px solid #a0a0a0;
    border-radius: 3px;
    color: #475669;
    font-family: sans-serif;
    outline: 0;
    font-size: 28px;
    display: block;
    height: 48px;
    width: 460px;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .cmdbox__result {
    list-style: none;
    height: 260px;
    margin: 0;
    padding: 0;
    overflow: auto;
  }

  .cmdbox__result li {
    line-height: 30px;
    height: 30px;
    margin-top: 6px;
  }
</style>
