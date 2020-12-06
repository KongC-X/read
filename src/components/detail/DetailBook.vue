<template>
  <div class="detail-info">
    <div class="detail-info-l">
      <div class="book-img">
        <ImageView :src="book && book.cover"></ImageView>
      </div>
    </div>
    <div class="detail-info-r">
      <div class="book-title">{{(book && book.title) || ''}}</div>
      <div class="book-author">{{(book && book.author) || ''}}</div>
      <div class="book-category">{{(book && book.categoryText) || ''}}</div>
    </div>
  </div>
</template>

<script>
  import ImageView from '../base/ImageView'
  export default {
    components: { ImageView },
    props: {
      book: Object
    }
  }
</script>

<style lang="scss" scoped>
  .detail-info {
    display: flex;
    padding: 10px 15px;

    .detail-info-l {
      padding-right: 15px;

      .book-img {
        width: 100px;
      }
    }

    .detail-info-r {
      flex: 1;
      overflow: hidden;

      .book-title {
        font-size: 18px;
        line-height: 22px;
        max-height: 66px;
        font-weight: 500;
        overflow: hidden;
        color: #000;
        text-overflow: clip;
      }

      .book-author {
        margin-top: 10px;
        font-size: 16px;
        line-height: 18px;
        max-height: 36px;
        overflow: hidden;
        color: #333;
        text-overflow: clip;
      }

      .book-category {
        margin-top: 10px;
        font-size: 14px;
        line-height: 16px;
        max-height: 16px;
        overflow: hidden;
        color: #666;
        text-overflow: clip;
      }
    }
  }
</style>
