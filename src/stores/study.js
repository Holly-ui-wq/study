import {ref,computed,watch} from 'vue';
const key='study-buddy-v1';
function load(){try{const s=localStorage.getItem(key);if(s)return JSON.parse(s)}catch{}return {tasks:[{id:1,title:'复习 Vue 基础知识',category:'编程',minutes:25,done:true},{id:2,title:'完成编程练习',category:'编程',minutes:30,done:false},{id:3,title:'阅读课程笔记',category:'阅读',minutes:15,done:false}],goal:90,streak:7}}
const state=ref(load());watch(state,v=>{try{localStorage.setItem(key,JSON.stringify(v))}catch{}},{deep:true});
const tasks=computed(()=>state.value.tasks),done=computed(()=>tasks.value.filter(t=>t.done)),pending=computed(()=>tasks.value.filter(t=>!t.done)),rate=computed(()=>tasks.value.length?Math.round(done.value.length/tasks.value.length*100):0),minutes=computed(()=>done.value.reduce((n,t)=>n+Number(t.minutes),0));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function add(data){await wait(350);state.value.tasks.unshift({id:Date.now(),title:data.title.trim(),category:data.category||'学习',minutes:Number(data.minutes)||25,done:false})}
async function toggle(id){await wait(150);const t=tasks.value.find(t=>t.id===id);if(t)t.done=!t.done}
async function remove(id){await wait(100);state.value.tasks=tasks.value.filter(t=>t.id!==id)}
export function useStudy(){return {state,tasks,done,pending,rate,minutes,add,toggle,remove}}
