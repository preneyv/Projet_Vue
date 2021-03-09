<template>
  <div class="input-wrapper">
    <label class="input-wrapper__input-label" v-if="label" v-bind:for="id">{{ label }}<span v-if="required"> *</span></label>
    <div class="input-wrapper__input-row">
      <div class="input-wrapper__input-prefix" v-if="prefix">{{ prefix }}</div>
      <input v-bind:class="`input-wrapper__input ${error ? 'invalid' : ''}`"
          v-bind="$props"
          v-on="inputListeners"
          v-model="el.value" 
      />
    </div>
    <small class="input-wrapper__error" v-if="error">{{ error }}</small>
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
    error:       String,
  },
  created(){
    console.log(this.$props)
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

  &__input-row {
    display: flex;
    justify-content: flex-start;
  }

	&__input-label {
		display: block;
		margin-bottom: 5px;

		span {
				opacity: 0.55;
			}
	}

  &__error {
		color: var(--color-error);
    font-size: 12px;
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
    flex: 4;

    &.invalid {
      border: 1px solid var(--color-error);
    }

		&:focus {
      outline: none;
			border: 1px solid lighten($color: #252525, $amount: 60);
		}

    &:invalid {
      box-shadow: none;
    }
  }
}

</style>
