<template>
  <div class="about-container">
    <el-card>
      <div slot="header" class="card-header">
        <span>关于我们</span>
      </div>
      
      <div class="about-content">
        <!-- 公司介绍 -->
        <div class="section">
          <h2>公司简介</h2>
          <p>我们是一家专注于提供高质量企业管理系统的技术公司，致力于为各类企业提供高效、稳定、安全的信息化解决方案。</p>
          <p>自成立以来，我们始终坚持以客户为中心，以技术创新为驱动，不断提升产品质量和服务水平，赢得了广大客户的信任和好评。</p>
        </div>
        
        <!-- 核心价值观 -->
        <div class="section">
          <h2>核心价值观</h2>
          <div class="values-grid">
            <div class="value-item">
              <div class="value-icon">
                <i class="el-icon-star-on"></i>
              </div>
              <h3>创新</h3>
              <p>不断探索新技术、新方法，为客户创造更大价值</p>
            </div>
            <div class="value-item">
              <div class="value-icon">
                <i class="el-icon-check"></i>
              </div>
              <h3>诚信</h3>
              <p>秉持诚实信用的原则，与客户建立长期合作关系</p>
            </div>
            <div class="value-item">
              <div class="value-icon">
                <i class="el-icon-service"></i>
              </div>
              <h3>服务</h3>
              <p>以客户为中心，提供专业、高效、贴心的服务</p>
            </div>
            <div class="value-item">
              <div class="value-icon">
                <i class="el-icon-bullseye"></i>
              </div>
              <h3>卓越</h3>
              <p>追求卓越品质，不断提升产品和服务质量</p>
            </div>
          </div>
        </div>
        
        <!-- 联系我们 -->
        <div class="section">
          <h2>联系我们</h2>
          <div class="contact-info">
            <div class="contact-item">
              <i class="el-icon-map-location"></i>
              <span>公司地址：北京市海淀区科技园区88号创新大厦15层</span>
            </div>
            <div class="contact-item">
              <i class="el-icon-phone"></i>
              <span>联系电话：400-888-8888</span>
            </div>
            <div class="contact-item">
              <i class="el-icon-message"></i>
              <span>电子邮箱：contact@example.com</span>
            </div>
          </div>
          
          <!-- 留言板 -->
          <div class="message-board">
            <h3>给我们留言</h3>
            <el-form 
              :model="messageForm" 
              ref="messageForm"
              :rules="formRules"
              label-width="100px"
            >
              <el-form-item label="您的姓名" prop="name">
                <el-input v-model="messageForm.name" placeholder="请输入您的姓名"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="messageForm.phone" placeholder="请输入您的联系电话"></el-input>
              </el-form-item>
              <el-form-item label="留言内容" prop="content">
                <el-input 
                  v-model="messageForm.content" 
                  placeholder="请输入您的留言内容"
                  type="textarea"
                  :rows="4"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitMessage">提交留言</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        
        <!-- 团队介绍 -->
        <div class="section">
          <h2>我们的团队</h2>
          <div class="team-grid">
            <div class="team-member">
              <div class="member-avatar">
                <img src="@/assets/logo.png" alt="团队成员" />
              </div>
              <h3>张小明</h3>
              <p>首席执行官</p>
            </div>
            <div class="team-member">
              <div class="member-avatar">
                <img src="@/assets/logo.png" alt="团队成员" />
              </div>
              <h3>李小红</h3>
              <p>技术总监</p>
            </div>
            <div class="team-member">
              <div class="member-avatar">
                <img src="@/assets/logo.png" alt="团队成员" />
              </div>
              <h3>王大力</h3>
              <p>产品经理</p>
            </div>
            <div class="team-member">
              <div class="member-avatar">
                <img src="@/assets/logo.png" alt="团队成员" />
              </div>
              <h3>赵小华</h3>
              <p>设计总监</p>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      messageForm: {
        name: '',
        phone: '',
        content: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入您的姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入您的联系电话', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入留言内容', trigger: 'blur' },
          { min: 10, max: 500, message: '留言内容长度在 10 到 500 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交留言
    submitMessage() {
      this.$refs.messageForm.validate(async (valid) => {
        if (valid) {
          try {
            // 模拟API调用
            // 在实际项目中，这里会是真实的API调用
            // await this.$api.contact.submitMessage(this.messageForm)
            
            // 模拟请求延迟
            await new Promise(resolve => setTimeout(resolve, 500))
            
            this.$message.success('留言提交成功，我们会尽快与您联系！')
            this.messageForm = {
              name: '',
              phone: '',
              content: ''
            }
            this.$refs.messageForm.resetFields()
          } catch (error) {
            this.$message.error('留言提交失败，请稍后再试')
            console.error('留言提交失败:', error)
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.about-container {
  width: 100%;
  height: 100%;
}

.about-content {
  padding: 20px 0;
}

.section {
  margin-bottom: 40px;
}

.section h2 {
  font-size: 20px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #409EFF;
}

.section p {
  line-height: 1.8;
  color: #606266;
  margin-bottom: 10px;
}

/* 核心价值观样式 */
.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.value-item {
  text-align: center;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.value-item:hover {
  background-color: #ecf5ff;
  transform: translateY(-5px);
}

.value-icon {
  font-size: 36px;
  color: #409EFF;
  margin-bottom: 15px;
}

.value-item h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #303133;
}

.value-item p {
  font-size: 14px;
  color: #606266;
}

/* 联系我们样式 */
.contact-info {
  margin-bottom: 30px;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 15px;
  color: #606266;
}

.contact-item i {
  font-size: 18px;
  color: #409EFF;
  margin-right: 10px;
  width: 24px;
  text-align: center;
}

.message-board {
  margin-top: 30px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.message-board h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #303133;
}

/* 团队介绍样式 */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 30px;
  margin-top: 20px;
}

.team-member {
  text-align: center;
}

.member-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 15px;
  border: 4px solid #e4e7ed;
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-member h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #303133;
}

.team-member p {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .values-grid,
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .values-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>