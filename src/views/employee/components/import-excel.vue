<template>
  <el-dialog
    width="500px"
    title="员工导入"
    :visible="showExcelDialog"
    @close="$emit('update:showExcelDialog', false)"
  >
    <el-row type="flex" justify="center">
      <div class="upload-excel">
        <input
          ref="excel-upload-input"
          class="excel-upload-input"
          type="file"
          accept=".xlsx, .xls"
          @change="uploadChange"
        >
        <div class="drop">
          <i class="el-icon-upload" />
          <el-button type="text" @click="getTemplate">下载导入模板</el-button>
          <span>将文件拖到此处或
            <el-button type="text" @click="handleUpload">点击上传</el-button>
          </span>
        </div>
      </div>
    </el-row>
    <el-row type="flex" justify="end">
      <el-button size="mini" type="primary" @click="$emit('update:showExcelDialog', false)">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getExportTemplate, uploadExcel } from '@/api/employee'
import FileSaver from 'file-saver'

export default {
  props: {
    showExcelDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /** 下载模板 */
    async getTemplate() {
      const data = await getExportTemplate()
      FileSaver.saveAs(data, '员工导入模版.xlsx')
    },

    /** 点击上传 */
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },

    /** 选中上传 */
    async uploadChange(event) {
      console.log(event.target.files)
      const files = event.target.files
      if (files.length > 0) {
        const data = new FormData()
        data.append('file', files[0])
        try {
          await uploadExcel(data)
          this.$emit('uploadSuccess')
          this.$emit('update:showExcelDialog', false)
        } catch (error) {
          console.error(error)
        } finally {
          this.$refs['excel-upload-input'].value = ''
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.upload-excel {
  display: flex;
  justify-content: center;
  margin: 20px;
  width: 360px;
  height: 180px;
  align-items: center;
  color: #697086;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #dcdfe6;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 160px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .drop {
    line-height: 40px;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
      color: #c0c4cc;
    }
  }
}
</style>
