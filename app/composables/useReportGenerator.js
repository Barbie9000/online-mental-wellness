

export default function () {


    // Create printable table from specific data
    const createPrintableTableFromData = (data, headers) => {
        let html = '<table><thead><tr>'

        headers.forEach(header => {
            html += `<th>${header.label}</th>`
        })
        html += '</tr></thead><tbody>'

        data.forEach(item => {
            html += '<tr>'
            headers.forEach(header => {
                const value = item[header.key]
                html += `<td>${value !== null && value !== undefined ? value : ''}</td>`
            })
            html += '</tr>'
        })

        html += '</tbody></table>'
        return html
    }


    // Enhanced print functionality with shared CSS
    const printReport = ({ data, headers, conditions, css, title = 'Report' }) => {
        if (!data.length) {
            alert('No data available for the selected criteria')
            return
        }

        const { getFieldType, getConditionOperations } = useConditions()

        const printWindow = window.open('', '_blank')

        if (printWindow) {
            const criteriaInfo = conditions.filter(c => c.enabled && c.field && c.operation).length > 0
                ? `<div class="criteria-info">
                <h3>Report Criteria:</h3>
                <ul>
                    ${conditions.filter(c => c.enabled && c.field && c.operation).map(condition =>
                    `<li><strong>${toProperCase(condition.field)}:</strong> ${getConditionOperations(getFieldType(condition.field, data[0])).find(op => op.value === condition.operation)?.label} ${condition.value}</li>`
                ).join('')}
                </ul>
               </div>`
                : ''

            printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title} - BetterMind</title>
          <style>
            ${css}
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>BETTERMIND ONLINE MENTAL WELLNESS SYSTEM</h1>
            <h2>${title}</h2>
          </div>
          ${criteriaInfo}
          <div class="data-summary">
            <strong>Total Records: ${data.length}</strong> | Generated on: ${new Date().toLocaleString()}
          </div>
          ${createPrintableTableFromData(data, headers)}
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


    return {
        printReport
    }

}