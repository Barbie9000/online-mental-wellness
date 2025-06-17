<script setup>
const props = defineProps({
    showPagination: {
        type: Boolean,
        default: false
    },
    totalPages: {
        type: Number,
        required: true
    },
    currentPage: {
        type: Number,
        required: true
    },
    itemsPerPage: {
        type: Number,
        required: true
    },
    prevPageHandler: {
        type: Function,
        default: () => { }
    },
    goToPage: {
        type: Function,
        default: () => { }
    },
    nextPageHandler: {
        type: Function,
        default: () => { }
    }
})

// Get pagination range for display
const getPaginationRange = () => {
    const range = []
    const maxPages = 5
    let start = Math.max(1, props.currentPage - 2)
    let end = Math.min(props.totalPages, start + maxPages - 1)

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
    <!-- Pagination -->
    <div v-if="showPagination && totalPages > 1" class="pagination">
        <div class="pagination-info">
            Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to
            {{ Math.min(currentPage * itemsPerPage, processedData.length) }} of
            {{ processedData.length }} entries
        </div>

        <div class="pagination-controls">
            <button @click="prevPageHandler" :disabled="currentPage === 1" class="pagination-btn">
                Previous
            </button>

            <button v-for="page in getPaginationRange()" :key="page" @click="goToPage(page)"
                :class="['pagination-btn', { active: page === currentPage }]">
                {{ page }}
            </button>

            <button @click="nextPageHandler" :disabled="currentPage === totalPages" class="pagination-btn">
                Next
            </button>
        </div>
    </div>

</template>

<style scoped>
.pagination {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e5e7eb;
    background: #f9fafb;
    flex-wrap: wrap;
    gap: 12px;
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
    flex-wrap: wrap;
}

.pagination-btn {
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    background: white;
    color: #374151;
    cursor: pointer;
    border-radius: 4px;
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


/* Responsive Design */
@media (max-width: 768px) {

    .pagination {
        flex-direction: column;
        gap: 12px;
        text-align: center;
    }

    .pagination-controls {
        flex-wrap: wrap;
        justify-content: center;
    }

}
</style>