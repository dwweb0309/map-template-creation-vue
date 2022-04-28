<template>
  <validation-observer ref="form" v-slot="{ handleSubmit }">
    <b-form @submit.prevent="handleSubmit(onSubmit)">
      <b-form-group label="Name:" label-for="name">
        <b-form-input
          id="pin"
          v-model="form.pin"
          placeholder="Pin"
        />
      </b-form-group>

      <validation-provider
        name="Name"
        rules="required"
        v-slot="validationContext"
      >
        <b-form-group label="Name:" label-for="name">
          <b-form-input
            id="name"
            v-model="form.name"
            placeholder="Map name"
            @input="CLEAR_ERROR"
            :state="getValidationState(validationContext)"
          />
          <b-form-invalid-feedback>
            {{ validationContext.errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>

      <validation-provider
        name="Address"
        rules="required"
        v-slot="validationContext"
      >
        <b-form-group label="Address:" label-for="address">
          <b-form-input
            id="address"
            v-model="form.address"
            placeholder="Address"
            @input="CLEAR_ERROR"
            :state="getValidationState(validationContext)"
          />
          <b-form-invalid-feedback>
            {{ validationContext.errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>
      <b-row>
        <b-col>
          <validation-provider
            name="City"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group label="City:" label-for="city">
              <b-form-input
                id="city"
                v-model="form.city"
                placeholder="City"
                @input="CLEAR_ERROR"
                :state="getValidationState(validationContext)"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col>
          <validation-provider
            name="State"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group label="State:" label-for="state">
              <b-form-input
                id="state"
                v-model="form.state"
                placeholder="State"
                @input="CLEAR_ERROR"
                :state="getValidationState(validationContext)"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
      </b-row>

      <b-form-group label="Description:" label-for="description">
        <b-form-textarea
          id="description"
          v-model="form.description"
          placeholder="Description"
          @input="CLEAR_ERROR"
        />
      </b-form-group>

      <validation-provider
        name="Squarefeet"
        rules="required"
        v-slot="validationContext"
      >
        <b-form-group label="Squarefeet:" label-for="squarefeet">
          <b-form-input
            id="squarefeet"
            type="number"
            v-model="form.squarefeet"
            placeholder="Squarefeet"
            @input="CLEAR_ERROR"
            :state="getValidationState(validationContext)"
          />
          <b-form-invalid-feedback>
            {{ validationContext.errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </validation-provider>
      <b-row>
        <b-col>
          <validation-provider
            name="Latitude"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group label="Latitude:" label-for="latitude">
              <b-form-input
                id="latitude"
                type="number"
                step="0.00000001"
                v-model="form.latitude"
                placeholder="Latitude"
                @input="CLEAR_ERROR"
                :state="getValidationState(validationContext)"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col>
          <validation-provider
            name="Longitude"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group label="Longitude:" label-for="longitude">
              <b-form-input
                id="longitude"
                type="number"
                step="0.00000001"
                v-model="form.longitude"
                placeholder="Longitude"
                @input="CLEAR_ERROR"
                :state="getValidationState(validationContext)"
              />
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-col>
      </b-row>

      <div class="text-right">
        <b-button type="submit" variant="primary" size="sm" :disabled="loading">Submit</b-button>
      </div>
    </b-form>
  </validation-observer>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  middleware: 'auth',
  meta: {
    requiresAuth: true
  },
  props: {
    mapId: {
      type: Number,
      requred: true
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loading: false,
    form: {
      pin: '',
      name: '',
      address: '',
      city: '',
      state: '',
      photo: '',
      pdf: '',
      squarefeet: null,
      description: '',
      latitude: null,
      longitude: null
    }
  }),
  async mounted () {
    this.CLEAR_ERROR()
    // if (this.isEdit) {
    //   try {
    //     const response = await this.getMap(this.$route.params.id)

    //     this.settings.name = response.data.map.title
    //     this.settings.description = response.data.map.description
    //     this.settings.templateId = response.data.map.template_id
    //     this.settings.seo = JSON.parse(response.data.map.seo_keywords)
    //     this.settings.basemapSelector = response.data.map.map_selector
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
  },
  methods: {
    ...mapActions('location', ['createLocation', 'updateLocation', 'getLocation']),
    ...mapMutations('location', ['CLEAR_ERROR']),
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    async onSubmit() {
      this.CLEAR_ERROR()

      try {
        this.loading = true
        let response

        if (this.isEdit) {
          // response = await this.updateMap({ ...this.settings, id: this.$route.params.id })
          // this.$emit('updated', response.data.map)
        } else {
          response = await this.createLocation({
            ...this.form,
            mapId: this.mapId
          })
          this.$emit('created', response.data.location)
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
