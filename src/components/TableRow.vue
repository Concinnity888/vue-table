<template>
  <tr>
    <template v-if="!isEditable">
      <td>{{ person.firstName }}</td>
      <td>{{ person.lastName }}</td>
    </template>
    <template v-else>
      <td>
        <input
          type="text"
          :value="firstName"
          @change="changeFirstName"
        />
      </td>
      <td>
        <input
          type="text"
          :value="lastName"
          @change="changeLastName"
        />
      </td>
    </template>
    <td>
      <button
        type="button"
        :class="{'btn-save': isEditable, 'btn-edit': !isEditable }"
        @click="updateCurrentEntry(person)"
      >
        {{ isEditable ? 'Сохранить запись' : 'Редактировать запись' }}
      </button>
      <button
        class="btn-delete"
        type="button"
        @click="deleteEntry(person.uuid)"
      >
        Удалить запись
      </button>
    </td>
  </tr>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    isEditable: false,
    firstName: '',
    lastName: ''
  }),
  methods: {
    ...mapActions(['deleteEntry', 'updateEntry']),
    changeFirstName (evt) {
      this.firstName = evt.target.value
    },
    changeLastName (evt) {
      this.lastName = evt.target.value
    },
    updateCurrentEntry (person) {
      this.isEditable = !this.isEditable

      if (this.isEditable) {
        this.firstName = person.firstName
        this.lastName = person.lastName
      } else {
        const newEntry = {
          uuid: person.uuid,
          firstName: this.firstName,
          lastName: this.lastName
        }

        this.updateEntry(newEntry)
        person.firstName = this.firstName
        person.lastName = this.lastName
      }
    }
  }
}
</script>

<style scoped lang="scss">
td {
  width: 33%;
  line-height: 48px;

  & input {
    display: inline-flex;
    width: 100%;
    height: 48px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-size: 14px;
    line-height: 48px;
    vertical-align: middle;

    border: none;
    border-bottom: 1px solid #e3e3e3;
    outline: none;

    &:focus {
      border-bottom: 1px solid #42b983;
    }
  }
}

.btn-save {
  width: 48px;
  height: 48px;
  margin: 0 8px;

  font-size: 0;

  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0)'%3E%3Cpath d='M33.9742 25.492V34.6294H6.02442V25.492H0.652481V37.3154C0.652481 38.7978 1.85336 40 3.34245 40H36.6562C38.144 40 39.3462 38.7991 39.3462 37.3154V25.492H33.9742Z' fill='%2342B983'/%3E%3Cpath d='M19.5076 24.586L11.8167 15.2925C11.8167 15.2925 10.6465 14.1877 11.9154 14.1877C13.1843 14.1877 16.2492 14.1877 16.2492 14.1877C16.2492 14.1877 16.2492 13.4445 16.2492 12.2984C16.2492 9.03062 16.2492 3.08359 16.2492 0.65915C16.2492 0.65915 16.0771 0 17.0698 0C18.0706 0 22.4538 0 23.1703 0C23.8855 0 23.8695 0.555074 23.8695 0.555074C23.8695 2.90613 23.8695 9.05864 23.8695 12.2196C23.8695 13.2444 23.8695 13.9089 23.8695 13.9089C23.8695 13.9089 26.3273 13.9089 27.8698 13.9089C29.4096 13.9089 28.25 15.0657 28.25 15.0657C28.25 15.0657 21.7066 23.7521 20.7939 24.6634C20.1374 25.3239 19.5076 24.586 19.5076 24.586Z' fill='%2342B983'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='40' height='40' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
  background-position: center;
  background-repeat: no-repeat;
  color: #ffffff;
  filter: grayscale(100%) brightness(150%);
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    filter: none;
    transition: all 0.25s ease;
  }
}

.btn-edit {
  width: 48px;
  height: 48px;
  margin: 0 8px;

  font-size: 0;

  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg width='41' height='41' viewBox='0 0 41 41' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0)'%3E%3Cpath d='M33.6781 20.5C32.8694 20.5 32.2138 21.1556 32.2138 21.9643V36.6069C32.2138 37.4157 31.5582 38.0712 30.7495 38.0712H4.3928C3.58408 38.0712 2.9285 37.4157 2.9285 36.6069V7.32165C2.9285 6.51293 3.58408 5.85735 4.3928 5.85735H21.964C22.7727 5.85735 23.4283 5.20178 23.4283 4.39306C23.4283 3.58434 22.7727 2.92885 21.964 2.92885H4.3928C1.96672 2.92885 0 4.89557 0 7.32165V36.6069C0 39.033 1.96672 40.9997 4.3928 40.9997H30.7496C33.1757 40.9997 35.1424 39.033 35.1424 36.6069V21.9643C35.1424 21.1556 34.4868 20.5 33.6781 20.5Z' fill='%2342B983'/%3E%3Cpath d='M39.3587 1.64232C38.3073 0.590798 36.8813 0.000172007 35.3943 0.000343601C33.9065 -0.00394624 32.479 0.587709 31.4306 1.64327L12.1432 20.929C11.9832 21.0902 11.8625 21.2862 11.7903 21.5016L8.86179 30.2872C8.6062 31.0544 9.02103 31.8836 9.78831 32.1391C9.93717 32.1887 10.0931 32.214 10.2499 32.2142C10.4071 32.2139 10.5633 32.1887 10.7126 32.1395L19.4982 29.211C19.714 29.1389 19.91 29.0176 20.0707 28.8567L39.3581 9.56936C41.5472 7.38051 41.5474 3.83143 39.3587 1.64232Z' fill='%2342B983'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='41' height='41' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
  background-position: center;
  background-repeat: no-repeat;
  color: #ffffff;
  filter: grayscale(100%) brightness(150%);
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    filter: none;
    transition: all 0.25s ease;
  }
}

.btn-delete {
  width: 48px;
  height: 48px;
  margin: 0 8px;

  font-size: 0;

  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.66666 35.5555C6.66666 38.0111 8.65551 40 11.1111 40H28.8889C31.3445 40 33.3333 38.0111 33.3333 35.5555V8.88884H6.66666V35.5555Z' fill='%2342B983'/%3E%3Cpath d='M27.7778 2.22219L25.5555 0H14.4445L12.2222 2.22219H4.44449V6.66667H35.5555V2.22219H27.7778Z' fill='%2342B983'/%3E%3C/svg%3E%0A");
  background-position: center;
  background-repeat: no-repeat;
  color: #ffffff;
  border: none;
  filter: grayscale(100%) brightness(150%);
  outline: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    filter: none;
    transition: all 0.25s ease;
  }
}
</style>
