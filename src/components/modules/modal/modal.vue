<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <slot name="header">
            <i class="el-icon-close modal-colse"  @click="close"></i>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'Modal',
    data() {
      return {}
    },
    props: ['show'],
    methods: {
      close: function () {
        this.$emit('close');
      }
    }
  } </script>
<style lang="scss" scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .modal {
    background: url("../../../../static/img/modal/modal.png") no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;
    color: #fff;
    position: relative;
    .modal-colse {
      position: absolute;
      right:0;
      top: 50%;
      cursor: pointer;
      padding: 10px;
      font-size: 20px;
      font-weight: bold;
      transform: translateY(-50%);
      color: #295aa7;
      &:hover {
        color: #51acff;
      }
    }
  }

  .modal-header, .modal-footer {
    display: flex;
    padding: 10px;
  }
  .modal-header {
    /*border-bottom: 1px solid #295aa7;*/
    /*justify-content: space-between;*/
    position: relative;

    /*<!--&:before {-->*/
    /*<!--  content: "";-->*/
    /*<!--  width: 0;-->*/
    /*<!--  height: 0;-->*/
    /*<!--  border-width: 0 1vh 1vh;-->*/
    /*<!--  border-style: solid;-->*/
    /*<!--  border-color: transparent transparent #295aa7; !*透明 透明  灰*!-->*/
    /*<!--  position: absolute;-->*/
    /*<!--  left: 2vw;-->*/
    /*<!--  bottom: 0;-->*/
    /*<!--}-->*/
    /*<!--&:after {-->*/
    /*<!--  content: "";-->*/
    /*<!--  width: 0;-->*/
    /*<!--  height: 0;-->*/
    /*<!--  border-width: 0 1vh 1vh;-->*/
    /*<!--  border-style: solid;-->*/
    /*<!--  border-color: transparent transparent #22324b; !*透明 透明  灰*!-->*/
    /*<!--  position: absolute;-->*/
    /*<!--  left: 2vw;-->*/
    /*<!--  bottom: -1px;-->*/
    /*<!--}-->*/
  }

  .modal-footer {
    /*justify-content: flex-end;*/
  }
  .modal-body {
    position: relative;
    min-width: 600px;
    min-height: 180px;
  }
  .modal-fade-enter, .modal-fade-leave-active {
    opacity: 0;
  }
  .modal-fade-enter-active, .modal-fade-leave-active {
    transition: opacity .3s ease
  }
</style>

