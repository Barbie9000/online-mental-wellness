<script setup>
useHead({
    title: 'Therapist Management'
})


const { data: appointmentRequests, pending, error } = useFetch('/api/therapist/appointment-requests')

const selectedRequestId = ref(null)
const wantsToAccept = ref(false)

watch(selectedRequestId, (requestId) => {
    if (requestId) {
        wantsToAccept.value = true
    }
})

const appointmentTime = reactive({
    hours: null,
    minutes: null,
    clockZone: 'AM'
})

const timeSet = computed(() => Object.values(appointmentTime).every(Boolean))

async function acceptAppointmentRequest() {
    try {

        if (!timeSet.value) return;

        await $fetch(`/api/therapist/appointments/${selectedRequestId.value}`, {
            method: 'PATCH',
            body: {
                time: `${appointmentTime.hours} ${appointmentTime.minutes} ${appointmentTime.clockZone}`
            }
        })

        wantsToAccept.value = false
        appointmentRequests.value = appointmentRequests.value.filter(t => t.id !== selectedRequestId.value)
    } catch (error) {
        console.error("Error deleting therapist")
    }
}

</script>

<template>

    <div class="main-content">

        <div v-if="wantsToAccept" class="modal accept-modal">
            <form class="bg-white" @submit.prevent="acceptAppointmentRequest">
                <div class="modal-close"><button type="button" @click="wantsToAccept = false">Close</button></div>

                <h5 class="text-lg bolder">Appointment Time</h5>
                <div class="input-group">
                    <input v-model="appointmentTime.hours" type="text" placeholder="HH" required>
                    <input v-model="appointmentTime.minutes" type="text" placeholder="MM" required>
                    <select class="bg-white" v-model="appointmentTime.clockZone" required>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>

                <button class="bg-green" v-if="timeSet" type="submit">Accept</button>
            </form>
        </div>

        <template v-if="pending">
            Fetching appointment requests data
        </template>

        <template v-else-if="error">
            Error occured while fetching appointment requests
        </template>

        <template v-else>
            <h1>
                All Appointment Requests
            </h1>

            <TableView :data="appointmentRequests" :actions="[
                {
                    class: 'bg-green',
                    handler: request => selectedRequestId = request._id,
                    label: 'Accept'
                }
            ]">

                <template #field-symptoms="{ value: symptoms }" :>
                    <span :title="symptoms"> {{ symptoms }}
                    </span>
                </template>

            </TableView>

        </template>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
    display: flex;
    justify-content: space-between;
    color: white;
    margin-bottom: 30px;
}

h5 {
    font-size: 30;
}

.accept-modal .modal-close {
    text-align: end;
}
</style>