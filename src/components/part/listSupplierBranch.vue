<template id="admin-list">
<div class="contentlist">
<div class="flex-container" >
 <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
            <router-link v-bind:to="{name: 'branchD5'}">Pemesanan</router-link>
        </li>
        <li class="is-active"><a href="#">Supplier</a></li>
    </ul>
    </nav>
      <div class="columns m-t-10">
        <div class="column">
          <h1 class="title">Daftar Supplier</h1>
        </div>
      </div>
       <nav class="level">
             <div class="level-left">
                <b-field grouped group-multiline>
                    <b-select v-model="perPage" :disabled="!isPaginated">
                        <option value="10">10 per page</option>
                        <option value="20">20 per page</option>
                        <option value="50">50 per page</option>
                    </b-select>
                </b-field>
             </div>
             <div class="level-right">
                    <b-field>
                        <b-input placeholder="Search..."
                            type="search"
                            icon="magnify"
                            v-model="search">
                        </b-input>
                    </b-field>
                 </div>
           </nav>
        <b-table :data="usersList" :paginated="true" :per-page="perPage" :current-page.sync="currentPage" :loading="loadData" :pagination-simple="true" :narrowed="true" :mobile-cards="true" :striped="true" :hoverable="true" :default-sort-direction="defaultSortDirection" default-sort="created_at">
            <template slot-scope="props">
                <b-table-column label="No." sortable>{{ props.index + 1 }}</b-table-column>
                <b-table-column field="name" label="Nama" sortable>{{ props.row.name }}</b-table-column>
                <b-table-column field="phoneNumber" label="Nomor Telepon" sortable>{{ props.row.phoneNumber }}</b-table-column>
                <b-table-column field="address" label="Alamat" sortable >{{ props.row.address }}</b-table-column>
                <b-table-column field="city" label="Kota" sortable >{{ props.row.city }}</b-table-column>
                <b-table-column field="created_at" label="Bekerjasama pada" sortable >{{props.row.created_at }}</b-table-column>
                  <b-table-column label="Pengaturan" :visible="!loadData">
                    <v-btn color="green lighten-2" dark @click="goto(props.row.id)">Detail Supplier</v-btn>
                </b-table-column>
            </template>
              <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="emoticon-sad"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Belum ada data supplier, silahkan tambahkan supplier terlebih dahulu</p>
                    </div>
                </section>
            </template>
        </b-table>
      
       <v-snackbar
          v-model="snackbar"
          :color="color"
          :multi-line="true"
          :timeout="3000"
        >
          {{ text }}
          <v-btn
            dark
            flat
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
</div>
</div>
</template>

<script>
export default {
  mounted () {
    this.$parent.tab = 'branchD5'
    this.getData()
  },
  data () {
    return {
      search: '',
      users: [],
      load: false,
      snackbar: false,
      text: '',
      color: null,
      reset: false,
      editData: {
        name: '',
        role: 'supplier',
        phoneNumber: '',
        address: '',
        city: ''
      },
      loading: false,
      loadData: true,
      isPaginated: true,
      isPaginationSimple: true,
      defaultSortDirection: 'desc',
      currentPage: 1,
      perPage: 10
    }
  },
  computed: {
    usersList () {
      if (this.users.length) {
        return this.users.filter((row, index) => {
          if (this.search !== '') return row.name.toLowerCase().includes(this.search.toLowerCase()) || row.phoneNumber.toLowerCase().includes(this.search.toLowerCase())
          return true
        })
      }
    }
  },
  methods: {
    goto (id) {
      this.$router.push({name: 'sparepartBranchSupplier', params: {supplierId: id}})
    },
    getData () {
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      uri = this.$apiUrl + 'supplierBranch/' + this.$route.params.id
      this.$http.get(uri, config).then(response => {
        this.users = response.data
        this.loadData = false
      })
    }
  }
}
</script>
