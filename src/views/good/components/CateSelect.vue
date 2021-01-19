<template>
<div class="qf-cate-select">
  <el-select
    placeholder="请选择品类"
    :value='value'
    @change='cateChange'
    :clearable='clearable'
    size='small'>
    <el-option
      v-for="item in list"
      :key="item._id"
      :label="item.cate_zh"
      :value="item.cate">
    </el-option>
  </el-select>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },
    clearable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function() {
    return {
      list: []
    }
  },
  mounted() {
    this.$api.fetchCates({}).then(res=>{
      console.log('res cate select', res)
      this.list = res.list
      this.updateCates(res.list)
    })
  },
  methods: {
    ...mapMutations('good', ['updateCates']),
    cateChange(val) {
      this.$emit("input", val)
      this.$emit("change")
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
