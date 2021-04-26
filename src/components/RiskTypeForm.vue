<template>
  <div>
    <v-card class="mb-12">
      <form action="">
        <v-toolbar elevation="1">
          <v-toolbar-title>
            {{ showTitle ? riskType.name : "Fields:" }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <router-link
            v-show="showTitle"
            :to="{ name: 'RiskType', params: { id: riskType.id }}"
            class="text-h6 secondary--text"
          >
            View
          </router-link>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col align="center" v-if="!riskType.fields.length">
              <h3>{{ riskType.name }} has no fields</h3>
            </v-col>
            <v-col
              cols="12"
              md="6"
              v-for="field in riskType.fields"
              :key="field.id"
            >
              <v-text-field
                v-if="['text', 'number'].includes(field.field_type)"
                :type="field.field_type"
                :label="field.field_name"
                v-model="form[field.field_name]"
                filled
              ></v-text-field>

              <v-select
                v-else-if="field.field_type == 'enum'"
                :items="field.choices"
                :label="field.field_name"
                v-model="form[field.field_name]"
                filled
              ></v-select>

              <v-menu
                v-else-if="field.field_type == 'date'"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form[field.field_name]"
                    :label="field.field_name"
                    readonly
                    filled
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  no-title
                  v-model="form[field.field_name]"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions v-if="riskType.fields.length">
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="dialog = true">Save</v-btn>
        </v-card-actions>
      </form>
    </v-card>

    <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-card-title> Coming soon! </v-card-title>

        <v-card-text>
          Saving of Risk Type form values is not yet implemented.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="dialog = false"> Okay </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template> 

<script>
  export default {
    name: "RiskTypeForm",
    props: {
      riskType: {
        required: true,
        type: Object,
      },
      showTitle: {
        type: Boolean,
        default: true,
      },
    },
    data: () => ({
      dialog: false,
      form: {},
    }),
    beforeMount() {
      for (let field of this.riskType.fields) {
        this.form[field.field_name] = null;
      }
    },
  };
</script>

<style lang="css">
  a.text-h6 {
    text-decoration: none;
  }
</style>