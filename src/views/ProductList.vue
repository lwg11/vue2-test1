<template>
  <div class="product-list-container">
    <el-card>
      <div slot="header" class="card-header">
        <span>产品管理</span>
      </div>
      
      <!-- 搜索和筛选区域 -->
      <div class="search-filter">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input 
              v-model="searchForm.name" 
              placeholder="请输入产品名称"
              prefix-icon="el-icon-search"
              style="width: 100%;"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-select 
              v-model="searchForm.category" 
              placeholder="请选择分类"
              style="width: 100%;"
            >
              <el-option label="全部" value=""></el-option>
              <el-option label="电子产品" value="electronics"></el-option>
              <el-option label="家居用品" value="home"></el-option>
              <el-option label="服装鞋帽" value="clothing"></el-option>
              <el-option label="食品饮料" value="food"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12" style="text-align: right;">
            <el-button type="primary" @click="handleSearch">
              <i class="el-icon-search"></i> 搜索
            </el-button>
            <el-button @click="resetSearch">
              <i class="el-icon-refresh"></i> 重置
            </el-button>
            <el-button type="success" @click="handleAddProduct">
              <i class="el-icon-plus"></i> 添加产品
            </el-button>
          </el-col>
        </el-row>
      </div>
      
      <!-- 产品表格 -->
      <el-table 
        v-loading="loading" 
        :data="productList" 
        style="width: 100%"
        border
      >
        <el-table-column prop="id" label="产品ID" width="80" align="center"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="category" label="分类" width="120" align="center">
          <template slot-scope="scope">
            <el-tag>{{ this.getCategoryText(scope.row.category) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" width="100" align="center">
          <template slot-scope="scope">
            ¥{{ scope.row.price.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="80" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-switch 
              v-model="scope.row.status" 
              :active-value="1" 
              :inactive-value="0"
              @change="handleStatusChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button 
              type="primary" 
              size="small" 
              @click="handleEditProduct(scope.row)"
              icon="el-icon-edit"
            >
              编辑
            </el-button>
            <el-button 
              type="danger" 
              size="small" 
              @click="handleDeleteProduct(scope.row.id)"
              icon="el-icon-delete"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-card>
    
    <!-- 添加/编辑产品弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <el-form 
        :model="productForm" 
        ref="productForm"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="productForm.name" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="产品分类" prop="category">
          <el-select v-model="productForm.category" placeholder="请选择产品分类">
            <el-option label="电子产品" value="electronics"></el-option>
            <el-option label="家居用品" value="home"></el-option>
            <el-option label="服装鞋帽" value="clothing"></el-option>
            <el-option label="食品饮料" value="food"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品价格" prop="price">
          <el-input 
            v-model.number="productForm.price" 
            placeholder="请输入产品价格"
            type="number"
            :min="0"
            :step="0.01"
          ></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="stock">
          <el-input 
            v-model.number="productForm.stock" 
            placeholder="请输入库存数量"
            type="number"
            :min="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品描述" prop="description">
          <el-input 
            v-model="productForm.description" 
            placeholder="请输入产品描述"
            type="textarea"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品状态" prop="status">
          <el-switch 
            v-model="productForm.status" 
            :active-value="1" 
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmitForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      loading: false,
      productList: [],
      searchForm: {
        name: '',
        category: ''
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      dialogVisible: false,
      dialogTitle: '添加产品',
      productForm: {
        id: '',
        name: '',
        category: '',
        price: 0,
        stock: 0,
        description: '',
        status: 1
      },
      formRules: {
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { min: 2, max: 50, message: '产品名称长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择产品分类', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入产品价格', trigger: 'blur' },
          { type: 'number', min: 0, message: '产品价格不能小于0', trigger: 'blur' }
        ],
        stock: [
          { required: true, message: '请输入库存数量', trigger: 'blur' },
          { type: 'number', min: 0, message: '库存数量不能小于0', trigger: 'blur' }
        ]
      },
      categoryMap: {
        electronics: '电子产品',
        home: '家居用品',
        clothing: '服装鞋帽',
        food: '食品饮料'
      }
    }
  },
  created() {
    this.loadProductList()
  },
  methods: {
    // 获取分类文本
    getCategoryText(category) {
      return this.categoryMap[category] || category
    },
    
    // 加载产品列表
    async loadProductList() {
      this.loading = true
      try {
        // 模拟API调用
        // 在实际项目中，这里会是真实的API调用
        // const res = await this.$api.product.getProductList({
        //   page: this.pagination.currentPage,
        //   pageSize: this.pagination.pageSize,
        //   ...this.searchForm
        // })
        
        // 模拟请求延迟
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 模拟数据
        this.productList = [
          {
            id: 1,
            name: '智能手机A1',
            category: 'electronics',
            price: 3999,
            stock: 150,
            description: '高性能智能手机，6.5英寸全面屏，8GB+256GB存储',
            status: 1,
            createdAt: '2023-01-10 09:00:00'
          },
          {
            id: 2,
            name: '无线蓝牙耳机',
            category: 'electronics',
            price: 899,
            stock: 300,
            description: '主动降噪，40小时续航，IPX4防水',
            status: 1,
            createdAt: '2023-01-11 10:00:00'
          },
          {
            id: 3,
            name: '智能手表Pro',
            category: 'electronics',
            price: 1999,
            stock: 80,
            description: '全功能健康监测，7天续航，防水50米',
            status: 1,
            createdAt: '2023-01-12 11:00:00'
          },
          {
            id: 4,
            name: '纯棉T恤',
            category: 'clothing',
            price: 129,
            stock: 500,
            description: '100%纯棉面料，舒适透气，多种颜色可选',
            status: 1,
            createdAt: '2023-01-13 14:00:00'
          },
          {
            id: 5,
            name: '不锈钢保温杯',
            category: 'home',
            price: 89,
            stock: 200,
            description: '304不锈钢内胆，保温24小时，保冷12小时',
            status: 0,
            createdAt: '2023-01-14 15:00:00'
          }
        ]
        
        this.pagination.total = 126
      } catch (error) {
        this.$message.error('获取产品列表失败')
        console.error('获取产品列表失败:', error)
      } finally {
        this.loading = false
      }
    },
    
    // 搜索产品
    handleSearch() {
      this.pagination.currentPage = 1
      this.loadProductList()
    },
    
    // 重置搜索条件
    resetSearch() {
      this.searchForm = {
        name: '',
        category: ''
      }
      this.pagination.currentPage = 1
      this.loadProductList()
    },
    
    // 处理分页大小变化
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.loadProductList()
    },
    
    // 处理当前页码变化
    handleCurrentChange(current) {
      this.pagination.currentPage = current
      this.loadProductList()
    },
    
    // 添加产品
    handleAddProduct() {
      this.dialogTitle = '添加产品'
      this.productForm = {
        id: '',
        name: '',
        category: '',
        price: 0,
        stock: 0,
        description: '',
        status: 1
      }
      this.dialogVisible = true
      // 重置表单验证
      if (this.$refs.productForm) {
        this.$refs.productForm.resetFields()
      }
    },
    
    // 编辑产品
    handleEditProduct(row) {
      this.dialogTitle = '编辑产品'
      // 深拷贝，避免直接修改表格数据
      this.productForm = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    },
    
    // 提交表单
    handleSubmitForm() {
      this.$refs.productForm.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true
            
            // 模拟API调用
            // 在实际项目中，这里会是真实的API调用
            // if (this.productForm.id) {
            //   // 编辑产品
            //   await this.$api.product.updateProduct(this.productForm.id, this.productForm)
            // } else {
            //   // 添加产品
            //   await this.$api.product.createProduct(this.productForm)
            // }
            
            // 模拟请求延迟
            await new Promise(resolve => setTimeout(resolve, 500))
            
            this.dialogVisible = false
            this.$message.success(this.productForm.id ? '编辑产品成功' : '添加产品成功')
            this.loadProductList()
          } catch (error) {
            this.$message.error(this.productForm.id ? '编辑产品失败' : '添加产品失败')
          } finally {
            this.loading = false
          }
        }
      })
    },
    
    // 修改产品状态
    handleStatusChange(row) {
      this.$confirm(`确定要${row.status === 1 ? '启用' : '禁用'}该产品吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          this.loading = true
          
          // 模拟API调用
          // await this.$api.product.updateProduct(row.id, { status: row.status })
          
          // 模拟请求延迟
          await new Promise(resolve => setTimeout(resolve, 300))
          
          this.$message.success('操作成功')
        } catch (error) {
          // 恢复状态
          row.status = row.status === 1 ? 0 : 1
          this.$message.error('操作失败')
        } finally {
          this.loading = false
        }
      }).catch(() => {
        // 取消操作，恢复状态
        row.status = row.status === 1 ? 0 : 1
      })
    },
    
    // 删除产品
    handleDeleteProduct(id) {
      this.$confirm('确定要删除该产品吗？此操作不可撤销！', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async () => {
        try {
          this.loading = true
          
          // 模拟API调用
          // await this.$api.product.deleteProduct(id)
          
          // 模拟请求延迟
          await new Promise(resolve => setTimeout(resolve, 300))
          
          // 从列表中移除
          this.productList = this.productList.filter(product => product.id !== id)
          this.pagination.total--
          this.$message.success('删除产品成功')
        } catch (error) {
          this.$message.error('删除产品失败')
        } finally {
          this.loading = false
        }
      }).catch(() => {
        // 取消删除
      })
    }
  }
}
</script>

<style scoped>
.product-list-container {
  width: 100%;
  height: 100%;
}

.search-filter {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.pagination {
  margin-top: 20px;
  text-align: right;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>