<template>
    <div id="detail">
    <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
        <li>
            <router-link v-bind:to="{name: 'manageSupplier'}">Home</router-link>
        </li>
        <li class="is-active"><a href="#">Supplier {{supplier.name}}</a></li>
    </ul>
    </nav>
        <article class="media">
            <div class="media-content">
                <div class="content">
                <p>
                    <strong style="font-size: 22px">{{supplier.name}} <br/> {{supplier.address}} <br/> {{supplier.city}} <br/> ({{supplier.phoneNumber}})</strong> 
                    <br>
                    <span style="font-size: 13px;color: #888888;">
                        Bekerja sama pada {{supplier.created_at}}
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
                    <li :class="{'is-active': tab == 'supplierD1'}">
                    <a @click.prevent="goto('supplierD1')">
                        <v-icon>list</v-icon>
                        <span>Sparepart</span>
                    </a>
                    </li>
                    <li :class="{'is-active': tab == 'supplierD2'}">
                    <a @click.prevent="goto('supplierD2')">
                        <v-icon>details</v-icon>
                        <span>Sparepart</span>
                    </a>
                    </li>
                    <li :class="{'is-active': tab == 'supplierD3'}">
                    <a @click.prevent="goto('supplierD3')">
                        <v-icon>pin_drop</v-icon>
                        <span>Transaksi</span>
                    </a>
                    </li>
                    <li :class="{'is-active': tab == 'supplierD4'}">
                    <a @click.prevent="goto('supplierD4')">
                        <v-icon>check_circle</v-icon>
                        <span>Pemesanan</span>
                    </a>
                    </li>
                    <li :class="{'is-active': tab == 'supplierD5'}">
                    <a @click.prevent="goto('supplierD5')">
                        <v-icon>local_printshop</v-icon>
                        <span>Laporan</span>
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
      tab: 'supplierD1',
      supplier: {}
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
      this.$http.get(this.$apiUrl + 'person/' + this.$route.params.id, config).then(response => {
        this.supplier = response.data.result
      })
    }
  }
}
</script>