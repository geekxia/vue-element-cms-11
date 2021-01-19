<template>
<div class="qf-good-list">
  <!-- 搜索与查询 -->
  <div class="qf-gl-filter">
    <!-- 一行 -->
    <el-row type='flex' align='middle'>
      <el-col :span="2">
        <span>名称:</span>
      </el-col>
      <el-col :span='6'>
        <el-input
          v-model='filter.name'
          size='small'
          clearable
          @change='nameChange'
          placeholder="请输入商品名称" />
      </el-col>

      <el-col :span="2">
        <span>品类:</span>
      </el-col>
      <el-col :span='6'>
        <CateSelect
          v-model='filter.cate'
          :clearable='true'
          @change='cateChange' />
      </el-col>

      <el-col :span="2">
        <span>价格:</span>
      </el-col>
      <el-col :span='2'>
        <el-input size='small' />
      </el-col>
      <el-col :span='1'>
        <span class='line'>-</span>
      </el-col>
      <el-col :span='2'>
        <el-input size='small' />
      </el-col>
    </el-row>

    <!-- 第二行 -->
    <el-row type='flex' align='middle'>
      <el-col :span='2'>
        <span>时间:</span>
      </el-col>
      <el-col :span='8'>
        <el-date-picker
          size='small'
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-col>
    </el-row>

    <!-- 第三行 -->
    <el-row type='flex' align='middle'>
      <el-col :span='2' :offset='2'>
        <el-button size="small" @click='skipToUpdate'>新增</el-button>
      </el-col>
    </el-row>
  </div>

  <!-- 表格 -->
  <div class="qf-table">
    <el-table
      :data="list"
      border
      style="width: 100%">

      <el-table-column
        fixed
        label="商品"
        align='center'>
        <template slot-scope="scope">
          <div class="good-img">
            <img :src="'http://localhost:8888'+scope.row.img" alt="">
            <div v-text='scope.row.name'></div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="desc"
        label="商品描述"
        align='center'>
      </el-table-column>

      <el-table-column
        prop="price"
        label="价格"
        align='center'>
        <template slot-scope='scope'>
          <div v-text='"￥"+scope.row.price'></div>
        </template>
      </el-table-column>

      <el-table-column
        prop="cate"
        label="品类"
        align='center'>
        <template slot-scope='scope'>
          <div v-text='getCateZh(cates, scope.row.cate)'></div>
        </template>
      </el-table-column>

      <el-table-column
        prop="hot"
        label="是否热销"
        align='center'>
        <template slot-scope='scope'>
          <div v-text='scope.row.hot?"是":"否"'></div>
        </template>
      </el-table-column>

      <el-table-column
        prop="create_time"
        label="时间"
        align='center'>
        <template slot-scope='scope'>
          <div v-text='getDate(scope.row.create_time)'></div>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width='150'
        align='center'>
        <template slot-scope="scope">
          <el-button
            @click="rowClick(scope.row, 'edit')"
            type="primary"
            size="mini">编辑</el-button>
          <el-button
            type="danger"
            @click="rowClick(scope.row, 'del')"
            size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 分页 -->
  <div class="qf-page">
    <el-pagination
      @size-change="sizeChange"
      @current-change="pageChange"
      :current-page="page"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  components: {
    CateSelect: ()=>import('./components/CateSelect.vue')
  },
  data: function() {
    return {
      filter: {
        cate: '',
        page: 1,
        size: 2,
        name: ''
      },
      date: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      list: [],
      total: 0,
      page: 1
    }
  },
  computed: {
    ...mapState('good', ['cates'])
  },
  mounted() {
    // 初始化调接口
    this.init()
  },
  methods: {
    init() {
      this.$api.fetchGoodList(this.filter).then(res=>{
        this.list = res.list
        this.total = res.total
      })
    },
    // 如何把英文或数据，转化成中文
    getCateZh(cates, cate) {
      var t = cates.find(ele=>ele.cate==cate)
      return t ? t.cate_zh : ''
    },
    getDate(t) {
      return moment(t).format("MM月DD日 HH时mm分")
    },
    // 跳转到新增页面
    skipToUpdate() {
      this.$router.push('/good/update/0')
    },
    // 点击表格中“操作”按钮
    rowClick(item, type) {
      switch (type) {
        case 'edit':
          this.$router.push('/good/update/'+item._id)
          break
        case 'del':
          this.$confirm(`你确定要删除 ${item.name} 该商品吗？`, '警告', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 调接口删除
            console.log('确认删除')
            this.$api.fetchGoodDel({id: item._id}).then(()=>{
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.init()
            })
          }).catch(() => {
            console.log('取消了删除操作')
          })
          break
        default:

      }
      console.log('row')
    },
    // size变化时
    sizeChange(e) {
      console.log('size change', e)
      this.filter.size = e
      this.init()
    },
    // page页码变化时
    pageChange(e) {
      console.log('page change', e)
      this.filter.page = e
      this.init()
    },
    // 搜索
    nameChange() {
      this.filter.page = 1
      this.init()
    },
    // 品类筛选
    cateChange() {
      this.filter.page = 1
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.qf-good-list {
  padding-bottom: 50px;
}
.qf-gl-filter {
  background: #eee;
  padding: 15px;
  .el-col {
    span {
      display: block;
      text-align: right;
      padding-right: 8px;
    }
    span.line {
      display: block;
      text-align: center;
      padding: 0;
    }
  }
}
.qf-table {
  margin: 20px 0;
}
.qf-page {
  text-align: right;
}
.good-img {
  text-align: center;
  &>img {
    display: inline-block;
    width: 50px;
    height: 50px;
  }
}
</style>
