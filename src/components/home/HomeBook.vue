<template>
  <div class="home-book">
    <div class="home-book-header" v-if="showTitle">{{title}}</div>
    <div class="home-book-content">
      <div class="home-book-row" v-for="(item, index) in bookData" :key="index">
        <div
          class="home-book-col"
          v-for="(book, bookIndex) in item" :key="bookIndex"
          :style="{ flex: '0 0 ' + (100/col) + '%'}"
        >
          <div
            class="book-wrapper"
            :style="{ flexDirection: mode === HOME_BOOK_MODE.COL ? 'column' : 'row' }"
            @click="onBookClick(book)"
            v-if="mode === HOME_BOOK_MODE.COL || mode === HOME_BOOK_MODE.ROW"
          >
            <ImageView :src="book.cover"/>
            <div class="book-title-wrapper book-title-col" v-if="mode === HOME_BOOK_MODE.COL">
              <div class="book-title">{{book.title}}</div>
            </div>
            <div class="book-title-wrapper book-title-row" v-else>
              <div class="book-title">{{book.title}}</div>
              <div class="book-title-author-wrapper">
                <div class="book-title book-author">{{book.author}}</div>
                <div class="book-title book-author">{{book.categoryText}}</div>
              </div>
            </div>
          </div>
          <div class="category-wrapper" v-else @click="onBookClick(book)">
            <div class="category-text">{{book.text}}</div>
            <div class="category-num">{{book.num}}本书</div>
            <div class="category-img-wrapper">
              <div class="category-img1">
                <ImageView :src="book.cover"></ImageView>
              </div>
              <div class="category-img2">
                <ImageView :src="book.cover2"></ImageView>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-book-footer" v-if="showBtn" @click="onMoreClick">
      <van-button round custom-class="home-book-btn">{{btnText}}</van-button>
    </div>
  </div>
</template>

<script>
  import { HOME_BOOK_MODE, CATEGORY } from '@/utils/const'
  import ImageView from '../base/ImageView'

  export default {
    components: { ImageView },
    props: {
      title: String,
      data: {
        type: Array,
        default: []
      },
      btnText: String,
      row: {
        type: Number,
        default: 0
      },
      col: {
        type: Number,
        default: 1
      },
      mode: {
        type: String,
        default: HOME_BOOK_MODE.ROW
      },
      showTitle: {
        type: Boolean,
        default: true
      },
      showBtn: {
        type: Boolean,
        default: true
      },
      linearBg: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      HOME_BOOK_MODE () {
        return HOME_BOOK_MODE
      },
      bookData () {
        const { data, row, col } = this
        if (data && data.length > 0) {
          data.forEach(book => {
            book.text = CATEGORY[book.categoryText.toLowerCase()]
          })
          const number = row * col
          const _bookData = data.slice(0, number)
          const _bookDataRow = []
          let _row = 0
          while (_row < row) {
            _bookDataRow.push(_bookData.slice(_row * col, _row * col + col))
            _row++
          }
          return _bookDataRow
        } else {
          return []
        }
      }
    },
    methods: {
      onMoreClick () {
        this.$emit('onMoreClick')
      },
      onBookClick (book) {
        this.$emit('onBookClick', book)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-book {
    .home-book-header {
      padding: 13px 0 0 20.5px;
    }

    .home-book-content {
      padding: 0 12px;
      margin-top: 10.5px;

      .home-book-row {
        display: flex;
        flex-flow: row nowrap;
        margin-top: 12px;

        .home-book-col {
          padding: 0 8px;
          box-sizing: border-box;

          .book-wrapper {
            display: flex;
            .book-title-wrapper {
              &.book-title-col {
                .book-title {
                  font-size: 12px;
                  color: #212731;
                  line-height: 16.5px;
                  max-height: 33px;
                  font-weight: 500;
                  overflow: hidden;
                  word-break: break-word;
                }
              }
              &.book-title-row {
                flex: 0 0 50%;
                padding: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .book-title {
                  font-size: 14px;
                  color: #1F1F1F;
                  line-height: 18px;
                  max-height: 36px;
                  overflow: hidden;
                  word-break: break-word;
                }
                .book-author {
                  font-size: 12px;
                  color: #868686;
                  line-height: 14px;
                  max-height: 14px;
                }
              }
            }
          }
          .category-wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: #F8F9FB;
            border-radius: 10px;
            height: 96px;
            padding: 13px 0 14.5px 16px;
            box-sizing: border-box;

            .category-text {
              width: 150px;
              overflow: hidden;
              text-overflow: ellipsis;
              color: #212832;
              font-size: 16px;
              line-height: 22.5px;
            }
            .category-num {
              color: #868686;
              font-size: 12px;
              line-height: 16.5px;
            }
            .category-img-wrapper {
              position: absolute;
              right: 0;
              bottom: 0;

              .category-img1 {
                position: absolute;
                right: 0;
                bottom: -5px;
                z-index: 100;
                width: 48px;
                border-radius: 0 0 10px 0;
              }
              .category-img2 {
                position: absolute;
                right: 30px;
                bottom: -5px;
                z-index: 90;
                width: 36px;
              }
            }
          }
        }
      }
    }

    .home-book-footer {
      padding: 12px 20px 20px;
    }
  }
</style>
<style lang="scss">
  .category-img1 {
    .image {
      border-radius: 0 0 10px 0;
    }
  }
  .home-book-footer {
    .home-book-btn {
      width: 100%;
      font-size: 14px;
      color: #3696EF;
      border: 1px solid #EDEEEE;
    }
  }
</style>
