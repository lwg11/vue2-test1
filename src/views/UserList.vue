<template>
  <div class="user-list-container">
    <el-card>
      <div slot="header" class="card-header">
        <span>用户管理</span>
      </div>
      
      <!-- 搜索和筛选区域 -->
      <div class="search-filter">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input 
              v-model="searchForm.username" 
              placeholder="请输入用户名"
              prefix-icon="el-icon-search"
              style="width: 100%;"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-select 
              v-model="searchForm.status" 
              placeholder="请选择状态"
              style="width: 100%;"
            >
              <el-option label="全部" value=""></el-option>
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12" style="text-align: right;">
            <el-button type="primary" @click="handleSearch">
              <i class="el-icon-search"></i> 搜索
            </el-button>
            <el-button @click="resetSearch">
              <i class="el-icon-refresh"></i> 重置
            </el-button>
            <el-button type="success" @click="handleAddUser">
              <i class="el-icon-plus"></i> 添加用户
            </el-button>
          </el-col>
        </el-row>
      </div>
      
      <!-- 用户表格 -->
      <el-table 
        v-loading="loading" 
        :data="userList" 
        style="width: 100%"
        border
      >
        <el-table-column prop="id" label="用户ID" width="80" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色" width="100" align="center">
          <template slot-scope="scope">
            <el-tag 
              :type="scope.row.role === 'admin' ? 'primary' : 'success'"
            >
              {{ scope.row.role === 'admin' ? '管理员' : '普通用户' }}
            </el-tag>
          </template>
        </el-table-column>
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
              @click="handleEditUser(scope.row)"
              icon="el-icon-edit"
            >
              编辑
            </el-button>
            <el-button 
              type="danger" 
              size="small" 
              @click="handleDeleteUser(scope.row.id)"
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
    
    <!-- 添加/编辑用户弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <el-form 
        :model="userForm" 
        ref="userForm"
        :rules="formRules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="普通用户" value="user"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch 
            v-model="userForm.status" 
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
  name: 'UserList',
  data() {
    return {
      loading: false,
      userList: [],
      searchForm: {
        username: '',
        status: ''
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      dialogVisible: false,
      dialogTitle: '添加用户',
      userForm: {
        id: '',
        username: '',
        email: '',
        role: 'user',
        status: 1
      },
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadUserList()
  },
  methods: {
    // 加载用户列表
    async loadUserList() {
      this.loading = true
      try {
        // 模拟API调用
        // 在实际项目中，这里会是真实的API调用
        // const res = await this.$api.user.getUserList({
        //   page: this.pagination.currentPage,
        //   pageSize: this.pagination.pageSize,
        //   ...this.searchForm
        // })
        
        // 模拟请求延迟
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 模拟数据
        this.userList = [
          { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', status: 1, createdAt: '2023-01-01 10:00:00' },
          { id: 2, username: 'user1', email: 'user1@example.com', role: 'user', status: 1, createdAt: '2023-01-02 11:00:00' },
          { id: 3, username: 'user2', email: 'user2@example.com', role: 'user', status: 0, createdAt: '2023-01-03 12:00:00' },
          { id: 4, username: 'user3', email: 'user3@example.com', role: 'user', status: 1, createdAt: '2023-01-04 13:00:00' },
          { id: 5, username: 'user4', email: 'user4@example.com', role: 'user', status: 1, createdAt: '2023-01-05 14:00:00' }
        ]
        
        this.pagination.total = 28
      } catch (error) {
        this.$message.error('获取用户列表失败')
        console.error('获取用户列表失败:', error)
      } finally {
        this.loading = false
      }
    },
    
    // 搜索用户
    handleSearch() {
      this.pagination.currentPage = 1
      this.loadUserList()
    },
    
    // 重置搜索条件
    resetSearch() {
      this.searchForm = {
        username: '',
        status: ''
      }
      this.pagination.currentPage = 1
      this.loadUserList()
    },
    
    // 处理分页大小变化
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.loadUserList()
    },
    
    // 处理当前页码变化
    handleCurrentChange(current) {
      this.pagination.currentPage = current
      this.loadUserList()
    },
    
    // 添加用户
    handleAddUser() {
      this.dialogTitle = '添加用户'
      this.userForm = {
        id: '',
        username: '',
        email: '',
        role: 'user',
        status: 1
      }
      this.dialogVisible = true
      // 重置表单验证
      if (this.$refs.userForm) {
        this.$refs.userForm.resetFields()
      }
    },
    
    // 编辑用户
    handleEditUser(row) {
      this.dialogTitle = '编辑用户'
      // 深拷贝，避免直接修改表格数据
      this.userForm = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    },
    
    // 提交表单
    handleSubmitForm() {
      this.$refs.userForm.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true
            
            // 模拟API调用
            // 在实际项目中，这里会是真实的API调用
            // if (this.userForm.id) {
            //   // 编辑用户
            //   await this.$api.user.updateUser(this.userForm.id, this.userForm)
            // } else {
            //   // 添加用户
            //   await this.$api.user.createUser(this.userForm)
            // }
            
            // 模拟请求延迟
            await new Promise(resolve => setTimeout(resolve, 500))
            
            this.dialogVisible = false
            this.$message.success(this.userForm.id ? '编辑用户成功' : '添加用户成功')
            this.loadUserList()
          } catch (error) {
            this.$message.error(this.userForm.id ? '编辑用户失败' : '添加用户失败')
          } finally {
            this.loading = false
          }
        }
      })
    },
    
    // 修改用户状态
    handleStatusChange(row) {
      this.$confirm(`确定要${row.status === 1 ? '启用' : '禁用'}该用户吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          this.loading = true
          
          // 模拟API调用
          // await this.$api.user.updateUser(row.id, { status: row.status })
          
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
    
    // 删除用户
    handleDeleteUser(id) {
      this.$confirm('确定要删除该用户吗？此操作不可撤销！', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async () => {
        try {
          this.loading = true
          
          // 模拟API调用
          // await this.$api.user.deleteUser(id)
          
          // 模拟请求延迟
          await new Promise(resolve => setTimeout(resolve, 300))
          
          // 从列表中移除
          this.userList = this.userList.filter(user => user.id !== id)
          this.pagination.total--
          this.$message.success('删除用户成功')
        } catch (error) {
          this.$message.error('删除用户失败')
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
.user-list-container {
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