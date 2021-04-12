<template>
  <div class="user-info">
     <BasicCtn headTitle="Mes infos">
       <div class="user-info__basics">
          <div>
            <span>Nom : </span>
            <span>{{userInfo.name}}</span>
          </div>
          <div>
            <span>Email : </span>
            <span>{{userInfo.email}}</span>
          </div>
          <div>
            <span>Inscrit sur notre plateforme depuis le : </span>
            <span>{{formatedDate(userInfo.created_at)}}</span>
          </div>
       </div>
    </BasicCtn>
    <div class="user-info__externals">
      <BasicCtn headTitle="Mes liens">

        <template v-slot:btnHead>
          <i class="bi bi-plus-square add-btn" title="Ajouter un autre lien" @click="addLinksOpen = true"></i>
        </template>

        <div class="links-ctn" v-if="userInfo.externals">
          <div class="link-item"
               v-for="(link,index) in userInfo.externals"
               :key="index"
          >
            <span>{{getNameLink(link.title)}}</span>
            <span><a :href="link.value">{{link.value}}</a></span>
          </div>
        </div>
      </BasicCtn>

    </div>
    <div v-if="userInfo.isSuperAdmin" class="user-info__messages">

    </div>
  </div>
  <FormHandlingAdd v-if="addLinksOpen" v-bind="formAddLinks"/>
</template>

<script>

/*Components Import*/
import BasicCtn from '@/components/Dashboard/BasicCtn.vue'
import FormHandlingAdd from '@/components/Dashboard/BasicsForms/FormHandlingAdd.vue'
import AddLinks from '@/components/Dashboard/BasicsForms/AddLinks.vue'

/*Librairies import*/
import format from 'date-format'
import {markRaw} from "vue";

/*Files import*/
import UserService from '../services/user.js'
import {officialLinkTypes} from "../constants/project";


export default {
  name: "Account",
  components:{
    BasicCtn,
    FormHandlingAdd,
  },
  beforeMount() {
    const { _id } = this.$store.state.auth.user
    UserService.getUserInfoById(_id).then(res =>  this.userInfo = res.data)
  },
  data(){
    return{
      userInfo:{},
      addLinksOpen: false,
      formAddLinks: {
        title: 'Ajouter un autre lien',
        method: this.newLink,
        form: markRaw(AddLinks),
      }
    }
  },
  methods: {
    /**
     * Formate les dates en utilisant la librairie 'format'
     */
    formatedDate(date) {
      return format('dd/MM/yyyy',new Date(date))
    },
    /**
     * Récupère le name associé à la clef dans le tableau links
     */
    getNameLink(val) {
      return officialLinkTypes.find(({value}) => val === value)?.name
    },
    /**
     * Ajoute un nouveau lien à l'utilisateur en base de donnée.
     * @param valueSelect type de lien ajouté
     * @param valueInput valeur du lien
     * @returns {Promise<{type: string, message: string}>}
     */
    async newLink({valueSelect, valueInput}) {

      let item = this.userInfo.externals.find((el) => {
        if(el.title === valueSelect || el.value ===valueInput) return el
      })

      if(item !== undefined && item.title === valueSelect) return ({type: 'error', message: `Vous possèdez déjà un lien ${valueSelect}.`})
      if(item !== undefined && item.value === valueInput) return ({type: 'error', message: `L'adresse ${valueInput} est déjà présente.`})
      if(!valueInput.match(/(https?|ftp|ssh|mailto):\/\/[a-z0-9/:%_+.,#?!@&=-]+/gi)) return ({type:'error', message: "L'adresse saisie n'est pas valide."})


      let res = await UserService.addLinkToExternals(this.userInfo._id,{title:valueSelect,value:valueInput})

      const { modified } = res?.data ?? 0

      if(modified === 1) {
        this.userInfo.externals = [...this.userInfo.externals,{title:valueSelect,value:valueInput}]
        return ({type: 'success', message: `La lien ${valueSelect} a bien été ajouté.`})

      }else{
        return  ({type: 'error', message: `Un problème s'est produit. Réessayez plus tard.`})
      }
    },
    closeForm() {
      this.addLinksOpen = false;
    }
  }

}
</script>

<style lang="scss" scoped>
.user-info {
  @include flex(column);
  gap: 0.5rem;
  & > * {
    width: 40%;
  }

  &__basics {
    @include flex(column, center, unset);

    div {
      @include flex(row, unset, center);
      gap: 1rem;
      span:first-child {
        color: grey;
        font-size: 1rem;
      }
    }
  }

  &__externals {

    .add-btn:hover{
      cursor: pointer;
      color: #181818;
    }
    /*links subpart*/
    .links-ctn {
      @include flex(column, flex-start, flex-start);
      font-size: 1.2rem;
      width: 100%;
      gap: 0.5rem;
    }

    .link-item {
      @include flex(row);
      width: 100%;

      span:first-child {
        background-color: #4b4b4b;
        border-radius: 3px 0 0 3px;
        padding: 5px 10px;
        flex: 1;
      };

      span:last-child {
        border: 1px solid lighten($color: #252525, $amount: 15);
        border-radius:0 3px 3px 0;
        padding: 4px 10px;
        flex: 3;
      }
    }
  }

  &__messages {

  }
}
</style>