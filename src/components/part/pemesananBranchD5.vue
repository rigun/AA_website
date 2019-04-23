<template id="admin-list">
<div class="contentlist">
<div class="flex-container" >

      <div class="columns m-t-10">
        <div class="column">
          <h1 class="title">Pengadaan Sparepart</h1>
        </div>
        <div class="column">
            <v-flex sm6 d-flex style="margin-left: auto">
                <v-btn slot="activator" color="blue lighten-2" dark @click.prevent="gotoRoute('listSupplierBranch')">Pemesanan Baru</v-btn>
            </v-flex>
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
        <b-table :data="ordersList" :paginated="true" :per-page="perPage" :current-page.sync="currentPage" :loading="loadData" :pagination-simple="true" :narrowed="true" :mobile-cards="true" :striped="true" :hoverable="true" :default-sort-direction="defaultSortDirection" default-sort="created_at">
            <template slot-scope="props">
                <b-table-column label="No." sortable>{{ props.index + 1 }}</b-table-column>
                <b-table-column field="supplier" label="Nama Supplier" sortable >{{ props.row}}</b-table-column>
                <b-table-column label="Pengaturan" sortable ><v-btn color="green" small dark @click.prevent="gotoRoute(props.row,props.row)">Detail</v-btn></b-table-column>
                <b-table-column label="Diterima pada" sortable >{{props.row.created_at }}</b-table-column>
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
                        <p>Belum ada data pemesanan</p>
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
      load: false,
      search: '',
      orders: [],
      snackbar: false,
      text: '',
      color: null,
      deleteId: -1,
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
    ordersList () {
      if (this.orders.length) {
        return this.orders.filter((row, index) => {
          var data = row.transactionNumber + '-' + row.id
          if (this.search !== '') return data.toLowerCase().includes(this.search.toLowerCase()) || row.customer.name.toLowerCase().includes(this.search.toLowerCase())
          return true
        })
      }
    }
  },
  methods: {
    gotoRoute (name) {
      this.$router.push({name: name})
    },
    getData () {
      this.load = false
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri = this.$apiUrl + 'pemesanan/' + this.$route.params.id
      this.$http.get(uri, config).then(response => {
        this.orders = response.data
        this.loadData = false
      })
    }
  }
}
</script>
