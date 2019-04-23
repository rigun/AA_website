<template id="admin-list">
<div class="contentlist">
<div class="flex-container" >

      <div class="columns m-t-10">
        <div class="column">
          <h1 class="title">Daftar Pegawai</h1>
        </div>
        <div class="column">
            <v-flex sm6 d-flex style="margin-left: auto">
              <v-btn slot="activator" color="blue lighten-2" dark @click.prevent="editDialog = true; typeInput = 'new'">Tambah Pegawai</v-btn>
            </v-flex>
        </div>
      </div>
      <div class="columns">
                <div class="column">
                  <v-container fluid>
                    <v-layout row wrap align-center>
                      <v-flex xs3 style="margin-left: auto">
                     <v-select
                        :items="employeeRole"
                        item-text= "name"
                        item-value= "name"
                        label="Filter Peran Pegawai"
                        v-model="role"
                        outline
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-container>
          
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
                <b-table-column field="detail.name" label="Nama" sortable>{{ props.row.detail.name }}</b-table-column>
                <b-table-column field="detail.phoneNumber" label="Nomor Telepon" sortable>{{ props.row.detail.phoneNumber }}</b-table-column>
                <b-table-column field="detail.address" label="Alamat" sortable >{{ props.row.detail.address }}</b-table-column>
                <b-table-column field="detail.city" label="Kota" sortable >{{ props.row.detail.city }}</b-table-column>
                <b-table-column label="Peran" sortable >{{props.row.detail.role.name }}</b-table-column>
                <b-table-column label="Email" ><span v-if="props.row.detail.user != null">{{props.row.detail.user.email }}</span><span v-else> - </span></b-table-column>
                <b-table-column label="Gaji" sortable >{{props.row.salary }}</b-table-column>
                <b-table-column label="Diterima pada" sortable >{{props.row.created_at }}</b-table-column>
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
                        <p>Belum ada data pegawai, silahkan tambahkan pegawai terlebih dahulu</p>
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
                                    Tambahkan Pegawai
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
                                       <v-flex xs12>
                                        <v-text-field label="Gaji*" type="number" required v-model="editData.salary" :rules="[rules.required, rules.numberOnly]"></v-text-field>
                                      </v-flex>
                                      <v-flex xs12>
                                            <v-select
                                            :items="employeeRoleOnly"
                                            item-text="name"
                                            item-value="name"
                                            label="Peran"
                                            outline
                                            v-model="editData.role"
                                            ></v-select>
                                        </v-flex>
                                      <v-flex xs12>
                                        <v-text-field label="Email*" v-model="editData.email" :rules="emailRules" v-if="editData.role != 'montir' && editData.role != null" ></v-text-field>
                                      </v-flex>
                                      <v-flex xs12>
                                        <v-text-field label="Password*"  type="password" v-model="editData.password" :rules="[rules.required]" v-if="editData.role != 'montir' && editData.role != null && (typeInput != 'edit' || saveRole == 'montir')"></v-text-field>
                                      </v-flex>
                                      <v-flex xs12 v-if="saveRole != 'montir' && editData.role != 'montir'">
                                        <v-checkbox
                                          label="Ubah Password ?"
                                          v-model="editData.changePassword"
                                          v-if="typeInput == 'edit' && editData.email != null"
                                          ></v-checkbox>
                                      </v-flex>
                                      <v-flex xs12>
                                        <v-text-field label="Password baru*"  type="password" v-model="editData.password" :rules="[rules.required]" v-if="editData.changePassword"></v-text-field>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                  <small>*Wajib diisi</small>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="red darken-1" dark @click.prevent="editDialog = false; resetData()">Batal</v-btn>
                                  <v-btn color="green darken-1" dark :loading="load" v-if="typeInput == 'new'" @click.prevent="SendData()">Tambahkan</v-btn>
                                  <v-btn color="orange darken-1" dark :loading="load" v-if="typeInput == 'edit'" @click.prevent="UpdateData()">Perbaharui</v-btn>
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
    this.$parent.tab = 'branchD1'
    this.getData()
    this.getRoles()
    this.getCities()
  },
  data () {
    return {
      load: false,
      cities: [],
      valid: true,
      typeInput: 'new',
      role: 'semua',
      saveRole: '',
      stat: '',
      search: '',
      users: [],
      dialog: false,
      deleteDialog: false,
      editDialog: false,
      data: {
        name: null,
        namaEvent: null,
        email: null
      },
      snackbar: false,
      text: '',
      color: null,
      reset: false,
      editData: {
        name: '',
        email: null,
        role: null,
        password: '',
        phoneNumber: '',
        address: '',
        city: '',
        salary: 0,
        changePassword: false
      },
      deleteId: -1,
      loading: false,
      loadData: true,
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
      }
    }
  },
  computed: {
    usersList () {
      if (this.users.length) {
        return this.users.filter((row, index) => {
          if (this.role === 'semua') {
            if (this.search !== '') return row.detail.name.toLowerCase().includes(this.search.toLowerCase()) || row.detail.phoneNumber.toLowerCase().includes(this.search.toLowerCase())
            return true
          }
          if (row.detail.role.name === this.role && this.role !== 'semua') {
            if (this.search !== '') return row.detail.name.toLowerCase().includes(this.search.toLowerCase()) || row.detail.phoneNumber.toLowerCase().includes(this.search.toLowerCase())
            return true
          }
          return false
        })
      }
    },
    employeeRole () {
      if (this.roles.length) {
        return this.roles.filter((row, index) => {
          if (row.name !== 'owner' && row.name !== 'supplier' && row.name !== 'sales' && row.name !== 'konsumen') {
            return true
          }
        })
      }
    },
    employeeRoleOnly () {
      if (this.roles.length) {
        return this.roles.filter((row, index) => {
          if (row.name !== 'owner' && row.name !== 'supplier' && row.name !== 'sales' && row.name !== 'konsumen' && row.name !== 'semua') {
            return true
          }
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
    getRoles () {
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri = this.$apiUrl + 'role'
      this.$http.get(uri, config).then(response => {
        this.roles = response.data
        this.roles.push({name: 'semua'})
      })
    },
    seteditData (data) {
      this.typeInput = 'edit'
      this.editData.id = data.detail.id
      this.editData.name = data.detail.name
      this.editData.phoneNumber = data.detail.phoneNumber
      this.editData.address = data.detail.address
      this.editData.city = data.detail.city
      this.editData.salary = data.salary
      this.editData.role = data.detail.role.name
      this.saveRole = data.detail.role.name
      if (data.detail.user !== null) {
        this.editData.email = data.detail.user.email
      }
    },
    resetData () {
      this.$refs.form.reset()
      this.typeInput = 'new'
      this.editData.role = null
      this.editData.email = null
      this.saveRole = ''
      this.load = false
    },
    deleteData () {
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      this.load = true
      var uri = this.$apiUrl + 'employee/' + this.deleteId
      this.$http.delete(uri, config).then(response => {
        this.snackbar = true
        this.text = 'Data berhasil dihapus'
        this.color = 'green'
        this.deleteDialog = false
        this.load = false
        this.getData()
      }).catch(error => {
        console.log(error)
        this.snackbar = true
        this.text = 'Coba Lagi'
        this.color = 'red'
        this.deleteDialog = false
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
      if (this.editData.role === null) {
        this.snackbar = true
        this.text = 'Mohon untuk menentukan peran dari pegawai anda'
        this.color = 'error'
        return
      }
      this.load = true
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri = this.$apiUrl + 'employee'
      this.editData.branch = this.$route.params.id
      this.$http.post(uri, this.editData, config).then(response => {
        this.resetData()
        this.getData()
      }).catch(error => {
        console.log(error.response)
        this.load = false
        this.snackbar = true
        this.text = error.response.data.errors.phoneNumber[0]
        this.color = 'red'
      })
    },
    UpdateData () {
      if (!this.$refs.form.validate()) {
        this.snackbar = true
        this.text = 'Mohon untuk melengkapi form yang tersedia'
        this.color = 'error'
        return
      }
      if (this.editData.role === null) {
        this.snackbar = true
        this.text = 'Mohon untuk menentukan peran dari pegawai anda'
        this.color = 'error'
        return
      }
      this.load = true
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri = this.$apiUrl + 'employee/' + this.editData.id
      this.editData.branch = this.$route.params.id
      this.$http.post(uri, this.editData, config).then(response => {
        this.resetData()
        this.getData()
      }).catch(error => {
        console.log(error.response)
        this.snackbar = true
        this.text = error.response.data.errors.phoneNumber[0]
        this.color = 'error'
        this.load = false
      })
    },
    getData () {
      this.editDialog = false
      this.deleteDialog = false
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri = this.$apiUrl + 'employeebyBranch/' + this.$route.params.id
      this.$http.get(uri, config).then(response => {
        this.users = response.data
        this.loadData = false
      })
    },
    updateStatus (user) {
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri = this.$apiUrl + 'api/user/status/' + user.id
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
        this.load = false
      })
    }
  }
}
</script>
