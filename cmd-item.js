export default {
  name: 'CmdItem',

  functional: true,

  props: {
    data: {
      type: Object,
      required: true
    },
    render: {
      type: Function,
      required: true
    }
  },

  render: function (h, ctx) {
    return h('li', [ ctx.props.render(h, ctx.props.data) ])
  }
}
