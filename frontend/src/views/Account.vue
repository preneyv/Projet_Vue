<template>
  <div class="user-info">
    <div class="user-info__basics">
      <div>
        <span>Nom :</span>
        <span>{{userInfo.name}}</span>
      </div>
      <div>
        <span>Email :</span>
        <span>{{userInfo.email}}</span>
      </div>
      <div>
        <span>Date d'inscription :</span>
        <span>{{userInfo.created_at}}</span>
      </div>
    </div>
    <div class="user-info__externals">
      <BasicCtn headTitle="Mes liens">
        <!--
        <template v-slot:btnHead><i v-if="getCurrentProject.stateUser=== 'Admin'" class="bi bi-plus-square add-btn" title="Ajouter un autre lien" @click="changeFormAndOpen(formAddLinks)"></i></template>
        -->

        <div class="links-ctn" v-if="userInfo.externals">
          <div class="link-item"
               v-for="(link,index) in userInfo.externals"
               :key="index"
          >
            <span>{{getNameLink(link.title)}}</span>
            <span>{{link.value}}</span>
          </div>
        </div>
      </BasicCtn>

    </div>
    <div v-if="userInfo.isSuperAdmin" class="user-info__messages">

    </div>
  </div>
</template>

<script>
import UserService from '../services/user.js'

import BasicCtn from '@/components/Dashboard/BasicCtn.vue'

export default {
  name: "Account",
  components:{
    BasicCtn
  },
  beforeMount() {
    const { _id } = this.$store.state.auth.user
    UserService.getUserInfoById(_id).then(res =>  this.userInfo = res.data)
  },
  data(){
    return{
      userInfo:{}
    }
  }

}
</script>

<style lang="scss" scoped>
.user-info {
  @include flex(column);

  &__basics {
    @include flex(column);
    width: 40%;
    div {
      @include flex(column, center, unset);
    }
  }

  &__externals {
    width: 40%;
  }

  &__messages {

  }
}
</style>