export default function () {

    // Filter operations based on field type
    const getConditionOperations = (fieldType) => {
        switch (fieldType) {
            case 'text':
                return [
                    { value: 'includes', label: 'Contains' },
                    { value: 'exact', label: 'Equals' },
                    { value: 'enum', label: 'Select from list' }
                ]
            case 'number':
                return [
                    { value: 'gt', label: 'Greater than' },
                    { value: 'gte', label: 'Greater than or equal' },
                    { value: 'lt', label: 'Less than' },
                    { value: 'lte', label: 'Less than or equal' },
                    { value: 'exact', label: 'Equals' }
                ]
            case 'date':
                return [
                    { value: 'gt', label: 'After' },
                    { value: 'gte', label: 'On or after' },
                    { value: 'lt', label: 'Before' },
                    { value: 'lte', label: 'On or before' },
                    { value: 'exact', label: 'On exact date' },
                    { value: 'past_days', label: 'Past X days' },
                    { value: 'past_weeks', label: 'Past X weeks' },
                    { value: 'past_months', label: 'Past X months' },
                    { value: 'past_years', label: 'Past X years' }
                ]
            case 'boolean':
                return [
                    { value: 'exact', label: 'Equals' }
                ]
            default:
                return [
                    { value: 'includes', label: 'Contains' },
                    { value: 'exact', label: 'Equals' }
                ]
        }
    }

    // Get field types for better filtering
    const getFieldType = (field, dataRow) => {
        if (!dataRow) return 'text'

        const sampleValue = dataRow[field]
        if (typeof sampleValue === 'number') return 'number'
        if (sampleValue instanceof Date || (typeof sampleValue === 'string' && !isNaN(Date.parse(sampleValue)))) return 'date'
        if (typeof sampleValue === 'boolean') return 'boolean'
        return 'text'
    }

    // Apply filter condition to data
    const applyFilterCondition = (item, condition, dataRow) => {
        if (!condition.enabled || !condition.field || !condition.operation) return true

        const itemValue = item[condition.field]
        const filterValue = condition.value
        const fieldType = getFieldType(condition.field, dataRow)

        if (itemValue === null || itemValue === undefined) return false

        switch (condition.operation) {
            case 'includes':
                return itemValue.toString().toLowerCase().includes(filterValue.toString().toLowerCase())

            case 'exact':
                if (fieldType === 'boolean') {
                    return itemValue.toString().toLowerCase() === filterValue.toString().toLowerCase()
                }
                return itemValue.toString() === filterValue.toString()

            case 'enum':
                return itemValue.toString() === filterValue.toString()

            case 'gt':
                if (fieldType === 'number') {
                    return parseFloat(itemValue) > parseFloat(filterValue)
                } else if (fieldType === 'date') {
                    return new Date(itemValue) > new Date(filterValue)
                }
                return false

            case 'gte':
                if (fieldType === 'number') {
                    return parseFloat(itemValue) >= parseFloat(filterValue)
                } else if (fieldType === 'date') {
                    return new Date(itemValue) >= new Date(filterValue)
                }
                return false

            case 'lt':
                if (fieldType === 'number') {
                    return parseFloat(itemValue) < parseFloat(filterValue)
                } else if (fieldType === 'date') {
                    return new Date(itemValue) < new Date(filterValue)
                }
                return false

            case 'lte':
                if (fieldType === 'number') {
                    return parseFloat(itemValue) <= parseFloat(filterValue)
                } else if (fieldType === 'date') {
                    return new Date(itemValue) <= new Date(filterValue)
                }
                return false

            case 'past_days':
            case 'past_weeks':
            case 'past_months':
            case 'past_years':
                const now = new Date()
                const itemDate = new Date(itemValue)
                const units = parseInt(filterValue)
                if (isNaN(units)) return false

                let pastDate = new Date(now)
                switch (condition.operation) {
                    case 'past_days':
                        pastDate.setDate(now.getDate() - units)
                        break
                    case 'past_weeks':
                        pastDate.setDate(now.getDate() - (units * 7))
                        break
                    case 'past_months':
                        pastDate.setMonth(now.getMonth() - units)
                        break
                    case 'past_years':
                        pastDate.setFullYear(now.getFullYear() - units)
                        break
                }

                return itemDate >= pastDate && itemDate <= now

            default:
                return true
        }
    }


    return {
        getConditionOperations,
        getFieldType,
        applyFilterCondition
    }
}