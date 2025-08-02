<template>
  <i class="fa fa-close"  @click="removeFromCart(product)"></i>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    product: Object
  },
  methods: Object.assign({}, mapMutations(['removeFromCart']))
}
</script>
