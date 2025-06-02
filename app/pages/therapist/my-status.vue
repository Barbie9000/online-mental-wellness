<script setup>
const { user } = useUserSession()

const initialStatus = user.value?.availabilityStatus;

const selectedStatus = ref(initialStatus);

const statusChanged = computed(() => selectedStatus.value !== initialStatus)

const updateStatus = async () => {
    if (!statusChanged.value) return;

    try {
        await $fetch(`/api/therapist/update-status`, {
            query: {
                status: selectedStatus.value,
            },
            method: 'PATCH'

        })

        reloadNuxtApp()
    } catch (error) {

    }
}
</script>


<template>
    <form class="bg-white" @submit.prevent="updateStatus">
        <div class="input-group">
            <label for="therapist-status">New Status</label>
            <select class="bg-white" v-model="selectedStatus" name="therapistStatus" id="therapist-status">
                <option :value="THERAPIST_AVAILABILITY_STATUSES.AVAILABLE">Available</option>
                <option :value="THERAPIST_AVAILABILITY_STATUSES.FULLY_BOOKED">Fully Booked</option>
            </select>
        </div>

        <button type="submit" class="bg-green" v-if="statusChanged">Update Status</button>
    </form>
</template>

<style scoped>


</style>