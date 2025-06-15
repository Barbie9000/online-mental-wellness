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
    }
})

// Pagination state
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(props.data.length / props.itemsPerPage))

// Convert field names to proper case
const toProperCase = (str) => {
    return str
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, (char) => char.toUpperCase()) // Capitalize first letter
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim()
}

// Get table headers from data, excluding fields starting with underscore
const tableHeaders = computed(() => {
    if (!props.data.length) return []

    const firstItem = props.data[0]
    const fields = Object.keys(firstItem).filter(key => !key.startsWith('_'))

    return fields.map(field => ({
        key: field,
        label: props.aliases[field] || toProperCase(field)
    }))
})

// Get paginated data
const paginatedData = computed(() => {
    if (!props.showPagination) return props.data

    const start = (currentPage.value - 1) * props.itemsPerPage
    const end = start + props.itemsPerPage
    return props.data.slice(start, end)
})

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

// Print functionality
const printTable = () => {
    if (!props.data.length) return

    const printWindow = window.open('', '_blank')

    if (printWindow) {
        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Table Print - BetterMind</title>
          <style>
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
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>BETTERMIND ONLINE MENTAL WELLNESS SYSTEM</h1>
          </div>
          ${createPrintableTable()}
          <div class="print-footer">
            © ${new Date().getFullYear()} BETTERMIND ONLINE MENTAL WELLNESS SYSTEM
          </div>
        </body>
      </html>
    `)

        printWindow.document.close()
        printWindow.focus()
        setTimeout(() => {
            printWindow.print()
            printWindow.close()
        }, 250)
    }
}

// Create printable table with all data (not paginated)
const createPrintableTable = () => {
    let html = '<table><thead><tr>'

    // Add headers (exclude actions in print)
    tableHeaders.value.forEach(header => {
        html += `<th>${header.label}</th>`
    })
    html += '</tr></thead><tbody>'

    // Add all data rows
    props.data.forEach(item => {
        html += '<tr>'
        tableHeaders.value.forEach(header => {
            const value = item[header.key]
            html += `<td>${value !== null && value !== undefined ? value : ''}</td>`
        })
        html += '</tr>'
    })

    html += '</tbody></table>'
    return html
}

// Get pagination range for display
const getPaginationRange = () => {
    const range = []
    const maxPages = 5 // Show max 5 page buttons
    let start = Math.max(1, currentPage.value - 2)
    let end = Math.min(totalPages.value, start + maxPages - 1)

    // Adjust start if we're near the end
    if (end - start < maxPages - 1) {
        start = Math.max(1, end - maxPages + 1)
    }

    for (let i = start; i <= end; i++) {
        range.push(i)
    }

    return range
}
</script>

<template>
    <div class="table-container">
        <!-- Print Button -->
        <div v-if="showPrintButton" class="table-actions">
            <button @click="printTable" :disabled="!data.length" class="print-btn">
                Print Table
            </button>
        </div>

        <!-- Table -->
        <div v-if="data.length" class="table-wrapper">
            <table class="dynamic-table">
                <thead>
                    <tr>
                        <th v-for="header in tableHeaders" :key="header.key">
                            {{ header.label }}
                        </th>
                        <th v-if="actions.length" class="actions-header">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in paginatedData" :key="item.id || item._id || index">
                        <td v-for="header in tableHeaders" :key="header.key">
                            <!-- Custom slot for specific field override -->
                            <slot :name="`field-${header.key}`" :item="item" :value="item[header.key]"
                                :field="header.key">
                                <!-- Default display -->
                                {{ item[header.key] }}
                            </slot>
                        </td>

                        <!-- Actions Column -->
                        <td v-if="actions.length" class="actions-cell">
                            <slot name="actions" :item="item" :actions="actions">
                                <!-- Default action buttons -->
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
            <p>No data available</p>
        </div>

        <!-- Pagination -->
        <div v-if="showPagination && totalPages > 1" class="pagination">
            <div class="pagination-info">
                Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to
                {{ Math.min(currentPage * itemsPerPage, data.length) }} of
                {{ data.length }} entries
            </div>

            <div class="pagination-controls">
                <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">
                    Previous
                </button>

                <button v-for="page in getPaginationRange()" :key="page" @click="goToPage(page)"
                    :class="['pagination-btn', { active: page === currentPage }]">
                    {{ page }}
                </button>

                <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.table-container {
    width: 100%;
    border-radius: 0;
}

.table-actions {
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: flex-end;
}

.print-btn {
    background-color: #22c55e;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 0;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
}

.print-btn:hover:not(:disabled) {
    background-color: #16a34a;
}

.print-btn:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
}

.table-wrapper {
    overflow-x: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

.actions-header {
    text-align: center;
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
    border-radius: 0;
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

.pagination {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e5e7eb;
    background: #f9fafb;
}

.pagination-info {
    color: #374151;
    font-size: 14px;
    font-weight: 500;
}

.pagination-controls {
    display: flex;
    gap: 4px;
    align-items: center;
}

.pagination-btn {
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    background: white;
    color: #374151;
    cursor: pointer;
    border-radius: 0;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled) {
    background-color: #f3f4f6;
    border-color: #9ca3af;
}

.pagination-btn:disabled {
    background-color: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
}

.pagination-btn.active {
    background-color: #22c55e;
    color: white;
    border-color: #16a34a;
}

.pagination-btn.active:hover {
    background-color: #16a34a;
}

@media (max-width: 768px) {
    .table-actions {
        padding: 12px;
    }

    .pagination {
        flex-direction: column;
        gap: 12px;
        text-align: center;
    }

    .pagination-controls {
        flex-wrap: wrap;
        justify-content: center;
    }

    .action-buttons {
        flex-direction: column;
        align-items: center;
    }
}
</style>