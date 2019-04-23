<template>
   <div class="content">
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <div v-if="loading == true"></div>
    <div  v-else>
    <div id="topnav" class="topnavDashboard" >
        <nav class="navbar has-shadow dashnav " :class="{'showLeft': leftNav}" style="padding: 0px">
                <div class="navbar-start ">
                    <div class="navbar-item box-hamburger">
                        <div class="hamburger" @click.prevent="hamburger()">
                            <div class="bar1"></div>
                            <div class="bar2"></div>
                            <div class="bar3"></div>
                        </div>
                    </div>
                </div>
                <div class="navbar-end">
                        <div class="navbar-item dropdown-space has-dropdown is-hoverable">
                            
                        <div class="navbar-item" style="display:flex">
                            <div class="inisial-name" @click.prevent="rightDropDown()">
                                {{inisial}}
                            </div>
                            <div id="textRightNav" class="text-item" @click.prevent="rightDropDown()">
                                <h2 class="name-text">
                                <strong>{{name}}
                                    </strong>
                                </h2>
                                <p class="mute-text" >
                                    {{roles}}
                                </p>

                            </div>
                            <i id="logoRightNav" class="fa fa-chevron-down m-l-15 size-15" @click.prevent="rightDropDown()"></i>
                        </div>
                        <div class="navbar-dropdown arrow-up"></div>
                            <ul id="navbarRight" class="navbar-dropdown is-boxed  is-right box-dropdown-custom" :class="{'showDropDown': showDropDown}">
                                <li>
                                    <router-link :to="{name: 'changePassword'}" class="navbar-item">Ubah Password</router-link>
                                    </li>
                                <hr class="navbar-divider">
                                <li>  <router-link v-bind:to="{name: 'Logout'}" class="navbar-item">
                                            <span class="icon">
                                            <i class="fa fa-fw fa-sign-out m-r-5"></i>
                                            </span>
                                            Logout
                            </router-link ></li>
                            </ul>
                        </div>
                    

                </div>
                        
            </nav>
    </div>
       <div id="side-menu"  class="side-menu" :class="{'showLeft': leftNav}">
            <aside class="menu">
                <div id="side-header" class="side-header">
                    <div class="menu-label imgLabel">
                     <img :src="require(`@/assets/logo.png`)" style="width: 120px;">
                    </div>
                </div>
                <hr class="separator-side">
                <div class="side-body">
                
                    <ul class="menu-list dashboardlist">
                        <li><router-link v-bind:to="{name: 'DashboardContent'}"><v-icon dark style="margin-right: 5px;">dashboard</v-icon>  <span>Dashboard</span> </router-link></li>
                        <li><router-link v-bind:to="{name: 'branches'}"><v-icon dark style="margin-right: 5px;">call_split</v-icon>  <span>Cabang</span> </router-link></li>
                        <li><router-link v-bind:to="{name: 'manageSupplier'}"><v-icon dark style="margin-right: 5px;">business</v-icon>  <span>Supplier</span> </router-link></li>
                    </ul>
                </div>
            </aside>
        </div>
        <div class="background-dashboard"></div>
        <div id="appDashboard">
            <main class="dashboardContent" :class="{'showLeft': leftNav}">
            <transition name="fade">
            <router-view></router-view>
            </transition>
            </main>
        </div>
    </div>
      
   </div>
</template>
<style >
.notifRed{
    background: #ff2b2b;
    border-radius: 100px;
    position: absolute;
    right: 4px;
    text-align: center;
    color: white;
    font-size: 11px;
    padding: 2px 6px;
    bottom: 10px;
}
</style>
<script>
import { vueTopprogress } from 'vue-top-progress'
export default {
  components: {
    vueTopprogress
  },
  data () {
    return {
      notif: [],
      user: {},
      error: '',
      loading: true,
      roles: localStorage.getItem('roles'),
      name: localStorage.getItem('name'),
      activeFirst: false,
      wrongPassword: false,
      leftNav: false,
      showDropDown: false
    }
  },
  mounted () {
    this.getUser()
  },
  computed: {
    inisial () {
      var initials = ''
      var names = this.name.split(' ')
      for (let n = 0; n < 2; n++) {
        if (n < names.length) {
          initials += names[n].substring(0, 1).toUpperCase()
        }
      }
      return initials
    }
  },
  methods: {
    getCount () {
      var uri = '/api/count/notif'
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      this.$http.get(uri, config).then(response => {
        this.count = response.data
      })
    },
    rightDropDown () {
      if (this.showDropDown === true) {
        this.showDropDown = false
      } else {
        this.showDropDown = true
      }
    },
    hamburger () {
      if (this.leftNav === true) {
        this.leftNav = false
      } else {
        this.leftNav = true
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
        this.$refs.topProgress.done()
        this.loading = false
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
