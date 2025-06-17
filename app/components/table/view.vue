<script setup>

const props = defineProps({
    data: {
        type: Array,
        default: () => []
    },
    aliases: {
        type: Object,
        default: () => ({})
    },
    actions: {
        type: Array,
        default: () => []
    },
    itemsPerPage: {
        type: Number,
        default: 10
    },
    showPagination: {
        type: Boolean,
        default: true
    },
    showPrintButton: {
        type: Boolean,
        default: true
    },
    showFilters: {
        type: Boolean,
        default: true
    },
    showReportGenerator: {
        type: Boolean,
        default: true
    }
})

const sanitizedData = computed(() => props.data.map(r => {
    const refR = r
    Object.keys(refR).forEach(k => {
        if (refR[k] === null || refR[k] === undefined) {
            refR[k] = 'N/A'
        }
    })

    return refR
}))

// Reactive state
const currentPage = ref(1)
const sortField = ref('')
const sortDirection = ref('asc')
const activeTab = ref('') // 'filters' or 'reports'
const filterConditions = ref([])
const reportConditions = ref([])
const visibleFields = ref(new Set())
const reportVisibleFields = ref(new Set())

// Initialize visible fields
onMounted(() => {
    const allFields = getAllFields()
    visibleFields.value = new Set(allFields.map(f => f.key))
    reportVisibleFields.value = new Set(allFields.map(f => f.key))
})



// Get all fields from data, excluding fields starting with underscore
const getAllFields = () => {
    if (!props.data.length) return [] 

    // Collect all unique field names from all records
    const allFieldsSet = new Set()
    
    props.data.forEach(item => {
        Object.keys(item).forEach(key => {
            if (!key.startsWith('_')) {
                allFieldsSet.add(key)
            }
        })
    })

    // Convert to array and create field objects
    const fields = Array.from(allFieldsSet)
    
    return fields.map(field => ({
        key: field,
        label: props.aliases[field] || toProperCase(field),
        type: getFieldType(field)
    }))
}

// Get visible table headers
const tableHeaders = computed(() => {
    return getAllFields().filter(field => visibleFields.value.has(field.key))
})

// Add new filter condition
const addFilterCondition = (isReport = false) => {
    const conditions = isReport ? reportConditions : filterConditions
    const newCondition = {
        id: Date.now() + Math.random(),
        field: '',
        operation: '',
        value: '',
        enabled: true
    }

    conditions.value.push(newCondition)

}

// Remove filter condition
const removeFilterCondition = (id, isReport = false) => {
    if (isReport) {
        reportConditions.value = reportConditions.value.filter(c => c.id !== id)
    } else {
        filterConditions.value = filterConditions.value.filter(c => c.id !== id)
    }
}

const { applyFilterCondition: partialApplyFilterCondition, getFieldType: partialGetFieldType } = useConditions()

const applyFilterCondition = (...args) => partialApplyFilterCondition(...args, sanitizedData.value[0])
const getFieldType = (...args) => partialGetFieldType(...args, sanitizedData.value?.[0])

// Filtered and sorted data
const processedData = computed(() => {
    let result = [...sanitizedData.value]

    // Apply filter conditions
    const activeConditions = filterConditions.value.filter(c => c.enabled && c.field && c.operation)

    result = result.filter(item => {
        return activeConditions.every(condition => applyFilterCondition(item, condition))
    })

    // Apply sorting
    if (sortField.value) {
        result.sort((a, b) => {
            let aVal = a[sortField.value]
            let bVal = b[sortField.value]

            // Handle null/undefined values
            if (aVal === null || aVal === undefined) aVal = ''
            if (bVal === null || bVal === undefined) bVal = ''

            // Convert to appropriate types for comparison
            const fieldType = getFieldType(sortField.value)
            if (fieldType === 'number') {
                aVal = parseFloat(aVal) || 0
                bVal = parseFloat(bVal) || 0
            } else if (fieldType === 'date') {
                aVal = new Date(aVal)
                bVal = new Date(bVal)
            } else {
                aVal = aVal.toString().toLowerCase()
                bVal = bVal.toString().toLowerCase()
            }

            let comparison = 0
            if (aVal > bVal) comparison = 1
            if (aVal < bVal) comparison = -1

            return sortDirection.value === 'desc' ? -comparison : comparison
        })
    }

    return result
})

// Get paginated data
const paginatedData = computed(() => {
    if (!props.showPagination) return processedData.value

    const start = (currentPage.value - 1) * props.itemsPerPage
    const end = start + props.itemsPerPage
    return processedData.value.slice(start, end)
})

// Total pages based on filtered data
const totalPages = computed(() => Math.ceil(processedData.value.length / props.itemsPerPage))

// Sorting methods
const sortBy = (field) => {
    if (sortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
        sortField.value = field
        sortDirection.value = 'asc'
    }
    currentPage.value = 1
}

// Tab management
const setActiveTab = (tab) => {
    if (activeTab.value === tab) {
        activeTab.value = ''
    } else {
        activeTab.value = tab
    }
}

// Copy filters to report
const copyFiltersToReport = () => {
    reportConditions.value = filterConditions.value.map(condition => ({
        ...condition,
        id: Date.now() + Math.random()
    }))
    reportVisibleFields.value = new Set(visibleFields.value)
}

// Clear all conditions
const clearConditions = (isReport = false) => {
    if (isReport) {
        reportConditions.value = []
    } else {
        filterConditions.value = []
        currentPage.value = 1
    }
}

// Toggle field visibility
const toggleFieldVisibility = (fieldKey, isReport = false) => {
    const fields = isReport ? reportVisibleFields : visibleFields
    if (fields.value.has(fieldKey)) {
        fields.value.delete(fieldKey)
    } else {
        fields.value.add(fieldKey)
    }
}

// Get report data
const getReportData = () => {
    let result = [...sanitizedData.value]

    const activeConditions = reportConditions.value.filter(c => c.enabled && c.field && c.operation)

    result = result.filter(item => {
        return activeConditions.every(condition => applyFilterCondition(item, condition))
    })

    return result
}


const { printReport } = useReportGenerator()
// Generate report
const generateReport = () => {
    const reportData = getReportData()
    const visibleHeaders = getAllFields().filter(field => reportVisibleFields.value.has(field.key))
    // printReport(reportData, visibleHeaders, 'Custom Report')
    printReport({ data: reportData, headers: visibleHeaders, title: 'Custom Report', css: getPrintCSS(), conditions: reportConditions.value })

}

// Print current view
const printTable = () => {
    printReport({ data: processedData.value, headers: tableHeaders.value, title: 'Current View', css: getPrintCSS(), conditions: filterConditions.value })
}

// Get print CSS (shared with main component)
const getPrintCSS = () => {
    return `
        body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px;
            background: white;
            color: #333;
        }
        .print-header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #22c55e;
            padding-bottom: 15px;
        }
        .print-header h1 {
            margin: 0;
            color: #22c55e;
            font-size: 24px;
        }
        .print-header h2 {
            margin: 10px 0 0 0;
            color: #666;
            font-size: 18px;
            font-weight: normal;
        }
        .criteria-info {
            background: #f9fafb;
            padding: 15px;
            margin-bottom: 20px;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
        }
        .criteria-info h3 {
            margin: 0 0 10px 0;
            color: #22c55e;
        }
        .criteria-info ul {
            margin: 0;
            padding-left: 20px;
        }
        .criteria-info li {
            margin: 5px 0;
        }
        .data-summary {
            text-align: center;
            margin: 20px 0;
            font-size: 14px;
            color: #666;
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        th { 
            background-color: #22c55e;
            color: white;
            border: 1px solid #16a34a;
            padding: 12px 8px;
            text-align: left;
            font-weight: bold;
        }
        td { 
            border: 1px solid #e5e7eb;
            padding: 10px 8px;
            text-align: left;
        }
        tr:nth-child(even) { 
            background-color: #f9fafb;
        }
        tr:nth-child(odd) { 
            background-color: white;
        }
        .print-footer {
            position: fixed;
            bottom: 20px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #e5e7eb;
            padding-top: 10px;
            background: white;
        }
        @media print {
            body { margin: 0; padding: 15px; }
            table { page-break-inside: auto; }
            tr { page-break-inside: avoid; page-break-after: auto; }
            .print-footer { position: fixed; bottom: 0; }
        }
    `
}


// Pagination methods
const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}


</script>

<template>
    <div class="table-container">
        <!-- Control Panel -->
        <div class="table-controls">
            <div class="control-buttons">
                <!-- Filter Toggle -->
                <button v-if="showFilters" @click="setActiveTab('filters')"
                    :class="['control-btn', { active: activeTab === 'filters' }]">
                    <Icon name="heroicons:funnel" size="24" />
                    Filters
                    <span v-if="filterConditions.filter(c => c.enabled).length" class="badge">
                        {{filterConditions.filter(c => c.enabled).length}}
                    </span>
                </button>

                <!-- Report Generator Toggle -->
                <button v-if="showReportGenerator" @click="setActiveTab('reports')"
                    :class="['control-btn', { active: activeTab === 'reports' }]">
                    <Icon name="heroicons:chart-bar-square" size="24" />
                    Reports
                </button>

                <!-- Print Current View -->
                <button v-if="showPrintButton" @click="printTable" :disabled="!processedData.length" class="print-btn">
                    <Icon name="heroicons:printer" size="24" />
                    Print View
                </button>
            </div>

            <!-- Data Summary -->
            <div class="data-summary">
                Showing {{ paginatedData.length }} of {{ processedData.length }} records
                <span v-if="processedData.length !== data.length">
                    (filtered from {{ data.length }} total)
                </span>
            </div>
        </div>

        <!-- Filter Panel -->
        <div v-if="activeTab === 'filters' && showFilters" class="filter-panel">
            <TableConditions title="Filter Data" :data :conditions="filterConditions" :allFields="getAllFields()"
                :addCondition="() => addFilterCondition(false)" :removeCondition="removeFilterCondition"
                :clearConditions />

            <TableFieldSelection :allFields="getAllFields()" :toggleFieldVisibility :visibleFields />
        </div>

        <!-- Report Generator Panel -->
        <div v-if="activeTab === 'reports' && showReportGenerator" class="report-panel">

            <TableConditions title="Generate Custom Report" :data :conditions="reportConditions"
                :allFields="getAllFields()" :addCondition="() => addFilterCondition(true)"
                :removeCondition="conditionId => removeFilterCondition(conditionId, true)"
                :clearConditions="() => clearConditions(true)">
                <template #actions-before>
                    <button @click="copyFiltersToReport" class="copy-btn">
                        <Icon name="heroicons:clipboard-document" size="24" />
                        Use Current Filters
                    </button>
                </template>
                <template #actions-after>
                    <button @click="generateReport" class="generate-btn">
                        <Icon name="heroicons:printer" size="24" />
                        Generate Report
                    </button>
                </template>

            </TableConditions>


            <!-- Field Visibility and Selection -->
            <div class="report-settings">

                <TableFieldSelection title="Visible Fields in Report" :allFields="getAllFields()"
                    :toggleFieldVisibility="(field) => toggleFieldVisibility(field, true)"
                    :visibleFields="reportVisibleFields" />


                <div class="report-preview">
                    <h5>Report Preview</h5>
                    <p>{{ getReportData().length }} records match the current criteria</p>
                    <p>Showing {{ reportVisibleFields.size }} of {{ getAllFields().length }} fields</p>
                </div>
            </div>
        </div>

        <!-- Table -->
        <div v-if="processedData.length" class="table-wrapper">
            <table class="dynamic-table">
                <thead>
                    <tr>
                        <th v-for="header in tableHeaders" :key="header.key" @click="sortBy(header.key)" :class="['sortable-header', {
                            'sorted-asc': sortField === header.key && sortDirection === 'asc',
                            'sorted-desc': sortField === header.key && sortDirection === 'desc'
                        }]">
                            {{ header.label }}
                            <span class="sort-indicator">
                                <Icon :name="`heroicons:chevron-${sortDirection === 'asc' ? 'up' : 'down'}`"
                                    v-if="sortField === header.key" class="font-bold" />

                                <div class="inline-flex flex-col" v-else>
                                    <Icon name="heroicons:chevron-up" class="font-bold" />
                                    <Icon name="heroicons:chevron-down" class="font-bold" />
                                </div>
                            </span>
                        </th>
                        <th v-if="actions.length" class="actions-header">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in paginatedData" :key="item.id || item._id || index">
                        <td v-for="header in tableHeaders" :key="header.key">
                            <slot :name="`field-${header.key}`" :item="item" :value="item[header.key]"
                                :field="header.key">
                                {{ item[header.key] }}
                            </slot>
                        </td>

                        <td v-if="actions.length" class="actions-cell">
                            <slot name="actions" :item="item" :actions="actions">
                                <div class="action-buttons">
                                    <button v-for="action in actions" :key="action.label"
                                        @click="() => action.handler(item)" :class="['action-btn', action.class || '']">
                                        {{ action.label }}
                                    </button>
                                </div>
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
            <p v-if="filterConditions.filter(c => c.enabled).length">No records match the current filters</p>
            <p v-else>No data available</p>
        </div>

        <TablePagination :currentPage :totalPages :itemsPerPage :showPagination :prevPageHandler="prevPage" :goToPage
            :nextPageHandler="nextPage" />


    </div>
</template>

<style scoped>
.table-container {
    width: 100%;
    border-radius: 0;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Control Panel */
.table-controls {
    padding: 12px 16px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f9fafb;
    flex-wrap: wrap;
    gap: 12px;
}

.control-buttons {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
}

.control-btn {
    background-color: #6b7280;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
}

.control-btn:hover {
    background-color: #4b5563;
}

.control-btn.active {
    background-color: #22c55e;
}

.control-btn.active:hover {
    background-color: #16a34a;
}

.control-btn svg {
    width: 14px;
    height: 14px;
}

.badge {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding: 2px 6px;
    font-size: 12px;
    font-weight: bold;
}

.print-btn {
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
}

.print-btn:hover:not(:disabled) {
    background-color: #2563eb;
}

.print-btn:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
}

.print-btn svg {
    width: 14px;
    height: 14px;
}

.data-summary {
    color: #374151;
    font-size: 14px;
    font-weight: 500;
}

/* Filter and Report Panels */
.filter-panel,
.report-panel {
    background: #f8fafc;
    border-bottom: 1px solid #e5e7eb;
    padding: 16px;
}

.generate-btn,
.copy-btn {
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

.generate-btn {
    background-color: #3b82f6;
    color: white;
}

.generate-btn:hover {
    background-color: #2563eb;
}

.copy-btn {
    background-color: #8b5cf6;
    color: white;
}

.copy-btn:hover {
    background-color: #7c3aed;
}


/* Report Settings */
.report-settings {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 16px;
}

.report-preview {
    background: #e0f2fe;
    border: 1px solid #0891b2;
    border-radius: 4px;
    padding: 12px;
    color: #0f172a;
    font-size: 14px;
}

.report-preview h5 {
    margin: 0 0 8px 0;
    font-size: 14px;
    color: #1f2937;
}

/* Table Styles */
.table-wrapper {
    overflow-x: auto;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dynamic-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
}

.dynamic-table th {
    background-color: #22c55e;
    color: white;
    padding: 12px;
    text-align: left;
    font-weight: 600;
    border: 1px solid #16a34a;
}

.sortable-header {
    cursor: pointer;
    user-select: none;
    position: relative;
    transition: background-color 0.2s;
}

.sortable-header:hover {
    background-color: #16a34a;
}

.sort-indicator {
    float: right;
    margin-left: 8px;
    font-size: 16px;
    opacity: 0.7;
}

.sort-placeholder {
    opacity: 0.3;
}

.sorted-asc .sort-indicator,
.sorted-desc .sort-indicator {
    opacity: 1;
    font-weight: bold;
}

.actions-header {
    text-align: center;
    cursor: default !important;
}

.actions-header:hover {
    background-color: #22c55e !important;
}

.dynamic-table td {
    padding: 12px;
    border: 1px solid #e5e7eb;
    color: #333;
}

.dynamic-table tbody tr:nth-child(even) {
    background-color: #f9fafb;
}

.dynamic-table tbody tr:nth-child(odd) {
    background-color: white;
}

.dynamic-table tbody tr:hover {
    background-color: #f3f4f6;
}

.actions-cell {
    text-align: center;
    white-space: nowrap;
}

.action-buttons {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
}

.action-btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
}

.action-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Default action button styles - can be overridden with classes */
.action-btn {
    background-color: #6b7280;
    color: white;
}

.action-btn:hover {
    background-color: #4b5563;
}

/* Common action button classes */
.action-btn.bg-green {
    background-color: #22c55e;
}

.action-btn.bg-green:hover {
    background-color: #16a34a;
}

.action-btn.delete {
    background-color: #ef4444;
}

.action-btn.delete:hover {
    background-color: #dc2626;
}

.action-btn.edit {
    background-color: #3b82f6;
}

.action-btn.edit:hover {
    background-color: #2563eb;
}

.empty-state {
    padding: 60px 20px;
    text-align: center;
    background: #f9fafb;
    color: white;
    background-color: #6b7280;
}

.empty-state p {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
    .table-controls {
        flex-direction: column;
        gap: 12px;
        align-items: stretch;
    }

    .control-buttons {
        justify-content: center;
        flex-wrap: wrap;
    }

    .filter-header,
    .report-header {
        flex-direction: column;
        gap: 12px;
        align-items: stretch;
    }

    .filter-actions,
    .report-actions {
        justify-content: center;
    }

    .report-settings {
        grid-template-columns: 1fr;
    }

    .action-buttons {
        flex-direction: column;
        align-items: center;
    }

    .table-wrapper {
        font-size: 14px;
    }

    .dynamic-table th,
    .dynamic-table td {
        padding: 8px 6px;
    }
}

@media (max-width: 480px) {

    .filter-panel,
    .report-panel {
        padding: 12px;
    }

    .control-btn,
    .print-btn {
        padding: 6px 10px;
        font-size: 13px;
    }

    .dynamic-table {
        font-size: 12px;
    }

    .dynamic-table th,
    .dynamic-table td {
        padding: 6px 4px;
    }

    .action-btn {
        padding: 4px 8px;
        font-size: 12px;
    }
}
</style>