import{U as n}from"./vendor.dd24d7c7.js";const p=n({id:"statusStore",state:()=>({isLoading:!1,cartModel:!1,hamMenuModel:!1,collectionModel:!1,popReminderModel:!1,popReminderText:"",popInfoBox:{open:!1,title:"",text:"",action:null},mainContainer:{}}),getters:{fixWindow(o){let e=!1;return(o.hamMenuModel||o.cartModel||o.collectionModel)&&(e=!0),e}},actions:{openPopReminder(o="\u6210\u529F"){this.popReminderText=o,this.popReminderModel=!0,setTimeout(()=>{this.popReminderModel=!1},1500)},openPopInfoBox(o,e,t){this.popInfoBox.open=!0,this.popInfoBox.title=o,this.popInfoBox.text=e,this.popInfoBox.action=t},closePopInfoBox(){this.popInfoBox.open=!1,this.popInfoBox.title="",this.popInfoBox.text="",this.popInfoBox.action=null}}});export{p as s};