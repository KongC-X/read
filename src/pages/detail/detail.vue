<template>
  <div>
    <DetailBook :book="book"/>
    <DetailStat
      :readers="book.readers"
      :readerNum="book.readerNum"
      :rankNum="book.rankNum"
      :rankAvg="book.rankAvg"
    />
    <DetailRate
      :rate-value="book.rateValue"
      @onRateChange="onRateChange"
    />
    <DetailContents
      :contents="contents"
      @readBook="readBook"
    />
    <DetailBottom
      :is-in-shelf="isInShelf"
      @handleShelf="handleShelf"
      @readBook="readBook"
    />
  </div>
</template>

<script>
  import DetailBook from '../../components/detail/DetailBook'
  import DetailStat from '../../components/detail/DetailStat'
  import DetailRate from '../../components/detail/DetailRate'
  import DetailContents from '../../components/detail/DetailContents'
  import DetailBottom from '../../components/detail/DetailBottom'
  import { bookDetail, bookRankSave, bookContents, bookShelf, bookShelfSave, bookShelfRemove } from '../../api'
  import { getStorageSync } from '../../api/wechat'

  export default {
    components: { DetailBottom, DetailContents, DetailRate, DetailStat, DetailBook },
    data () {
      return {
        book: {},
        contents: [],
        isInShelf: false
      }
    },
    methods: {
      handleShelf () {
        const openId = getStorageSync('openId')
        const { fileName } = this.$route.query
        if (!this.isInShelf) {
          bookShelfSave({ openId, fileName }).then(this.getBookIsInShelf)
        } else {
          const vue = this
          mpvue.showModal({
            title: '提示',
            content: `是否确认将《${this.book.title}》移出书架？`,
            success (res) {
              if (res.confirm) {
                bookShelfRemove({ openId, fileName }).then(vue.getBookIsInShelf)
              }
            }
          })
        }
      },
      readBook (href) {
        const query = {
          fileName: this.book.fileName,
          opf: this.book.opf
        }
        if (href) {
          const index = href.indexOf('/')
          if (index >= 0) {
            query.navigation = href.slice(index + 1)
          } else {
            query.navigation = href
          }
        }
        if (this.book && this.book.fileName) {
          this.$router.push({
            path: '/pages/read/main',
            query
          })
        }
      },
      onRateChange (value) {
        const openId = getStorageSync('openId')
        const { fileName } = this.$route.query
        bookRankSave({ openId, fileName, rank: value }).then(() => {
          this.getBookDetail()
        })
      },
      getBookDetail () {
        const openId = getStorageSync('openId')
        const { fileName } = this.$route.query
        if (openId && fileName) {
          bookDetail({ openId, fileName }).then(response => {
            this.book = response.data.data
          })
        }
      },
      getBookContents () {
        const { fileName } = this.$route.query
        if (fileName) {
          bookContents({ fileName }).then(response => {
            this.contents = response.data.data
          })
        }
      },
      getBookIsInShelf () {
        const openId = getStorageSync('openId')
        const { fileName } = this.$route.query
        if (openId && fileName) {
          bookShelf({ openId, fileName }).then(response => {
            const { data } = response.data
            data.length === 0 ? this.isInShelf = false : this.isInShelf = true
          })
        }
      }
    },
    mounted () {
      this.getBookDetail()
      this.getBookContents()
      this.getBookIsInShelf()
    }
  }
</script>

<style lang="scss" scoped>
</style>
