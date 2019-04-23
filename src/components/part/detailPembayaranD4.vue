<template id="admin-list">
<div class="contentlist">
<div class="flex-container" >

      <div class="columns m-t-10">
        <div class="column">
          <h1 class="title">Pembayaran Cabang</h1>
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
                <b-table-column label="Nomor Transaksi" sortable >{{ props.row.transactionNumber+"-"+props.row.id }}</b-table-column>
                <b-table-column field="customer.name" label="Nama Konsumen" sortable >{{ props.row.customer.name }}</b-table-column>
                <b-table-column field="customer.phoneNumber" label="Nomor Handphone" sortable >{{ props.row.customer.phoneNumber }}</b-table-column>
                <b-table-column field="customer.address" label="Alamat" sortable >{{ props.row.customer.address }},{{ props.row.customer.city }}</b-table-column>
                <b-table-column field="status" label="Status" sortable >
                  <span v-if="props.row.status == 0"><v-chip color="blue" dark>Pengisian Data</v-chip></span>
                  <span v-if="props.row.status == 1"><v-chip color="orange" dark>Sedang Dikerjakan</v-chip></span>
                  <span v-if="props.row.status == 2"><v-chip color="yellow">Pengerjaan Selesai</v-chip></span>
                  <span v-if="props.row.status == 3"><v-chip color="green" dark>Transaksi Selesai</v-chip></span>
                  </b-table-column>
                <b-table-column label="Pengaturan" sortable ><v-btn color="green" dark @click.prevent="gotoRoute(props.row.transactionNumber,props.row.id)">Detail</v-btn></b-table-column>
                <b-table-column label="Tanggal Transaksi" sortable >{{props.row.created_at }}</b-table-column>
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
                        <p>Belum ada data transaksi</p>
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
    this.$parent.tab = 'branchD4'
    this.getData()
  },
  data () {
    return {
      load: false,
      search: '',
      users: [],
      snackbar: false,
      text: '',
      color: null,
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
          var data = row.transactionNumber + '-' + row.id
          if (this.search !== '') return data.toLowerCase().includes(this.search.toLowerCase())
          return true
        })
      }
    }
  },
  methods: {
    gotoRoute (transactionNumber, id) {
      var tN = transactionNumber.split('-')
      this.$router.push({name: 'detailPembayaran', params: {transactionType: tN[0], transactionNumber: tN[1], idTransaction: id}})
    },
    getData () {
      this.editDialog = false
      this.deleteDialog = false
      this.load = false
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri = this.$apiUrl + 'transactionByBranch/' + this.$route.params.id
      this.$http.get(uri, config).then(response => {
        this.users = response.data
        this.loadData = false
      })
    }
  }
}
</script>
