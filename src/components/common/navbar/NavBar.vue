<template>
    <div class="nav-bar">
        <div class="left"><slot name='left'></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name='right'></slot></div>
        
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.nav-bar {
    display: flex;
    justify-content: space-between;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    letter-spacing: 5px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: #fff;
    border-bottom: 1px solid #eee;
    /* box-shadow: 0 1px 1px rgba(100,100,100,.1) */
}
.left, .right {
    width: 60px;   
    
}
.center {
    flex: 1;
    

}
</style>