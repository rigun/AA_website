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
                            <div class="inisial-name">
                                {{inisial}}
                            </div>
                            <div id="textRightNav" class="text-item">
                                <h2 class="name-text">
                                <strong>{{name}}
                                    </strong>
                                </h2>
                                <p class="mute-text" >
                                    {{roles}}
                                </p>
                            </div>
                        </div>
                        </div>
                </div>
            </nav>
    </div>
       <div id="side-menu"  class="side-menu" :class="{'showLeft': leftNav}">
            <aside class="menu">
                <div id="side-header" class="side-header">
                  <router-link :to="{name: 'Landing'}">
                    <div class="menu-label imgLabel">
                     <img :src="require(`@/assets/logo.png`)" style="width: 120px;">
                    </div>
                    </router-link>
                </div>
                <hr class="separator-side">
                <div class="side-body">
                
                    <ul class="menu-list dashboardlist">
                        <li @click.prevent="hideShowLeft500()" ><router-link v-bind:to="{name: 'DashboardContent'}" style="display:flex"><v-icon dark style="margin-right: 5px;">dashboard</v-icon>  <div class="left-sides">Dashboard</div> </router-link></li>
                        <li @click.prevent="hideShowLeft500()" v-if="roles == 'cs'"><router-link v-bind:to="{name: 'transactionCs', params:{id: branchId}}" style="display:flex"><v-icon dark style="margin-right: 5px;">dashboard</v-icon>  <div class="left-sides">Transaksi</div> </router-link></li>
                        <li @click.prevent="hideShowLeft500()" v-if="roles == 'owner'"><router-link v-bind:to="{name: 'branches'}" style="display:flex"><v-icon dark style="margin-right: 5px;">call_split</v-icon>  <div class="left-sides">Cabang</div> </router-link></li>
                        <li @click.prevent="hideShowLeft500()" v-if="roles == 'owner'"><router-link v-bind:to="{name: 'manageSupplier'}" style="display:flex"><v-icon dark style="margin-right: 5px;">business</v-icon>  <div class="left-sides">Supplier</div> </router-link></li>
                        <li @click.prevent="hideShowLeft500()" ><router-link v-bind:to="{name: 'customerManager'}" style="display:flex"><v-icon dark style="margin-right: 5px;">person</v-icon>  <div class="left-sides">Konsumen</div> </router-link></li>
                        <li @click.prevent="hideShowLeft500()" v-if="roles == 'owner'"><router-link v-bind:to="{name: 'historyTransaction'}" style="display:flex"><v-icon dark style="margin-right: 5px;">history</v-icon>  <div class="left-sides">Riwayat</div> </router-link></li>
                    </ul>
                    <ul class="menu-list dashboardlist">
                        <li @click.prevent="hideShowLeft500()"><router-link  :to="{name: 'changePassword'}"  style="display:flex"><v-icon dark style="margin-right: 5px;">lock</v-icon>  <div class="left-sides">Ubah Password</div></router-link></li>
                        <li @click.prevent="hideShowLeft500()"><router-link  :to="{name: 'Logout'}"  style="display:flex"><v-icon dark style="margin-right: 5px;">power_settings_new</v-icon> <div class="left-sides">Logout</div></router-link ></li>
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
.left-sides{
    align-self: center;
    margin-left: 10px;
}
</style>
<script>
import { vueTopprogress } from 'vue-top-progress'
export default {
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  components: {
    vueTopprogress
  },
  data () {
    return {
      notif: [],
      user: {},
      error: '',
      loading: true,
      branchId: localStorage.getItem('branch_id'),
      roles: localStorage.getItem('roles'),
      name: localStorage.getItem('name'),
      activeFirst: false,
      wrongPassword: false,
      leftNav: false,
      showDropDown: false,
      window: {
        width: 0,
        height: 0
      }
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
    hideShowLeft500 () {
      if (this.window.width <= 500) {
        this.leftNav = !this.leftNav
      }
    },
    handleResize () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },
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
