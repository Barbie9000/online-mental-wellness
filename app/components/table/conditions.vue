<script setup>
const props = defineProps({
    title: {
        type: String
    },
    allFields: {
        type: Array,
        default: () => []
    },
    conditions: {
        type: Array,
        default: () => []
    },
    data: {
        type: Array,
        default: () => []
    },
    addCondition: {
        type: Function,
        default: () => (() => { })
    },
    removeCondition: {
        type: Function,
        default: () => (() => { })
    },
    clearConditions: {
        type: Function,
        default: () => (() => { })
    }
})


const { getConditionOperations, getFieldType: partialGetFieldType } = useConditions()
const getFieldType = (field) => partialGetFieldType(field, props.data?.[0])


// Get unique values for enum-type filters
const getUniqueValues = (field) => {
    const values = props.data.map(item => item[field])
        .filter(value => value !== null && value !== undefined)
        .map(value => value.toString())
    const unique = [...new Set(values)].sort()

    // Only return as enum options if there are relatively few unique values
    return unique.length <= 20 ? unique : []
}

// Check if operation is valid for field
const isValidOperation = (field, operation, conditions) => {
    const fieldType = getFieldType(field)
    if (fieldType !== 'date') return true

    // For date fields, check if past operations are already used
    const pastOperations = ['past_days', 'past_weeks', 'past_months', 'past_years']
    if (!pastOperations.includes(operation)) return true

    const usedPastOps = conditions.filter(c =>
        c.field === field && pastOperations.includes(c.operation) && c.id !== operation.id
    )

    return usedPastOps.length === 0
}

</script>

<template>
    <div class="conditions-header">

        <h4 v-if="title">{{ title }}</h4>

        <div class="conditions-actions">
            <slot name="actions-before"></slot>

            <button @click="clearConditions" class="clear-btn">
                <Icon name="heroicons:trash" size="24" />
                Clear All
            </button>
            <button @click="addCondition" class="add-btn">
                <Icon name="heroicons:plus" size="24" />
                Add Condition
            </button>

            <slot name="actions-after"></slot>
        </div>
    </div>
    <div class="conditions-list">
        <div v-for="condition in conditions" :key="condition.id" class="condition-item">
            <div class="condition-controls">
                <select v-model="condition.field" class="field-select">
                    <option value="">Select Field</option>
                    <option v-for="field in allFields" :key="field.key" :value="field.key">
                        {{ field.label }}
                    </option>
                </select>

                <select v-model="condition.operation" :disabled="!condition.field" class="operation-select">
                    <option value="">Select Operation</option>
                    <option v-for="op in getConditionOperations(getFieldType(condition.field))" :key="op.value"
                        :value="op.value" :disabled="!isValidOperation(condition.field, op.value, conditions)">
                        {{ op.label }}
                    </option>
                </select>

                <!-- Text/Number input -->
                <input v-if="condition.operation && condition.operation !== 'enum' &&
                    !['past_days', 'past_weeks', 'past_months', 'past_years'].includes(condition.operation)"
                    v-model="condition.value" :type="getFieldType(condition.field) === 'number' ? 'number' : 'text'"
                    class="value-input"
                    :placeholder="getFieldType(condition.field) === 'date' ? 'YYYY-MM-DD' : 'Enter value'">

                <!-- Enum select -->
                <select v-else-if="condition.operation === 'enum' && getUniqueValues(condition.field).length"
                    v-model="condition.value" class="enum-select">
                    <option value="">Select value</option>
                    <option v-for="val in getUniqueValues(condition.field)" :key="val" :value="val">
                        {{ val }}
                    </option>
                </select>

                <!-- Past date units -->
                <div v-else-if="['past_days', 'past_weeks', 'past_months', 'past_years'].includes(condition.operation)"
                    class="past-date-input">
                    <input v-model="condition.value" type="number" min="1" class="unit-input">
                    <span class="unit-label">
                        {{ condition.operation.split('_')[1] }}
                    </span>
                </div>

                <!-- Boolean select -->
                <select v-else-if="getFieldType(condition.field) === 'boolean'" v-model="condition.value"
                    class="boolean-select">
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>

                <button @click="removeCondition(condition.id, false)" class="remove-btn">
                    <Icon name="heroicons:trash" size="24" />
                </button>
            </div>

            <label class="toggle-enable">
                <input type="checkbox" v-model="condition.enabled">
                <span>Enable</span>
            </label>
        </div>
    </div>
</template>

<style scoped>
.conditions-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 12px;
}

.conditions-header h4 {
    margin: 0;
    color: #1f2937;
    font-size: 16px;
}

.conditions-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.clear-btn,
.add-btn {
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
}

.clear-btn {
    background-color: #ef4444;
    color: white;
}

.clear-btn:hover {
    background-color: #dc2626;
}

.add-btn {
    background-color: #22c55e;
    color: white;
}

.add-btn:hover {
    background-color: #16a34a;
}


/* Conditions List */
.conditions-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
}

.condition-item {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    padding: 12px;
}

.condition-controls {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 8px;
}

.field-select,
.operation-select,
.value-input,
.enum-select,
.boolean-select {
    padding: 6px 8px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 14px;
    min-width: 150px;
}

.field-select:focus,
.operation-select:focus,
.value-input:focus,
.enum-select:focus,
.boolean-select:focus {
    outline: none;
    border-color: #22c55e;
    box-shadow: 0 0 0 1px #22c55e;
}

.past-date-input {
    display: flex;
    align-items: center;
    gap: 4px;
}

.unit-input {
    width: 60px;
    padding: 6px 8px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 14px;
}

.unit-label {
    font-size: 14px;
    color: #4b5563;
}

.remove-btn {
    background: #ef4444;
    color: white;
    border: none;
    width: 28px;
    height: 28px;
    padding: 3px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.remove-btn:hover {
    background: #dc2626;
}


.toggle-enable {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #4b5563;
    cursor: pointer;
}


/* Responsive Design */
@media (max-width: 768px) {

    .conditions-header {
        flex-direction: column;
        gap: 12px;
        align-items: stretch;
    }

    .conditions-actions {
        justify-content: center;
    }


}


@media (max-width: 480px) {

    .field-select,
    .operation-select,
    .value-input,
    .enum-select,
    .boolean-select {
        min-width: 120px;
    }
}
</style>