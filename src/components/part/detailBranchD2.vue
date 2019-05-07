<template id="admin-list">
<div class="contentlist">
<div class="flex-container" >

      <div class="columns m-t-10">
        <div class="column">
          <h1 class="title">Daftar Sparepart</h1>
        </div>
        <div class="column">
            <v-flex sm6 d-flex style="margin-left: auto">
              <v-btn slot="activator" color="blue lighten-2" dark @click.prevent="editDialog = true; typeInput = 'new'">Tambah Sparepart</v-btn>
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
        <b-table :data="sparepartList" :paginated="true" :per-page="perPage" :current-page.sync="currentPage" :loading="loadData" :pagination-simple="true" :narrowed="true" :mobile-cards="true" :striped="true" :hoverable="true" :default-sort-direction="defaultSortDirection" default-sort="created_at">
            <template slot-scope="props">
                <b-table-column label="No." sortable>{{ props.index + 1 }}</b-table-column>
                <b-table-column field="code" label="Kode" sortable>{{ props.row.sparepart.code }}</b-table-column>
                <b-table-column field="picture" label="Foto" sortable>
                            <img :src="$apiUrl + 'images/sparepart/' + props.row.sparepart.picture" alt="Foto Sparepart" width="100">
                </b-table-column>
                <b-table-column field="name" label="Nama" sortable>{{ props.row.sparepart.name }}</b-table-column>
                <b-table-column field="merk" label="Merk" sortable>{{ props.row.sparepart.merk }}</b-table-column>
                <b-table-column field="type" label="Tipe" sortable>{{ props.row.sparepart.type }}</b-table-column>
                <b-table-column field="position" label="Posisi" sortable>{{ props.row.position }}</b-table-column>
                <b-table-column label="Motor" centered>
                      <v-layout warp v-for="vehicle in props.row.sparepart.vehicle" :key="vehicle.id">
                        <v-flex xs12 >
                            <v-chip color="teal" dark >
                              {{vehicle.merk}} {{vehicle.type}}
                            </v-chip>
                        </v-flex>
                      </v-layout>
                </b-table-column>
                <b-table-column label="Stock" sortable >{{props.row.stock }}</b-table-column>
                <b-table-column label="Stock Minimal" sortable >{{props.row.limitstock }}</b-table-column>
                <b-table-column label="Harga Beli" sortable >{{price(props.row.buy) }}</b-table-column>
                <b-table-column label="Harga Jual" sortable >{{price(props.row.sell) }}</b-table-column>
                <b-table-column label="Dibeli pada" sortable >{{props.row.created_at }}</b-table-column>
                            <b-table-column label=""><v-menu transition="slide-x-transition" offset-x left>
                                <v-btn slot="activator" icon >
                                <v-icon>more_vert</v-icon>
                                </v-btn>
                            <v-list>
                            <v-list-tile  @click.prevent="seteditData(props.row); editDialog = true">
                                <v-list-tile-title  >Perbaharui</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile @click.prevent="deleteId = props.row.id; deleteDialog = true">
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
                            <v-dialog v-model="editDialog" persistent max-width="600px">
                                <v-form
                                    ref="form"
                                    v-model="valid"
                                    lazy-validation
                                >
                              <v-card>
                                <v-card-title>
                                    Tambahkan Sparepart
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
                                                v-if="typeInput != 'edit'"
                                                :error-messages="errorSparepart"
                                                @input="cekSparepartCode()"
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
                                        Posisi Sparepart
                                      </v-flex>
                                       <v-flex xs4>
                                           <v-select
                                          v-model="editData.letak"
                                          :items="letak"
                                          label="Letak"
                                        ></v-select>
                                      </v-flex>
                                       <v-flex xs4>
                                           <v-select
                                          v-model="editData.rak"
                                          :items="rak"
                                          label="Rak"
                                        ></v-select>
                                      </v-flex>
                                       <v-flex xs4>
                                           <v-select
                                          v-model="editData.urut"
                                          :items="urut"
                                          label="Nomor Urut"
                                        ></v-select>
                                      </v-flex>
                                       <v-flex xs12>
                                        <v-text-field type="text" label="Stock Saat Ini*" :rules="[rules.required,rules.numberOnly]" v-model="editData.stock"></v-text-field>
                                      </v-flex>
                                       <v-flex xs12>
                                        <v-text-field type="text" label="Stock Minimal Sparepart*" :rules="[rules.required,rules.numberOnly]" v-model="editData.limitstock"></v-text-field>
                                      </v-flex>
                                       <v-flex xs12>
                                        <v-text-field type="text" label="Harga Beli (Rp)*" :rules="[rules.required,rules.numberOnly]" v-model="editData.buy"></v-text-field>
                                      </v-flex>
                                       <v-flex xs12>
                                        <v-text-field type="text" label="Harga Jual (Rp)*" :rules="[rules.required,rules.numberOnly]" v-model="editData.sell"></v-text-field>
                                      </v-flex>
                                     
                                    </v-layout>
                                  </v-container>
                                  <small>*Wajib diisi</small>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="red darken-1" dark @click.prevent="editDialog = false; resetData()">Batal</v-btn>
                                  <v-btn color="green darken-1" dark v-if="typeInput == 'new'" @click.prevent="SendData()" :loading="loading">Tambahkan</v-btn>
                                  <v-btn color="orange darken-1" dark v-if="typeInput == 'edit'" @click.prevent="UpdateData()" :loading="loading">Perbaharui</v-btn>
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
                      <v-card-title class="headline">Hapus Data Sparepart Ini ?</v-card-title>
                      <v-card-text>Data yang dihapus tidak akan bisa dikembalikan lagi</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" flat @click="resetData()">Batal</v-btn>
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
    this.$parent.tab = 'branchD2'
    this.getData()
    this.getSparepart()
    this.setUrut()
  },
  data () {
    return {
      errorSparepart: '',
      valid: true,
      typeInput: 'new',
      role: 'semua',
      saveRole: '',
      stat: '',
      search: '',
      spareparts: [],
      branchSpareprats: [],
      dialog: false,
      deleteDialog: false,
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
        branch_id: -1,
        position: '',
        limitstock: '',
        letak: 'DPN',
        rak: 'KACA',
        urut: '01',
        buy: null,
        sell: null
      },
      editDialog: false,
      load: false,
      deleteId: -1,
      loading: false,
      loadData: true,
      isPaginated: true,
      isPaginationSimple: true,
      defaultSortDirection: 'desc',
      currentPage: 1,
      perPage: 10,
      roles: [],
      unique: true,
      letak: ['DPN', 'TGH', 'BLK'],
      rak: ['KACA', 'DUS', 'BAN', 'KAYU'],
      errorMessage: '',
      errorCode: false,
      urut: [],
      emailRules: [
        v => !!v || 'Email tidak boleh kosong',
        v => /.+@.+/.test(v) || 'Email tidak valid'
      ],
      rules: {
        required: value => !!value || 'Data ini tidak boleh kosong',
        numberOnly: value => !isNaN(value) || 'Data tidak valid, hanya diijinkan memasukkan angka',
        textOnly: value => RegExp(/^[A-Za-z ]+$/).test(value) || 'Data tidak valid, hanya diijinkan memasukkan huruf'
      }
    }
  },
  computed: {
    sparepartList () {
      if (this.branchSpareprats.length) {
        return this.branchSpareprats.filter((row, index) => {
          if (this.search !== '') return row.sparepart.name.toLowerCase().includes(this.search.toLowerCase()) || row.sparepart.code.toLowerCase().includes(this.search.toLowerCase())
          return true
        })
      }
    }
  },
  methods: {
    cekSparepartCode () {
      var sparepart = this.branchSpareprats.filter((row, index) => {
        if (row.sparepart.code === this.editData.sparepart.code) {
          return true
        }
      })
      if (sparepart.length > 0) {
        this.errorSparepart = 'Mohon maaf, sparepart ini sudah dimasukkan kedalam cabang ini.'
      } else {
        this.errorSparepart = ''
      }
    },
    price (value) {
      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
      })
      return formatter.format(value)
    },
    sparepartFilter (item, queryText, itemText) {
      const textOne = item.code.toLowerCase()
      const searchText = queryText.toLowerCase()
      return textOne.indexOf(searchText) > -1
    },
    setUrut () {
      var n = []
      for (let i = 1; i < 100; i++) {
        if (i < 10) {
          n.push('0' + i)
        } else {
          n.push(i)
        }
      }
      this.urut = n
    },
    setData () {
      var sparepart = this.spareparts.filter((row, index) => {
        if (row.code === this.editData.sparepart.code) return true
      })
      console.log(sparepart)
      if (sparepart.length < 1) {
        this.errorCode = true
        this.errorMessage = 'Data tidak ditemukan'
      } else {
        this.errorCode = false
        this.errorMessage = ''
        this.editData.sparepart = sparepart[0]
      }
    },
    getSparepart () {
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      uri = this.$apiUrl + 'sparepart'
      this.$http.get(uri, config).then(response => {
        this.spareparts = response.data
        for (let i = 0; i < this.spareparts.length; i++) {
          this.spareparts[i].view = this.spareparts[i].code + ' ' + this.spareparts[i].name
        }
      })
    },
    seteditData (data) {
      this.typeInput = 'edit'
      this.editData.sparepart = data.sparepart
      this.editData.buy = data.buy
      this.editData.sell = data.sell
      this.editData.stock = data.stock
      this.editData.limitstock = data.limitstock
      this.editData.id = data.id
      var position = data.position.split('-')
      this.editData.letak = position[0]
      this.editData.rak = position[1]
      this.editData.urut = position[2]
      this.editData.sparepart.view = this.editData.sparepart.code + ' ' + this.editData.sparepart.name
    },
    resetData (data) {
      this.loading = false
      this.deleteDialog = false
      this.deleteId = -1
      this.typeInput = 'new'
      this.editData.sparepart = {
        name: '',
        code: '',
        merk: '',
        type: ''
      }
      this.editData.branch_id = -1
      this.editData.position = ''
      this.editData.limitstock = ''
    },
    deleteData () {
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri = this.$apiUrl + 'sparepartBranch/' + this.deleteId
      this.$http.delete(uri, config).then(response => {
        this.snackbar = true
        this.text = 'Data berhasil dihapus'
        this.color = 'green'
        this.resetData()
        this.getData()
      }).catch(error => {
        console.log(error)
        this.snackbar = true
        this.text = 'Coba Lagi'
        this.color = 'red'
        this.resetData()
      })
    },
    SendData () {
      if (!this.$refs.form.validate()) {
        this.snackbar = true
        this.text = 'Mohon untuk melengkapi form yang tersedia'
        this.color = 'red'
        return
      }
      if (this.errorSparepart !== '') {
        this.snackbar = true
        this.text = 'Mohon untuk melengkapi form yang tersedia'
        this.color = 'red'
        return
      }
      if (this.errorCode) {
        this.snackbar = true
        this.text = 'Mohon untuk kode sparepart yang benar'
        this.color = 'error'
        return
      }
      if (this.editData.buy > this.editData.sell) {
        this.snackbar = true
        this.text = 'Harga beli lebih mahal daripada harga jual'
        this.color = 'red'
        this.editData.totalAccept = this.editData.total
        return
      }
      this.editData.position = this.editData.letak + '-' + this.editData.rak + '-' + this.editData.urut
      this.loading = true
      this.editData.sparepart_code = this.editData.sparepart.code
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      uri = this.$apiUrl + 'sparepartBranch'
      this.editData.branch_id = this.$route.params.id
      this.$http.post(uri, this.editData, config).then(response => {
        this.resetData()
        this.getData()
      }).catch(error => {
        console.log(error.response)
        this.snackbar = true
        this.text = error.response.data.errors.phoneNumber[0]
        this.color = 'red'
      })
    },
    UpdateData () {
      if (!this.$refs.form.validate()) {
        this.snackbar = true
        this.text = 'Mohon untuk melengkapi form yang tersedia'
        this.color = 'red'
        return
      }
      if (this.editData.buy > this.editData.sell) {
        this.snackbar = true
        this.text = 'Harga beli lebih mahal daripada harga jual'
        this.color = 'red'
        this.editData.totalAccept = this.editData.total
        return
      }
      this.editData.position = this.editData.letak + '-' + this.editData.rak + '-' + this.editData.urut
      // var positionSparepart = this.branchSpareprats.filter((row, index) => {
      //   if (row.position === this.editData.position) {
      //     return true
      //   }
      // })
      // if (positionSparepart.length > 1) {
      //   this.snackbar = true
      //   this.text = 'Mohon maaf, tempat sudah terisi, silahkan memilih posisi yang lain'
      //   this.color = 'red'
      //   return
      // }
      this.loading = true
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      this.editData.sparepart_code = this.editData.sparepart.code
      uri = this.$apiUrl + 'sparepartBranch/' + this.editData.id
      this.editData.people_id = this.$route.params.id
      this.$http.patch(uri, this.editData, config).then(response => {
        this.resetData()
        this.getData()
      }).catch(error => {
        console.log(error.response)
        this.snackbar = true
        this.text = error.response.data.errors.phoneNumber[0]
        this.color = 'red'
      })
    },
    getData () {
      this.editDialog = false
      this.deleteDialog = false
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      uri = this.$apiUrl + 'sparepartBranch/' + this.$route.params.id
      this.$http.get(uri, config).then(response => {
        this.branchSpareprats = response.data
        this.loadData = false
      })
    }
  }
}
</script>
