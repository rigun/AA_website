<template>
   <div id="mainContentYesplis" class="content" >
       
        <div id="Home">
            <img class="background" :src="require(`@/assets/images/background.png`)">
            <div class="container">
                <div class="columns">
                    <div class="column">
                            <div class="intro-lead-in"><h1>Atma Auto</h1></div>
                            <hr>
                            <p class="section-subheading" style="line-height: 2; letter-spacing: 0.4px; opacity: 0.8; font-size: 16px; font-weight: bold">
                                Bengkel Sepeda Motor yang menyediakan 
                                jasa service dan penjualan sparepart 
                                yang berada di Kota Yogyakarta
                            </p>
                    </div>
                    <div class="column">
                        <img style="width: 280px" :src="require(`@/assets/LogoWhite.svg`)">
                    </div>
                </div>
            </div>
        </div>

        <div id="OurServices">
            <div class="container">
                <div class="card">
                    <div class="card-content">
                        <div class="columns">
                            <div class="column">
                                  <v-form
                                    ref="form"
                                    v-model="valid"
                                    lazy-validation
                                >
                                    <v-card>
                                        <v-card-title>
                                            <h3>Pemesanan Anda</h3>
                                        </v-card-title>
                                            <v-card-text>
                                                <v-container grid-list-md>
                                                    <v-layout wrap>
                                                        <v-flex xs12>
                                                            <v-text-field label="Plat Nomor Kendaraan Anda" required v-model="editData.licensePlate" :rules="[rules.required]"></v-text-field>
                                                        </v-flex>
                                                            <v-flex xs12>
                                                            <v-text-field label="Nomor Handphone Anda" required v-model="editData.phoneNumber" :rules="[rules.required, rules.numberOnly]"></v-text-field>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-container>
                                            </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="red darken-1" dark @click.prevent="reset()">Reset</v-btn>
                                            <v-btn color="green darken-1" dark @click.prevent="SendData()">Periksa</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                        </v-form>
                            </div>
                            <div class="column">
                              <v-card>
                                    <v-card-title>
                                        <h3>Layanan Kami</h3>
                                    </v-card-title>
                                        <v-card-text>
                                            <v-container grid-list-md>
                                                <v-layout wrap>
                                                    <div class="limitBox" style="width: 100%;">
                                                      <div class="outsideBox" v-for="service in services" :key="service.id">
                                                          <div class="box-ticket" style="border-left: solid 5px red" >
                                                              <p style="color: #888888; text-align:left">Nama Layanan <br> <strong>{{service.name}}</strong></p>
                                                              <p style="margin-left: auto;margin-right: 10px; text-align: right;color: #888888">Biaya Layanan <br> <strong>{{convertPrice(service.price)}}</strong></p>
                                                          </div>
                                                      </div>
                                                      </div>
                                                </v-layout>
                                            </v-container>
                                        </v-card-text>

                                </v-card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="Events">
            <div class="container">
                
                <div class="columns">
                    <div class="column">
                        
                    </div>
                    <div class="column titleSection">
                        <h1>Produk Kami</h1>
                        <p style="max-width: 428px; margin: auto; opacity: 0.7; ">Berikut adalah produk-produk kami</p>
                    </div>
                    <div class="column">
                        
                    </div>
                </div>  <!-- End of Columns -->
                    <nav class="level">
                        <div class="level-left">
                            <b-field grouped group-multiline>
                                <b-select placeholder="Urutkan Harga"  v-model="filterPrice">
                                    <option value="cheapest">Harga Termurah</option>
                                    <option value="expensive">Harga Termahal</option>
                                </b-select>
                                <b-select  placeholder="Urutkan Stok" v-model="filterStock">
                                    <option value="least">Paling Sedikit</option>
                                    <option value="much">Paling Banyak</option>
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
                <div id="EventList" class="columns is-multiline tile is-ancestor" >
        
                <div class="column is-one-third tile is-parent" v-for="sparepart in sparepartsList" :key="sparepart.id" >
                    <div class="box tile is-child">
                        <div class="info" style="background-color:white !important">
                          <div class="imgLimit">
                            <img :src="$apiUrl + 'images/sparepart/' + sparepart.picture" alt="">
                          </div>
                            <p class="namaevent"> {{sparepart.name}}</p>
                            <table>
                                <tr>
                                    <td>Merk</td>
                                    <td>{{sparepart.merk}}</td>
                                </tr>
                                <tr>
                                    <td>Type</td>
                                    <td>{{sparepart.type}}</td>
                                </tr>
                                <tr>
                                    <td>Stok</td>
                                    <td><p v-if="sparepart.minstock > 0" style="text-align: right">{{sparepart.minstock}}</p><span v-else>Stok habis</span></td>
                                </tr>
                                <tr v-if="sparepart.minstock > 0">
                                    <td>Harga Mulai Dari</td>
                                    <td style="text-align: right">{{convertPrice(sparepart.minprice)}}</td>
                                </tr>
                            </table>
                            <br>
                            <hr>
                            <p>Tersedia di cabang: <br>
                                <span v-for="sb in sparepart.sparepartbranch" :key="sb.id">
                                    {{sb.branch.name}}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
                <div class="columns">
                    <div class="column" style="text-align: center;">
                            <v-pagination
                            v-model="page"
                            :length="totalPage"
                            ></v-pagination>
                    </div>
                </div><!--end of columns-->
            </div>
        </div>


   </div>
</template>
<style>
.imgLimit{
  height: 182px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  overflow: hidden;
}
</style>

<script>
export default {
  mounted () {
    this.getData()
    this.getSparepart()
  },
  data () {
    return {
      filterStock: null,
      filterPrice: null,
      search: '',
      page: 1,
      perPage: 9,
      totalPage: 0,
      valid: true,
      editData: {
        licensePlate: '',
        phoneNumber: ''
      },
      spareparts: [],
      services: [],
      rules: {
        required: value => !!value || 'Data ini tidak boleh kosong',
        numberOnly: value => !isNaN(value) || 'Data tidak valid, hanya diijinkan memasukkan angka',
        textOnly: value => RegExp(/^[A-Za-z ]+$/).test(value) || 'Data tidak valid, hanya diijinkan memasukkan huruf'
      }
    }
  },
  computed: {
    sparepartsList () {
      if (this.spareparts.length) {
        if (this.filterStock === 'much' && this.filterPrice === null) return this.spareparts.filter((row, index) => (this.search !== '') ? row.name.toLowerCase().includes(this.search.toLowerCase()) : row.minstock !== 0).sort((a, b) => (a.minstock < b.minstock) ? 1 : -1)
        if (this.filterStock === 'least' && this.filterPrice === null) return this.spareparts.filter((row, index) => (this.search !== '') ? row.name.toLowerCase().includes(this.search.toLowerCase()) : row.minstock !== 0).sort((a, b) => (a.minstock > b.minstock) ? 1 : -1)
        if (this.filterPrice === 'expensive' && this.filterStock === null) return this.spareparts.filter((row, index) => (this.search !== '') ? row.name.toLowerCase().includes(this.search.toLowerCase()) : row.minstock !== 0).sort((a, b) => (a.minprice < b.minprice) ? 1 : -1)
        if (this.filterPrice === 'cheapest' && this.filterStock === null) return this.spareparts.filter((row, index) => (this.search !== '') ? row.name.toLowerCase().includes(this.search.toLowerCase()) : row.minstock !== 0).sort((a, b) => (a.minprice > b.minprice) ? 1 : -1)
        if (this.filterPrice === 'expensive' && this.filterStock === 'much') return this.spareparts.filter((row, index) => (this.search !== '') ? row.name.toLowerCase().includes(this.search.toLowerCase()) : row.minstock !== 0).sort((a, b) => (a.minprice < b.minprice) ? 1 : (a.minprice > b.minprice) ? -1 : (a.minstock < b.minstock) ? 1 : -1)
        if (this.filterPrice === 'cheapest' && this.filterStock === 'least') return this.spareparts.filter((row, index) => (this.search !== '') ? row.name.toLowerCase().includes(this.search.toLowerCase()) : row.minstock !== 0).sort((a, b) => (a.minprice > b.minprice) ? 1 : (a.minprice < b.minprice) ? -1 : (a.minstock > b.minstock) ? 1 : -1)
        if (this.filterPrice === 'expensive' && this.filterStock === 'least') return this.spareparts.filter((row, index) => (this.search !== '') ? row.name.toLowerCase().includes(this.search.toLowerCase()) : row.minstock !== 0).sort((a, b) => (a.minprice < b.minprice) ? 1 : (a.minprice > b.minprice) ? -1 : (a.minstock > b.minstock) ? 1 : -1)
        if (this.filterPrice === 'cheapest' && this.filterStock === 'much') return this.spareparts.filter((row, index) => (this.search !== '') ? row.name.toLowerCase().includes(this.search.toLowerCase()) : row.minstock !== 0).sort((a, b) => (a.minprice > b.minprice) ? 1 : (a.minprice < b.minprice) ? -1 : (a.minstock < b.minstock) ? 1 : -1)
        return this.spareparts.filter((row, index) => {
          if (this.search !== '') return row.name.toLowerCase().includes(this.search.toLowerCase())
          return ((this.page - 1) * this.perPage <= index && index < this.page * this.perPage)
        })
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
    getData () {
      var uri = this.$apiUrl + 'service'
      this.$http.get(uri).then(response => {
        this.services = response.data
      })
    },
    getSparepart () {
      var uri = this.$apiUrl + 'sparepartLanding'
      this.$http.get(uri).then(response => {
        var stock = 0
        var price = 0
        var json = {}
        this.$nextTick(function () {
          for (let i = 0; i < response.data.length; i++) {
            json = response.data[i]
            try {
              stock = response.data[i].sparepartbranch[0].stock
              price = response.data[i].sparepartbranch[0].sell
            } catch (e) {
              stock = 0
              price = 0
            }
            for (let j = 0; j < response.data[i].sparepartbranch.length; j++) {
              if (response.data[i].sparepartbranch[j].stock < stock) {
                stock = response.data[i].sparepartbranch[j].stock
              }
              if (response.data[i].sparepartbranch[j].sell < price) {
                price = response.data[i].sparepartbranch[j].sell
              }
            }
            json.minstock = stock
            json.minprice = price
            this.spareparts.push(json)
          }
        })
        console.log(response.data)
        this.totalPage = Math.round(response.data.length / this.perPage)
      })
    }
  }
}
</script>
