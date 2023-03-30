<template>
  <div class="bread">
    <el-card shadow="never"
      ><el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(item, index) in $route.matched"
          :key="index"
          >{{ item.name }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </el-card>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.bread {
  .el-card {
    background: #1c1641;
    border: 0px;
    .el-breadcrumb ::v-deep .el-breadcrumb__inner {
      color: #dddddd !important;
      font-weight: 400 !important;
    }
    .el-breadcrumb__item:last-child ::v-deep .el-breadcrumb__inner {
      color: #ffffff !important;
      font-weight: 800 !important;
    }
  }
}
</style>
