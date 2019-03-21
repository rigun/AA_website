<template>
  <div id="loginLayout">
    <nav id="mainNav" class="navbar navbar-blue" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link :to="{name:'Landing'}" class="navbar-item" >
                     <img class="show-logo" :src="require(`@/assets/logo.png`)" style="width: 100%;">
                </router-link>
            </div>
        </nav>

<div class="container" style="padding-top: 80px;">
    <div class="columns">
        <div class="column">
            
        </div>
        <div class="column is-two-fifths">
            <div class="card">
                <div class="card-content" style="text-align:center">
                    <img :src="require(`@/assets/logoBlue.png`)" style="width: 190px;;">
                </div>
                <hr>
                <div class="card-content">
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        :error="error"
                        required
                        ></v-text-field>
                        <v-text-field
                            :append-icon="showpassword ? 'visibility_off' : 'visibility'"
                            :type="showpassword ? 'text' : 'password'"
                            :rules="[rules.required]"
                            name="input-10-2"
                            label="Password"
                            class="input-group--focused"
                            :error="error"
                            :error-messages="message"
                            @click:append="showpassword = !showpassword"
                            v-model="password"
                        ></v-text-field>

                        <v-checkbox
                        v-model="checkbox"
                        label="Ingat email"
                        ></v-checkbox>
                        <div style="display: flex">
                        <v-btn style="margin-left: auto;"
                        color="red"
                        @click="reset"
                        dark
                        >
                        Bersihkan
                        </v-btn>

                        <v-btn
                        color="green"
                        :loading="load"
                        dark
                        @click="submitLogin(); load =true"
                        >
                        Masuk
                        </v-btn>
                        </div>

                    </v-form>
                </div>
            </div>

        </div>
        <div class="column">

        </div>
    </div>
</div>
</div>
</template>
<script>
import store from '../../store'
import axios from 'axios'
export default {
  data () {
    return {
      error: false,
      showpassword: false,
      message: '',
      email: localStorage.getItem('email'),
      password: '',
      checkbox: !!localStorage.getItem('checkbox'),
      loginError: false,
      load: false,
      valid: true,
      emailRules: [
        v => !!v || 'Email tidak boleh kosong',
        v => /.+@.+/.test(v) || 'Email tidak valid'
      ],
      rules: {
        required: value => !!value || 'Password tidak boleh kosong',
        emailMatch: () => ('Email atau password yang anda masukkan salah')
      }
    }
  },
  methods: {
    reset () {
      this.$refs.form.reset()
    },
    submitLogin () {
      this.loginError = false
      axios.post(this.$apiUrl + '/auth/login', {
        email: this.email,
        password: this.password
      }).then(response => {
        if (response.data.status === 0) {
          alert('Mohon maaf, akun ini sudah tidak dapat digunakan')
          this.load = false
          return
        }
        store.commit('loginUser')
        localStorage.setItem('checkbox', this.checkbox)
        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('roles', response.data.role)
        this.$router.push({ name: 'DashboardContent' })
      }).catch(error => {
        console.log(error)
        this.load = false
        this.error = error !== null
        this.message = `Email atau password tidak sesuai`
      })
    }
  }
}
</script>