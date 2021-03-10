<template>
  <div class="input-wrapper">
    <label class="input-wrapper__input-label" v-if="label" v-bind:for="id">{{ label }}<span v-if="required"> *</span></label>
    <div class="input-wrapper__input-prefix" v-if="prefix">{{ prefix }}</div>
    <input class="input-wrapper__input"
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :name="name"
        :required="required"
        v-on="inputListeners"
        v-model="el.value" 
    />
    <div class="barBottomInput"></div>
  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  data(){
    return{
      el:{
        id : this.id,
        value: null
      }
    }
  },
  props: {
    id:          String,
    type:        String,
    placeholder: String,
    label:       String,
    prefix:      String,
    name:        String,
    required:    Boolean,

  },
  computed: {
    inputListeners : function(){
      let vm=this
      return Object.assign({},
        {
          input:function(){
            vm.$parent.insertIntoDataStore(vm.el)
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  font-size: 14px;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;

	&__input-label {
		display: block;
		margin-bottom: 5px;

		span {
				opacity: 0.55;
			}
	}

  &__input-prefix {
		padding: calc(1rem - 1px) 1rem;
    background-color: #313131;
    border: 1px solid lighten($color: #252525, $amount: 15);
    border-right: none;
    text-align: center;
    width: auto;
    flex: 2;
	}

  &__input {
		background-color: #252525;
		font-size: 14px;
		color: white;
		border: 1px solid lighten($color: #252525, $amount: 15);
		padding: 1rem 1.5rem;
		position: relative;
		z-index:2;
    flex: 4;



		&:focus {
			outline: none;
			border: 1px solid lighten($color: #252525, $amount: 60);
			
			& + .barBottomInput{
				width:300px;
				transition: all .5s ease-in-out;
			}
		}
  }

  .barBottomInput{
    width: 0;
    height: 50px;
    left: 0;
    top: 3px;
    border-bottom: solid 3px #41b883;
    position: absolute;
    z-index: 1;
    transition: width 0.5s ease-in-out;
  }
   
}

</style>
