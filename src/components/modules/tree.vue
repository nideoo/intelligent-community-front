<template>
  <div id="slideTree" class="side-box-1 h_100">
    <div class="tree-search">
      <el-input placeholder="请输入内容" v-model="filterText" suffix-icon="el-icon-search">
      </el-input>
    </div>
    <div class="tree-list">
      <el-tree
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        ref="houseTree" @node-click="handleNodeClick">
      </el-tree>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        filterText: '',
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
      }
    },
    props: {

    },
    watch: {
      filterText(val) {
        this.getTreeData( val);
      }
    },
    computed: {},
    methods: {
      getTreeData(val) {
        let vm = this;
        this.$ajax({
          type: "get",
          url: this.baseUrl().base+'tree-structure',
        }).then(function (res) {
          if(res.data.code==0){
            vm.handleTreeData(res.data.obj);
            vm.treeData=res.data.obj;
            if (res.data.obj && res.data.obj.length !== 0) {
              res.data.obj[0].node='area';
              vm.$emit('handleNode', res.data.obj[0])
            }
            if (val) {
              vm.$refs.houseTree.store.defaultExpandAll = true
            }
          }

        })
      },
      handleNodeClick(data) {
        // console.log(data)
        if(data.type==1){
          data.node='area'
        }
        if(data.type==2){
          data.node='street'
        }
        if(data.type==3){
          data.node='comm'
        }
        if(data.type==4){
          data.node='building'
        }
        this.$emit('handleNode', data)
      },
      handleTreeData(obj) {
        obj.filter((item) => {
          if(!item.detailAddressInfo){
            item.detailAddressInfo=item.name;
          }
          if (item.children && item.children.length !== 0) {
            item.children.filter((v, j) => {
              if (item.detailAddressInfo) {
                v.detailAddressInfo = item.detailAddressInfo + v.name
              } else {
                v.detailAddressInfo = item.name + v.name
              }
            });
            this.handleTreeData(item.children);
          } else {
            delete item.children;
          }
        });
        return obj;
      },
    },
    created() {

    },
    mounted() {
      this.getTreeData()
    }
  }
</script>
<style lang="scss">
  @import "../../assets/sass/tree";
</style>
