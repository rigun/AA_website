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
                <b-table-column field="code" label="Kode" sortable>{{ props.row.code }}</b-table-column>
                <b-table-column field="picture" label="Foto" sortable>
                            <img :src="$apiUrl + 'images/sparepart/' + props.row.picture" alt="Foto Sparepart" width="100">
                </b-table-column>
                <b-table-column field="name" label="Nama" sortable>{{ props.row.name }}</b-table-column>
                <b-table-column field="merk" label="Merk" sortable>{{ props.row.merk }}</b-table-column>
                <b-table-column field="type" label="Tipe" sortable>{{ props.row.type }}</b-table-column>
                 <b-table-column label="Motor" centered>
                      <v-layout warp v-for="vehicle in props.row.vehicle" :key="vehicle.id">
                        <v-flex xs12 >
                            <v-chip color="teal" dark >
                              {{vehicle.merk}} {{vehicle.type}}
                            </v-chip>
                        </v-flex>
                      </v-layout>
                </b-table-column>
                <b-table-column label="Dibuat pada" sortable >{{props.row.created_at }}</b-table-column>
                            <b-table-column label=""><v-menu transition="slide-x-transition" offset-x left>
                                <v-btn slot="activator" icon >
                                <v-icon>more_vert</v-icon>
                                </v-btn>
                            <v-list>
                            <v-list-tile  @click.prevent="seteditData(props.row); editDialog = true">
                                <v-list-tile-title  >Perbaharui</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile @click.prevent="seteditData(props.row); deleteDialog = true">
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
                                      <v-flex xs12 v-show="cropped == null">
                                        <div class="uploadbox" >
                                          <img :src="require('@/assets/images/uploadyourimage.jpg')" alt="Upload Foto Sparepart" width="300" v-if="typeInput == 'new'">
                                          <img :src="$apiUrl + 'images/sparepart/' + editData.picture" alt="Upload Foto Sparepart" width="300" v-if="typeInput == 'edit'">
                                          <input type="file" class="uploadButton" accept="image/png, image/jpeg, image/gif, image/jpg"
                                              @change="uploadImg($event, 1)">
                                        </div>
                                      </v-flex>
                                      <v-flex xs12 v-show="cropped != null">
                                        <v-btn fab dark small color="red" class="iconCancel" @click.prevent="cropped = null">
                                            <v-icon dark >cancel</v-icon>
                                          </v-btn>
                                          <vue-croppie 
                                            ref="croppieRef" 
                                            :enableOrientation="true"
                                            :enableResize="false" 
                                            :viewport="{ width: 350, height: 210, type: 'square' }"
                                            @result="result" >
                                        </vue-croppie>
                                      </v-flex>
                                          
                                        <v-flex xs12>
                                        <v-text-field label="Kode Sparepart*" required v-model="editData.code" :rules="[rules.required]" @change="isUnique()" :error="!unique" :error-messages="errorMessage" :disabled="typeInput == 'edit'"></v-text-field>
                                      </v-flex>
                                       <v-flex xs12>
                                        <v-text-field label="Nama Sparepart*" required v-model="editData.name" :rules="[rules.required, rules.textOnly]"></v-text-field>
                                      </v-flex>
                                       <v-flex xs12>
                                        <v-text-field label="Merk Sparepart*" required v-model="editData.merk" :rules="[rules.required, rules.textOnly]"></v-text-field>
                                      </v-flex>
                                       <v-flex xs12>
                                        <v-text-field label="Tipe Sparepart*" required v-model="editData.type" :rules="[rules.required, rules.textOnly]"></v-text-field>
                                      </v-flex>
                                      <v-flex xs12>
                                        <v-select
                                          v-model="editData.vehicles"
                                          :items="vehicles"
                                          item-text="name"
                                          item-value="id"
                                          label="Jenis kendaraan"
                                          multiple
                                          chips
                                          hint="Kendaraan apa yang cocok untuk sparepart ini?"
                                          persistent-hint
                                        ></v-select>
                                      </v-flex>
                                    </v-layout>
                                  </v-container>
                                  <small>*Wajib diisi</small>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="red darken-1" dark @click.prevent="editDialog = false; resetData()">Batal</v-btn>
                                  <v-btn color="green darken-1" dark v-if="typeInput == 'new'" @click.prevent="cropData()" :loading="loading">Tambahkan</v-btn>
                                  <v-btn color="orange darken-1" dark v-if="typeInput == 'edit'" @click.prevent="cropData()" :loading="loading">Perbaharui</v-btn>
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
<style>
.cr-boundary{
  height: 300px !important;
}
.iconCancel{
  position: absolute !important;
  z-index: 20;
  right: 0;
  top: 0;
}
</style>

<script>
export default {
  mounted () {
    this.getData()
    this.getVehicle()
  },
  data () {
    return {
      cropped: null,
      valid: true,
      typeInput: 'new',
      role: 'semua',
      saveRole: '',
      stat: '',
      search: '',
      spareparts: [],
      dialog: false,
      deleteDialog: false,
      editDialog: false,
      snackbar: false,
      text: '',
      color: null,
      reset: false,
      editData: {
        code: '',
        name: '',
        merk: null,
        type: '',
        vehicles: [],
        supplier_id: -1,
        deleteVehicle: [],
        newVehicle: [],
        picture: null
      },
      vehicles: [],
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
      data: new FormData(),
      unique: true,
      errorMessage: '',
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
      if (this.spareparts.length) {
        return this.spareparts.filter((row, index) => {
          if (this.search !== '') return row.name.toLowerCase().includes(this.search.toLowerCase()) || row.code.toLowerCase().includes(this.search.toLowerCase())
          return true
        })
      }
    }
  },
  methods: {
    cropData () {
      if (this.changeImg === 1) {
        let options = {
          type: 'base64',
          format: 'png'
        }
        this.$refs.croppieRef.result(options, (output) => {
          this.editData.picture = output
        })
      }
      this.$nextTick(function () {
        if (this.typeInput === 'edit') {
          this.UpdateData()
        } else {
          this.SendData()
        }
      })
    },
    uploadImg (e, num) {
      var file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('Anda hanya diperbolehkan mengupload foto/gambar')
        return false
      }
      var reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.cropped = data
        this.$refs.croppieRef.bind({
          url: this.cropped
        })
        this.changeImg = 1
      }
      reader.readAsArrayBuffer(file)
    },
    result (output) {
      console.log('result')
    },
    getVehicle () {
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      uri = this.$apiUrl + 'vehicle'
      this.$http.get(uri, config).then(response => {
        this.vehicles = response.data
        for (let i = 0; i < this.vehicles.length; i++) {
          this.vehicles[i].name = this.vehicles[i].merk + ' ' + this.vehicles[i].type
        }
      })
    },
    isUnique () {
      if (this.editData.code === null || this.editData.code === '') {
        this.unique = true
        this.errorMessage = ''
      }
      this.load = true
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      uri = this.$apiUrl + 'sparepartIsUnique'
      this.$http.post(uri, {code: this.editData.code}, config).then(response => {
        console.log(response)
        if (response.data === 1) {
          this.unique = false
          this.errorMessage = 'Kode sudah digunakan'
        } else {
          this.unique = true
          this.errorMessage = ''
        }
      }).catch(error => {
        console.log(error)
        this.errorMessage = 'Kode sudah digunakan'
        this.unique = false
      })
    },
    seteditData (data) {
      this.typeInput = 'edit'
      this.editData.code = data.code
      this.editData.name = data.name
      this.editData.merk = data.merk
      this.editData.type = data.type
      for (let i = 0; i < data.vehicle.length; i++) {
        this.editData.vehicles.push(data.vehicle[i].id)
      }
      this.editData.picture = data.picture
      this.changeImg = 0
    },
    resetData () {
      this.loading = false
      this.deleteDialog = false
      this.$refs.form.reset()
      this.typeInput = 'new'
      this.cropped = null
      this.data = new FormData()
    },
    deleteData () {
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri = this.$apiUrl + 'sparepart/' + this.editData.code
      this.$http.delete(uri, config).then(response => {
        this.snackbar = true
        this.text = 'Data berhasil dihapus'
        this.color = 'green'
        this.resetData()
        this.getData()
      }).catch(error => {
        console.log(error)
        this.snackbar = true
        this.color = 'red'
        this.text = 'Coba Lagi'
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
      if (this.editData.vehicles.length < 1) {
        this.snackbar = true
        this.text = 'Mohon untuk menentukan kendaraan yang cocok untuk sparepart ini terlebih dahulu'
        this.color = 'error'
        return
      }
      if (this.cropped == null) {
        this.snackbar = true
        this.text = 'Mohon untuk mengupload foto sparepart terlebih dahulu'
        this.color = 'error'
        return
      }
      this.loading = true
      var uri
      var config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      this.prepareFields()
      uri = this.$apiUrl + 'sparepart'
      this.$http.post(uri, this.data, config).then(response => {
        this.resetData()
        this.getData()
      }).catch(error => {
        console.log(error.response)
        this.snackbar = true
        this.text = error.response.data.errors.phoneNumber[0]
        this.color = 'red'
      })
    },
    prepareFields () {
      this.data.append('code', this.editData.code)
      this.data.append('name', this.editData.name)
      this.data.append('merk', this.editData.merk)
      this.data.append('type', this.editData.type)
      for (let i = 0; i < this.editData.vehicles.length; i++) {
        this.data.append('vehicles[]', this.editData.vehicles[i])
      }
      this.data.append('supplier_id', this.$route.params.id)
      this.data.append('picture', this.editData.picture)
      this.data.append('changeImg', this.changeImg)
    },
    UpdateData () {
      if (!this.$refs.form.validate()) {
        this.snackbar = true
        this.text = 'Mohon untuk melengkapi form yang tersedia'
        this.color = 'red'
        return
      }
      if (this.editData.vehicles.length < 1) {
        this.snackbar = true
        this.text = 'Mohon untuk menentukan kendaraan yang cocok untuk sparepart ini terlebih dahulu'
        this.color = 'error'
        return
      }
      this.loading = true
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      this.prepareFields()
      uri = this.$apiUrl + 'sparepart/' + this.editData.code
      this.$http.post(uri, this.data, config).then(response => {
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
      uri = this.$apiUrl + 'sparepartBySupplier/' + this.$route.params.id
      this.$http.get(uri, config).then(response => {
        this.spareparts = response.data
        this.loadData = false
      })
    }
  }
}
</script>
