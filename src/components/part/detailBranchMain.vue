<template>
    <div id="detail">
    <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
        <li>
            <router-link v-bind:to="{name: 'branches'}">Home</router-link>
        </li>
        <li class="is-active"><a href="#">Cabang {{branch.name}}</a></li>
    </ul>
    </nav>
        <article class="media">
            <div class="media-content">
                <div class="content">
                <p>
                    <strong style="font-size: 22px">Cabang {{branch.name}}</strong> 
                    <br>
                    <span style="font-size: 13px;color: #888888;">
                        dibuat pada {{branch.created_at}}
                    </span> 
                </p>
                </div>
            </div>
            <div class="media-right">
                <!-- <v-btn block slot="activator" color="orange lighten-2" @click.prevent="eventData = event;dialog = true; option.img = '../../images/banner/'+event.banner.filename; typeInput = 'edit';tempSlug = event.slug">Edit Event</v-btn> -->
            </div>
            </article>
            <div class="tabs is-boxed">
                <ul>
                    <li :class="{'is-active': tab == 'branchD1'}">
                    <a @click.prevent="goto('branchD1')">
                        <v-icon>list</v-icon>
                        <span>Pegawai</span>
                    </a>
                    </li>
                    <li :class="{'is-active': tab == 'branchD2'}">
                    <a @click.prevent="goto('branchD2')">
                        <v-icon>details</v-icon>
                        <span>Sparepart</span>
                    </a>
                    </li>
                    <li :class="{'is-active': tab == 'branchD3'}">
                    <a @click.prevent="goto('branchD3')">
                        <v-icon>check_circle</v-icon>
                        <span>Transaksi</span>
                    </a>
                    </li>
                    <li :class="{'is-active': tab == 'branchD4'}">
                    <a @click.prevent="goto('branchD4')">
                        <v-icon>check_circle</v-icon>
                        <span>Pembayaran</span>
                    </a>
                    </li>
                    <li :class="{'is-active': tab == 'branchD5'}">
                    <a @click.prevent="goto('branchD5')">
                        <v-icon>check_circle</v-icon>
                        <span>Pengadaan</span>
                    </a>
                    </li>
                </ul>
                </div>
             <div id="app">
                <main class="tabcontent">
                <transition name="fade">
                <router-view></router-view>
                </transition>
                </main>
            </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 'branchD1',
      branch: {}
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    goto (tab) {
      this.tab = tab
      this.$router.push({name: tab})
    },
    getData () {
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri = this.$apiUrl + 'branch/' + this.$route.params.id
      this.$http.get(uri, config).then(response => {
        this.branch = response.data.result
      })
    }
  }
}
</script>