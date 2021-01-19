<template>
<div class="qf-good-update">
  <el-row>
    <el-col :span='12' :offset='1'>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input size='small' v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="商品描述" prop="desc">
          <el-input size='small' type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>

        <el-form-item label="商品品类" prop="cate">
          <CateSelect v-model='ruleForm.cate' />
        </el-form-item>

        <el-form-item label="商品价格" prop="price">
          <el-input size='small' v-model.number="ruleForm.price"></el-input>
        </el-form-item>

        <el-form-item label="商品图片" prop="img">
          <el-upload
            :action="$img.imgAction"
            name='file'
            size='small'
            :limit='1'
            :multiple='false'
            list-type="picture-card"
            :file-list='imgList'
            :on-preview="imgPreview"
            :on-success="imgSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="是否热销" prop="hot">
          <el-switch size='small' v-model="ruleForm.hot"></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button
            size='small'
            type="primary"
            v-text='id ? "立即编辑" : "立即新增"'
            @click="submitForm('ruleForm')">
          </el-button>
        </el-form-item>

      </el-form>
    </el-col>
  </el-row>

  <!-- 专门用于预览图片的 -->
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>

</div>
</template>

<script>
import CateSelect from './components/CateSelect.vue'

export default {
  name: 'GoodUpdate',
  components: {
    CateSelect
  },
  computed: {
    id() {
      let id = this.$route.params.id
      return id==0 ? 0 : id
    }
  },
  data: function() {
    var verifyPrice = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error('价格不能小于0'))
      } else {
        callback()
      }
    }
    return {
      timer: null,
      dialogVisible: false,
      dialogImageUrl: '',

      ruleForm: {
        name: '',
        cate: '',
        price: 0,
        img: '',
        hot: false,
        desc: ''
      },
      imgList: [],
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写商品描述', trigger: 'blur' },
          { min: 10, max: 30, message: '长度在 10 到 30 个字符', trigger: 'blur'}
        ],
        cate: [
          { required: true, message: '请填写商品品类', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { validator: verifyPrice, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // 只有在商品编辑时，才获取商品详情
    if(this.id) {
      this.$api.fetchGoodInfo({id: this.id}).then(res=>{
        this.ruleForm = res
        this.imgList = [{url: `${this.$img.imgBase}${res.img}`}]
      })
    }
  },
  methods: {
    imgSuccess(res) {
      console.log('img res----', res)
      this.ruleForm.img = res.data.url
    },
    imgPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 最终提交
    submitForm() {
      console.log('form', this.ruleForm)
      // 提交
      let data = {...this.ruleForm, id: this.id}
      if(!data.id) delete data.id
      this.$api.fetchGoodUpdate(data).then(res=>{
        console.log('res', res)
        // 商品添加成功，弹框提示成功
        this.$message({
          message: this.id ? '修改成功': '添加成功',
          type: 'success',
          duration: 1500
        })
        this.timer = setTimeout(()=>{
          this.$router.back()
        }, 1500)
      })
    }
  },
  beforeDestory() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="css" scoped>
</style>
