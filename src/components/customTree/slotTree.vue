<!-- 
 @component elementUI@2.7.2 Tree 组件二次开发
 -->
<template>
	<div v-loading="isLoading" class="custom-tree">
		<el-button class="comp-tr-top"
			size="small" 
			@click="handleAddTop">添加顶级节点</el-button>
		<!-- tree -->
		<el-tree ref="SlotTree"
			:data="treeList"
			:props="defaultProps"
			:expand-on-click-node="false"
			:node-key="NODE_KEY"
      @node-click="onClickNode">
				<div class="comp-tr-node" slot-scope="{ node, data }">
					<!-- 编辑状态 -->
					<template v-if="node.isEdit">
						<el-input v-model="data.name" 
							autofocus
							size="mini"
							:ref="'slotTreeInput'+data[NODE_KEY]"
							@blur.stop="handleInput(node, data)"
							@keyup.enter.native="handleInput(node, data)"></el-input>
					</template>

					<!-- 非编辑状态 -->
					<template v-else>
						<!-- 名称： 新增节点增加class（is-new） -->
						<span :class="[data[NODE_KEY] < NODE_ID_START ? 'is-new' : '', 'comp-tr-node--name']">
							{{ node.label }}
						</span>
						
						<!-- 按钮 -->
						<span class="comp-tr-node--btns">
							<!-- 新增 -->
							<el-button icon="el-icon-plus" 
								size="mini"


								@click="handleAdd(node, data)"></el-button>

							<!-- 编辑 -->
							<el-button icon="el-icon-edit" 
								size="mini"

								type="info"
								@click="handleEdit(node, data)"></el-button>

							<!-- 删除 -->
							<el-button icon="el-icon-delete" 
								size="mini"

								type="danger"
								@click="handleDelete(node, data)"></el-button>
						</span>
					</template>
				</div>
			</el-tree>
	</div>
</template>

<script>

export default{
	name: 'component-tree',
  props:['treeList','addNodeCallback','delNodeCallback','editCallback','clickNodeCallback'],
	data(){
		return {
			isLoading: false,// 是否加载
			NODE_KEY: 'id',// id对应字段
			MAX_LEVEL: 10,// 设定最大层级
			NODE_ID_START: 0,// 新增节点id，逐次递减
			startId: null,
			defaultProps: {// 默认设置
				children: 'childNode',
				label: 'name'
			},
			initParam: {// 新增参数
				name: '新增节点',
				pid: 0,
				childNode: []
			},
		}
	},
	created(){
		// 初始值
		this.startId = this.NODE_ID_START
	},
	methods: {
		handleDelete(_node, _data){// 删除节点
			console.log(_node, _data)
			// 判断是否存在子节点
			if(_data.childNode && _data.childNode.length !== 0){
        this.confirmFun('节点下包含子节点，确定删除吗？',_data)
			}else{
				 this.confirmFun('确定要删除吗？',_data)
			}
		},
    confirmFun(tip,data){
      this.$confirm(tip,"提示",{
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$refs.SlotTree.remove(data)
        this.delNodeCallback && this.delNodeCallback(data)
      }).catch(() => {})
    },

		handleInput(_node, _data){// 修改节点
			console.log(_node, _data)
      this.editCallback &&  this.editCallback(_data)
			// 退出编辑状态
			if(_node.isEdit){
				this.$set(_node, 'isEdit', false)
			}
		},
		handleEdit(_node, _data){// 编辑节点
			console.log(_node, _data)
			// 设置编辑状态
			if(!_node.isEdit){
				this.$set(_node, 'isEdit', true)
			}

			// 输入框聚焦
			this.$nextTick(() => {
				if(this.$refs['slotTreeInput'+_data[this.NODE_KEY]]){
					this.$refs['slotTreeInput'+_data[this.NODE_KEY]].$refs.input.focus()
				}
			})
		},
		handleAdd(_node, _data){// 新增节点
			console.log(_node, _data)
			// 判断层级
			if(_node.level >= this.MAX_LEVEL){
				this.$message.warning("当前已达到"+ this.MAX_LEVEL + "级，无法新增！")
				return false;
			}

			// 参数修改
			let obj = JSON.parse(JSON.stringify(this.initParam));// copy参数
			obj.pid = _data[this.NODE_KEY];// 父id
			obj[this.NODE_KEY] = --this.startId;// 节点id：逐次递减id
			// 新增数据

      this.addNodeCallback && this.addNodeCallback(_data.id,obj)

			// 展开节点
			if(!_node.expanded){
				_node.expanded = true
			}
		},
		handleAddTop(){// 添加顶部节点
			let obj = JSON.parse(JSON.stringify(this.initParam));// copy参数
			obj[this.NODE_KEY] = --this.startId;// 节点id：逐次递减id
      this.addNodeCallback && this.addNodeCallback('',obj)
		},
    onClickNode(val){
		  this.clickNodeCallback && this.clickNodeCallback(val)
    }
	}
}
</script>

<style lang="less">
	/* common */

	// 显示按钮
	.show-btns{
		opacity: 1;
	}

	/* common end */

	.custom-tree{
		width: 100%;
		height: 100%;
		// 顶部按钮
		.comp-tr-top{
			margin:20px;
		}
		// 自定义节点
		.comp-tr-node{
			// label
			.comp-tr-node--name{
				display: inline-block;
				line-height: 40px;
				min-height: 40px;
				// 新增
				&.is-new{
					font-weight: bold;
				}
			}
			// button
			.comp-tr-node--btns{
				margin-left: 10px;
				opacity: 0;
				transition: opacity .1s;
				.el-button{
					transform: scale(0.8);// 缩小按钮
					& + .el-button{
						margin-left: -1px;
					}
				}
			}
		}
		// 高亮显示按钮
		.is-current{
			&>.el-tree-node__content{
				.comp-tr-node--btns{
					 .show-btns;
				}
			}
		}
		// 悬浮显示按钮
		.el-tree-node__content{
			&:hover{
				.comp-tr-node--btns{
					.show-btns;
				}
			}
		}
	}
</style>
