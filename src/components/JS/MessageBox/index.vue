<template>
  <div class="msg-box">
    <h2>{{title}}</h2>
    <p>{{city}}</p>
    <div>
      <span @touchstart="handleCancel">{{cancel}}</span>
      <span @touchstart="handleOk">{{ok}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.msg-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 180px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  background: #fff;

  h2 {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 700;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-top: 1px solid #ccc;
    margin-top: 10px;
    span {
      flex: 1;
      text-align: center;
      height: 30px;
      line-height: 30px;
    }
    span:first-child {
      border-right: 1px solid #ccc;
    }
  }
}
</style>
