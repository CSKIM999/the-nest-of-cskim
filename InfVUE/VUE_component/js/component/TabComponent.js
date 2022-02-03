export default {
  template : '#tabs',
  props : ['tabs','selected-tab'],
  methods :{
    ClickTab(tab) {
      this.$emit('@change',tab)
    }
  }
}