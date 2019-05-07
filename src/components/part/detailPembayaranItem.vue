<template id="admin-list">
<div class="contentlist">
<div class="flex-container" >
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
            <router-link v-bind:to="{name: 'branchD4'}">Pembayaran</router-link>
        </li>
        <li class="is-active"><a href="#">{{$route.params.transactionType + "-" +$route.params.transactionNumber + "-" + $route.params.idTransaction}}</a></li>
    </ul>
    </nav>
      <div class="columns m-t-10">
        <div class="column">
          <p class="title">Nomor Transaksi: {{transaction.transactionNumber + "-" + transaction.id}} <br> Konsumen: <br> {{transaction.customer.name}} <br> Telepon: {{transaction.customer.phoneNumber}}</p>
        </div>
        <div class="column">
          <p>CS: {{transaction.cs.name}}</p>
          <p>Montir:</p>
          <p v-for="dt in uniqueMontir" :key="dt.montir_id"><span v-if="dt.montir_id != null">- {{dt.montir.name}}</span></p>
          <p>Kendaraan:</p>          
          <p v-for="dt in detailTransactions" :key="dt.vehicle_customer.vehicle.id"><span>- {{dt.vehicle_customer.vehicle.merk + " " + dt.vehicle_customer.vehicle.type + " " + dt.vehicle_customer.licensePlate}}</span></p>
        </div>
        <div class="column">
              <p v-if="montirError">Nota Lunas Belum Bisa di Cetak Karena Transaksi Belum Selesai</p>

            <v-flex sm6 d-flex style="margin-left: auto">
              <v-btn slot="activator" color="blue lighten-2" dark @click.prevent="dialogNotaLunas = true;countDiskon();countChange()" v-if="!montirError">Cetak Nota Lunas</v-btn>
            </v-flex>
        </div>
      </div>
      <div v-if="$route.params.transactionType != 'SV'">

      <div class="columns m-t-10">
        <div class="column">
          <h1 class="title">Sparepart</h1>
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
           </nav>
        <b-table :data="detailTransactionsSparepartList" :paginated="true" :per-page="perPage" :current-page.sync="currentPage" :loading="loadDataSparepart" :pagination-simple="true" :narrowed="true" :mobile-cards="true" :striped="true" :hoverable="true">
            <template slot-scope="props">
                <b-table-column label="No." sortable>{{ props.index + 1 }}</b-table-column>
                <b-table-column field="code" label="Kode" sortable >{{props.row.data.sparepart.code}}</b-table-column>
                <b-table-column field="name" label="Nama" sortable >{{props.row.data.sparepart.name}}</b-table-column>
                <b-table-column field="merk" label="Merk" sortable >{{props.row.data.sparepart.merk}}</b-table-column>
                <b-table-column field="position" label="Rak" sortable >{{props.row.position}}</b-table-column>
                <b-table-column label="SubTotal" style="text-align:right" numeric>{{price(props.row.data.total * props.row.data.price)}}</b-table-column>
              
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
                        <p>Belum ada data sparepart, silahkan tambahkan sparepart terlebih dahulu</p>
                    </div>
                </section>
            </template>
            <template slot="footer">
                <th colspan="6" style="text-align:right">
                    <div class="th-wrap is-numeric">{{price(TotalSparepart())}} </div>
                </th>
            </template>
        </b-table>
      </div>
      <div v-if="$route.params.transactionType != 'SP'"> 
        <div class="columns m-t-10">
        <div class="column">
          <h1 class="title">Layanan</h1>
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
     
           </nav>
        <b-table :data="detailTransactionsLayananList" :paginated="true" :per-page="perPage" :current-page.sync="currentPage" :loading="loadDataLayanan" :pagination-simple="true" :narrowed="true" :mobile-cards="true" :striped="true" :hoverable="true">
            <template slot-scope="props">
                <b-table-column label="No." sortable>{{ props.index + 1 }}</b-table-column>
                <b-table-column field="id" label="Kode" sortable >{{props.row.service.id}}</b-table-column>
                <b-table-column field="name" label="Nama" sortable >{{props.row.service.name}}</b-table-column>
                <b-table-column label="SubTotal" style="text-align:right" numeric>{{price(props.row.total * props.row.price)}}</b-table-column>
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
                        <p>Belum ada data layanan, silahkan tambahkan layanan terlebih dahulu</p>
                    </div>
                </section>
            </template>
            <template slot="footer">
                <th colspan="4" style="text-align:right">
                    <div class="th-wrap is-numeric">{{price(TotalService())}} </div>
                </th>
            </template>
        </b-table>
      </div>
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
          <v-layout row justify-center>
                <v-dialog v-model="dialogNotaLunas" persistent max-width="600px">
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                  <v-card>
                    <v-card-title>
                        Rincian Pembayaran
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                              <v-text-field label="Total Biaya*" v-model="displayTotal" :disabled="true"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field label="Diskon*" v-model="editData.diskon" @input="countDiskon();countChange()"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field label="Biaya yang harus dibayar*" v-model="displayBiayaMinDiskon" :disabled="true"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field label="Total Bayar*" v-model="editData.payment" @input="countChange()" :error-messages="changeError"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                              <v-text-field label="Kembalian*" v-model="displayKembalian" :disabled="true"></v-text-field>
                            </v-flex>
                        </v-layout>
                      </v-container>
                      <small>*Wajib diisi</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" dark @click.prevent="dialogNotaLunas = false;">Batal</v-btn>
                      <v-btn color="green darken-1" dark :loading="load" @click.prevent="cetakNotaLunas()">Cetak</v-btn>
                    </v-card-actions>
                  </v-card>
                    </v-form>
                </v-dialog>
              </v-layout>
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
      displayTotal: 0,
      totalHarga: 0,
      dialogNotaLunas: false,
      montir: [],
      layanans: [],
      errorLayanan: '',
      subtotalLayanan: 0,
      spareparts: [],
      load: false,
      valid: true,
      search: '',
      transaction: {
        customer: '',
        cs: {
          name: ''
        }
      },
      detailTransactions: [],
      detailTransactionsLayanan: [],
      detailTransactionsSparepart: [],
      snackbar: false,
      text: '',
      color: null,
      reset: false,
      loading: false,
      loadDataSparepart: true,
      loadDataLayanan: true,
      isPaginated: true,
      isPaginationSimple: true,
      defaultSortDirection: 'desc',
      currentPage: 1,
      perPage: 10,
      subtotal: 0,
      editData: {
        diskon: 0,
        payment: 0
      },
      uniqueMontir: [],
      biayaMinDiskon: 0,
      displayBiayaMinDiskon: 0,
      displayKembalian: 0,
      changeError: '',
      montirError: false
    }
  },
  computed: {
    detailTransactionsSparepartList () {
      if (this.detailTransactionsSparepart.length) {
        return this.detailTransactionsSparepart.filter((row, index) => {
          if (this.search !== '') return row.detail.name.toLowerCase().includes(this.search.toLowerCase()) || row.detail.user.email.toLowerCase().includes(this.search.toLowerCase()) || row.detail.phoneNumber.toLowerCase().includes(this.search.toLowerCase())
          return true
        })
      }
    },
    detailTransactionsLayananList () {
      if (this.detailTransactionsLayanan.length) {
        return this.detailTransactionsLayanan.filter((row, index) => {
          if (this.search !== '') return row.detail.name.toLowerCase().includes(this.search.toLowerCase()) || row.detail.user.email.toLowerCase().includes(this.search.toLowerCase()) || row.detail.phoneNumber.toLowerCase().includes(this.search.toLowerCase())
          return true
        })
      }
    }
  },
  methods: {
    countDiskon () {
      this.biayaMinDiskon = this.totalHarga - this.editData.diskon
      this.displayBiayaMinDiskon = this.price(this.biayaMinDiskon)
    },
    countChange () {
      this.editData.kembalian = this.editData.payment - this.biayaMinDiskon
      this.displayKembalian = this.price(this.editData.kembalian)
      if (this.editData.kembalian < 0) {
        this.changeError = 'Total bayar masih kurang'
      } else {
        this.changeError = ''
      }
    },
    montirdetailTransactions () {
      var unique = []
      for (var i = 0; i < this.detailTransactions.length; i++) {
        var j = unique.filter((row, index) => {
          if (row.montir_id === this.detailTransactions[i].montir_id) {
            return false
          }
          return true
        })
        if (j.length === unique.length) {
          if (this.detailTransactions[i].montir_id != null) {
            unique.push(this.detailTransactions[i])
          } else {
            this.montirError = true
          }
        }
      }
      this.uniqueMontir = unique
    },
    cetakNotaLunas () {
      if (!this.$refs.form.validate()) {
        this.snackbar = true
        this.text = 'Mohon untuk melengkapi form yang tersedia'
        this.color = 'error'
        return
      }
      if (this.changeError !== '') {
        this.snackbar = true
        this.text = 'Mohon maaf, pembayaran masih kurang'
        this.color = 'error'
        return
      }
      this.load = true
      var config = {
        responseType: 'blob',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      this.editData.totalServices = this.TotalService()
      this.editData.totalSpareparts = this.TotalSparepart()
      var uri = this.$apiUrl + 'notaLunas/' + this.$route.params.idTransaction
      this.$http.post(uri, this.editData, config).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'notaLunas_' + this.$route.params.transactionType + '-' + this.$route.params.transactionNumber + '-' + this.$route.params.idTransaction + '.pdf')
        document.body.appendChild(link)
        link.click()
        this.load = false
        this.dialogNotaLunas = false
      }).catch(error => {
        console.log(error.response)
        this.load = false
        this.snackbar = true
        this.color = 'error'
        this.text = 'Coba lagi'
      })
    },
    price (value) {
      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
      })
      return formatter.format(value)
    },
    TotalSparepart () {
      var sum = 0
      for (let i = 0; i < this.detailTransactionsSparepart.length; i++) {
        sum = sum + this.detailTransactionsSparepart[i].data.total * this.detailTransactionsSparepart[i].data.price
      }
      return sum
    },
    TotalService () {
      var sum = 0
      for (let i = 0; i < this.detailTransactionsLayanan.length; i++) {
        sum = sum + this.detailTransactionsLayanan[i].total * this.detailTransactionsLayanan[i].price
      }
      return sum
    },
    getData () {
      this.load = false
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri = this.$apiUrl + 'mytransaction/' + this.$route.params.idTransaction
      this.$http.get(uri, config).then(response => {
        this.detailTransactionsLayanan = response.data.service
        this.detailTransactionsSparepart = response.data.sparepart
        this.detailTransactions = response.data.detailTransaction
        this.transaction = response.data.transaction
        this.loadDataSparepart = false
        this.loadDataLayanan = false
        this.$nextTick(function () {
          this.totalHarga = this.TotalService() + this.TotalSparepart()
          this.displayTotal = this.price(this.totalHarga)
          this.montirdetailTransactions()
        })
      })
    }
  }
}
</script>

