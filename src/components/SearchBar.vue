<template>
  <div class="search-bar">
    <span class="search-icon">🔍</span>
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "搜索景点名称..." }
})
defineEmits(["update:modelValue"])
</script>
