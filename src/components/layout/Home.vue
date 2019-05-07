<template>
   <div id="mainContentYesplis" class="content" >
       <nav id="mainNav" class="navbar" :class="{'navbar-custom': isnavbar }" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link :to="{name:'Landing'}" class="navbar-item" >
                     <img class="show-logo" :src="require(`@/assets/${logo}`)" style="width: auto;">
                </router-link>
                 <a role="button" class="navbar-burger burger" @click.prevent="showMenu = !showMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>
             
            <div id="navbarHome" class="navbar-menu" :class="{'showMenu': showMenu}">
                  <div class="searchModif" style="align-self:center" v-if="!islanding">
                    <b-field position="is-centered">
                    <b-input placeholder="Search..." type="search" icon="magnify" v-model="search" expanded>
                    </b-input>
                    <p class="control" v-if="search!= null">
                        <router-link :to="{name: 'Search', params:{search : search}}" class="button">Search</router-link>
                    </p>
                    <p class="control" v-if="search == null">
                        <a class="button">Search</a>
                    </p>
                </b-field>
                </div>
                <div class="navbar-start" v-if="islanding">
                    <a class="navbar-item" :class="{'active': navbarActive == '#Home'}" href="#Home" @click="$vuetify.goTo('#Home', options); navbarActive = '#Home'">
                        Home
                    </a>
                    <a class="navbar-item" :class="{'active': navbarActive == '#OurServices'}" href="#OurServices" @click="$vuetify.goTo('#OurServices', options); navbarActive = '#OurServices'">
                        Cek Pemesanan
                    </a>
                    <a class="navbar-item" :class="{'active': navbarActive == '#Events'}" href="#Events" @click="$vuetify.goTo('#Events', options); navbarActive = '#Events'">
                        Produk Kami
                    </a>
                    <a class="navbar-item" :class="{'active': navbarActive == '#Contact'}" href="#Contact" @click="$vuetify.goTo('#Contact', options); navbarActive = '#Contact'">
                        Kontak Kami
                    </a>
                </div>
                

                <div class="navbar-end">
                <div class="navbar-item" v-if="roles == null">
                         
                            <router-link :to="{name:'Login'}"  class="is-register">
                                <strong>Masuk</strong>
                            </router-link>
                </div>
                <div class="navbar-item" v-if="roles != null">
                      <v-menu
                            v-model="menu"
                            :nudge-width="150"
                            offset-x
                            offset-y
                            bottom
                            left
                            >
                                <v-btn
                                slot="activator"
                                :dark="!isnavbar"
                                icon
                                >
                    <v-icon v-if="picture == null">account_circle</v-icon>
                                </v-btn>

                            <v-card>
                                <v-list>
                                <v-list-tile>
                                    <v-list-tile-content>
                                    <v-list-tile-sub-title>Hello</v-list-tile-sub-title>
                                        <v-list-tile-title>{{name}}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                </v-list>
                                <v-divider></v-divider>

                                <v-list>

                                <v-list-tile @click="goto('DashboardContent')">
                                    <v-list-tile-title>Dashboard</v-list-tile-title>
                                </v-list-tile>
                                <v-list-tile @click="goto('changePassword')">
                                    <v-list-tile-title>Ubah Password</v-list-tile-title>
                                </v-list-tile>
                                <v-list-tile @click="goto('Logout')">
                                    <v-list-tile-title color="red">Keluar</v-list-tile-title>
                                </v-list-tile>
                                </v-list>

                                <v-card-actions>
                                </v-card-actions>
                            </v-card>
                            </v-menu>
                </div>
                </div>
            </div>
        </nav>
<div class="background-all"></div>
        <!-- router view -->
            <div id="homeApp">
                <main class="homeContent">
                <transition name="fade">
                <router-view></router-view>
                </transition>
                </main>
            </div>

        <div id="Contact">
            <div class="container">
                <div class="columns" style="margin-top: 50px;">
                    <div class="column">
                      <div class="logoShapeBackground">
                       <img :src="require('@/assets/LogoBlue.svg')" style="width: 150px" alt="">
                      </div>
                      <div class="arrow-down"></div>
                    </div>
                    <div class="column">
                        <h4>Kantor Pusat</h4>
                        <p>JL. Babarsari 43</p>
                        <p>Yogyakarta 55281</p>
                        <p>Indonesia</p>
                        <br>
                        <p>Contact Center: 0274-487711</p>
                        <p>Email hallo@AtmaAuto.com</p>
                    </div>
                    <div class="column">
                        <h4>Penjualan</h4>
                        <p>Service</p>
                        <p>Service dan Sparepart</p>
                        <p>Sparepart</p>
                    </div>
                    <div class="column">
                        <h4>Social Media</h4>
                        <p style="opacity: 1;"><a style="text-decoration: none"><img class="sosmed" :src="require('@/assets/images/ins.svg')"></a></p>
                        <p style="opacity: 1;"><a style="text-decoration: none"><img class="sosmed" :src="require('@/assets/images/line.svg')"></a></p>
                    </div>
                </div>
            </div>
        </div>

        <div id="footer">
        <div class="container">
            <div class="columns">
            <div class="column">
            <p style="text-align: center">Made with <img :src="require('@/assets/images/love.svg')" style="width: 16px"> in Yogyakarta &copy; {{ new Date().getFullYear() }} </p>
            </div>
            </div>
            </div>
        </div>

   </div>
</template>
<style>
.showMenu{
    display: block;
}
.notifRed{
    background: #ff2b2b;
    border-radius: 100px;
    position: absolute;
    left: 18px;
    text-align: center;
    color: white;
    font-size: 11px;
    padding: 0px 5px;
    top: 13px;
}
.logoShapeBackground{
  background: white;
  position: relative;
  top: -93px;
  left: 0px;
  text-align: center;
  padding: 31px 0px;
  max-width: 190px;
margin: auto;
}
.arrow-down {
  width: 0;
  height: 0;
  border-left: 95px solid transparent;
  border-right: 95px solid transparent;
  position: relative;
  top: -93px;
  left: 39px;
  border-top: 50px solid white;
}
</style>


<script>
export default {
  data () {
    return {
      count: 0,
      logo: 'logo.png',
      roles: localStorage.getItem('roles'),
      isnavbar: false,
      menu: false,
      user: {},
      showMenu: false,
      picture: null,
      islanding: true,
      navbarActive: '#Home',
      name: localStorage.getItem('name')
    }
  },
  mounted () {
    if (localStorage.getItem('token')) {
      this.getUser()
    }
  },
  computed: {
    options () {
      return {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
      }
    }
  },
  created: function () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    goto (name) {
      this.$router.push({name: name})
    },
    handleScroll (event) {
      if (event.pageY > 100) {
        this.logo = 'logoBlue.png'
        this.isnavbar = true
      } else {
        this.logo = 'logo.png'
        this.isnavbar = false
      }
    },
    getUser () {
      if (localStorage.getItem('name') !== null) {
        this.loading = false
        return
      }
      this.$refs.topProgress.start()
      this.$http.get(this.$apiUrl + 'user', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        if (response.data.status === 'Token is Expired' || response.data.userdata === null || response.data[0] === 'user_not_found') {
          this.$router.push({ name: 'Logout' })
        } else {
          this.user = response.data.userdata
          this.name = response.data.userdata.role.name
          localStorage.setItem('name', this.user.role.name)
          localStorage.setItem('id', this.user.id)
        }
      }).catch(error => {
        console.log(error)
        this.$router.push({ name: 'Logout' })
      })
    }
  }
}
</script>