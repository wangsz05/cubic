(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e5357"],{9406:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container case-list-container"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"case-info"},[a("el-tag",[t._v("在线应用："+t._s(t.caseInfo.services))]),t._v(" "),a("el-tag",{attrs:{type:"success"}},[t._v("在线实例数："+t._s(t.caseInfo.instances))]),t._v(" "),a("el-input",{staticStyle:{width:"220px"},attrs:{size:"mini",placeholder:"应用名称:输入关键字搜索"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),t._v(" "),a("span",{staticStyle:{float:"right",padding:"4px 10px"}},[a("el-date-picker",{attrs:{"picker-options":t.pickerOptions,type:"datetime",size:"mini",placeholder:"选择启动时间","value-format":"yyyy-MM-dd HH:mm:ss",format:"yyyy-MM-dd HH:mm:ss",align:"right"},model:{value:t.searchForm.date,callback:function(e){t.$set(t.searchForm,"date",e)},expression:"searchForm.date"}}),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-search"},on:{click:t.getList}},[t._v("搜索")])],1)],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData.filter((function(e){return!t.search||e.instanceName.toLowerCase().includes(t.search.toLowerCase())})),border:"",size:"small","highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"instanceName",label:"应用唯一标识","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.row;return[a("el-tooltip",{attrs:{content:o.appId,placement:"top",effect:"dark"}},[a("el-button",{staticStyle:{"font-size":"12px"},attrs:{type:"text"},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.goCmd(o)}}},[t._v(t._s(o.appId)+"\n            ")])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"instanceName",label:"实例名称"}}),t._v(" "),a("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"host",label:"主机名称"}}),t._v(" "),a("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"ip",label:"IP"}}),t._v(" "),a("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"version",label:"Agent版本"}}),t._v(" "),a("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"startDate",label:"启动时间"}}),t._v(" "),a("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"onLine",label:"在线时长"}}),t._v(" "),a("el-table-column",{attrs:{"show-overflow-tooltip":!0,prop:"lastHeartbeat",label:"最后心跳"}})],1)],1)],1)},s=[],i=a("b775");function n(t){return Object(i["a"])({url:"/app/getList",method:"get",params:t})}var l={name:"Dashboard",data:function(){return{caseInfo:{services:0,instances:0},search:"",tableData:[],listLoading:!0,searchForm:{date:null},dialogVisible:!1,drawerVisible:!1,sort:"id_desc",pickerOptions:{shortcuts:[{text:"今天",onClick:function(t){t.$emit("pick",new Date)}},{text:"昨天",onClick:function(t){var e=new Date;e.setTime(e.getTime()-864e5),t.$emit("pick",e)}},{text:"一周前",onClick:function(t){var e=new Date;e.setTime(e.getTime()-6048e5),t.$emit("pick",e)}}]}}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,n({date:this.searchForm.date}).then((function(e){t.tableData=e.data.informations,t.total=e.data.total,t.caseInfo.services=e.data.services,t.caseInfo.instances=e.data.instances})).finally((function(){t.listLoading=!1}))},sortChange:function(t){var e=t.prop,a=t.order;"id"===e&&this.sortByID(a)},sortByID:function(t){this.listQuery.sort="ascending"===t?"+id":"-id",this.handleFilter()},goCmd:function(t){console.log(t),this.$router.push({name:"app",query:{id:t.appId}})}}},r=l,c=a("2877"),p=Object(c["a"])(r,o,s,!1,null,null,null);e["default"]=p.exports}}]);