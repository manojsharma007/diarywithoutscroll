<template>

  <div>

    <div class="signupForm">
      <h1> Login </h1>
      <b-alert show variant="danger" v-if="errormsg">Invlid username or password</b-alert>
      <b-form @submit.stop.prevent="onSubmit">
        <b-form-group id="example-input-group-1" label="Email Address" label-for="example-input-1">
          <b-form-input id="example-input-1"
                        name="username"
                        v-model="$v.form.username.$model"
                        :state="validateState('username')"
                        aria-describedby="input-1-live-feedback"></b-form-input>

          <b-form-invalid-feedback id="input-1-live-feedback">Username is a required field.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="example-input-group-2" label="Password" label-for="example-input-2">

          <b-form-input id="example-input-2"
                        type="password"
                        name="password"
                        v-model="$v.form.password.$model"
                        :state="validateState('password')"
                        aria-describedby="input-1-live-feedback"></b-form-input>

          <b-form-invalid-feedback id="input-2-live-feedback">Password is a required field.</b-form-invalid-feedback>
        </b-form-group>

        <b-button type="submit" variant="primary" :disabled='!isComplete'>Submit</b-button>
        <b-button class="ml-2" @click="resetForm()">Reset</b-button>
      </b-form>
    </div>
  </div>

</template>

<script>

  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    data() {
      return {
        form: {
          username: null,
          password: null
        },
        errormsg: false
      }
    },
    validations: {
      form: {
        username: {
          required
        },
        password: {
          required
        }
      }
    },
     mounted() {
       if(localStorage.getItem('userDetails')){
          this.$router.push({ name: 'diarylist' })
       }   
         
  },
    computed: {
      isComplete() {
        return this.form.username && this.form.password
      }
    },
    methods: {
      validateState(name) {
        const { $dirty, $error } = this.$v.form[name]
        return $dirty ? !$error : null
      },
      resetForm() {
        this.form = {
          username: null,
          password: null
        }

        this.$nextTick(() => {
          this.$v.$reset()
        })
      },
      onSubmit() {
        this.$v.form.$touch()
        if (this.$v.form.$anyError) {
          return
        }
        if (this.form.username == 'todo' && this.form.password == 'todomanoj') {          
          localStorage.setItem('userDetails', JSON.stringify(this.form))
          // this.$toastr.Add({
          //   name: 'UniqName', // this is give you ability to use removeByName method
          //   msg: 'you are successfully logged in', // Toast Message
          //   type: 'success' // Toast type,
          // })
          this.$router.push({ name: 'diarylist' })
          this.errormsg = false
        } else {
          this.errormsg = true
        }
      }
    }
  }

</script>
<style scoped>

  .signupForm {
    margin-top: 50px;
    width: 100%;
    border: 2px solid gray;
    padding: 10px;
  }

</style>
