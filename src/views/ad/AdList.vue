<template>
<div>
  <h1>广告中心</h1>
  <el-button @click='addHandle'>添加广告</el-button>

  <el-table
    :data="list"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="广告名称">
    </el-table-column>
    <el-table-column
      label="图片">
      <template slot-scope='scope'>
        <div class="ad-img">
          <img :src="$img.imgBase+scope.row.img" alt="">
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="时间">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width='150'
      align='center'>
      <template slot-scope='scope'>
        <el-button
          type="primary"
          size="mini">编辑</el-button>
        <el-button
          type="danger"
          @click='rowClick(scope.row)'
          size="mini">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 弹框 -->
  <el-dialog title="广告管理" :visible.sync="show">
    <el-form :model="form">
      <el-form-item label="广告名称" label-width="100">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="img">
        <el-upload
          :action="$img.imgAction"
          name='file'
          size='small'
          :limit='1'
          :multiple='false'
          :file-list='imgList'
          :on-success="imgSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  data: function() {
    return {
      list: [{},{},{}],
      show: false,
      form: {
        name: '',
        img: ''
      },
      imgList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$api.fetchAdList({}).then(res=>{
        this.list = res.list
      })
    },
    // 点击“新增”按钮，弹个框
    addHandle() {
      this.show = true
    },
    // 图片上传成功时的回调
    imgSuccess(res) {
      this.form.img = res.data.url
    },
    rowClick(item) {
      this.$api.fetchAdDel({id: item._id}).then(()=>{
        this.init()
      })
    },
    // 最终的广告提交
    submit() {
      this.show = false
      // 调接口
      this.$api.fetchAdUpdate(this.form).then(()=>{
        this.init()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ad-img {
  &>img {
    display: block;
    height: 60px;
  }
}
</style>
