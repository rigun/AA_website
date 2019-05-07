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
        <b-table :data="ordersList" :paginated="true" :per-page="perPage" :current-page.sync="currentPage" :loading="loadData" :pagination-simple="true" :narrowed="true" :mobile-cards="true" :striped="true" :hoverable="true" :default-sort-direction="defaultSortDirection" default-sort="created_at"
                    detailed
            detail-key="id"
            :show-detail-icon="true"
            >
            <template slot-scope="props">
                <b-table-column label="No." sortable>{{ props.index + 1 }}</b-table-column>
                <b-table-column field="supplier.name" label="Nama Supplier" sortable >{{ props.row.supplier.name}}</b-table-column>
                <b-table-column field="supplier.phoneNumber" label="Nomor Telepon Supplier" sortable >{{ props.row.supplier.phoneNumber}}</b-table-column>
                <b-table-column field="supplier.address" label="Alamat Supplier" sortable >{{ props.row.supplier.address}}, {{props.row.supplier.city}}</b-table-column>
                <b-table-column field="supplier.address" label="Sales yang bertugas" sortable ><span v-if="props.row.sales != null">{{props.row.sales.name}}</span></b-table-column>
                <b-table-column label="Dipesan pada" sortable >{{props.row.created_at }}</b-table-column>
                <b-table-column label="Status" centered >
                  <v-chip v-if="props.row.status == 0" dark color="indigo">Pengisian Data</v-chip>
                  <v-chip v-if="props.row.status == 1" dark color="orange">Sedang dipesan</v-chip>
                  <v-chip v-if="props.row.status == 2" dark color="green">Pesanan dikonfirmasi</v-chip>
                </b-table-column>
                <b-table-column label="Pengaturan" centered >
                  <v-btn color="green" small dark @click.prevent="goto(props.row.id)" v-if="props.row.status == 2">Detail</v-btn>
                  <v-btn color="orange" small dark @click.prevent="goto(props.row.id)" v-if="props.row.status == 1">Konfirmasi</v-btn>
                  <v-btn color="indigo" small dark @click.prevent="gotoUpdate(props.row.supplier.id)" v-if="props.row.status == 0">Perbaharui</v-btn>
                  </b-table-column>
            </template>
            <template slot="detail" slot-scope="props">
                    <div class="columns" style="border-bottom: solid 1px black">
                      <div class="column">Kode Sparepart</div>
                      <div class="column">Nama Sparepart</div>
                      <div class="column">Total Pesan</div>
                      <div class="column">Satuan Pemesanan</div>
                    </div>
                    <div class="columns" v-for="dt in props.row.detail" :key="dt.id" style="border-bottom: solid 1px black">
                      <div class="column">{{dt.sparepart.code}}</div>
                      <div class="column">{{dt.sparepart.name}}</div>
                      <div class="column">{{dt.total}}</div>
                      <div class="column">{{dt.unit}}</div>
                    </div>
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
          if (this.search !== '') return row.supplier.name.toLowerCase().includes(this.search.toLowerCase())
          return true
        })
      }
    }
  },
  methods: {
    gotoRoute (name) {
      this.$router.push({name: name})
    },
    goto (id) {
      this.$router.push({name: 'konfirmasiPengadaan', params: {orderId: id}})
    },
    gotoUpdate (id) {
      this.$router.push({name: 'sparepartBranchSupplier', params: {supplierId: id}})
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
