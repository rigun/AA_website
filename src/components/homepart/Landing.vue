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
                                                    <div class="limitBox">
                                                      <div class="outsideBox" v-for="service in services" :key="service.id">
                                                          <div class="box-ticket" style="border-left: solid 5px red" >
                                                              <p style="color: #888888">{{service.name}} <br> <strong>{{convertPrice(service.price)}}</strong></p>
                                                              <p style="margin-left: auto;margin-right: 10px; text-align: right;color: #888888">Pemakaian Jasa <br> <strong>0</strong></p>
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
                <div id="EventList" class="columns is-multiline" >
        
                <div class="column is-one-third" v-for="event in events" :key="event.id" >
                    <router-link :to="{name: 'DetailEvent', params:{slug: event.slug}}" style="text-decoration: none">
                    <div class="box">
                        <div class="info">
                            <span class="tag " :class="currentClass(event)">{{currentStat(event)}}</span>
                            <img :src="'/images/banner/'+event.banner.filename" alt="">
                            <p class="namaevent"> {{event.nama}}</p>
                            <table border='0'>
                                <tr>
                                    <td>
                                        <v-icon>date_range</v-icon>
                                    </td>
                                    <td>
                                         <p class="tanggalMulai">{{dateFormat(event.tanggalMulai)}} | {{event.waktuMulai}}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-icon>location_on</v-icon>
                                    </td>
                                    <td>
                                        <p class="tempatEvent"> {{event.alamat.split(',')[0]}} | {{event.namaTempat}}</p>
                                    </td>
                                </tr>
                            </table>
                            <hr>
                            <div class="info" v-if="event.ticket_min_price != null" style="display:flex">
                                <p>Start From</p>
                                <p style="margin-left:auto">{{minData(event.ticket_min_price)}}</p>
                            </div>
                        </div>
                    </div>
                    </router-link>
                </div>
            </div>
                <div class="columns">
                    <div class="column" style="text-align: center;">
                        <router-link :to="{name:'Store'}" style="text-decoration:none"><button class="btn btn-view">View More</button></router-link>
                    </div>
                </div><!--end of columns-->
            </div>
        </div>


   </div>
</template>
<script>
export default {
  mounted () {
    this.getData('service')
  },
  data () {
    return {
      valid: true,
      editData: {
        licensePlate: '',
        phoneNumber: ''
      },
      services: [],
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
    getData (category) {
      var uri
      var config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      uri = this.$apiUrl + category
      this.$http.get(uri, config).then(response => {
        if (category === 'service') {
          this.services = response.data
        } else {
          this.vehicles = response.data
        }
      })
    }
  }
}
</script>
