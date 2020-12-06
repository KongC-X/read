<template>
  <div>
    <ShelfUserInfo
      :user-info="userInfo"
      :read-day="readDay"
      :num="shelfList.length"
    />
    <ShelfList :shelf-list="shelfList" />
  </div>
</template>

<script>
  import ShelfUserInfo from '../../components/shelf/ShelfUserInfo'
  import ShelfList from '../../components/shelf/ShelfList'
  import { getStorageSync } from '../../api/wechat'
  import { userDay, bookShelf } from '../../api'

  export default {
    components: { ShelfList, ShelfUserInfo },
    data () {
      return {
        userInfo: {},
        readDay: 0,
        shelfList: []
      }
    },
    onShow () {
      this.userInfo = getStorageSync('userInfo')
      const openId = getStorageSync('openId')
      userDay({ openId }).then(response => {
        this.readDay = response.data.data.day
      })
      bookShelf({ openId }).then(response => {
        this.shelfList = response.data.data
        this.shelfList.push({})
      })
    }
  }
</script>

<style lang="scss" scoped>
</style>
