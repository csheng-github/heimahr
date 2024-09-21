<template>
  <div class="container">
    <!-- 编辑/新增 🪟 -->
    <el-dialog :title="`${showText}权限点`" :visible="showDialog" @close="btnCancel">
      <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>

    <div class="app-container">
      <el-button class="btn-add" size="mini" type="primary" @click="addPermission">添加权限</el-button>
      <el-table default-expand-all :data="list" row-key="id">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="标识" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button v-if="row.type === 1" size="mini" type="text" @click="addPermission(row.id, row.type)">添加</el-button>
            <el-button type="text" size="mini" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" size="mini" @click="delPermission(row.id)"> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getPermissionList, updatePermission, addPermission, getPermissionDetail, delPermission } from '@/api/permission'
import { transListToTreeData } from '@/utils'

export default {
  data() {
    return {
      list: [],
      formData: {
        name: '', //        名称
        code: '', //        标识
        description: '', // 描述
        type: '', //        类型
        pid: '', //         父节点id
        enVisible: '0' //   默认关闭
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      showDialog: false
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑' : '新增'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async  getPermissionList() {
      this.list = transListToTreeData(await getPermissionList(), 0)
    },

    // #region 增删改
    addPermission(pid, type) {
      this.formData.pid = pid
      this.formData.type = type
      this.showDialog = true
    },
    async editPermission(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    },
    async delPermission(id) {
      try {
        await this.$confirm('确定要删除该数据吗')
        await delPermission(id)
        this.getPermissionList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion

    btnOK() {
      this.$refs.perForm.validate()
        .then(() => {
          if (this.formData.id) {
            return updatePermission(this.formData)
          }
          return addPermission(this.formData)
        })
        .then(() => {
          this.$message.success('新增成功')
          this.getPermissionList()
          this.showDialog = false
        })
    },
    btnCancel() {
      this.formData = {
        name: '', //        名称
        code: '', //        标识
        description: '', // 描述
        type: '', //        类型
        pid: '', //         父节点id
        enVisible: '0' //   默认关闭
      }
      this.$refs.perForm.resetFields()
      this.showDialog = false
    }
  }
}
</script>

<style>
.btn-add {
  margin: 10px;
}
</style>
