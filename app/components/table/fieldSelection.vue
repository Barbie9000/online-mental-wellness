<script setup>
const props = defineProps({
    title: {
        type: String,
        default: () => "Visible Fields"
    },
    visibleFields: {
        type: [Array, Set],
        default: () => []
    },
    allFields: {
        type: Array,
        default: () => []
    },
    toggleFieldVisibility: {
        type: Function,
        default: () => (() => { })
    }
})

const isVisible = field => props.visibleFields.has(field.key)
</script>

<template>

    <!-- Field Visibility Toggle -->
    <div class="field-visibility">
        <h5>{{ title }}</h5>
        <div class="visibility-grid">
            <div v-for="field in allFields" :key="field.key" class="visibility-item">
                <label>
                    <Icon :name="`heroicons:${isVisible(field) ? 'eye' : 'eye-slash'}`" size="16"
                        @click="() => toggleFieldVisibility(field.key, false)" />
                    {{ field.label }}
                </label>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Field Visibility */
.field-visibility {
    margin-top: 16px;
}

.field-visibility h5 {
    margin: 0 0 8px 0;
    font-size: 14px;
    color: #1f2937;
}

.visibility-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 8px;
}

.visibility-item {
    display: flex;
    align-items: center;
}

.visibility-item label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    cursor: pointer;
}

/* Responsive Design */
@media (max-width: 480px) {

    .visibility-grid {
        grid-template-columns: 1fr 1fr;
    }
}

</style>