<template id="admin-list">
<div class="contentlist">
<div class="flex-container" >

      <div class="columns m-t-10">
        <div class="column">
          <h1 class="title">Daftar Sales</h1>
        </div>
        <div class="column">
            <v-flex sm6 d-flex style="margin-left: auto">
              <v-btn slot="activator" color="blue lighten-2" dark @click.prevent="editDialog = true; typeInput = 'new'">Tambah Sales</v-btn>
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
        <b-table :data="usersList" :paginated="true" :per-page="perPage" :current-page.sync="currentPage" :loading="loadData" :pagination-simple="true" :narrowed="true" :mobile-cards="true" :striped="true" :hoverable="true" :default-sort-direction="defaultSortDirection" default-sort="created_at">
            <template slot-scope="props">
                <b-table-column label="No." sortable>{{ props.index + 1 }}</b-table-column>
                <b-table-column field="name" label="Nama" sortable>{{ props.row.name }}</b-table-column>
                <b-table-column field="phoneNumber" label="Nomor Telepon" sortable>{{ props.row.phoneNumber }}</b-table-column>
                <b-table-column field="address" label="Alamat" sortable >{{ props.row.address }}</b-table-column>
                <b-table-column field="city" label="Kota" sortable >{{ props.row.city }}</b-table-column>
                <b-table-column field="created_at" label="Bekerjasama pada" sortable >{{props.row.created_at }}</b-table-column>
                  <b-table-column label="Pengaturan" :visible="!loadData">
                    <v-btn color="green lighten-2" dark @click="goto(props.row.id)">Detail Sales</v-btn>
                </b-table-column>
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
                        <p>Belum ada data sales, silahkan tambahkan sales terlebih dahulu</p>
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
                                    Tambahkan Sales
                                </v-card-title>
                                <v-card-text>
                                  <v-container grid-list-md>
                                    <v-layout wrap>
                                      <v-flex xs12>
                                        <v-text-field label="Nama*" required v-model="editData.name" :rules="[rules.required, rules.textOnly]"></v-text-field>
                                      </v-flex>
                                        <v-flex xs12>
                                        <v-text-field label="Nomor Handphone*" required v-model="editData.phoneNumber" :rules="[rules.required, rules.numberOnly]"></v-text-field>
                                      </v-flex>
                                       <v-flex xs12>
                                        <v-text-field label="Alamat*" required v-model="editData.address" :rules="[rules.required]"></v-text-field>
                                      </v-flex>
                                       <v-flex xs12>
                                         <v-autocomplete
                                                :items="cities"
                                                :filter="citiesFilter"
                                                item-text="name"
                                                label="Kota"
                                                :rules="[rules.required]"
                                                v-model="editData.city"
                                          ></v-autocomplete>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                  <small>*Wajib diisi</small>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="red darken-1" dark @click.prevent="resetData()">Batal</v-btn>
                                  <v-btn color="green darken-1" dark v-if="typeInput == 'new'" @click.prevent="SendData()" :loading="load">Tambahkan</v-btn>
                                  <v-btn color="orange darken-1" dark v-if="typeInput == 'edit'" @click.prevent="UpdateData()" :loading="load">Perbaharui</v-btn>
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
                      <v-card-title class="headline">Hapus Data Pengguna ?</v-card-title>
                      <v-card-text>Data yang dihapus tidak akan bisa dikembalikan lagi</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" dark @click="resetData()">Batal</v-btn>
                        <v-btn color="red darken-1" dark :loading="load" @click="deleteData()">Hapus</v-btn>
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
    this.getData()
    this.getCities()
  },
  data () {
    return {
      valid: true,
      cities: [],
      typeInput: 'new',
      role: 'semua',
      saveRole: '',
      stat: '',
      search: '',
      users: [],
      dialog: false,
      deleteDialog: false,
      editDialog: false,
      load: false,
      snackbar: false,
      text: '',
      color: null,
      reset: false,
      editData: {
        name: '',
        role: 'sales',
        phoneNumber: '',
        address: '',
        city: ''
      },
      deleteId: -1,
      loading: false,
      loadData: true,
      isPaginated: true,
      isPaginationSimple: true,
      defaultSortDirection: 'desc',
      currentPage: 1,
      perPage: 10,
      rules: {
        required: value => !!value || 'Data ini tidak boleh kosong',
        numberOnly: value => !isNaN(value) || 'Data tidak valid, hanya diijinkan memasukkan angka',
        textOnly: value => RegExp(/^[A-Za-z ]+$/).test(value) || 'Data tidak valid, hanya diijinkan memasukkan huruf'
      }
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
    citiesFilter (item, queryText, itemText) {
      const textOne = item.name.toLowerCase()
      const searchText = queryText.toLowerCase()
      return textOne.indexOf(searchText) > -1
    },
    getCities () {
      var uri = this.$apiUrl + 'cities'
      this.$http.get(uri).then(response => {
        this.cities = response.data
      })
    },
    goto (id) {
      this.$router.push({name: 'salesD1', params: {id: id}})
    },
    seteditData (data) {
      this.typeInput = 'edit'
      this.editData.id = data.id
      this.editData.name = data.name
      this.editData.phoneNumber = data.phoneNumber
      this.editData.address = data.address
      this.editData.city = data.city
      this.editData.role = 'sales'
    },
    resetData (data) {
      this.editDialog = false
      this.deleteDialog = false
      this.$refs.form.reset()
      this.load = false
      this.typeInput = 'new'
      this.editData.role = null
      this.loadData = false
      this.deleteId = -1
    },
    deleteData () {
      this.load = true
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri = this.$apiUrl + 'deleteperson/' + this.deleteId
      this.$http.delete(uri, config).then(response => {
        this.snackbar = true
        this.text = 'Data berhasil dihapus'
        this.color = 'green'
        this.getData()
      }).catch(error => {
        console.log(error)
        this.snackbar = true
        this.text = 'Coba Lagi'
        this.color = 'red'
        this.load = false
      })
    },
    SendData () {
      if (!this.$refs.form.validate()) {
        this.snackbar = true
        this.text = 'Mohon untuk melengkapi form yang tersedia'
        this.color = 'error'
        return
      }
      this.load = true
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      uri = this.$apiUrl + 'sales/' + this.$route.params.id
      this.$http.post(uri, this.editData, config).then(response => {
        this.getData()
      }).catch(error => {
        console.log(error.response)
        this.snackbar = true
        this.text = error.response.data.errors.phoneNumber[0]
        this.color = 'red'
        this.load = false
      })
    },
    UpdateData () {
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      this.load = true
      uri = this.$apiUrl + 'updateperson/' + this.editData.id
      this.$http.post(uri, this.editData, config).then(response => {
        console.log(response)
        this.getData()
      }).catch(error => {
        console.log(error)
        this.snackbar = true
        this.text = 'Coba Lagi'
        this.color = 'red'
        this.load = false
      })
    },
    getData () {
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      uri = this.$apiUrl + 'sales/' + this.$route.params.id
      this.$http.get(uri, config).then(response => {
        this.users = response.data.result
        this.resetData()
      })
    },
    updateStatus (user) {
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri = '/api/user/status/' + user.id
      if (user.status === 0) {
        user.status = 1
      } else {
        user.status = 0
      }
      this.$http.patch(uri, { status: user.status }, config).then(response => {
        console.log(response)
        // this.getData()
      }).catch(error => {
        console.log(error)
        this.snackbar = true
        this.text = 'Coba lagi'
        this.color = 'error'
      })
    }
  }
}
</script>
