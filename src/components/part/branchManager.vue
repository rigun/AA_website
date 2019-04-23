<template id="admin-list">
<div class="contentlist">
<div class="flex-container" >

      <div class="columns m-t-10">
        <div class="column">
          <h1 class="title">Cabang</h1>
        </div>
        <div class="column" >
            <v-flex sm6 d-flex style="margin-left: auto">
              <v-btn slot="activator" color="blue lighten-2" dark @click.prevent="editDialog = true; typeInput = 'new'">Tambah Cabang</v-btn>
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
        <b-table :data="branchesList" :paginated="true" :per-page="perPage" :current-page.sync="currentPage" :loading="loadData" :pagination-simple="true" :narrowed="true" :mobile-cards="true" :striped="true" :hoverable="true" :default-sort-direction="defaultSortDirection" default-sort="updated_at">
            <template slot-scope="props">
                <b-table-column label="No." sortable>{{ props.index + 1 }}</b-table-column>
                <b-table-column field="name" label="Name" sortable>{{ props.row.name }}</b-table-column>
                <b-table-column label="Pegawai">{{ props.row.employee.length }}</b-table-column>
                <b-table-column label="Sparepart">{{ props.row.spareparts.length }}</b-table-column>
                <b-table-column label="Transaksi">{{ props.row.transaction.length }}</b-table-column>
                <b-table-column field="created_at" label="Dibuat pada">{{ props.row.created_at }}</b-table-column>
                <b-table-column label="Pengaturan" :visible="!loadData">
                    <v-btn color="green lighten-2" dark @click="goto(props.row.id)">Detail Cabang</v-btn>
                </b-table-column>
                            <b-table-column label=""><v-menu transition="slide-x-transition" offset-x left>
                                <v-btn slot="activator" icon >
                                <v-icon>more_vert</v-icon>
                                </v-btn>
                            <v-list>
                            <v-list-tile  @click.prevent="seteditData(props.row); editDialog = true; typeInput = 'edit'">
                                <v-list-tile-title  >Ubah</v-list-tile-title>
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
                        <p>Belum ada data cabang, silahkan tambahkan cabang terlebih dahulu.</p>
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
           <v-form
                ref="form"
                lazy-validation
            >
            <v-dialog v-model="editDialog" persistent max-width="600px">
              <v-card>
                <v-card-title>
                    Cabang
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field label="Nama" required v-model="editData.name"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" dark @click="resetData()">Batal</v-btn>
                  <v-btn color="blue darken-1" v-if="typeInput == 'new'" dark @click.prevent="sendData()" :loading="load">Tambahkan</v-btn>
                  <v-btn color="blue darken-1" v-if="typeInput == 'edit'" dark @click.prevent="UpdateData()" :loading="load">Update</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
           </v-form>
          </v-layout>
        <!-- edit -->
        <!-- delete -->
          <v-layout row justify-center>
                  <v-dialog v-model="deleteDialog" persistent max-width="290">
                    <v-card>
                      <v-card-title class="headline">Hapus Cabang ?</v-card-title>
                      <v-card-text>Cabang yang dihapus akan juga menghapus seluruh data didalamnya dan tidak dapat dikembalikan lagi.</v-card-text>
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
    this.getBranch()
  },
  data () {
    return {
      typeInput: 'new',
      role: '',
      stat: '',
      search: '',
      table: 0,
      users: [],
      dialog: false,
      load: false,
      deleteDialog: false,
      editDialog: false,
      snackbar: false,
      text: '',
      color: null,
      reset: false,
      editData: {
        name: null
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
      branches: []
    }
  },
  computed: {
    branchesList () {
      if (this.branches.length) {
        return this.branches.filter((row, index) => {
          if (this.search !== '') return row.name.toLowerCase().includes(this.search.toLowerCase())
          return true
        })
      }
    }
  },
  methods: {
    resetData () {
      this.deleteDialog = false
      this.deleteId = -1
      this.$refs.form.reset()
      this.editDialog = false
    },
    goto (id) {
      this.$router.push({name: 'branchD1', params: {id: id}})
    },
    getBranch () {
      this.editDialog = false
      this.deleteDialog = false
      this.load = false
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      uri = this.$apiUrl + 'branch'
      this.$http.get(uri, config).then(response => {
        this.$refs.form.reset()
        this.branches = response.data
        this.loadData = false
      })
    },
    sendData () {
      this.load = true
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      uri = this.$apiUrl + 'branch'
      this.$http.post(uri, this.editData, config).then(response => {
        console.log(response)
        this.getBranch()
      }).catch(error => {
        console.log(error)
        this.snackbar = true
        this.text = 'try again'
        this.color = 'error'
        this.getBranch()
      })
    },
    seteditData (data) {
      this.editData.id = data.id
      this.editData.name = data.name
    },
    deleteData () {
      this.load = true
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri = this.$apiUrl + 'branch/' + this.deleteId
      this.$http.delete(uri, config).then(response => {
        this.snackbar = true
        this.text = 'Data berhasil dihapus'
        this.color = 'green'
        this.getBranch()
      }).catch(error => {
        console.log(error)
        this.snackbar = true
        this.text = 'Coba Lagi'
        this.color = 'red'
        this.load = false
      })
    },
    UpdateData () {
      this.load = true
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      uri = this.$apiUrl + 'branch/' + this.editData.id
      this.$http.post(uri, this.editData, config).then(response => {
        console.log(response)
        this.getBranch()
      }).catch(error => {
        console.log(error)
        this.getBranch()
        this.snackbar = true
        this.text = 'try again'
        this.color = 'error'
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
