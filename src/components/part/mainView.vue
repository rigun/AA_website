<template>
  <v-container
        fluid
        grid-list-lg
        >
    <div class="columns">
      <div class="column is-one-quarter">
        <div class="box-mainInfo">
          <div class="background-icon-main" style="background: blue">
            <div class="icon-main">
              <v-icon>how_to_reg</v-icon>
            </div>
          </div>
          <div class="background-text-main">
            <p class="note-main-info">Konsumen</p>
            <p class="number-main">0</p>
          </div>
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="box-mainInfo">
          <div class="background-icon-main" style="background: orange">
            <div class="icon-main">
              <v-icon>business</v-icon>
            </div>
          </div>
          <div class="background-text-main">
            <p class="note-main-info">Supplier</p>
            <p class="number-main">0</p>
          </div>
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="box-mainInfo">
          <div class="background-icon-main" style="background: green">
            <div class="icon-main">
              <v-icon>assistant</v-icon>
            </div>
          </div>
          <div class="background-text-main">
            <p class="note-main-info">Pegawai</p>
            <p class="number-main">0</p>
          </div>
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="box-mainInfo">
          <div class="background-icon-main" style="background: gray">
            <div class="icon-main">
              <v-icon>list</v-icon>
            </div>
          </div>
          <div class="background-text-main" >
            <p class="note-main-info">Varian kendaraan</p>
            <p class="number-main">0</p>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-multiline">
      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <div class="columns">
              <div class="column">
                <p><strong>Layanan</strong></p>
              </div>
              <div class="column" style="text-align:right">
                <v-btn slot="activator" fab small  dark color="indigo" @click.prevent="inputType = 'new'; inputCat = 'service'; dialog = true">
                <v-icon dark >add</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="limitBox">

              <div class="outsideBox" v-for="service in services" :key="service.id">
                  <div class="box-ticket" style="border-left: solid 5px red" >
                      <v-icon class="aktifbutton aktif" v-if="service.status == 1">check_box</v-icon>
                      <v-icon class="aktifbutton nonaktif" v-else>indeterminate_check_box</v-icon>
                      <p style="color: #888888">{{service.name}} <br> <strong>{{convertPrice(service.price)}}</strong></p>
                      <p style="margin-left: auto;margin-right: 10px; text-align: right;color: #888888">Pemakaian Jasa <br> <strong>0</strong></p>
                  </div>
                  <p class="editTool" style="text-align: right;">
                      <v-icon class="editButton" @click.prevent=" dialog = true; inputType='edit';inputCat = 'service';setEditData(service);">edit</v-icon>
                      <v-icon class="deleteButton" @click.prevent=" deleteDialog = true; inputCat = 'service';setEditData(service);">delete</v-icon>
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="card">
          <div class="card-content">
            <div class="columns">
              <div class="column">
                <p><strong>Kendaraan</strong></p>
              </div>
              <div class="column" style="text-align:right">
                <v-btn slot="activator" fab small  dark color="indigo" @click.prevent="inputType = 'new'; inputCat = 'vehicle'; dialog = true">
                <v-icon dark >add</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="limitBox">
              <div class="outsideBox" v-for="vehicle in vehicles" :key="vehicle.id">
                  <div class="box-ticket" style="border-left: solid 5px red" >
                      <p style="color: #888888">Merk - tipe <br> <strong>{{vehicle.merk}} - {{vehicle.type}}</strong></p>
                      <p style="margin-left: auto;margin-right: 10px; text-align: right;color: #888888">Jumlah sparepart <br> <strong>0</strong></p>
                  </div>
                  <p class="editTool" style="text-align: right;">
                      <v-icon class="editButton" @click.prevent="dialog = true; inputType='edit';inputCat = 'vehicle';setEditData(vehicle);">edit</v-icon>
                      <v-icon class="deleteButton" @click.prevent="deleteDialog = true; inputCat = 'vehicle';setEditData(vehicle);">delete</v-icon>
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
              <v-card>
                <v-card-title>
                    Form <span v-if="inputCat == 'service'">Layanan</span> <span v-else>Kendaraan</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field label="Merk Kendaraan*" v-if="inputCat == 'vehicle'" required v-model="editData.merk" :rules="[rules.required, rules.textOnly]"></v-text-field>
                      </v-flex>
                        <v-flex xs12>
                        <v-text-field label="Tipe Kendaraan*" v-if="inputCat == 'vehicle'" required v-model="editData.type" :rules="[rules.required]"></v-text-field>
                      </v-flex>
                        <v-flex xs12>
                        <v-text-field label="Nama Jasa Service*" v-if="inputCat == 'service'" required v-model="editData.name" :rules="[rules.required, rules.textOnly]"></v-text-field>
                      </v-flex>
                        <v-flex xs12>
                        <v-text-field label="Biaya Jasa Service*" v-if="inputCat == 'service'" type="number" required v-model="editData.price" :rules="[rules.required, rules.numberOnly]"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <small>*Wajib diisi</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" dark @click.prevent="resetData()">Batal</v-btn>
                  <v-btn color="green darken-1" dark v-if="inputType == 'new'" @click.prevent="SendData()" :loading="load">Tambahkan</v-btn>
                  <v-btn color="orange darken-1" dark v-if="inputType == 'edit'" @click.prevent="UpdateData()" :loading="load">Perbaharui</v-btn>
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
                <v-card-title class="headline">Hapus Data <span v-if="inputCat == 'service'">Layanan</span><span v-if="inputCat == 'vehicle'">Kendaraan</span> ?</v-card-title>
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
  </v-container>
</template>
<style scoped>
.limitBox{
  max-height: 311px;
  overflow-y: auto;
}
</style>

<script>
import axios from 'axios'
export default {
  mounted () {
    this.getData('service')
    this.getData('vehicle')
    this.getDashboard()
  },
  data () {
    return {
      valid: true,
      snackbar: false,
      color: 'red',
      text: '',
      services: [],
      vehicles: [],
      dashboard: {},
      editData: {
        id: -1,
        merk: '',
        type: '',
        name: '',
        price: 0
      },
      load: false,
      inputType: 'new',
      inputCat: 'service',
      dialog: false,
      deleteDialog: false,
      rules: {
        required: value => !!value || 'Data ini tidak boleh kosong',
        numberOnly: value => !isNaN(value) || 'Data tidak valid, hanya diijinkan memasukkan angka',
        textOnly: value => RegExp(/^[A-Za-z ]+$/).test(value) || 'Data tidak valid, hanya diijinkan memasukkan huruf'
      }
    }
  },
  methods: {
    convertPrice (value) {
      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
      })
      return formatter.format(value)
    },
    setEditData (dataByCat) {
      var data = dataByCat
      this.editData.id = data.id
      if (this.inputCat === 'service') {
        this.editData.name = data.name
        this.editData.price = data.price
      } else {
        this.editData.merk = data.merk
        this.editData.type = data.type
      }
    },
    resetData () {
      this.$refs.form.reset()
      this.editData.id = -1
      this.editData.merk = ''
      this.editData.type = ''
      this.editData.name = ''
      this.editData.price = ''
      this.inputType = 'new'
      this.inputCat = 'service'
      this.dialog = false
      this.deleteDialog = false
      this.load = false
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
      uri = this.$apiUrl + this.inputCat
      axios.post(uri, this.editData, config).then(response => {
        this.getData(this.inputCat)
        this.resetData()
      }).catch(error => {
        console.log(error.response)
        this.snackbar = true
        this.text = 'Terjadi kesalahan'
        this.color = 'error'
      })
    },
    UpdateData () {
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
      uri = this.$apiUrl + this.inputCat + '/' + this.editData.id
      axios.post(uri, this.editData, config).then(response => {
        this.getData(this.inputCat)
        this.resetData()
      }).catch(error => {
        console.log(error.response)
        this.snackbar = true
        this.text = 'Terjadi kesalahan'
        this.color = 'error'
      })
    },
    deleteData () {
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      var uri = this.$apiUrl + this.inputCat + '/' + this.editData.id
      axios.delete(uri, config).then(response => {
        this.snackbar = true
        this.text = 'Data berhasil dihapus'
        this.color = 'green'
        this.getData(this.inputCat)
        this.resetData()
      }).catch(error => {
        console.log(error)
        this.snackbar = true
        this.text = 'Coba Lagi'
        this.color = 'red'
      })
    },
    getData (category) {
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      uri = this.$apiUrl + category
      axios.get(uri, config).then(response => {
        if (category === 'service') {
          this.services = response.data
        } else {
          this.vehicles = response.data
        }
      })
    },
    getDashboard () {
      console.log('dashboard')
    }
  }
}
</script>
