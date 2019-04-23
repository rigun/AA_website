<template id="admin-list">
<div class="contentlist">
<div class="flex-container" >
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
            <router-link v-bind:to="{name: 'branchD3'}">Transaction</router-link>
        </li>
        <li>
            <router-link v-bind:to="{name: 'detailTransaction', params: {transactionType: $route.params.transactionType, transactionNumber: $route.params.transactionNumber, idTransaction: $route.params.idTransaction}}">
                {{$route.params.transactionType + "-" +$route.params.transactionNumber + "-" + $route.params.idTransaction}}
            </router-link>
        </li>
        <li class="is-active"><a href="#">{{myVehicle.licensePlate}}</a></li>
    </ul>
    </nav>
      <div class="columns m-t-10">
        <div class="column">
          <h1 class="title">Detail Transaksi <br> Kendaraan Konsumen: <br> {{myVehicle.vehicle.merk}} - {{myVehicle.vehicle.type}} <br> {{myVehicle.licensePlate}}</h1>
        </div>
        <div class="column">
            <v-flex sm6 d-flex style="margin-left: auto">
              <v-btn slot="activator" color="blue lighten-2" dark @click.prevent="dialogSPK = true" v-if="$route.params.transactionType != 'SP'">Cetak SPK</v-btn>
            </v-flex>
        </div>
      </div>
      <div v-if="$route.params.transactionType != 'SV'">

      <div class="columns m-t-10">
        <div class="column">
          <h1 class="title">Sparepart</h1>
        </div>
        <div class="column">
            <v-flex sm6 d-flex style="margin-left: auto">
              <v-btn slot="activator" color="green" dark @click.prevent="editDialogSparepart = true; typeInputSparepart = 'new'">Tambahkan Sparepart</v-btn>
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
           </nav>
        <b-table :data="detailTransactionsSparepartList" :paginated="true" :per-page="perPage" :current-page.sync="currentPage" :loading="loadDataSparepart" :pagination-simple="true" :narrowed="true" :mobile-cards="true" :striped="true" :hoverable="true">
            <template slot-scope="props">
                <b-table-column label="No." sortable>{{ props.index + 1 }}</b-table-column>
                <b-table-column field="code" label="Kode" sortable >{{props.row.data.sparepart.code}}</b-table-column>
                <b-table-column field="name" label="Nama" sortable >{{props.row.data.sparepart.name}}</b-table-column>
                <b-table-column field="merk" label="Merk" sortable >{{props.row.data.sparepart.merk}}</b-table-column>
                <b-table-column field="position" label="Rak" sortable >{{props.row.position}}</b-table-column>
                <b-table-column field="total" label="Jumlah" sortable >{{props.row.data.total}}</b-table-column>
                            <b-table-column label=""><v-menu transition="slide-x-transition" offset-x left>
                                <v-btn slot="activator" icon >
                                <v-icon>more_vert</v-icon>
                                </v-btn>
                            <v-list>
                            <v-list-tile  @click.prevent="seteditDataSparepart(props.row); editDialogSparepart = true;typeInputSparepart = 'edit'">
                                <v-list-tile-title  >Perbaharui</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile @click.prevent="deleteId = props.row.data.id; deleteDialog = true; itemPart = 'sparepart'">
                                <v-list-tile-title >Hapus</v-list-tile-title>
                            </v-list-tile>
                            </v-list>
                        </v-menu>
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
                        <p>Belum ada data sparepart, silahkan tambahkan sparepart terlebih dahulu</p>
                    </div>
                </section>
            </template>
        </b-table>
      </div>
      <div v-if="$route.params.transactionType != 'SP'"> 
        <div class="columns m-t-10">
        <div class="column">
          <h1 class="title">Layanan</h1>
        </div>
        <div class="column">
            <v-flex sm6 d-flex style="margin-left: auto">
              <v-btn slot="activator" color="green" dark @click.prevent="editDialogLayanan = true; typeInputLayanan = 'new'">Tambahkan Layanan</v-btn>
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

           </nav>
        <b-table :data="detailTransactionsLayananList" :paginated="true" :per-page="perPage" :current-page.sync="currentPage" :loading="loadDataLayanan" :pagination-simple="true" :narrowed="true" :mobile-cards="true" :striped="true" :hoverable="true">
            <template slot-scope="props">
                <b-table-column label="No." sortable>{{ props.index + 1 }}</b-table-column>
                <b-table-column field="id" label="Kode" sortable >{{props.row.service.id}}</b-table-column>
                <b-table-column field="name" label="Nama" sortable >{{props.row.service.name}}</b-table-column>
                <b-table-column field="total" label="Jumlah" sortable >{{props.row.total}}</b-table-column>
                            <b-table-column label=""><v-menu transition="slide-x-transition" offset-x left>
                                <v-btn slot="activator" icon >
                                <v-icon>more_vert</v-icon>
                                </v-btn>
                            <v-list>
                            <v-list-tile  @click.prevent="seteditDataLayanan(props.row); editDialogLayanan = true;typeInputLayanan = 'edit'">
                                <v-list-tile-title  >Perbaharui</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile @click.prevent="deleteId = props.row.id; deleteDialog = true; itemPart = 'layanan'">
                                <v-list-tile-title >Hapus</v-list-tile-title>
                            </v-list-tile>
                            </v-list>
                        </v-menu>
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
                        <p>Belum ada data layanan, silahkan tambahkan layanan terlebih dahulu</p>
                    </div>
                </section>
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

        <!-- edit -->
         <v-layout row justify-center>
                            <v-dialog v-model="editDialogSparepart" persistent max-width="600px">
                                <v-form
                                    ref="form1"
                                    v-model="valid"
                                    lazy-validation
                                >
                              <v-card>
                                <v-card-title>
                                    Sparepart yang dibeli
                                </v-card-title>
                                <v-card-text>
                                  <v-container grid-list-md>
                                    <v-layout wrap>
                                                                            <v-flex xs12>
                                         <v-autocomplete
                                                :items="spareparts"
                                                :filter="sparepartFilter"
                                                item-text="view"
                                                label="Sparepart yang tersedia dicabang ini (kode sparepart)"
                                                :rules="[rules.required]"
                                                v-model="editData.sparepart"
                                                return-object
                                                :error-messages="errorSparepart"
                                                @input="countPrice();cekSparepartCode()"
                                          ></v-autocomplete>
                                      </v-flex>
                                      <v-flex xs12>
                                        <v-text-field label="Kode Sparepart*" v-model="editData.sparepart.code" :disabled="true"></v-text-field>
                                      </v-flex>
                                       <v-flex xs12>
                                        <v-text-field label="Nama Sparepart*" v-model="editData.sparepart.name" :disabled="true"></v-text-field>
                                      </v-flex>
                                       <v-flex xs12>
                                        <v-text-field label="Merk Sparepart*" v-model="editData.sparepart.merk" :disabled="true"></v-text-field>
                                      </v-flex>
                                       <v-flex xs12>
                                        <v-text-field label="Harga Sparepart*" v-model="editData.sparepart.sell" :disabled="true"></v-text-field>
                                      </v-flex>
                                       <v-flex xs12>
                                        <v-text-field label="Jumlah Sparepart yang dibeli*" required v-model="editData.total" :rules="[rules.required, rules.numberOnly]" @input="countPrice()"></v-text-field>
                                      </v-flex>
                                       <v-flex xs12>
                                        <v-text-field label="Subtotal*" :value="subtotal" :disabled="true"></v-text-field>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                  <small>*Wajib diisi</small>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="red darken-1" dark @click.prevent="editDialogSparepart = false; resetData('sparepart')">Batal</v-btn>
                                  <v-btn color="green darken-1" dark :loading="load" v-if="typeInputSparepart == 'new'" @click.prevent="SendData('sparepart')">Tambahkan</v-btn>
                                  <v-btn color="orange darken-1" dark :loading="load" v-if="typeInputSparepart == 'edit'" @click.prevent="UpdateData('sparepart')">Perbaharui</v-btn>
                                </v-card-actions>
                              </v-card>
                                </v-form>
                            </v-dialog>
                          </v-layout>
        <!-- edit -->
        <!-- edit -->
         <v-layout row justify-center>
                            <v-dialog v-model="editDialogLayanan" persistent max-width="600px">
                                <v-form
                                    ref="form2"
                                    v-model="valid"
                                    lazy-validation
                                >
                              <v-card>
                                <v-card-title>
                                    Layanan yang diinginkan
                                </v-card-title>
                                <v-card-text>
                                  <v-container grid-list-md>
                                    <v-layout wrap>
                                                                            <v-flex xs12>
                                         <v-autocomplete
                                                :items="layanans"
                                                :filter="layananFilter"
                                                item-text="view"
                                                label="Layanan yang tersedia"
                                                :rules="[rules.required]"
                                                v-model="editData.layanan"
                                                return-object
                                                :error-messages="errorLayanan"
                                                @input="countPriceLayanan();cekLayanan()"
                                          ></v-autocomplete>
                                      </v-flex>
                                       <v-flex xs12>
                                        <v-text-field label="Jumlah layanan yang dilakukan*" required v-model="editData.total" :rules="[rules.required, rules.numberOnly]" @input="countPriceLayanan()"></v-text-field>
                                      </v-flex>
                                       <v-flex xs12>
                                        <v-text-field label="Subtotal*" :value="subtotalLayanan" :disabled="true"></v-text-field>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                  <small>*Wajib diisi</small>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="red darken-1" dark @click.prevent="editDialogLayanan = false; resetData('layanan')">Batal</v-btn>
                                  <v-btn color="green darken-1" dark :loading="load" v-if="typeInputLayanan == 'new'" @click.prevent="SendData('layanan')">Tambahkan</v-btn>
                                  <v-btn color="orange darken-1" dark :loading="load" v-if="typeInputLayanan == 'edit'" @click.prevent="UpdateData('itemPartlayanan')">Perbaharui</v-btn>
                                </v-card-actions>
                              </v-card>
                                </v-form>
                            </v-dialog>
                          </v-layout>
        <!-- edit -->
        <!-- edit -->
         <v-layout row justify-center>
                            <v-dialog v-model="dialogSPK" persistent max-width="600px">
                                <v-form
                                    ref="form"
                                    v-model="valid"
                                    lazy-validation
                                >
                              <v-card>
                                <v-card-title>
                                    Montir yang ditugaskan
                                </v-card-title>
                                <v-card-text>
                                  <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                         <v-autocomplete
                                                :items="montir"
                                                :filter="montirFilter"
                                                item-text="name"
                                                label="Nama Montir"
                                                :rules="[rules.required]"
                                                v-model="editData.montir"
                                                return-object
                                          ></v-autocomplete>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                  <small>*Wajib diisi</small>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="red darken-1" dark @click.prevent="dialogSPK = false;">Batal</v-btn>
                                  <v-btn color="green darken-1" dark :loading="load" @click.prevent="cetakSPK()">Cetak</v-btn>
                                </v-card-actions>
                              </v-card>
                                </v-form>
                            </v-dialog>
                          </v-layout>
        <!-- edit -->
        <!-- delete -->
          <v-layout row justify-center>
                  <v-dialog v-model="deleteDialog" persistent max-width="290">
                    <v-card>
                      <v-card-title class="headline">Hapus Data Ini ?</v-card-title>
                      <v-card-text>Data yang dihapus tidak akan bisa dikembalikan lagi</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" flat @click="deleteDialog = false; deleteId = -1">Batal</v-btn>
                        <v-btn color="red darken-1" flat @click="deleteData()">Hapus</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-layout>
        <!-- delete -->
</div>
</div>
</template>

<script>
export default {
  mounted () {
    this.$parent.tab = 'branchD3'
    this.getData('sparepart')
    this.getData('layanan')
    this.getVehicle()
    this.getSparepart()
    this.getLayanan()
    this.getMontir()
  },
  data () {
    return {
      montir: [],
      dialogSPK: false,
      itemPart: 'sparepart',
      layanans: [],
      errorLayanan: '',
      typeInputLayanan: 'new',
      detailTransactionsLayanan: [],
      editDialogLayanan: false,
      editDataLayanan: {
        layanan: {
          name: '',
          code: '',
          merk: '',
          type: ''
        },
        total: 1
      },
      subtotalLayanan: 0,
      spareparts: [],
      myVehicle: {
        licensePlate: '',
        vehicle: {
          merk: '',
          type: ''
        }
      },
      errorSparepart: '',
      customer: {},
      load: false,
      valid: true,
      typeInputSparepart: 'new',
      search: '',
      detailTransactionsSparepart: [],
      dialog: false,
      deleteDialog: false,
      editDialogSparepart: false,
      snackbar: false,
      text: '',
      color: null,
      reset: false,
      editData: {
        sparepart: {
          name: '',
          code: '',
          merk: '',
          type: ''
        },
        total: 1
      },
      branchSpareprats: [],
      deleteId: -1,
      loading: false,
      loadDataSparepart: true,
      loadDataLayanan: true,
      isPaginated: true,
      isPaginationSimple: true,
      defaultSortDirection: 'desc',
      currentPage: 1,
      perPage: 10,
      roles: [],
      emailRules: [
        v => !!v || 'Email tidak boleh kosong',
        v => /.+@.+/.test(v) || 'Email tidak valid'
      ],
      rules: {
        required: value => !!value || 'Data ini tidak boleh kosong',
        numberOnly: value => !isNaN(value) || 'Data tidak valid, hanya diijinkan memasukkan angka',
        textOnly: value => RegExp(/^[A-Za-z ]+$/).test(value) || 'Data tidak valid, hanya diijinkan memasukkan huruf'
      },
      subtotal: 0
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
    cetakSPK () {
      if (!this.$refs.form.validate()) {
        this.snackbar = true
        this.text = 'Mohon untuk melengkapi form yang tersedia'
        this.color = 'error'
        return
      }
      this.editData.montir_id = this.editData.montir.id
      this.load = true
      var config = {
        responseType: 'blob',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri = this.$apiUrl + 'spk/' + this.$route.params.idTransaction + '/' + this.$route.params.detailId
      this.$http.post(uri, this.editData, config).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'spk_' + this.$route.params.transactionType + '-' + this.$route.params.transactionNumber + '-' + this.$route.params.idTransaction + '.pdf')
        document.body.appendChild(link)
        link.click()
        this.load = false
        this.dialogSPK = false
      }).catch(error => {
        console.log(error.response)
        this.load = false
        this.snackbar = true
        this.color = 'error'
        this.text = 'Coba lagi'
      })
    },
    getMontir () {
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      uri = this.$apiUrl + 'montir/' + this.$route.params.id
      this.$http.get(uri, config).then(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.montir.push(response.data[i].detail)
        }
      })
    },
    cekSparepartCode () {
      var sparepart = this.detailTransactionsSparepart.filter((row, index) => {
        if (row.data.sparepart.code === this.editData.sparepart.code) {
          return true
        }
      })
      if (sparepart.length > 0) {
        this.errorSparepart = 'Mohon maaf, sparepart ini sudah dipilih.'
      } else {
        this.errorSparepart = ''
      }
    },
    cekLayanan () {
      var layanan = this.detailTransactionsLayanan.filter((row, index) => {
        if (row.service.name === this.editData.layanan.name) {
          return true
        }
      })
      if (layanan.length > 0) {
        this.errorLayanan = 'Mohon maaf, layanan ini sudah dipilih.'
      } else {
        this.errorLayanan = ''
      }
    },
    countPrice () {
      this.subtotal = this.price(this.editData.sparepart.price * this.editData.total)
    },
    countPriceLayanan () {
      this.subtotalLayanan = this.price(this.editData.layanan.price * this.editData.total)
    },
    price (value) {
      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
      })
      return formatter.format(value)
    },
    getSparepart () {
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      uri = this.$apiUrl + 'sparepartBranch/' + this.$route.params.id
      this.$http.get(uri, config).then(response => {
        this.branchSpareprats = response.data
        for (let i = 0; i < this.branchSpareprats.length; i++) {
          this.spareparts.push(this.branchSpareprats[i].sparepart)
          this.spareparts[i].view = this.spareparts[i].code + ' ' + this.spareparts[i].name
          this.spareparts[i].price = this.branchSpareprats[i].sell
          this.spareparts[i].sell = this.price(this.branchSpareprats[i].sell)
        }
      })
    },
    getLayanan () {
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      uri = this.$apiUrl + 'service'
      this.$http.get(uri, config).then(response => {
        this.layanans = response.data
        for (let i = 0; i < this.layanans.length; i++) {
          this.layanans[i].view = this.layanans[i].name + ' ' + this.price(this.layanans[i].price)
        }
      })
    },
    sparepartFilter (item, queryText, itemText) {
      const textOne = item.code.toLowerCase()
      const searchText = queryText.toLowerCase()
      return textOne.indexOf(searchText) > -1
    },
    layananFilter (item, queryText, itemText) {
      const textOne = item.name.toLowerCase()
      const searchText = queryText.toLowerCase()
      return textOne.indexOf(searchText) > -1
    },
    montirFilter (item, queryText, itemText) {
      const textOne = item.name.toLowerCase()
      const searchText = queryText.toLowerCase()
      return textOne.indexOf(searchText) > -1
    },
    gotoRoute (transactionNumber, id) {
      this.$router.push({name: 'detailTransaction', params: {trasactionNumber: transactionNumber, idTransaction: id}})
    },
    getVehicle () {
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      uri = this.$apiUrl + 'myvehicle/' + this.$route.params.detailId
      this.$http.get(uri, config).then(response => {
        this.myVehicle = response.data
      })
    },
    seteditDataSparepart (data) {
      this.editData.id = data.data.id
      this.editData.sparepart = data.data.sparepart
      this.editData.sparepart.view = this.editData.sparepart.code + ' ' + this.editData.sparepart.name
      this.editData.sparepart.price = data.data.price
      this.editData.total = data.data.total
      this.editData.sparepart.sell = this.price(data.data.price)
      this.countPrice()
    },
    seteditDataLayanan (data) {
      this.editData.id = data.id
      this.editData.layanan = data.service
      this.editData.layanan.view = this.editData.layanan.name + ' ' + this.price(this.editData.layanan.price)
      this.editData.total = data.total
      this.countPriceLayanan()
    },
    resetData (itemPart) {
      this.errorLayanan = ''
      this.errorSparepart = ''
      if (itemPart === 'sparepart') {
        this.editData.sparepart = {
          name: '',
          code: '',
          merk: '',
          type: ''
        }
        this.typeInputSparepart = 'new'
      } else {
        this.editData.layanan = {
          name: '',
          price: 0
        }
        this.typeInputLayanan = 'new'
      }
      this.load = false
    },
    deleteData () {
      this.load = true
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri
      if (this.itemPart === 'sparepart') {
        uri = this.$apiUrl + 'detailTSp/' + this.deleteId
      } else {
        uri = this.$apiUrl + 'detailTSv/' + this.deleteId
      }
      this.$http.delete(uri, config).then(response => {
        this.snackbar = true
        this.text = 'Data berhasil dihapus'
        this.color = 'green'
        this.getData(this.itemPart)
      }).catch(error => {
        console.log(error)
        this.snackbar = true
        this.text = 'Coba Lagi'
        this.color = 'red'
        this.load = false
      })
    },
    SendData (itemPart) {
      if (!this.$refs.form1.validate() && itemPart === 'sparepart') {
        this.snackbar = true
        this.text = 'Mohon untuk melengkapi form yang tersedia'
        this.color = 'error'
        return
      }
      if (!this.$refs.form2.validate() && itemPart === 'layanan') {
        this.snackbar = true
        this.text = 'Mohon untuk melengkapi form yang tersedia'
        this.color = 'error'
        return
      }
      if (this.errorSparepart !== '' || this.errorLayanan !== '') {
        this.snackbar = true
        this.text = 'Mohon untuk melengkapi form yang tersedia'
        this.color = 'red'
        return
      }
      this.editData.branch_id = this.$route.params.id
      this.editData.trasanctiondetail_id = this.$route.params.detailId
      this.load = true
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri
      if (itemPart === 'sparepart') {
        uri = this.$apiUrl + 'detailTSp'
        this.editData.sparepart_code = this.editData.sparepart.code
      } else {
        uri = this.$apiUrl + 'detailTSv'
        this.editData.service_id = this.editData.layanan.id
      }
      this.$http.post(uri, this.editData, config).then(response => {
        this.resetData(itemPart)
        this.getData(itemPart)
      }).catch(error => {
        console.log(error.response)
        this.load = false
        this.snackbar = true
        this.color = 'error'
        this.text = 'Coba lagi'
      })
    },
    UpdateData (itemPart) {
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      if (this.errorSparepart !== '' || this.errorLayanan !== '') {
        this.snackbar = true
        this.text = 'Mohon untuk melengkapi form yang tersedia'
        this.color = 'red'
        return
      }
      if (itemPart === 'sparepart') {
        this.editData.sparepart_code = this.editData.sparepart.code
        uri = this.$apiUrl + 'detailTSp/' + this.editData.id
      } else {
        this.editData.service_id = this.editData.layanan.id
        uri = this.$apiUrl + 'detailTSv/' + this.editData.id
      }
      this.load = true
      this.$http.post(uri, this.editData, config).then(response => {
        console.log(response)
        this.getData(itemPart)
        this.resetData(itemPart)
      }).catch(error => {
        console.log(error)
        this.snackbar = true
        this.text = 'Coba Lagi'
        this.color = 'red'
        this.load = false
      })
    },
    getData (itemPart) {
      this.editDialogSparepart = false
      this.editDialogLayanan = false
      this.deleteDialog = false
      this.load = false
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri
      if (itemPart === 'sparepart') {
        uri = this.$apiUrl + 'detailTSp/' + this.$route.params.detailId + '/' + this.$route.params.id
      } else {
        uri = this.$apiUrl + 'detailTSv/' + this.$route.params.detailId
      }
      this.$http.get(uri, config).then(response => {
        if (itemPart === 'sparepart') {
          this.detailTransactionsSparepart = response.data
          this.loadDataSparepart = false
        } else {
          this.detailTransactionsLayanan = response.data
          this.loadDataLayanan = false
        }
      })
    }
  }
}
</script>

