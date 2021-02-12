<template>
  <table class="Table">
    <thead>
      <tr>
        <th>First name</th>
        <th>Last name</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <TableRow
        v-for="person in allPersons"
        :person="person"
        :key="person.uuid"
      />
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3">
          <FormNewEntry
        v-if="isOpenCreateForm"
        @close="isOpenCreateForm = false"
        />
          <button
            class="btn"
            type="button"
            v-else
            @click="isOpenCreateForm = true"
          >
            Добавить запись
          </button>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import TableRow from '@/components/TableRow.vue'
import FormNewEntry from '@/components/FormNewEntry.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'VueTable',
  data: () => ({
    isOpenCreateForm: false
  }),
  components: {
    TableRow,
    FormNewEntry
  },
  computed: {
    ...mapGetters(['allPersons'])
  },
  methods: {
    ...mapActions(['getPersons'])
  },
  mounted () {
    this.getPersons()
  }
}
</script>

<style lang="scss">
.Table {
  width: 900px;
  max-width: 100%;
  margin-top: 56px;
  border-collapse: collapse;

  & th {
    padding: 16px;
    box-sizing: border-box;

    background-color: #42b983;
    color: #ffffff;
  }

  & td {
    padding: 16px;
    box-sizing: border-box;
  }

  & .btn {
    display: inline-block;
    height: 48px;
    padding: 0 24px;

    font-size: 14px;
    line-height: 48px;
    font-weight: bold;
    text-transform: uppercase;
    vertical-align: middle;

    background-color: #42b983;
    color: #ffffff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      opacity: 0.75;
      transition: all 0.25s ease;
    }
  }
}

@media screen and (max-width: 960px) {
  .Table {
    width: auto;
  }
}
</style>
