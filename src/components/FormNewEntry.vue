<template>
  <form
    class="form"
    @submit.prevent="addNewItem"
  >
    <div class="form__field">
      <input
        type="text"
        v-model="firstName"
      />
    </div>
    <div class="form__field">
      <input
        class="form__field"
        type="text"
        v-model="lastName"
      />
    </div>
    <button class="btn" type="submit">Сохранить</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    firstName: '',
    lastName: ''
  }),
  methods: {
    ...mapActions(['addEntry']),
    addNewItem () {
      if (this.firstName.trim() && this.lastName.trim()) {
        const newEntry = {
          firstName: this.firstName,
          lastName: this.lastName
        }

        this.addEntry(newEntry)
        this.firstName = ''
        this.lastName = ''
        this.$emit('close')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;

  &__field {
    flex-grow: 1;
    flex-shrink: 0;
    margin-right: 16px;
    box-sizing: border-box;

    font-size: 0;

    color: inherit;

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

  & .btn {
    flex-grow: 1;
    flex-shrink: 0;
  }
}

@media screen and (max-width: 960px) {
  .form {
    flex-direction: column;

    &__field {
      margin-right: 0;
      margin-bottom: 16px;
    }
  }
}
</style>
