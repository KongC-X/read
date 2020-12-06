<template>
  <div>
    <SearchBar
      :hot-search="hotSearchKeyword"
      :focus="searchFocus"
      @onChange="onChange"
      @onClear="onClear"
      @onConfirm="onConfirm"
      ref="searchBar"
    />
    <TagGroup
      header-text="热门搜索"
      btn-text="换一批"
      :value="hotSearchArray"
      @onBtnClick="changeHotSearch"
      @onTagClick="showBookDetail"
      v-if="hotSearchArray.length > 0 && !showList"
    />
    <TagGroup
      header-text="历史搜索"
      btn-text="清空"
      :value="historySearch"
      @onBtnClick="clearHistorySearch"
      @onTagClick="searchKeyWord"
      v-if="historySearch.length > 0 && !showList"
    />
    <SearchList
      :data="searchList"
      v-if="showList"
    />
  </div>
</template>

<script>
  import SearchList from '../../components/search/SearchList'
  import SearchBar from '../../components/home/SearchBar'
  import TagGroup from '../../components/base/TagGroup'
  import { getStorageSync, setStorageSync, showToast } from '../../api/wechat'
  import { search, hotSearch } from '../../api'

  const KEY_HISTORY_SEARCH = 'historySearch'

  export default {
    components: {
      TagGroup,
      SearchBar,
      SearchList
    },
    computed: {
      showList () {
        const keys = Object.keys(this.searchList)
        return keys.length > 0
      },
      hotSearchArray () {
        const _hotSearch = []
        this.hotSearch.forEach(o => _hotSearch.push(o.title))
        return _hotSearch
      }
    },
    data () {
      return {
        hotSearch: [],
        hotSearchKeyword: '',
        historySearch: [],
        searchList: {},
        searchFocus: true,
        openId: '',
        page: 1
      }
    },
    methods: {
      onConfirm (keyword) {
        // 1. 判断是否有搜索关键词
        if (!keyword || keyword.trim().length === 0) {
          // 如果没有，则获取热门搜索词，通过热门搜索词发起请求
          keyword = this.hotSearchKeyword
          this.$refs.searchBar.setValue(keyword)
        } else {
          // 如果有，就用搜索关键词发起请求
        }
        this.onSearch(keyword)
        // 2. 将搜索结果写入历史搜索
        if (!this.historySearch.includes(keyword)) {
          this.historySearch.push(keyword)
          setStorageSync(KEY_HISTORY_SEARCH, this.historySearch)
        }
        // 3. 将搜索框失去焦点
        this.searchFocus = false
      },
      onClear () {
        this.searchList = {}
      },
      onChange (keyword) {
        if (!keyword || keyword.trim().length === 0) {
          this.searchList = {}
          return
        }
        this.page = 1
        this.onSearch(keyword)
      },
      onSearch (keyword) {
        search({
          keyword,
          openId: this.openId,
          page: this.page
        }).then(response => {
          this.searchList = response.data.data
        })
      },
      searchKeyWord (text) {
        this.$refs.searchBar.setValue(text)
        this.onSearch(text)
      },
      clearHistorySearch () {
        this.historySearch = []
        setStorageSync(KEY_HISTORY_SEARCH, [])
      },
      showBookDetail (text, index) {
        console.log('show book detail', index)
      },
      changeHotSearch () {
        hotSearch().then(response => {
          this.hotSearch = response.data.data
        })
      }
    },
    mounted () {
      this.openId = getStorageSync('openId')
      hotSearch().then(response => {
        this.hotSearch = response.data.data
      })
      this.page = 1
      this.hotSearchKeyword = this.$route.query.hotSearch
      this.historySearch = getStorageSync(KEY_HISTORY_SEARCH) || []
    },
    onPageScroll () {
      if (this.searchFocus) {
        this.searchFocus = false
      }
    },
    onReachBottom () {
      if (this.showList) {
        this.page++
        const searchWord = this.$refs.searchBar.getValue()
        search({
          keyword: searchWord,
          openId: this.openId,
          page: this.page
        }).then(response => {
          const { book } = response.data.data
          if (book && book.length > 0) {
            this.searchList.book.push(...book)
          } else {
            showToast('没有更多数据了')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
