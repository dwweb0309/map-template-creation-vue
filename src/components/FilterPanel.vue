<template>
  <div class="pl-4 py-3">
    <div class="d-flex justify-space-between align-center">
      <div class="font-weight-bold">Filters</div>
      <v-btn text color="primary"><v-icon left>{{ mdiStarOutline }}</v-icon> Saved filters</v-btn>
    </div>
    <v-text-field outlined dense :prepend-inner-icon="mdiMagnify" hide-details class="pr-2 mt-2" />
    <div class="mt-2">
      <div class="d-flex align-center">
        <div class="font-weight-bold">Property Type</div>
        <v-spacer />
        <v-btn
          icon
          @click="showPropertyType = !showPropertyType"
        >
          <v-icon>{{ showPropertyType ? mdiChevronUp : mdiChevronDown }}</v-icon>
        </v-btn>
      </div>
      <v-expand-transition>
        <div v-show="showPropertyType" class="px-2">
          <div v-for="(type, i) in propertyTypes" :key="i">
            <div class="d-flex align-center cursor-pointer">
              <v-icon left :color="someSubTypes(type) || allSubTypes(type) ? 'primary' : ''" @click="toggleSelection(type)">{{ icon(type) }}</v-icon>
              <span @click="toggleSelection(type)">{{ type.name }}</span>
              <v-spacer></v-spacer>
              <v-btn
                icon
                @click="type.showSubTypes = !type.showSubTypes"
              >
                <v-icon>{{ type.showSubTypes ? mdiChevronUp : mdiChevronDown }}</v-icon>
              </v-btn>
            </div>
            <v-expand-transition>
              <div v-show="type.showSubTypes">
                <v-checkbox
                  v-for="(subType, j) in type.subTypes"
                  :key="j"
                  v-model="filter.subTypes"
                  :label="subType.name"
                  :value="subType.id"
                  hide-details
                  dense
                  class="pl-4"
                ></v-checkbox>
              </div>
            </v-expand-transition>
          </div>
        </div>
      </v-expand-transition>
      <div class="d-flex align-center">
        <div class="font-weight-bold">Sold Date</div>
        <v-spacer />
        <v-btn
          icon
          @click="showSoldDate = !showSoldDate"
        >
          <v-icon>{{ showSoldDate ? mdiChevronUp : mdiChevronDown }}</v-icon>
        </v-btn>
      </div>
      <v-expand-transition>
        <div v-show="showSoldDate" class="pl-2 pr-2">
          <v-radio-group v-model="filter.soldDate">
            <v-radio
              v-for="(date, i) in soldDates"
              :key="i"
              :label="date.label"
              :value="date.id"
            />
            <v-radio
              label=""
              :value="4"
            >
              <template v-slot:label>
                <v-menu
                  ref="menu1"
                  v-model="soldDateMenu1"
                  :close-on-content-click="false"
                  :return-value.sync="soldDateRange[0]"
                  transition="slide-y-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="soldDateRange[0]"
                      outlined
                      dense
                      hide-details
                      readonly
                      class="mr-2"
                      :prepend-inner-icon="mdiCalendarMonth"
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="soldDateRange[0]"
                    no-title
                    scrollable
                    color="primary"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="soldDateMenu1 = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu1.save(soldDateRange[0])"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
                <v-menu
                  ref="menu2"
                  v-model="soldDateMenu2"
                  :close-on-content-click="false"
                  :return-value.sync="soldDateRange[1]"
                  transition="slide-y-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="soldDateRange[1]"
                      outlined
                      dense
                      hide-details
                      readonly
                      class="mr-2"
                      :prepend-inner-icon="mdiCalendarMonth"
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="soldDateRange[1]"
                    no-title
                    scrollable
                    color="primary"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="soldDateMenu2 = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu2.save(soldDateRange[1])"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </template>
            </v-radio>
          </v-radio-group>
        </div>
      </v-expand-transition>
      <div class="d-flex align-center">
        <div class="font-weight-bold">Sold Price</div>
        <v-spacer />
        <v-btn
          icon
          @click="showSoldPrice = !showSoldPrice"
        >
          <v-icon>{{ showSoldPrice ? mdiChevronUp : mdiChevronDown }}</v-icon>
        </v-btn>
      </div>
      <v-expand-transition>
        <div v-show="showSoldPrice" class="pl-2 pr-2">
          <v-radio-group v-model="filter.soldPrice">
            <v-radio
              v-for="(price, i) in soldPrices"
              :key="i"
              :label="price.label"
              :value="price.id"
            />
            <v-radio
              label=""
              :value="4"
            >
              <template v-slot:label>
                <v-text-field type="number" outlined dense hide-details class="mr-2" :prepend-inner-icon="mdiCurrencyUsd" />
                <v-text-field type="number" outlined dense hide-details :prepend-inner-icon="mdiCurrencyUsd" />
              </template>
            </v-radio>
          </v-radio-group>
        </div>
      </v-expand-transition>
      <div>
        <div class="font-weight-bold mt-1">Keywords</div>
        <div class="mt-2 pr-2">
          <v-text-field outlined dense placeholder="Enter any keywords..."></v-text-field>
        </div>
      </div>
    </div>
    <div class="d-flex pr-2">
      <v-btn outlined>Reset All</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary">Apply</v-btn>
    </div>
  </div>
</template>

<script>
import {
  mdiStarOutline,
  mdiMagnify,
  mdiChevronUp,
  mdiChevronDown,
  mdiCalendarMonth,
  mdiCurrencyUsd,
  mdiCheckboxBlankOutline,
  mdiCheckboxOutline,
  mdiMinusBox
} from '@mdi/js'
import { mapState, mapActions } from 'vuex'
import { howManyInArray, mergeArrayWithoutDuplicate, removeMultipleFromArray } from '../helper/array'

export default {
  data: () => ({
    mdiStarOutline,
    mdiMagnify,
    mdiChevronUp,
    mdiChevronDown,
    mdiCalendarMonth,
    mdiCurrencyUsd,
    mdiCheckboxBlankOutline,
    mdiCheckboxOutline,
    mdiMinusBox,

    showPropertyType: false,
    showSoldDate: true,
    showSoldPrice: false,
    soldDateMenu1: false,
    soldDateMenu2: false,
    soldDateRange: [null, null],
    filter: {
      subTypes: [],
      soldPrice: [0, 5000],
      soldDate: 0
    },
    soldPrices: [
      {
        id: 1,
        label: 'Under $5 million',
        value: [0, 5000000]
      }, {
        id: 2,
        label: '$5 million to $10 million',
        value: [5000000, 10000000]
      }, {
        id: 3,
        label: '$10 million to $20 million',
        value: [10000000, 20000000]
      }
    ],
    soldDates: [
      {
        id: 1,
        label: 'Last 3 Months',
        value: ''
      }, {
        id: 2,
        label: 'Last 6 Months',
        value: ''
      }, {
        id: 3,
        label: 'Last 12 Months',
        value: ''
      }
    ]
  }),
  computed: {
    ...mapState('property', ['propertyTypes']),
  },
  mounted() {
    this.getPropertyTypes()
  },
  methods: {
    ...mapActions('property', ['getPropertyTypes']),
    allSubTypes (type) {
      return howManyInArray(this.filter.subTypes, type.subTypes.map((v) => v.id)) === type.subTypes.length
    },
    someSubTypes (type) {
      return howManyInArray(this.filter.subTypes, type.subTypes.map((v) => v.id)) > 0 && !this.allSubTypes(type)
    },
    icon (type) {
      if (this.allSubTypes(type)) return mdiCheckboxOutline
      if (this.someSubTypes(type)) return mdiMinusBox
      return mdiCheckboxBlankOutline
    },
    toggleSelection(type) {
      this.$nextTick(() => {
        if (this.allSubTypes(type)) {
          removeMultipleFromArray(this.filter.subTypes, type.subTypes.map((v) => v.id))
        } else {
          mergeArrayWithoutDuplicate(this.filter.subTypes, type.subTypes.map((v) => v.id))
        }
      })
    }
  }
}
</script>
