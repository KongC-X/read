<template>
  <div class="detail-bottom">
    <div class="detail-btn-wrapper">
      <van-button
        :custom-class="isInShelf ? 'detail-btn-remove' : 'detail-btn-shelf'"
        round
        @click="handleShelf"
      >
        {{isInShelf ? '移出书架' : '加入书架'}}
      </van-button>
    </div>
    <div class="detail-btn-wrapper">
      <van-button
        custom-class="detail-btn-read"
        round
        @click="() => readBook()"
      >
        阅读
      </van-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      isInShelf: Boolean
    },
    methods: {
      handleShelf () {
        this.$emit('handleShelf')
      },
      readBook () {
        this.$emit('readBook')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detail-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-top: 1px solid #eee;
    box-shadow: 0 -2px 4px 0 rgba(0,0,0,.1);

    .detail-btn-wrapper {
      flex: 1;
    }
  }
</style>

<style lang="scss">
  .detail-bottom {
    .detail-btn-read {
      width: 100%;
      border: none;
      color: #fff;
      background: #1EA3F5;
      margin-left: 7.5px;
    }

    .detail-btn-shelf {
      width: 100%;
      color: #1EA3F5;
      background: #fff;
      border: 1px solid #1EA3F5;
      margin-right: 7.5px;
    }

    .detail-btn-remove {
      width: 100%;
      color: #F96128;
      background: rgba(255, 175, 155, .3);
      border: 1px solid #FFAF9B;
      margin-right: 7.5px;
    }
  }
</style>
